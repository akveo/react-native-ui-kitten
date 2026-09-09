/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import type { SourceFile } from 'ts-morph';
import { EXPORTED_REF, EXPORTED_REF_DROP_ARGS, EXPORTED_REF_GENERIC } from '../componentMap';
import {
  hasBlankLineAfterImports,
  mergeDuplicateImports,
  removeOrphanedNamedImports,
  removeOrphanedNamedImportsAnywhere,
  restoreBlankLineAfterImports,
} from '../imports';
import { RuleMode, type Edit, type RuleContext, type RuleResult, type SourceRule } from '../types';
import { UI_KITTEN_COMPONENTS } from '../uiKittenScope';

/** Modules the other rules add to or retarget, and which can therefore end up duplicated. */
const MERGE_TARGETS: readonly string[] = [
  UI_KITTEN_COMPONENTS,
  '@ui-kitten/processor',
  '@ui-kitten/eva',
  '@ui-kitten/material',
  'react',
];

/**
 * Component names that can be left unreferenced by a ref rewrite.
 *
 * Only these are candidates for removal. A file importing `Button` purely for JSX keeps it, and an
 * unused import the user already had is none of the codemod's business — narrowing the candidate
 * set is what keeps this rule from turning into an unsolicited linter.
 *
 * `component-ref` targets are deliberately excluded: `React.ComponentRef<typeof Button>` still
 * references `Button` as a value, so the import must stay.
 */
const ORPHAN_CANDIDATES: ReadonlySet<string> = new Set([
  ...Object.keys(EXPORTED_REF),
  ...Object.keys(EXPORTED_REF_GENERIC),
  ...Object.keys(EXPORTED_REF_DROP_ARGS),
]);

/**
 * Runs after every other source rule and tidies up what they left behind: one import declaration
 * per module, and no specifier left pointing at nothing.
 */
export const importHygiene: SourceRule = {
  kind: 'source',
  id: 'import-hygiene',
  description: 'Merge duplicate imports and drop specifiers the rewrites orphaned',
  mode: RuleMode.Automate,
  docsAnchor: 'ref-types',

  apply(file: SourceFile, context: RuleContext): RuleResult {
    const edits: Edit[] = [];
    const relativePath = context.relative(file.getFilePath());
    const hadBlankLine = hasBlankLineAfterImports(file);

    for (const moduleSpecifier of MERGE_TARGETS) {
      if (mergeDuplicateImports(file, moduleSpecifier)) {
        edits.push({
          ruleId: this.id,
          file: relativePath,
          line: 1,
          before: `two or more imports of '${moduleSpecifier}'`,
          after: `a single import of '${moduleSpecifier}'`,
        });
      }
    }

    const removed = removeOrphanedNamedImports(file, UI_KITTEN_COMPONENTS, ORPHAN_CANDIDATES);
    for (const name of removed) {
      edits.push({
        ruleId: this.id,
        file: relativePath,
        line: 1,
        before: `import { ${name} } from '${UI_KITTEN_COMPONENTS}'`,
        after: '(removed — nothing references it after the rewrite)',
      });
    }

    // Names stranded by a discarded type argument, wherever they were imported from.
    for (const orphan of removeOrphanedNamedImportsAnywhere(file, context.orphanCandidates)) {
      edits.push({
        ruleId: this.id,
        file: relativePath,
        line: 1,
        before: `import { ${orphan.name} } from '${orphan.moduleSpecifier}'`,
        after: '(removed — its only use was a type argument the rewrite discarded)',
      });
    }

    if (hadBlankLine && edits.length > 0) { restoreBlankLineAfterImports(file); }

    return { edits, findings: [] };
  },
};
