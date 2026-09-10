#!/usr/bin/env node
/**
 * Adds explicit `.js` extensions to relative module specifiers in generated `.d.ts` files.
 *
 * react-native-builder-bob marks the ESM declaration output (`lib/typescript/module`) with
 * `{"type":"module"}`, which puts every `.d.ts` in ECMAScript module scope. In that scope,
 * TypeScript's `node16`/`nodenext` resolution rejects extensionless relative imports
 * (TS2834), and `tsc` never rewrites specifiers when emitting declarations. Bob's Babel pass
 * already adds the extensions to the compiled JavaScript; this does the same for the types.
 *
 * Usage: node esm-declaration-extensions.js [directory ...]
 * Defaults to `lib/typescript/module` relative to the current working directory.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULT_DIRECTORY = path.join('lib', 'typescript', 'module');
const DECLARATION_SUFFIX = '.d.ts';
const KNOWN_EXTENSIONS = ['.js', '.mjs', '.cjs', '.json'];

/*
 * Matches the specifier of:
 *   import ... from './x'   export ... from './x'   import './x'   import('./x')
 * with either quote style, as long as the specifier is relative.
 */
const SPECIFIER_PATTERN = /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(['"])(\.{1,2}\/[^'"\n]*)\2/g;

const listDeclarationFiles = (directory) => {
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return listDeclarationFiles(entryPath);
    }

    return entry.isFile() && entry.name.endsWith(DECLARATION_SUFFIX) ? [entryPath] : [];
  });
};

const resolveSpecifier = (fileDirectory, specifier) => {
  if (KNOWN_EXTENSIONS.some((extension) => specifier.endsWith(extension))) {
    return specifier;
  }

  const target = path.resolve(fileDirectory, specifier);

  if (fs.existsSync(`${target}${DECLARATION_SUFFIX}`)) {
    return `${specifier}.js`;
  }

  if (fs.existsSync(path.join(target, `index${DECLARATION_SUFFIX}`))) {
    return `${specifier.replace(/\/$/, '')}/index.js`;
  }

  return null;
};

const rewriteDeclarationFile = (filePath) => {
  const fileDirectory = path.dirname(filePath);
  const source = fs.readFileSync(filePath, 'utf8');
  const unresolved = [];

  const output = source.replace(SPECIFIER_PATTERN, (match, prefix, quote, specifier) => {
    const resolved = resolveSpecifier(fileDirectory, specifier);

    if (resolved === null) {
      unresolved.push(specifier);
      return match;
    }

    return `${prefix}${quote}${resolved}${quote}`;
  });

  if (output !== source) {
    fs.writeFileSync(filePath, output);
  }

  return unresolved;
};

const run = (directories) => {
  let rewritten = 0;
  const failures = [];

  directories.forEach((directory) => {
    if (!fs.existsSync(directory)) {
      failures.push(`${directory}: directory does not exist`);
      return;
    }

    listDeclarationFiles(directory).forEach((filePath) => {
      const unresolved = rewriteDeclarationFile(filePath);
      rewritten += 1;
      unresolved.forEach((specifier) => failures.push(`${filePath}: cannot resolve '${specifier}'`));
    });
  });

  if (failures.length > 0) {
    console.error(`esm-declaration-extensions: ${failures.length} problem(s)\n${failures.join('\n')}`);
    process.exitCode = 1;
    return;
  }

  console.log(`esm-declaration-extensions: processed ${rewritten} declaration file(s) in ${directories.join(', ')}`);
};

run(process.argv.length > 2 ? process.argv.slice(2) : [DEFAULT_DIRECTORY]);
