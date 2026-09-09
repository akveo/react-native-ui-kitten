/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as fs from 'fs';
import * as path from 'path';
import { ALL_RULES, SOURCE_RULES, ruleById } from '../rules';
import { runSingleRule, runSourcePipeline } from '../testing';
import { RuleMode, type SourceRule } from '../types';

const FIXTURES = path.resolve(__dirname, '../../__testfixtures__');

const COMPOSITE_DIR = '_all';
const UNCHANGED_DIR = '_unchanged';
const PROJECT_DIR = '_project';

const read = (file: string): string => fs.readFileSync(file, 'utf8');

const directories = (): string[] => {
  return fs.readdirSync(FIXTURES)
    .filter((entry) => fs.statSync(path.join(FIXTURES, entry)).isDirectory())
    .sort();
};

const inputsIn = (dir: string): string[] => {
  return fs.readdirSync(path.join(FIXTURES, dir))
    .filter((entry) => entry.includes('.input.'))
    .sort();
};

/** Extra files a fixture directory provides, e.g. the local barrel `reexport-barrel` imports. */
const siblingsIn = (dir: string): Record<string, string> => {
  const siblings: Record<string, string> = {};
  for (const entry of fs.readdirSync(path.join(FIXTURES, dir))) {
    if (!entry.startsWith('_') || entry.includes('.input.') || entry.includes('.output.')) { continue; }
    siblings[entry] = read(path.join(FIXTURES, dir, entry));
  }
  return siblings;
};

const sourceRuleDirs = directories()
  .filter((dir) => dir !== COMPOSITE_DIR && dir !== UNCHANGED_DIR && dir !== PROJECT_DIR);

describe('fixtures: every directory maps to a rule', () => {
  it.each(sourceRuleDirs)('%s is a real rule id', (dir) => {
    expect(ruleById(dir)).toBeDefined();
  });

  it('every rule that rewrites code has fixtures', () => {
    const rewriting = ALL_RULES
      .filter((rule) => rule.mode === RuleMode.Automate)
      .filter((rule) => rule.kind === 'source')
      .map((rule) => rule.id);

    // `import-hygiene` is exercised both directly and through the composite fixture.
    expect(sourceRuleDirs).toEqual(expect.arrayContaining(rewriting));
  });

  it('every report-only rule has fixtures', () => {
    const reporting = ALL_RULES
      .filter((rule) => rule.mode === RuleMode.Report)
      .map((rule) => rule.id);

    expect(sourceRuleDirs).toEqual(expect.arrayContaining(reporting));
  });
});

describe('fixtures: each rule produces its recorded output', () => {
  for (const dir of sourceRuleDirs) {
    const rule = ruleById(dir) as SourceRule;
    const siblings = siblingsIn(dir);

    for (const input of inputsIn(dir)) {
      const fileName = input.replace('.input.', '.');
      const source = read(path.join(FIXTURES, dir, input));
      const expected = read(path.join(FIXTURES, dir, input.replace('.input.', '.output.')));

      it(`${dir}/${input}`, () => {
        const { output } = runSingleRule(rule, fileName, source, { siblings });
        expect(output).toEqual(expected);
      });

      it(`${dir}/${input} is idempotent`, () => {
        const { output } = runSingleRule(rule, fileName, expected, { siblings });
        expect(output).toEqual(expected);
      });
    }
  }
});

/**
 * Rules that are *expected* to fire on another rule's fixture, because the fixture deliberately
 * contains an input both of them see. Listing them explicitly keeps the cross-contamination check
 * meaningful instead of loosening it globally.
 */
