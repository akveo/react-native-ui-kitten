/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as fs from 'fs';
import * as path from 'path';
import { manualChecklist } from '../report';
import { ALL_RULES } from '../rules';

const REPO = path.resolve(__dirname, '../../../..');
const GUIDE = path.join(REPO, 'website/docs/migration/5x-to-6.md');
const README = path.join(REPO, 'src/codemod/README.md');

/**
 * Docusaurus honours an explicit `{#custom-id}` suffix; otherwise it lowercases the heading, drops
 * anything that is not a word character, space or hyphen, and joins the rest with hyphens.
 *
 * The explicit form is what the `@eva-design/*` headings use, because the derived anchor for
 * `@eva-design/dss moved` would be `eva-designdss-moved` — the slash vanishes rather than becoming
 * a hyphen, which is not something anyone should have to guess.
 */
const anchorOf = (heading: string): string => {
  const explicit = /\{#([^}]+)\}\s*$/.exec(heading);
  if (explicit) { return explicit[1]; }

  return heading
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

const guideAnchors = (): Set<string> => {
  const source = fs.readFileSync(GUIDE, 'utf8');
  const anchors = new Set<string>();

  for (const line of source.split('\n')) {
    const match = /^#{2,6}\s+(.*)$/.exec(line);
    if (match) { anchors.add(anchorOf(match[1])); }
  }

  return anchors;
};

describe('migration guide', () => {

  it('exists', () => {
    expect(fs.existsSync(GUIDE)).toBe(true);
  });

  it('has a section for every rule\'s docsAnchor', () => {
    const anchors = guideAnchors();
    const missing = ALL_RULES
      .filter((rule) => !anchors.has(rule.docsAnchor))
      .map((rule) => `${rule.id} -> #${rule.docsAnchor}`);

    // Every report links a finding to one of these anchors; a missing one is a 404 for the user.
    expect(missing).toEqual([]);
  });
});

describe('README', () => {

  it('carries the generated manual checklist verbatim', () => {
    const readme = fs.readFileSync(README, 'utf8');

    // The report renders the same list. If they drift, the tool and its documentation disagree
    // about when a migration is finished.
    for (const item of manualChecklist()) {
      expect(readme).toContain(item);
    }
  });

  it('documents every rule id', () => {
    const readme = fs.readFileSync(README, 'utf8');
    const undocumented = ALL_RULES
      .filter((rule) => !readme.includes(rule.id))
      .map((rule) => rule.id);

    expect(undocumented).toEqual([]);
  });
});
