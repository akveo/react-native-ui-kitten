/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as fs from 'fs';
import * as path from 'path';
import { Node, SyntaxKind, type SourceFile } from 'ts-morph';
import { readProjectFile, stringifyLike } from '../json';
import {
  RuleMode,
  type Edit,
  type Finding,
  type ProjectRule,
  type ProjectRuleResult,
  type RuleContext,
} from '../types';

const UI_KITTEN_SCOPE = '@ui-kitten';

const RECOMMENDED_PATTERN = 'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@ui-kitten)/)';

const CONFIG_FILENAMES: readonly string[] = [
  'jest.config.js',
  'jest.config.cjs',
  'jest.config.mjs',
  'jest.config.ts',
  'jest.config.json',
];

/**
 * The dominant shape of a `transformIgnorePatterns` entry: a negative lookahead wrapping a single
 * alternation group that ends in a slash. Both the React Native and Expo presets produce it, as
 * does every hand-written config that started from either.
 *
 * The inner capture is greedy so that nested groups survive — the real React Native preset is
 * `node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)`, and a non-greedy or
 * `[^)]*` capture would stop at the first inner `)` and corrupt it. The trailing `)/)` anchored to
 * the end of the string is what makes the greedy match unambiguous.
 */
const ALTERNATION_GROUP = /^(.*\(\?!)\((.*)\)\/\)$/;

/**
 * Adds `@ui-kitten` to a pattern's allow-list, or returns null when the pattern's shape is not one
 * the codemod is willing to rewrite blind.
 *
 * A `transformIgnorePatterns` entry is a *negative* filter: a module is transformed only if no
 * pattern matches it. Inserting an alternative in the wrong place silently stops transforming some
 * other package, and the failure surfaces much later as an unrelated syntax error in a test run.
 * Anything that is not the recognised shape is therefore reported rather than guessed at.
 */
export const patchPattern = (pattern: string): string | null => {
  if (pattern.includes(UI_KITTEN_SCOPE)) { return null; }

  const match = ALTERNATION_GROUP.exec(pattern);
  if (!match) { return null; }

  const [, prefix, alternation] = match;
  return `${prefix}(${alternation}|${UI_KITTEN_SCOPE})/)`;
};

interface PatternPatch {
  readonly patterns: string[];
  readonly edits: Array<{ before: string; after: string }>;
  readonly unrecognised: string[];
}

const patchPatterns = (patterns: readonly string[]): PatternPatch => {
  const next: string[] = [];
  const edits: Array<{ before: string; after: string }> = [];
  const unrecognised: string[] = [];

  let anyAlreadyAllows = false;

  for (const pattern of patterns) {
    if (pattern.includes(UI_KITTEN_SCOPE)) {
      anyAlreadyAllows = true;
      next.push(pattern);
      continue;
    }

    const patched = patchPattern(pattern);
    if (patched) {
      edits.push({ before: pattern, after: patched });
      next.push(patched);
      continue;
    }

    unrecognised.push(pattern);
    next.push(pattern);
  }

  return { patterns: next, edits: anyAlreadyAllows && edits.length === 0 ? [] : edits, unrecognised };
};

const findConfigFile = (root: string): string | null => {
  for (const name of CONFIG_FILENAMES) {
    const candidate = path.join(root, name);
    if (fs.existsSync(candidate)) { return candidate; }
  }
  return null;
};

const missingPatternFinding = (ruleId: string, file: string, line: number): Finding => {
  return {
    ruleId,
    file,
    line,
    excerpt: 'transformIgnorePatterns',
    reason: 'v6 ships ES modules only — `main` is `./lib/module/index.js` and there is no CommonJS build — so Jest must transform `@ui-kitten` instead of ignoring it. This config has no `transformIgnorePatterns`, so the preset default applies, and overriding it wholesale could stop transforming packages the preset allows.',
    fix: `Add:\n\n    transformIgnorePatterns: [\n      '${RECOMMENDED_PATTERN}',\n    ]\n\nIf your preset already lists packages beyond React Native, extend its pattern instead of replacing it.`,
  };
};

/**
 * Makes Jest transform `@ui-kitten` packages, which v6 requires because it publishes ESM only.
 *
 * Handles the three places the setting lives: a `jest.config.{js,cjs,mjs,ts}` module, a
 * `jest.config.json`, and a `jest` block inside `package.json`.
 */
