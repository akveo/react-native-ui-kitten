/**
 * Generates `src/codemod/src/componentMap.ts`.
 *
 * The map is the codemod's ground truth: which v5 component names may appear in a type position,
 * and what each one becomes in v6. It is derived, never hand-maintained, because a stale entry
 * silently corrupts user code.
 *
 * Two inputs, both reproducible from this repository:
 *
 *   v6  `src/components/lib/typescript/index.d.ts` — the built public typings. Every component is
 *       classified by asking the TypeScript checker to resolve `React.ComponentRef<typeof X>`,
 *       which is exactly the question "what does a ref on this component hold?".
 *
 *   v5  the `v5.3.1` git tag — read with `git show` to recover each component class's type-parameter
 *       arity, which decides whether a v5 type argument is preserved or dropped.
 *
 * Usage (requires `yarn build` to have produced the v6 typings):
 *
 *   node src/codemod/scripts/generate-component-map.cjs
 *   node src/codemod/scripts/generate-component-map.cjs --check   # CI: fail if the file is stale
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const REPO = path.resolve(__dirname, '../../..');
const V6_TYPINGS = path.join(REPO, 'src/components/lib/typescript/index.d.ts');
const OUTPUT = path.join(REPO, 'src/codemod/src/componentMap.ts');
const V5_TAG = 'v5.3.1';

const ts = require(path.join(REPO, 'node_modules/typescript'));

/* ------------------------------------------------------------------ v5 side */

/**
 * Every `export class X<...>` in the v5.3.1 UI sources, mapped to its type-parameter arity.
 * v5 components were classes, which is precisely why their names were usable as types.
 */
