/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import type { Project, SourceFile } from 'ts-morph';

/**
 * `Automate` rules rewrite code. `Report` rules never touch a file — they exist because the change
 * they describe alters runtime behaviour, or because the replacement is a restructuring rather than
 * a substitution, and a wrong automatic rewrite is worse than a clear warning.
 */
export enum RuleMode {
  Automate = 'automate',
  Report = 'report',
}

/** Something the codemod refuses to change, surfaced to the user with everything needed to act. */
export interface Finding {
  readonly ruleId: string;
  /** Path relative to the migration root. */
  readonly file: string;
  readonly line: number;
  readonly excerpt: string;
  /** Why this was not automated. */
  readonly reason: string;
  /** What the user has to do instead. */
  readonly fix: string;
}

/** One rewritten location, recorded so the report can show what changed and where. */
export interface Edit {
  readonly ruleId: string;
  readonly file: string;
  readonly line: number;
  readonly before: string;
  readonly after: string;
}

export interface RuleResult {
  readonly edits: Edit[];
  readonly findings: Finding[];
}

export const emptyResult = (): RuleResult => {
  return { edits: [], findings: [] };
};

export const mergeResults = (results: RuleResult[]): RuleResult => {
  return {
    edits: results.flatMap((r) => r.edits),
    findings: results.flatMap((r) => r.findings),
  };
};

/** Shared state handed to every rule. */
export interface RuleContext {
  /** Absolute path to the directory being migrated. */
  readonly root: string;
  readonly project: Project;
  /** Resolves an absolute path to one relative to `root`, for reports. */
  relative(absolutePath: string): string;
  /** Package versions resolved from the registry at run time, keyed by package name. */
  readonly targetVersions: ReadonlyMap<string, string>;
  /** Ids of every rule enabled for this run — lets a rule check whether a sibling ran. */
  readonly enabledRuleIds: ReadonlySet<string>;
  /**
   * Every module specifier still imported anywhere in the project *after* the source rules ran.
   *
   * Project rules use this to decide whether a dependency is safe to drop: a package the code no
   * longer mentions can go, one it still imports must stay even if the codemod moved its siblings.
   */
  readonly referencedModules: ReadonlySet<string>;
  /**
   * Identifiers a rewrite may have left unreferenced in the file currently being processed.
   *
   * `ref-type-generic-drop` turns `useRef<Icon<Partial<ImageProps>>>()` into `useRef<IconRef>()`,
   * which can strand the `ImageProps` import it came with. Only names the codemod itself orphaned
   * end up here, so `import-hygiene` never removes an unused import the user already had.
   *
   * Reset by the runner before each file.
   */
  readonly orphanCandidates: Set<string>;
  /**
   * Contents an earlier rule in this run has already decided to write, keyed by absolute path.
   *
   * Two project rules legitimately target `package.json` — one updates dependencies, the other the
   * `jest` block. Without this, whichever runs second reads the untouched file from disk and its
   * write silently discards the first rule's work.
   *
   * Use {@link readProjectFile} rather than `fs.readFileSync` in a project rule.
   */
  readonly pendingWrites: ReadonlyMap<string, string>;
}

/**
 * A rule over TypeScript/JavaScript source. `.js`/`.jsx` files are parsed by the same TypeScript
 * parser, so type-position rules simply find nothing in them while import and JSX rules still fire.
 */
export interface SourceRule {
  readonly kind: 'source';
  readonly id: string;
  readonly description: string;
  readonly mode: RuleMode;
  /** Default-on rules the user can turn off with `--skip`. */
  readonly optional?: boolean;
  /** Anchor in `website/docs/migration/5x-to-6.md`, used for report deep links. */
  readonly docsAnchor: string;
  /** One line for the README / report "what you still have to do by hand" checklist. */
  readonly manualAction?: string;
  apply(file: SourceFile, context: RuleContext): RuleResult;
}

/**
 * A rule over project metadata that is not TypeScript source — `package.json`, a Jest config block.
 * These are edited as text/JSON so formatting and key order survive.
 */
export interface ProjectRule {
  readonly kind: 'project';
  readonly id: string;
  readonly description: string;
  readonly mode: RuleMode;
  readonly optional?: boolean;
  readonly docsAnchor: string;
  readonly manualAction?: string;
  /** Returns the files it wants to write, so the caller can honour dry-run. */
  apply(context: RuleContext): ProjectRuleResult;
}

export interface ProjectRuleResult extends RuleResult {
  /** Absolute path -> new file contents. Empty in dry-run-safe rules that found nothing. */
  readonly writes: ReadonlyMap<string, string>;
}

export type Rule = SourceRule | ProjectRule;

export const emptyProjectResult = (): ProjectRuleResult => {
  return { edits: [], findings: [], writes: new Map() };
};