export const jestTransformIgnore: ProjectRule = {
  kind: 'project',
  id: 'jest-transform-ignore',
  description: 'Let Jest transform @ui-kitten packages, which v6 publishes as ESM only',
  mode: RuleMode.Automate,
  docsAnchor: 'jest-and-the-esm-only-build',
  manualAction: 'If your Jest config sets `transformIgnorePatterns` in a form the codemod did not recognise, add `@ui-kitten` to its allow-list by hand — v6 is ESM-only and Jest must transform it.',

  apply(context: RuleContext): ProjectRuleResult {
    const edits: Edit[] = [];
    const findings: Finding[] = [];
    const writes = new Map<string, string>();

    const record = (file: string, line: number, patched: PatternPatch): void => {
      for (const edit of patched.edits) {
        edits.push({ ruleId: this.id, file, line, before: edit.before, after: edit.after });
      }
      for (const pattern of patched.unrecognised) {
        findings.push({
          ruleId: this.id,
          file,
          line,
          excerpt: pattern,
          reason: 'This `transformIgnorePatterns` entry is not the recognised `node_modules/(?!(a|b)/)` shape. Editing it blind risks silently excluding a package you rely on.',
          fix: `Add \`@ui-kitten\` to the pattern's allow-list by hand. A working equivalent is:\n\n    '${RECOMMENDED_PATTERN}'`,
        });
      }
    };

    /* --------------------------------------------------------- jest.config */

    const configPath = findConfigFile(context.root);

    if (configPath && configPath.endsWith('.json')) {
      const source = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(source) as { transformIgnorePatterns?: string[] };
      const relativePath = context.relative(configPath);

      if (!config.transformIgnorePatterns) {
        findings.push(missingPatternFinding(this.id, relativePath, 1));
      } else {
        const patched = patchPatterns(config.transformIgnorePatterns);
        record(relativePath, 1, patched);
        if (patched.edits.length > 0) {
          config.transformIgnorePatterns = patched.patterns;
          writes.set(configPath, stringifyLike(config, source));
        }
      }
    } else if (configPath) {
      const file = context.project.addSourceFileAtPathIfExists(configPath);
      if (file) {
        const patched = patchSourceFile(file, this.id, context.relative(configPath), record);
        if (patched === 'missing') {
          findings.push(missingPatternFinding(this.id, context.relative(configPath), 1));
        }
      }
    }

    /* ------------------------------------------------- package.json "jest" */

    const packageJsonPath = path.join(context.root, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const source = readProjectFile(
        context.pendingWrites,
        packageJsonPath,
        (p) => fs.readFileSync(p, 'utf8'),
      );
      const manifest = JSON.parse(source) as { jest?: { transformIgnorePatterns?: string[] } };

      if (manifest.jest) {
        const relativePath = context.relative(packageJsonPath);

        if (!manifest.jest.transformIgnorePatterns) {
          findings.push(missingPatternFinding(this.id, relativePath, 1));
        } else {
          const patched = patchPatterns(manifest.jest.transformIgnorePatterns);
          record(relativePath, 1, patched);
          if (patched.edits.length > 0) {
            manifest.jest.transformIgnorePatterns = patched.patterns;
            // `source` already carries the dependency rule's changes when that rule ran first, so
            // re-serialising the parsed manifest keeps both sets of edits.
            writes.set(packageJsonPath, stringifyLike(manifest, source));
          }
        }
      }
    }

    return { edits, findings, writes };
  },
};

type RecordFn = (file: string, line: number, patched: PatternPatch) => void;

/**
 * Patches `transformIgnorePatterns` inside a JS/TS Jest config.
 *
 * Returns `'missing'` when the config has no such property, so the caller can report the exact
 * addition instead of inventing one.
 */
const patchSourceFile = (file: SourceFile, ruleId: string, relativePath: string, record: RecordFn): 'patched' | 'missing' => {
  const assignment = file.getDescendantsOfKind(SyntaxKind.PropertyAssignment)
    .find((candidate) => candidate.getName().replace(/['"]/g, '') === 'transformIgnorePatterns');

  if (!assignment) { return 'missing'; }

  const initializer = assignment.getInitializer();
  if (!initializer || !Node.isArrayLiteralExpression(initializer)) { return 'missing'; }

  const elements = initializer.getElements();
  const patterns = elements
    .filter((element) => Node.isStringLiteral(element))
    .map((element) => element.getLiteralValue());

  const patched = patchPatterns(patterns);
  record(relativePath, initializer.getStartLineNumber(), patched);

  if (patched.edits.length === 0) { return 'patched'; }

  let index = 0;
  for (const element of elements) {
    if (!Node.isStringLiteral(element)) { continue; }
    element.setLiteralValue(patched.patterns[index]);
    index += 1;
  }

  return 'patched';
};
