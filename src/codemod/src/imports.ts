/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Node,
  QuoteKind,
  SyntaxKind,
  type ImportDeclaration,
  type SourceFile,
} from 'ts-morph';

/**
 * The quote style a file already uses for its module specifiers.
 *
 * ts-morph emits new imports with the project-wide setting, which produces a double-quoted import
 * in a single-quoted file. Detecting per file and setting the project accordingly keeps the diff
 * limited to what the codemod actually meant to change.
 */
export const detectQuoteKind = (file: SourceFile): QuoteKind => {
  const first = file.getImportDeclarations()[0];
  if (!first) { return QuoteKind.Single; }

  return first.getModuleSpecifier().getText().startsWith('"')
    ? QuoteKind.Double
    : QuoteKind.Single;
};

/** Whether the file's existing imports end in a semicolon. */
export const detectUsesSemicolons = (file: SourceFile): boolean => {
  const first = file.getImportDeclarations()[0];
  if (!first) { return true; }

  return first.getText().trimEnd().endsWith(';');
};

export const importDeclarationsFor = (file: SourceFile, moduleSpecifier: string): ImportDeclaration[] => {
  return file.getImportDeclarations()
    .filter((declaration) => declaration.getModuleSpecifierValue() === moduleSpecifier);
};

/** Local names a module's import declarations bind in this file. */
export const localNamesFrom = (file: SourceFile, moduleSpecifier: string): Set<string> => {
  const bound = new Set<string>();

  for (const declaration of importDeclarationsFor(file, moduleSpecifier)) {
    for (const named of declaration.getNamedImports()) {
      bound.add(named.getAliasNode()?.getText() ?? named.getName());
    }
    const defaultImport = declaration.getDefaultImport();
    if (defaultImport) { bound.add(defaultImport.getText()); }
    const namespaceImport = declaration.getNamespaceImport();
    if (namespaceImport) { bound.add(namespaceImport.getText()); }
  }

  return bound;
};

/**
 * Restores the one-specifier-per-line layout of a multi-line import.
 *
 * ts-morph appends to the last line, turning
 *
 *     import {
 *       Autocomplete,
 *       Layout,
 *     } from '@ui-kitten/components';
 *
 * into a declaration whose closing brace has drifted onto the `Layout, InputRef }` line. Multi-line
 * imports are the dominant style in both v5 templates, so leaving that would put a formatting
 * change on nearly every migrated file and bury the real diff.
 */
const reflowMultilineImport = (declaration: ImportDeclaration, quote: string): void => {
  const named = declaration.getNamedImports();
  if (named.length === 0) { return; }

  const indentMatch = /\n([ \t]+)/.exec(declaration.getText());
  const indent = indentMatch ? indentMatch[1] : '  ';

  const specifiers = named.map((specifier) => specifier.getText().trim());
  const typeOnly = declaration.isTypeOnly() ? 'type ' : '';
  const defaultImport = declaration.getDefaultImport()?.getText();
  const clausePrefix = defaultImport ? `${defaultImport}, ` : '';
  const moduleSpecifier = declaration.getModuleSpecifierValue();

  const lines = [
    `import ${typeOnly}${clausePrefix}{`,
    ...specifiers.map((specifier) => `${indent}${specifier},`),
    `} from ${quote}${moduleSpecifier}${quote};`,
  ];

  declaration.replaceWithText(lines.join('\n'));
};

const isMultiline = (declaration: ImportDeclaration): boolean => {
  return declaration.getText().includes('\n');
};

/**
 * Ensures `name` is imported from `moduleSpecifier`, without introducing an alias.
 *
 * When user code aliases a component (`import { Input as UIInput }`), the replacement ref type is
 * still added under its real name: `InputRef`, not `InputRef as UIInputRef`. Aliasing the ref type
 * to match would be surprising, and the alias existed to avoid a name clash on the *component*,
 * which the ref type does not share.
 *
 * Returns true when the import was actually added.
 */
export const ensureNamedImport = (file: SourceFile, moduleSpecifier: string, name: string): boolean => {
  if (localNamesFrom(file, moduleSpecifier).has(name)) { return false; }

  // A name already bound by something else in this file would be shadowed by a new import; leave
  // it alone rather than producing a duplicate-identifier error.
  const conflicting = file.getLocals?.() ?? [];
  if (conflicting.some((symbol) => symbol.getName() === name)) { return false; }

  // A declaration with a namespace import cannot also carry named imports; skip it and, if it is
  // the only one, add a second declaration alongside.
  const existing = importDeclarationsFor(file, moduleSpecifier)
    .find((declaration) => !declaration.isTypeOnly() && !declaration.getNamespaceImport());

  if (existing) {
    const multiline = isMultiline(existing);
    const quote = existing.getModuleSpecifier().getText().startsWith('"') ? '"' : "'";

    existing.addNamedImport(name);

    if (multiline) { reflowMultilineImport(existing, quote); }
    return true;
  }

  const lastImport = file.getImportDeclarations().at(-1);
  file.insertImportDeclaration(lastImport ? lastImport.getChildIndex() + 1 : 0, {
    moduleSpecifier,
    namedImports: [name],
  });

  return true;
};

/**
 * Collapses several import declarations of the same module into the first one.
 *
 * Rewriting imports one rule at a time naturally produces duplicates — the eva rule retargets
 * `@eva-design/dss` onto `@ui-kitten/processor` while the file may already import from it. Merging
 * happens once, after every rule has run.
 */