const readV5Classes = () => {
  const files = execFileSync('git', ['ls-tree', '-r', '--name-only', V5_TAG, 'src/components/'], {
    cwd: REPO,
    encoding: 'utf8',
  })
    .split('\n')
    .filter((f) => f.endsWith('.component.tsx') && !f.endsWith('.spec.tsx'));

  const classes = new Map();

  for (const file of files) {
    const source = execFileSync('git', ['show', `${V5_TAG}:${file}`], {
      cwd: REPO,
      encoding: 'utf8',
      maxBuffer: 32 * 1024 * 1024,
    });

    const sf = ts.createSourceFile(file, source, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TSX);

    for (const stmt of sf.statements) {
      if (!ts.isClassDeclaration(stmt) || !stmt.name) { continue; }
      const isExported = (stmt.modifiers || []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
      if (!isExported) { continue; }

      const params = stmt.typeParameters || [];
      classes.set(stmt.name.text, {
        typeParamCount: params.length,
        // A parameter without a default means v5 code was *forced* to write the argument.
        requiredTypeParamCount: params.filter((p) => !p.default).length,
        file,
      });
    }
  }

  return classes;
};

/* ------------------------------------------------------------------ v6 side */

const createProgram = (entry) => ts.createProgram([entry], {
  strict: true,
  skipLibCheck: true,
  jsx: ts.JsxEmit.ReactNative,
  moduleResolution: ts.ModuleResolutionKind.Node10,
  target: ts.ScriptTarget.ESNext,
  esModuleInterop: true,
});

const declarationKind = (checker, symbol) => {
  let resolved = symbol;
  if (resolved.flags & ts.SymbolFlags.Alias) {
    try { resolved = checker.getAliasedSymbol(resolved); } catch { /* keep original */ }
  }
  const decls = resolved.getDeclarations() || [];
  if (decls.some((d) => ts.isClassDeclaration(d))) { return 'class'; }
  if (decls.some((d) => ts.isVariableDeclaration(d))) { return 'const'; }
  if (decls.some((d) => ts.isFunctionDeclaration(d))) { return 'function'; }
  if (decls.some((d) => ts.isInterfaceDeclaration(d))) { return 'interface'; }
  if (decls.some((d) => ts.isTypeAliasDeclaration(d))) { return 'type'; }
  return 'other';
};

/**
 * Asks the checker `React.ComponentRef<typeof X>` for every component, by synthesising a probe file
 * that imports the built typings. Returns the printed type for each name, or null when the
 * component accepts no ref (ComponentRef degenerates to `never`).
 */
const resolveRefTypes = (componentNames) => {
  const probePath = path.join(REPO, 'src/components/lib/typescript/__componentmap_probe__.ts');

  const lines = [
    "import type * as React from 'react';",
    "import type * as UIK from './index';",
    '',
    ...componentNames.map((n, i) => `export type Probe${i} = React.ComponentRef<typeof UIK.${n}>;`),
  ];

  fs.writeFileSync(probePath, `${lines.join('\n')}\n`, 'utf8');

  try {
    const program = createProgram(probePath);
    const checker = program.getTypeChecker();
    const sf = program.getSourceFile(probePath);
    const moduleSymbol = checker.getSymbolAtLocation(sf);
    const exports = checker.getExportsOfModule(moduleSymbol);

    const byName = new Map();
    for (const sym of exports) {
      const index = Number(sym.getName().replace('Probe', ''));
      const decl = (sym.getDeclarations() || [])[0];
      if (!decl) { continue; }
      const type = checker.getTypeAtLocation(decl);
      const printed = checker.typeToString(type, undefined, ts.TypeFormatFlags.NoTruncation);
      byName.set(componentNames[index], printed);
    }
    return byName;
  } finally {
    fs.unlinkSync(probePath);
  }
};

/* ---------------------------------------------------------------- grouping */

const GROUPS = {
  EXPORTED_REF: 'exported-ref',
  EXPORTED_REF_GENERIC: 'exported-ref-generic',
  EXPORTED_REF_DROP_ARGS: 'exported-ref-drop-args',
  COMPONENT_REF: 'component-ref',
  NO_REF: 'no-ref',
  STILL_CLASS: 'still-class',
};

const build = () => {
  if (!fs.existsSync(V6_TYPINGS)) {
    throw new Error(`v6 typings missing at ${V6_TYPINGS} — run \`yarn build\` first`);
  }

  const v5Classes = readV5Classes();

  const program = createProgram(V6_TYPINGS);
  const checker = program.getTypeChecker();
  const sf = program.getSourceFile(V6_TYPINGS);
  const moduleSymbol = checker.getSymbolAtLocation(sf);
  const exports = checker.getExportsOfModule(moduleSymbol);

  const exportedNames = new Set(exports.map((s) => s.getName()));
  const exportedRefTypes = new Set([...exportedNames].filter((n) => /Ref$/.test(n) && n !== 'Ref'));

  // A v5 name is only interesting if it was an exported class in v5 — that is the whole population
  // of names that could legally appear in a v5 type position.
  const candidates = exports
    .filter((s) => v5Classes.has(s.getName()))
    .map((s) => s.getName())
    .sort();

  const kinds = new Map();
  for (const sym of exports) { kinds.set(sym.getName(), declarationKind(checker, sym)); }

  const refTypes = resolveRefTypes(candidates);

  const entries = [];

  for (const name of candidates) {
    const v5 = v5Classes.get(name);
    const kind = kinds.get(name);

    if (kind === 'class') {
      entries.push({ name, group: GROUPS.STILL_CLASS, v5TypeParams: v5.typeParamCount });
      continue;
    }

    const printed = refTypes.get(name);
    const acceptsRef = printed && printed !== 'never' && printed !== 'unknown';

    if (!acceptsRef) {
      entries.push({ name, group: GROUPS.NO_REF, v5TypeParams: v5.typeParamCount });
      continue;
    }

    // `ComponentRef` printed as `FooRef` or `FooRef<Date>` — strip the arguments to get the name.
    const refName = printed.replace(/<.*$/s, '').trim();

    if (!exportedRefTypes.has(refName)) {
      entries.push({
        name,
        group: GROUPS.COMPONENT_REF,
        v5TypeParams: v5.typeParamCount,
        resolvesTo: printed,
      });
      continue;
    }

    // The ref type is importable. Does it carry the v5 type argument, or is the argument now junk?
    // The barrel re-exports it, so the export symbol is an alias whose declaration is an
    // ExportSpecifier — resolve through the alias to reach the real interface declaration.
    let refSymbol = exports.find((s) => s.getName() === refName);
    if (refSymbol.flags & ts.SymbolFlags.Alias) {
      try { refSymbol = checker.getAliasedSymbol(refSymbol); } catch { /* keep original */ }
    }
    const refDecl = (refSymbol.getDeclarations() || [])[0];
    const refTypeParams = (refDecl && refDecl.typeParameters) ? refDecl.typeParameters.length : 0;

    let group;
    if (v5.typeParamCount === 0) {
      group = GROUPS.EXPORTED_REF;
    } else if (refTypeParams > 0) {
      group = GROUPS.EXPORTED_REF_GENERIC;
    } else {
      group = GROUPS.EXPORTED_REF_DROP_ARGS;
    }

    entries.push({
      name,
      group,
      refType: refName,
      v5TypeParams: v5.typeParamCount,
      v5RequiredTypeParams: v5.requiredTypeParamCount,
      refTypeParams,
    });
  }

  return { entries, exportedRefTypes: [...exportedRefTypes].sort() };
};

/* ----------------------------------------------------------------- emitter */

const render = ({ entries, exportedRefTypes }) => {
  const byGroup = (g) => entries.filter((e) => e.group === g);

  const quote = (s) => `'${s}'`;
  const list = (items) => (items.length ? `\n  ${items.join(',\n  ')},\n` : '');

  const refEntry = (e) => `${e.name}: { refType: ${quote(e.refType)}, v5TypeParams: ${e.v5TypeParams} }`;

  return `/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Regenerate with:
 *   yarn build && node src/codemod/scripts/generate-component-map.cjs
 *
 * Derived from the built v6 typings (\`src/components/lib/typescript/index.d.ts\`) and the
 * \`${V5_TAG}\` git tag. See src/codemod/VERIFIED.md for how each group was validated.
 */

/** What a v5 component name in a type position becomes under v6. */
export enum RefGroup {
  /** v6 exports a \`<Name>Ref\`; the v5 name had no type arguments. Rewrite 1:1. */
  ExportedRef = 'exported-ref',
  /** v6 exports a generic \`<Name>Ref<D>\`; a v5 type argument is preserved. */
  ExportedRefGeneric = 'exported-ref-generic',
  /** v6 exports a non-generic \`<Name>Ref\`, but the v5 class was generic; drop the argument. */
  ExportedRefDropArgs = 'exported-ref-drop-args',
  /** Accepts a ref, but its ref type is not importable. Use \`React.ComponentRef<typeof Name>\`. */
  ComponentRef = 'component-ref',
  /** Plain function component in v6 — accepts no ref at all. Report, never rewrite. */
  NoRef = 'no-ref',
  /** Still a class in v6, so the v5 type position is still valid. Never touch. */
  StillClass = 'still-class',
}

export interface ComponentRefInfo {
  readonly refType: string;
  readonly v5TypeParams: number;
}

/** Ref type names v6 exports from \`@ui-kitten/components\`. */
export const EXPORTED_REF_TYPES: readonly string[] = [${list(exportedRefTypes.map(quote))}];

/** v5 name had no type arguments; v6 exports a matching non-generic ref type. */
export const EXPORTED_REF: Readonly<Record<string, ComponentRefInfo>> = {${list(byGroup(GROUPS.EXPORTED_REF).map(refEntry))}};

/** v6 ref type is generic with the same \`D = Date\` default; keep any v5 type argument. */
export const EXPORTED_REF_GENERIC: Readonly<Record<string, ComponentRefInfo>> = {${list(byGroup(GROUPS.EXPORTED_REF_GENERIC).map(refEntry))}};

/** v5 class was generic but the v6 ref type is not; the type argument must be discarded. */
export const EXPORTED_REF_DROP_ARGS: Readonly<Record<string, ComponentRefInfo>> = {${list(byGroup(GROUPS.EXPORTED_REF_DROP_ARGS).map(refEntry))}};

/**
 * Takes a ref, but the ref type is unreachable from the package root — either it is not exported
 * (\`ViewPagerRef\`, \`TabBarRef\`), or it lives behind \`@ui-kitten/components/devsupport\`
 * (\`TouchableWeb\`), or naming it would collide with an existing import (react-native's \`Text\`).
 * \`React.ComponentRef<typeof Name>\` avoids all three and needs no new import.
 */
export const COMPONENT_REF: Readonly<Record<string, string>> = {${list(byGroup(GROUPS.COMPONENT_REF).map((e) => `${e.name}: ${quote(e.resolvesTo)}`))}};

/** Plain function components in v6: passing a ref is a type error. Report, do not rewrite. */
export const NO_REF: readonly string[] = [${list(byGroup(GROUPS.NO_REF).map((e) => quote(e.name)))}];

/** Still classes in v6 — \`useRef<MenuGroup>()\` remains valid. MUST NOT be rewritten. */
export const STILL_CLASS: readonly string[] = [${list(byGroup(GROUPS.STILL_CLASS).map((e) => quote(e.name)))}];

/** Every v5 component name that could legally appear in a type position, with its v6 group. */
export const COMPONENT_GROUPS: Readonly<Record<string, RefGroup>> = {${list(entries.map((e) => `${e.name}: RefGroup.${
  {
    [GROUPS.EXPORTED_REF]: 'ExportedRef',
    [GROUPS.EXPORTED_REF_GENERIC]: 'ExportedRefGeneric',
    [GROUPS.EXPORTED_REF_DROP_ARGS]: 'ExportedRefDropArgs',
    [GROUPS.COMPONENT_REF]: 'ComponentRef',
    [GROUPS.NO_REF]: 'NoRef',
    [GROUPS.STILL_CLASS]: 'StillClass',
  }[e.group]
}`))}};
`;
};

/* -------------------------------------------------------------------- main */

const main = () => {
  const model = build();
  const rendered = render(model);

  const check = process.argv.includes('--check');
  const existing = fs.existsSync(OUTPUT) ? fs.readFileSync(OUTPUT, 'utf8') : null;

  if (check) {
    if (existing !== rendered) {
      console.error('componentMap.ts is stale — re-run generate-component-map.cjs');
      process.exit(1);
    }
    console.log('componentMap.ts is up to date');
    return;
  }

  fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });
  fs.writeFileSync(OUTPUT, rendered, 'utf8');

  const counts = model.entries.reduce((acc, e) => {
    acc[e.group] = (acc[e.group] || 0) + 1;
    return acc;
  }, {});

  console.log(`wrote ${path.relative(REPO, OUTPUT)}`);
  console.log(`  total v5 component classes classified: ${model.entries.length}`);
  for (const [group, count] of Object.entries(counts).sort()) {
    console.log(`  ${group.padEnd(24)} ${count}`);
  }
  console.log(`  exported ref types: ${model.exportedRefTypes.length} (${model.exportedRefTypes.join(', ')})`);
};

main();
