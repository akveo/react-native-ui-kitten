/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { renderJson, renderMarkdown, renderRuleList } from './report';
import { run, unknownRuleIds, writeChanges, type RunOptions } from './runner';

const DEFAULT_REPORT = 'ui-kitten-v6-migration-report.md';

export interface CliOptions extends RunOptions {
  readonly write: boolean;
  readonly force: boolean;
  readonly report: string | null;
  readonly reportJson: string | null;
  readonly failOnManual: boolean;
  readonly verbose: boolean;
}

const USAGE = `
ui-kitten-codemod — upgrade an app from UI Kitten v5 to v6

  ui-kitten-codemod [path]              dry run over [path] (default: the current directory)
  ui-kitten-codemod [path] --write      apply the changes

Options
  --write                  apply changes; requires a clean git tree unless --force
  --force                  skip the git checks
  --rules a,b,c            run only these rules
  --skip a,b,c             run everything except these rules
  --include <glob>         extra file glob (repeatable)
  --exclude <glob>         extra exclusion glob (repeatable)
  --tsconfig <path>        tsconfig to seed file discovery from
  --target <tag|version>   npm dist-tag to migrate towards (default: latest, falling back to beta)
  --offline                skip the registry lookup and use the built-in version table
  --report <path>          markdown report path (default: ${DEFAULT_REPORT})
  --report-json <path>     also write the report as JSON
  --no-report              do not write a report file
  --fail-on-manual         exit 2 when anything needs a human, for CI
  --list-rules             print every rule and what it does, then exit
  --verbose
  -h, --help
`.trimStart();

export const parseArgs = (argv: readonly string[]): CliOptions | { help: true } | { listRules: true } => {
  const positional: string[] = [];
  const include: string[] = [];
  const exclude: string[] = [];

  let write = false;
  let force = false;
  let only: string[] = [];
  let skip: string[] = [];
  let tsconfig: string | undefined;
  let tag: string | undefined;
  let offline = false;
  let report: string | null = DEFAULT_REPORT;
  let reportJson: string | null = null;
  let failOnManual = false;
  let verbose = false;

  const list = (value: string): string[] => value.split(',').map((s) => s.trim()).filter(Boolean);

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = (): string => {
      const value = argv[i + 1];
      if (value === undefined) { throw new Error(`${arg} needs a value`); }
      i += 1;
      return value;
    };

    switch (arg) {
      case '-h':
      case '--help': return { help: true };
      case '--list-rules': return { listRules: true };
      case '--write': write = true; break;
      case '--force': force = true; break;
      case '--rules': only = list(next()); break;
      case '--skip': skip = list(next()); break;
      case '--include': include.push(next()); break;
      case '--exclude': exclude.push(next()); break;
      case '--tsconfig': tsconfig = next(); break;
      case '--target': tag = next(); break;
      case '--offline': offline = true; break;
      case '--report': report = next(); break;
      case '--report-json': reportJson = next(); break;
      case '--no-report': report = null; break;
      case '--fail-on-manual': failOnManual = true; break;
      case '--verbose': verbose = true; break;
      default:
        if (arg.startsWith('-')) { throw new Error(`unknown option: ${arg}`); }
        positional.push(arg);
    }
  }

  return {
    root: positional[0] ?? process.cwd(),
    only,
    skip,
    include,
    exclude,
    tsconfig,
    tag,
    offline,
    write,
    force,
    report,
    reportJson,
    failOnManual,
    verbose,
  };
};

/**
 * Refuses to write over uncommitted work.
 *
 * The check runs before a single file is read, so a refusal always leaves the tree exactly as it
 * was. "Just trust git" is not good enough here: the whole premise is that someone is mid-upgrade,
 * which is precisely when a working tree is dirty.
 */
const assertSafeToWrite = (root: string, force: boolean): string | null => {
  if (force) { return null; }

  const git = (args: string[]): string | null => {
    try {
      return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    } catch {
      return null;
    }
  };

  if (git(['rev-parse', '--is-inside-work-tree']) === null) {
    return 'not a git repository — re-run with --force if you have another way to undo this';
  }

  const status = git(['status', '--porcelain']);
  if (status === null) { return 'could not read git status — re-run with --force to proceed anyway'; }
  if (status.trim().length > 0) {
    return 'the working tree has uncommitted changes — commit or stash them first, or re-run with --force';
  }

  return null;
};

export const main = (argv: readonly string[]): number => {
  let parsed: ReturnType<typeof parseArgs>;
  try {
    parsed = parseArgs(argv);
  } catch (error) {
    process.stderr.write(`${(error as Error).message}\n\n${USAGE}`);
    return 1;
  }

  if ('help' in parsed) {
    process.stdout.write(USAGE);
    return 0;
  }

  if ('listRules' in parsed) {
    process.stdout.write(`${renderRuleList()}\n`);
    return 0;
  }

  const options = parsed;
  const root = path.resolve(options.root);

  if (!fs.existsSync(root)) {
    process.stderr.write(`no such directory: ${root}\n`);
    return 1;
  }

  const unknown = unknownRuleIds([...(options.only ?? []), ...(options.skip ?? [])]);
  if (unknown.length > 0) {
    process.stderr.write(`unknown rule(s): ${unknown.join(', ')}\nRun --list-rules to see them all.\n`);
    return 1;
  }

  if (options.write) {
    const refusal = assertSafeToWrite(root, options.force);
    if (refusal) {
      process.stderr.write(`refusing to write: ${refusal}\n`);
      return 1;
    }
  }

  const result = run(options);

  if (options.write) { writeChanges(result.changes); }

  const reportInput = { ...result, written: options.write, root };

  if (options.report) {
    const reportPath = path.resolve(root, options.report);
    fs.writeFileSync(reportPath, renderMarkdown(reportInput), 'utf8');
    process.stdout.write(`report: ${reportPath}\n`);
  }

  if (options.reportJson) {
    const jsonPath = path.resolve(root, options.reportJson);
    fs.writeFileSync(jsonPath, renderJson(reportInput), 'utf8');
    process.stdout.write(`report (json): ${jsonPath}\n`);
  }

  const verb = options.write ? 'changed' : 'would change';
  process.stdout.write(
    `${result.filesScanned} files scanned · ${result.changes.size} ${verb} · ${result.findings.length} need a human\n`,
  );

  if (options.verbose) {
    for (const edit of result.edits) {
      process.stdout.write(`  ${edit.file}:${edit.line}  ${edit.ruleId}: ${edit.before} -> ${edit.after}\n`);
    }
  }

  if (!options.write && result.changes.size > 0) {
    process.stdout.write('Dry run — nothing was written. Re-run with --write to apply.\n');
  }

  if (options.failOnManual && result.findings.length > 0) { return 2; }

  return 0;
};