export const mergeDuplicateImports = (file: SourceFile, moduleSpecifier: string): boolean => {
  const declarations = importDeclarationsFor(file, moduleSpecifier);
  if (declarations.length < 2) { return false; }

  // Type-only and value imports of the same module are not interchangeable; merge within each kind.
  const merge = (group: ImportDeclaration[]): boolean => {
    if (group.length < 2) { return false; }

    const [target, ...rest] = group;
    const present = new Set(target.getNamedImports().map((n) => n.getText()));
    const multiline = isMultiline(target);
    const quote = target.getModuleSpecifier().getText().startsWith('"') ? '"' : "'";

    for (const declaration of rest) {
      const namespaceImport = declaration.getNamespaceImport();
      if (namespaceImport) {
        // A namespace import cannot be folded into a named-import list; leave this one standing.
        continue;
      }

      for (const named of declaration.getNamedImports()) {
        if (!present.has(named.getText())) {
          target.addNamedImport(named.getStructure());
          present.add(named.getText());
        }
      }

      const defaultImport = declaration.getDefaultImport();
      if (defaultImport && !target.getDefaultImport()) {
        target.setDefaultImport(defaultImport.getText());
      }

      declaration.remove();
    }

    if (multiline) { reflowMultilineImport(target, quote); }

    return true;
  };

  const typeOnly = declarations.filter((d) => d.isTypeOnly());
  const valueKind = declarations.filter((d) => !d.isTypeOnly());

  const mergedValues = merge(valueKind);
  const mergedTypes = merge(typeOnly);

  return mergedValues || mergedTypes;
};

/**
 * Drops named imports of `candidates` that nothing in the file references any more.
 *
 * Deliberately narrow: only names the codemod itself may have orphaned are considered, so an
 * unrelated unused import the user happens to have is left exactly as it was.
 */
export const removeOrphanedNamedImports = (
  file: SourceFile,
  moduleSpecifier: string,
  candidates: ReadonlySet<string>,
): string[] => {
  const removed: string[] = [];

  for (const declaration of importDeclarationsFor(file, moduleSpecifier)) {
    for (const named of [...declaration.getNamedImports()]) {
      const localName = named.getAliasNode()?.getText() ?? named.getName();
      if (!candidates.has(localName)) { continue; }

      const references = file.getDescendantsOfKind(SyntaxKind.Identifier)
        .filter((identifier) => identifier.getText() === localName)
        .filter((identifier) => !isPartOfImportSpecifier(identifier));

      if (references.length === 0) {
        named.remove();
        removed.push(localName);
      }
    }

    if (declaration.getNamedImports().length === 0
      && !declaration.getDefaultImport()
      && !declaration.getNamespaceImport()) {
      declaration.remove();
    }
  }

  return removed;
};

/**
 * Same as {@link removeOrphanedNamedImports} but across every module, for names the codemod itself
 * stranded — a discarded type argument can be the only reason a `react-native` type was imported.
 */
export const removeOrphanedNamedImportsAnywhere = (
  file: SourceFile,
  candidates: ReadonlySet<string>,
): Array<{ name: string; moduleSpecifier: string }> => {
  if (candidates.size === 0) { return []; }

  const removed: Array<{ name: string; moduleSpecifier: string }> = [];

  for (const declaration of [...file.getImportDeclarations()]) {
    const moduleSpecifier = declaration.getModuleSpecifierValue();

    for (const named of [...declaration.getNamedImports()]) {
      const localName = named.getAliasNode()?.getText() ?? named.getName();
      if (!candidates.has(localName)) { continue; }

      const references = file.getDescendantsOfKind(SyntaxKind.Identifier)
        .filter((identifier) => identifier.getText() === localName)
        .filter((identifier) => !isPartOfImportSpecifier(identifier));

      if (references.length === 0) {
        named.remove();
        removed.push({ name: localName, moduleSpecifier });
      }
    }

    if (declaration.getNamedImports().length === 0
      && !declaration.getDefaultImport()
      && !declaration.getNamespaceImport()) {
      declaration.remove();
    }
  }

  return removed;
};

const isPartOfImportSpecifier = (identifier: Node): boolean => {
  const parent = identifier.getParent();
  return Node.isImportSpecifier(parent) || Node.isImportClause(parent);
};

/**
 * Whether a blank line separates the import block from the first statement after it.
 *
 * Removing an import declaration takes its trailing newline with it, so a file whose last import
 * happened to be the one that got merged away loses the blank line that followed. That is a
 * formatting change the user did not ask for, sitting right at the top of the diff.
 */
export const hasBlankLineAfterImports = (file: SourceFile): boolean => {
  const imports = file.getImportDeclarations();
  if (imports.length === 0) { return false; }

  const lastImport = imports.at(-1);
  const next = file.getStatements().find((statement) => statement.getStart() >= lastImport.getEnd());
  if (!next) { return false; }

  return file.getFullText().slice(lastImport.getEnd(), next.getStart()).includes('\n\n');
};

/** Puts back a blank line after the import block when one was there before. */
export const restoreBlankLineAfterImports = (file: SourceFile): void => {
  if (hasBlankLineAfterImports(file)) { return; }

  const imports = file.getImportDeclarations();
  if (imports.length === 0) { return; }

  const lastImport = imports.at(-1);
  const next = file.getStatements().find((statement) => statement.getStart() >= lastImport.getEnd());
  if (!next) { return; }

  file.insertText(lastImport.getEnd(), '\n');
};
