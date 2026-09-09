/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as path from 'path';
import { Project, QuoteKind, ScriptTarget } from 'ts-morph';
import { detectQuoteKind } from './imports';
import { ALL_RULES } from './rules';
import type { RuleContext, RuleResult, SourceRule } from './types';
import { fallbackVersions } from './versions';

/**
 * Runs a single source rule over a single file, in memory.
 *
 * Used by the fixture suite, which has to be able to attribute a change to exactly one rule — both
 * to check that the rule does what it claims and, just as importantly, that every *other* rule
 * leaves the same input alone.
 */
export interface SingleRuleRun {
  readonly output: string;
  readonly result: RuleResult;
}

export interface SingleRuleOptions {
  /** Extra files to add to the project, e.g. a local barrel the fixture imports from. */
  readonly siblings?: Readonly<Record<string, string>>;
  readonly enabledRuleIds?: readonly string[];
}

export const runSingleRule = (
  rule: SourceRule,
  fileName: string,
  source: string,
  options: SingleRuleOptions = {},
): SingleRuleRun => {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      allowJs: true,
      checkJs: false,
      jsx: 1 as never,
      target: ScriptTarget.ESNext,
      noEmit: true,
    },
    manipulationSettings: { quoteKind: QuoteKind.Single },
  });

  const root = '/app';

  for (const [name, contents] of Object.entries(options.siblings ?? {})) {
    project.createSourceFile(path.posix.join(root, name), contents);
  }

  const file = project.createSourceFile(path.posix.join(root, fileName), source);
  project.manipulationSettings.set({ quoteKind: detectQuoteKind(file) });

  const context: RuleContext = {
    root,
    project,
    relative: (absolutePath: string) => path.posix.relative(root, absolutePath),
    targetVersions: fallbackVersions(),
    enabledRuleIds: new Set(options.enabledRuleIds ?? ALL_RULES.map((r) => r.id)),
    referencedModules: new Set<string>(),
    orphanCandidates: new Set<string>(),
    pendingWrites: new Map<string, string>(),
  };

  const result = rule.apply(file, context);

  return { output: file.getFullText(), result };
};

/**
 * Runs the full source pipeline over one file, in the documented order.
 *
 * Rule interaction is where a codemod actually breaks — `ref-type-generic-drop` feeding
 * `useref-null-arg` feeding `import-hygiene` on a single line is the case that a per-rule test
 * cannot reach.
 */
export const runSourcePipeline = (
  rules: readonly SourceRule[],
  fileName: string,
  source: string,
  options: SingleRuleOptions = {},
): SingleRuleRun => {
  const project = new Project({
    useInMemoryFileSystem: true,
    compilerOptions: {
      allowJs: true,
      checkJs: false,
      jsx: 1 as never,
      target: ScriptTarget.ESNext,
      noEmit: true,
    },
    manipulationSettings: { quoteKind: QuoteKind.Single },
  });

  const root = '/app';

  for (const [name, contents] of Object.entries(options.siblings ?? {})) {
    project.createSourceFile(path.posix.join(root, name), contents);
  }

  const file = project.createSourceFile(path.posix.join(root, fileName), source);
  project.manipulationSettings.set({ quoteKind: detectQuoteKind(file) });

  const orphanCandidates = new Set<string>();

  const context: RuleContext = {
    root,
    project,
    relative: (absolutePath: string) => path.posix.relative(root, absolutePath),
    targetVersions: fallbackVersions(),
    enabledRuleIds: new Set(options.enabledRuleIds ?? ALL_RULES.map((r) => r.id)),
    referencedModules: new Set<string>(),
    orphanCandidates,
    pendingWrites: new Map<string, string>(),
  };

  const edits = [];
  const findings = [];

  for (const rule of rules) {
    const result = rule.apply(file, context);
    edits.push(...result.edits);
    findings.push(...result.findings);
  }

  return { output: file.getFullText(), result: { edits, findings } };
};
