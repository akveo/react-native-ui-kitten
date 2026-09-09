/**
 * Regenerates every `*.output.*` fixture from its `*.input.*` sibling.
 *
 * The outputs are checked in and reviewed by hand — this script exists so that they are the
 * codemod's real output rather than someone's recollection of it, which is how fixture suites end
 * up asserting a formatting detail nobody intended.
 *
 * Usage (after `yarn build`):
 *   node src/codemod/scripts/record-fixtures.cjs
 */

'use strict';

const fs = require('fs');
const path = require('path');

const CODEMOD = path.resolve(__dirname, '..');
const FIXTURES = path.join(CODEMOD, '__testfixtures__');

const { runSingleRule, runSourcePipeline } = require(path.join(CODEMOD, 'lib/commonjs/src/testing'));
const { SOURCE_RULES, ruleById } = require(path.join(CODEMOD, 'lib/commonjs/src/rules'));

const siblingsFor = (dir) => {
  const siblings = {};
  for (const entry of fs.readdirSync(dir)) {
    if (!entry.startsWith('_') || entry.includes('.input.') || entry.includes('.output.')) { continue; }
    siblings[entry] = fs.readFileSync(path.join(dir, entry), 'utf8');
  }
  return siblings;
};

let written = 0;

for (const ruleDir of fs.readdirSync(FIXTURES).sort()) {
  const dir = path.join(FIXTURES, ruleDir);
  if (!fs.statSync(dir).isDirectory()) { continue; }
  if (ruleDir === '_project' || ruleDir === '_unchanged') { continue; }

  const isComposite = ruleDir === '_all';
  const rule = isComposite ? null : ruleById(ruleDir);
  if (!isComposite && !rule) {
    throw new Error(`__testfixtures__/${ruleDir} does not match any rule id`);
  }

  const siblings = siblingsFor(dir);

  for (const entry of fs.readdirSync(dir).sort()) {
    if (!entry.includes('.input.')) { continue; }

    const source = fs.readFileSync(path.join(dir, entry), 'utf8');
    const run = isComposite
      ? runSourcePipeline(SOURCE_RULES, entry.replace('.input.', '.'), source, { siblings })
      : runSingleRule(rule, entry.replace('.input.', '.'), source, { siblings });

    const outputPath = path.join(dir, entry.replace('.input.', '.output.'));
    fs.writeFileSync(outputPath, run.output, 'utf8');
    written += 1;

    const changed = run.output !== source;
    console.log(`${ruleDir}/${entry}  ${changed ? 'rewritten' : 'unchanged'}  ${run.result.findings.length} finding(s)`);
  }
}

console.log(`\nwrote ${written} output fixtures`);
