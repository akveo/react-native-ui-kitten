/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ALL_RULES, ruleById } from './rules';
import type { RunResult } from './runner';
import { RuleMode, type Edit, type Finding } from './types';

const DOCS_BASE = 'https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6';

/**
 * The "what you still have to do by hand" checklist.
 *
 * Generated from rule metadata so the README and the report cannot drift apart: a rule that gains
 * or loses a `manualAction` changes both at once.
 */
export const manualChecklist = (): string[] => {
  return ALL_RULES
    .filter((rule) => rule.manualAction !== undefined)
    .map((rule) => `${rule.manualAction} (\`${rule.id}\`)`);
};

const groupBy = <T, K extends string>(items: readonly T[], key: (item: T) => K): Map<K, T[]> => {
  const grouped = new Map<K, T[]>();
  for (const item of items) {
    const k = key(item);
    const bucket = grouped.get(k);
    if (bucket) { bucket.push(item); } else { grouped.set(k, [item]); }
  }
  return grouped;
};

const editsTable = (edits: readonly Edit[]): string => {
  if (edits.length === 0) { return '_Nothing to rewrite._\n'; }

  const byRule = groupBy(edits, (edit) => edit.ruleId);

  const rows = [...byRule.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .map(([ruleId, ruleEdits]) => {
      const files = new Set(ruleEdits.map((edit) => edit.file)).size;
      return `| \`${ruleId}\` | ${files} | ${ruleEdits.length} |`;
    });

  return [
    '| rule | files | changes |',
    '| --- | ---: | ---: |',
    ...rows,
    '',
  ].join('\n');
};

const findingSection = (finding: Finding): string => {
  const rule = ruleById(finding.ruleId);
  const anchor = rule ? `${DOCS_BASE}#${rule.docsAnchor}` : DOCS_BASE;

  return [
    `### \`${finding.ruleId}\` · ${finding.file}:${finding.line}`,
    '',
    '```',
    finding.excerpt,
    '```',
    '',
    finding.reason,
    '',
    `**What to do:** ${finding.fix}`,
    '',
    `→ ${anchor}`,
    '',
  ].join('\n');
};

export interface ReportInput extends RunResult {
  /** Whether the run actually wrote the changes, or only described them. */
  readonly written: boolean;
  readonly root: string;
}

export const renderMarkdown = (input: ReportInput): string => {
  const changedFiles = input.changes.size;
  const skipped = ALL_RULES
    .filter((rule) => !input.rulesRun.includes(rule.id))
    .map((rule) => rule.id);

  const lines: string[] = [
    '# UI Kitten v5 → v6 migration report',
    '',
    `${input.filesScanned} files scanned · ${changedFiles} files ${input.written ? 'changed' : 'would change'} · ${input.findings.length} items need you`,
    '',
  ];

  if (!input.written) {
    lines.push(
      '> This was a dry run. Nothing on disk changed. Re-run with `--write` to apply.',
      '',
    );
  }

  if (skipped.length > 0) {
    lines.push(`Rules not run this time: ${skipped.map((id) => `\`${id}\``).join(', ')}.`, '');
  }

  lines.push('## Automated', '', editsTable(input.edits));

  if (input.findings.length === 0) {
    lines.push(
      '## Needs a human',
      '',
      'Nothing — every change the codemod found was one it could make safely.',
      '',
    );
  } else {
    lines.push(`## Needs a human (${input.findings.length})`, '');

    const byRule = groupBy(input.findings, (finding) => finding.ruleId);
    for (const [, ruleFindings] of byRule) {
      for (const finding of ruleFindings) { lines.push(findingSection(finding)); }
    }
  }

  lines.push(
    '## Checklist',
    '',
    'The codemod cannot do any of the following. This list is the same one in the README, generated',
    'from the rules themselves.',
    '',
    ...manualChecklist().map((item) => `- [ ] ${item}`),
    '',
    '## What the codemod deliberately left alone',
    '',
    '- `AutocompleteItem`, `DrawerGroup`, `IconRegistry`, `MenuGroup` and `SelectGroup` are still',
    '  classes in v6, so `useRef<MenuGroup>()` remains valid and was not touched.',
    '- `ThemeType` did not move. It comes from `@ui-kitten/components` in both v5 and v6.',
    '- `withStyles`, `StyledComponentProps` and `EvaProp` are unchanged — only the `styled`',
    '  decorator was removed.',
    '- `Button`, `Select` and `Datepicker` accepting `string | number` is not a migration item: v5',
    '  already typed those props as `React.ReactText`, which *was* `string | number`.',
    '',
  );

  return lines.join('\n');
};

export interface JsonReport {
  readonly filesScanned: number;
  readonly filesChanged: number;
  readonly written: boolean;
  readonly rulesRun: readonly string[];
  readonly edits: readonly Edit[];
  readonly findings: ReadonlyArray<Finding & { docs: string }>;
  readonly checklist: readonly string[];
}

export const renderJson = (input: ReportInput): string => {
  const report: JsonReport = {
    filesScanned: input.filesScanned,
    filesChanged: input.changes.size,
    written: input.written,
    rulesRun: input.rulesRun,
    edits: input.edits,
    findings: input.findings.map((finding) => {
      const rule = ruleById(finding.ruleId);
      return { ...finding, docs: rule ? `${DOCS_BASE}#${rule.docsAnchor}` : DOCS_BASE };
    }),
    checklist: manualChecklist(),
  };

  return `${JSON.stringify(report, null, 2)}\n`;
};

/** One line per rule, for `--list-rules`. */
export const renderRuleList = (): string => {
  const width = Math.max(...ALL_RULES.map((rule) => rule.id.length));

  return ALL_RULES.map((rule) => {
    const mode = rule.mode === RuleMode.Automate
      ? (rule.optional ? 'rewrite (skippable)' : 'rewrite')
      : 'report only';
    return `  ${rule.id.padEnd(width)}  ${mode.padEnd(19)}  ${rule.description}`;
  }).join('\n');
};