const COMPOSING_PAIRS: Record<string, string[]> = {
  // `refobject-nullable` is a React 19 rule, not a UI Kitten one: it fires on any
  // `RefObject<T> = createRef()`, which these fixtures contain because that is what v5 code looked
  // like. `useref-null-arg` is the same story for `useRef<T>()`.
  'ref-type-exported': ['useref-null-arg', 'refobject-nullable'],
  'ref-type-generic-keep': ['useref-null-arg', 'refobject-nullable'],
  'ref-type-generic-drop': ['useref-null-arg', 'refobject-nullable'],
  'ref-type-componentref': ['useref-null-arg', 'refobject-nullable'],
  // The refless fixture imports `Modal`/`Tooltip` and holds a ref type for each.
  'ref-unsupported': ['useref-null-arg', 'refobject-nullable'],
  // The eva fixtures import `@eva-design/eva` *and* `@ui-kitten/components`.
  'eva-mapping-import': ['useref-null-arg'],
  'import-hygiene': ['useref-null-arg'],
  // Both of these split `react` across two import declarations, which `import-hygiene` merges.
  'react-text': ['import-hygiene'],
  'useref-null-arg': ['import-hygiene'],
};

describe('fixtures: no rule touches another rule\'s input', () => {
  for (const dir of sourceRuleDirs) {
    const siblings = siblingsIn(dir);

    for (const input of inputsIn(dir)) {
      const fileName = input.replace('.input.', '.');
      const source = read(path.join(FIXTURES, dir, input));

      for (const other of SOURCE_RULES) {
        if (other.id === dir) { continue; }
        // The composite pipeline is where rule interaction is checked; here we only assert that no
        // *unrelated* rule claims this input. Rules that legitimately compose are exempt.
        if (COMPOSING_PAIRS[dir]?.includes(other.id)) { continue; }

        it(`${other.id} leaves ${dir}/${input} alone`, () => {
          const { output } = runSingleRule(other, fileName, source, { siblings });
          expect(output).toEqual(source);
        });
      }
    }
  }
});

describe('fixtures: nothing touches the must-not-change corpus', () => {
  const siblings = siblingsIn(UNCHANGED_DIR);

  for (const input of inputsIn(UNCHANGED_DIR)) {
    const fileName = input.replace('.input.', '.');
    const source = read(path.join(FIXTURES, UNCHANGED_DIR, input));

    for (const rule of SOURCE_RULES) {
      it(`${rule.id} leaves ${input} alone`, () => {
        const { output } = runSingleRule(rule, fileName, source, { siblings });
        expect(output).toEqual(source);
      });
    }

    it(`the whole pipeline leaves ${input} alone`, () => {
      const { output } = runSourcePipeline(SOURCE_RULES, fileName, source, { siblings });
      expect(output).toEqual(source);
    });
  }
});

describe('fixtures: the full pipeline', () => {
  const siblings = siblingsIn(COMPOSITE_DIR);

  for (const input of inputsIn(COMPOSITE_DIR)) {
    const fileName = input.replace('.input.', '.');
    const source = read(path.join(FIXTURES, COMPOSITE_DIR, input));
    const expected = read(path.join(FIXTURES, COMPOSITE_DIR, input.replace('.input.', '.output.')));

    it(`${input}`, () => {
      const { output } = runSourcePipeline(SOURCE_RULES, fileName, source, { siblings });
      expect(output).toEqual(expected);
    });

    it(`${input} is idempotent`, () => {
      const { output } = runSourcePipeline(SOURCE_RULES, fileName, expected, { siblings });
      expect(output).toEqual(expected);
    });
  }
});

describe('fixtures: report-only rules report and never rewrite', () => {
  const reportOnly = ALL_RULES.filter((rule) => rule.mode === RuleMode.Report);

  for (const rule of reportOnly) {
    const dir = rule.id;
    const siblings = siblingsIn(dir);

    for (const input of inputsIn(dir)) {
      const fileName = input.replace('.input.', '.');
      const source = read(path.join(FIXTURES, dir, input));

      it(`${dir}/${input} produces findings and no edits`, () => {
        const { output, result } = runSingleRule(rule as SourceRule, fileName, source, { siblings });

        expect(output).toEqual(source);
        expect(result.edits).toHaveLength(0);
        expect(result.findings.length).toBeGreaterThan(0);

        for (const finding of result.findings) {
          expect(finding.reason.length).toBeGreaterThan(0);
          expect(finding.fix.length).toBeGreaterThan(0);
          expect(finding.line).toBeGreaterThan(0);
        }
      });
    }
  }
});
