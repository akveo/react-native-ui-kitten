/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as fs from 'fs';
import * as path from 'path';
import { Project, QuoteKind, ScriptTarget, type SourceFile } from 'ts-morph';
import { detectQuoteKind } from './imports';
import { moduleSpecifierLiterals } from './moduleSpecifiers';
import { PROJECT_RULES, SOURCE_RULES } from './rules';
import { RuleMode, type Edit, type Finding, type Rule, type RuleContext } from './types';
import { resolveTargetVersions } from './versions';

export interface RunOptions {
  /** Directory to migrate. */
  readonly root: string;
  /** Rule ids to run. Omitted means every non-skipped rule. */
  readonly only?: readonly string[];
  readonly skip?: readonly string[];
  readonly include?: readonly string[];
  readonly exclude?: readonly string[];
  /** Path to a tsconfig, used only to widen the set of files considered. */
  readonly tsconfig?: string;
  /** npm dist-tag or version to migrate towards. */
  readonly tag?: string;
  /** Skip the registry lookup and use the built-in version table. */
  readonly offline?: boolean;
}

export interface RunResult {
  readonly edits: Edit[];
  readonly findings: Finding[];
  /** Absolute path to new contents, for every file the run would change. */
  readonly changes: Map<string, string>;
  readonly filesScanned: number;
  readonly rulesRun: string[];
}

const DEFAULT_INCLUDE: readonly string[] = ['**/*.{ts,tsx,js,jsx,mjs,cjs}'];

/**
 * Directories that either are not app source or are generated from it. Migrating build output is
 * pointless at best, and at worst it produces a diff nobody can review.
 */
const DEFAULT_EXCLUDE: readonly string[] = [
  '**/node_modules/**',
  '**/ios/**',
  '**/android/**',
  '**/.expo/**',
  '**/lib/**',
  '**/dist/**',
  '**/build/**',
  '**/*.d.ts',
];

export const selectRules = (options: RunOptions): Rule[] => {
  const all = [...SOURCE_RULES, ...PROJECT_RULES];

  const only = options.only && options.only.length > 0 ? new Set(options.only) : null;
  const skip = new Set(options.skip ?? []);

  return all.filter((rule) => {
    if (only) { return only.has(rule.id); }
    return !skip.has(rule.id);
  });
};

/** Names of rules the caller asked for that do not exist, so the CLI can fail loudly. */
export const unknownRuleIds = (ids: readonly string[]): string[] => {
  const known = new Set([...SOURCE_RULES, ...PROJECT_RULES].map((rule) => rule.id));
  return ids.filter((id) => !known.has(id));
};

const createProject = (options: RunOptions): Project => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      checkJs: false,
      jsx: 1 as never, // ts.JsxEmit.Preserve — keeps JSX intact in the emitted text
      target: ScriptTarget.ESNext,
      noEmit: true,
    },
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
    manipulationSettings: { quoteKind: QuoteKind.Single },
  });

  const include = options.include && options.include.length > 0 ? options.include : DEFAULT_INCLUDE;
  const exclude = [...DEFAULT_EXCLUDE, ...(options.exclude ?? [])];

  const globs = [
    ...include.map((pattern) => path.join(options.root, pattern)),
    ...exclude.map((pattern) => `!${path.join(options.root, pattern)}`),
  ];

  project.addSourceFilesAtPaths(globs);

  return project;
};

/** Applies one source rule to one file, recording what changed. */
const applySourceRule = (
  rule: Extract<Rule, { kind: 'source' }>,
  file: SourceFile,
  context: RuleContext,
): { edits: Edit[]; findings: Finding[] } => {
  const result = rule.apply(file, context);
  return { edits: [...result.edits], findings: [...result.findings] };
};

export const run = (options: RunOptions): RunResult => {
  const root = path.resolve(options.root);
  const rules = selectRules(options);
  const enabledRuleIds = new Set(rules.map((rule) => rule.id));

  const project = createProject(options);
  const sourceFiles = project.getSourceFiles();

  const originals = new Map<string, string>();
  for (const file of sourceFiles) {
    originals.set(file.getFilePath(), file.getFullText());
  }

  const context: RuleContext = {
    root,
    project,
    relative: (absolutePath: string) => path.relative(root, absolutePath) || path.basename(absolutePath),
    targetVersions: resolveTargetVersions(options.tag ?? 'latest', options.offline ?? false),
    enabledRuleIds,
    // Populated after the source pass; project rules are the only consumers.
    referencedModules: new Set<string>(),
    // Reset per file, below.
    orphanCandidates: new Set<string>(),
    // Threaded through the project-rule loop, below.
    pendingWrites: new Map<string, string>(),
  };

  const edits: Edit[] = [];
  const findings: Finding[] = [];

  const sourceRules = rules.filter((rule): rule is Extract<Rule, { kind: 'source' }> => rule.kind === 'source');

  for (const file of sourceFiles) {
    // Emit new imports in whatever quote style this file already uses.
    project.manipulationSettings.set({ quoteKind: detectQuoteKind(file) });
    // Orphans are per file: a name stranded in one file says nothing about another.
    context.orphanCandidates.clear();

    for (const rule of sourceRules) {
      const result = applySourceRule(rule, file, context);
      edits.push(...result.edits);
      findings.push(...result.findings);
    }
  }

  const referencedModules = new Set<string>();
  for (const file of project.getSourceFiles()) {
    for (const literal of moduleSpecifierLiterals(file)) {
      referencedModules.add(literal.getLiteralValue());
    }
  }

  const changes = new Map<string, string>();
  for (const file of project.getSourceFiles()) {
    const filePath = file.getFilePath();
    const text = file.getFullText();
    if (originals.get(filePath) !== text) { changes.set(filePath, text); }
  }

  // Several project rules can target the same file — `pkg-deps` and `jest-transform-ignore` both
  // edit `package.json`. Each reads what the previous one produced, so neither write is lost.
  const pendingWrites = new Map<string, string>();

  for (const rule of rules) {
    if (rule.kind !== 'project') { continue; }

    const projectContext: RuleContext = { ...context, referencedModules, pendingWrites };
    const result = rule.apply(projectContext);

    edits.push(...result.edits);
    findings.push(...result.findings);

    for (const [filePath, contents] of result.writes) {
      pendingWrites.set(filePath, contents);
      changes.set(filePath, contents);
    }
  }

  // A JS/TS Jest config is edited through ts-morph, so its change shows up in the project, not in
  // the rule's `writes` map.
  for (const file of project.getSourceFiles()) {
    const filePath = file.getFilePath();
    const text = file.getFullText();
    if (originals.has(filePath) && originals.get(filePath) === text) { continue; }
    if (!originals.has(filePath)) { originals.set(filePath, fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''); }
    if (originals.get(filePath) !== text) { changes.set(filePath, text); }
  }

  return {
    edits,
    findings,
    changes,
    filesScanned: sourceFiles.length,
    rulesRun: rules.map((rule) => rule.id),
  };
};

export const writeChanges = (changes: ReadonlyMap<string, string>): void => {
  for (const [filePath, contents] of changes) {
    fs.writeFileSync(filePath, contents, 'utf8');
  }
};

export const automatedRuleIds = (): string[] => {
  return [...SOURCE_RULES, ...PROJECT_RULES]
    .filter((rule) => rule.mode === RuleMode.Automate)
    .map((rule) => rule.id);
};
