/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as fs from 'fs';
import * as path from 'path';
import { readProjectFile, stringifyLike } from '../json';
import {
  RuleMode,
  type Edit,
  type Finding,
  type ProjectRule,
  type ProjectRuleResult,
  type RuleContext,
} from '../types';

/** Packages whose v5 range must be bumped, in the order they should appear. */
const UI_KITTEN_PACKAGES: readonly string[] = [
  '@ui-kitten/components',
  '@ui-kitten/eva',
  '@ui-kitten/material',
  '@ui-kitten/eva-icons',
  '@ui-kitten/metro-config',
  '@ui-kitten/date-fns',
  '@ui-kitten/moment',
];

/** Mapping packages the codemod may introduce, keyed by the Eva Design package they replace. */
const MAPPING_REPLACEMENTS: Readonly<Record<string, string>> = {
  '@eva-design/eva': '@ui-kitten/eva',
  '@eva-design/material': '@ui-kitten/material',
};

/** Packages v6 no longer needs, provided nothing in the app still imports them. */
const RETIRED_PACKAGES: readonly string[] = [
  '@eva-design/dss',
  '@eva-design/processor',
];

const DEPENDENCY_FIELDS = ['dependencies', 'devDependencies'] as const;

type PackageJson = Record<string, unknown> & {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  scripts?: Record<string, string>;
};

/**
 * Brings the app's `package.json` in line with v6.
 *
 * Target ranges are resolved from the registry when the codemod runs rather than baked in, so the
 * tool does not go stale the moment a new beta ships. `@ui-kitten/eva` is only added when the
 * mapping import rewrite is actually enabled, and `@eva-design/*` entries are only removed once
 * nothing in the source imports them — a dependency the code still uses is never dropped.
 */
export const packageDependencies: ProjectRule = {
  kind: 'project',
  id: 'pkg-deps',
  description: 'Update @ui-kitten dependency ranges and retire packages v6 replaced',
  mode: RuleMode.Automate,
  docsAnchor: 'dependencies',

  apply(context: RuleContext): ProjectRuleResult {
    const packageJsonPath = path.join(context.root, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return { edits: [], findings: [], writes: new Map() };
    }

    const source = readProjectFile(
      context.pendingWrites,
      packageJsonPath,
      (p) => fs.readFileSync(p, 'utf8'),
    );

    let manifest: PackageJson;
    try {
      manifest = JSON.parse(source) as PackageJson;
    } catch (error) {
      return {
        edits: [],
        writes: new Map(),
        findings: [{
          ruleId: this.id,
          file: 'package.json',
          line: 1,
          excerpt: 'package.json',
          reason: `package.json could not be parsed: ${(error as Error).message}`,
          fix: 'Fix the JSON syntax and re-run, or update the dependency ranges by hand.',
        }],
      };
    }

    const relativePath = context.relative(packageJsonPath);
    const edits: Edit[] = [];
    const findings: Finding[] = [];

    const rangeFor = (name: string): string | null => {
      const version = context.targetVersions.get(name);
      return version ? `^${version}` : null;
    };

    const mappingRewriteEnabled = context.enabledRuleIds.has('eva-mapping-import');

    for (const field of DEPENDENCY_FIELDS) {
      const deps = manifest[field];
      if (!deps) { continue; }

      // Bump every UI Kitten package the app already declares.
      for (const name of UI_KITTEN_PACKAGES) {
        if (deps[name] === undefined) { continue; }
        const range = rangeFor(name);
        if (!range || deps[name] === range) { continue; }

        edits.push({
          ruleId: this.id,
          file: relativePath,
          line: 0,
          before: `"${name}": "${deps[name]}"`,
          after: `"${name}": "${range}"`,
        });
        deps[name] = range;
      }

      // Swap the Eva Design mapping packages for their UI Kitten equivalents.
      for (const [from, to] of Object.entries(MAPPING_REPLACEMENTS)) {
        if (deps[from] === undefined) { continue; }

        if (!mappingRewriteEnabled) {
          findings.push({
            ruleId: this.id,
            file: relativePath,
            line: 0,
            excerpt: `"${from}": "${deps[from]}"`,
            reason: '`eva-mapping-import` was skipped, so the code still imports this package and the dependency was left in place.',
            fix: `Keep \`${from}\` if you intend to stay on the Eva Design packages. It renders identically under v6, but \`@ui-kitten/metro-config\` will not accept it as an \`evaPackage\`.`,
          });
          continue;
        }

        const range = rangeFor(to);
        if (!range) { continue; }

        edits.push({
          ruleId: this.id,
          file: relativePath,
          line: 0,
          before: `"${from}": "${deps[from]}"`,
          after: `"${to}": "${range}"`,
        });

        delete deps[from];
        deps[to] = range;
      }

      // Drop packages v6 absorbed, but only when nothing imports them any more.
      for (const name of RETIRED_PACKAGES) {
        if (deps[name] === undefined) { continue; }
        if (context.referencedModules.has(name)) { continue; }

        edits.push({
          ruleId: this.id,
          file: relativePath,
          line: 0,
          before: `"${name}": "${deps[name]}"`,
          after: '(removed)',
        });
        delete deps[name];
      }
    }

    // `ui-kitten bootstrap @eva-design/eva` in a script hits the same allow-list as metro.config.
    if (manifest.scripts && mappingRewriteEnabled) {
      for (const [name, command] of Object.entries(manifest.scripts)) {
        let updated = command;
        for (const [from, to] of Object.entries(MAPPING_REPLACEMENTS)) {
          updated = updated.split(from).join(to);
        }
        if (updated === command) { continue; }

        edits.push({
          ruleId: this.id,
          file: relativePath,
          line: 0,
          before: `"${name}": "${command}"`,
          after: `"${name}": "${updated}"`,
        });
        manifest.scripts[name] = updated;
      }
    }

    // v6 declares react, react-native and react-native-svg as peers; v5 declared only the last, as
    // `*`. Silence about a missing peer is worse here than a note, but adding a version to someone
    // else's app is not the codemod's call.
    const declared = {
      ...(manifest.dependencies ?? {}),
      ...(manifest.devDependencies ?? {}),
    };
    if (declared['@ui-kitten/components'] !== undefined && declared['react-native-svg'] === undefined) {
      findings.push({
        ruleId: this.id,
        file: relativePath,
        line: 0,
        excerpt: '"@ui-kitten/components"',
        reason: 'v6 declares `react-native-svg >=13.0.0` as a peer dependency; your package.json does not list it.',
        fix: 'Install a matching `react-native-svg` (Expo users should use `npx expo install react-native-svg` so the version matches the SDK).',
      });
    }

    if (edits.length === 0) {
      return { edits, findings, writes: new Map() };
    }

    return {
      edits,
      findings,
      writes: new Map([[packageJsonPath, stringifyLike(manifest, source)]]),
    };
  },
};
