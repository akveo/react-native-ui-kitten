/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Node,
  SourceFile,
  SyntaxKind,
  type EntityName,
  type TypeReferenceNode,
} from 'ts-morph';
import { COMPONENT_GROUPS } from './componentMap';

export const UI_KITTEN_COMPONENTS = '@ui-kitten/components';

/**
 * Which local identifiers in a file actually refer to `@ui-kitten/components` exports.
 *
 * This is the guard that keeps the codemod off a user's own `Input`, or an `Input` imported from
 * another UI library. Rewriting is driven entirely by what the file imports, so the codemod works
 * on a checkout with no `node_modules` installed — which matters, because the usual migration order
 * is "edit the code, then install v6".
 */
export interface UiKittenScope {
  /** Local name (possibly aliased) to the name `@ui-kitten/components` exports. */
  readonly names: ReadonlyMap<string, string>;
  /** Locals bound by `import * as X from '@ui-kitten/components'`. */
  readonly namespaces: ReadonlySet<string>;
}

const EMPTY_SCOPE: UiKittenScope = { names: new Map(), namespaces: new Set() };

const isRelative = (specifier: string): boolean => {
  return specifier.startsWith('./') || specifier.startsWith('../');
};

/**
 * Names a local barrel re-exports from `@ui-kitten/components`.
 *
 * Only one hop is followed. A two-hop chain of barrels is rare enough that resolving it is not
 * worth the risk of walking into an unrelated module graph; such files simply go unrewritten, and
 * the resulting v6 type errors point straight at them.
 */
const barrelReexports = (barrel: SourceFile): Map<string, string> => {
  const reexported = new Map<string, string>();

  for (const declaration of barrel.getExportDeclarations()) {
    const specifier = declaration.getModuleSpecifierValue();
    if (specifier !== UI_KITTEN_COMPONENTS) { continue; }

    const named = declaration.getNamedExports();

    if (named.length === 0) {
      // `export * from '@ui-kitten/components'` — every component name comes through unchanged.
      for (const name of Object.keys(COMPONENT_GROUPS)) { reexported.set(name, name); }
      continue;
    }

    for (const exportSpecifier of named) {
      const original = exportSpecifier.getName();
      const alias = exportSpecifier.getAliasNode()?.getText() ?? original;
      reexported.set(alias, original);
    }
  }

  return reexported;
};

/** Builds the set of local identifiers in `file` that resolve to `@ui-kitten/components`. */
export const uiKittenScopeOf = (file: SourceFile): UiKittenScope => {
  const names = new Map<string, string>();
  const namespaces = new Set<string>();

  for (const declaration of file.getImportDeclarations()) {
    const specifier = declaration.getModuleSpecifierValue();

    if (specifier === UI_KITTEN_COMPONENTS) {
      const namespaceImport = declaration.getNamespaceImport();
      if (namespaceImport) { namespaces.add(namespaceImport.getText()); }

      for (const named of declaration.getNamedImports()) {
        const original = named.getName();
        const alias = named.getAliasNode()?.getText() ?? original;
        names.set(alias, original);
      }
      continue;
    }

    if (!isRelative(specifier)) { continue; }

    const barrel = declaration.getModuleSpecifierSourceFile();
    if (!barrel) { continue; }

    const reexports = barrelReexports(barrel);
    if (reexports.size === 0) { continue; }

    for (const named of declaration.getNamedImports()) {
      const original = named.getName();
      const alias = named.getAliasNode()?.getText() ?? original;
      const throughBarrel = reexports.get(original);
      if (throughBarrel) { names.set(alias, throughBarrel); }
    }
  }

  return { names, namespaces };
};

export const emptyScope = (): UiKittenScope => EMPTY_SCOPE;

/**
 * The `@ui-kitten/components` export a type reference names, or null.
 *
 * Handles both `Input` and the namespace form `UIKitten.Input`; anything else — a qualified name
 * rooted elsewhere, a local type, an import from another package — returns null.
 */
export const uiKittenNameOf = (reference: TypeReferenceNode, scope: UiKittenScope): string | null => {
  const typeName: EntityName = reference.getTypeName();

  if (Node.isIdentifier(typeName)) {
    return scope.names.get(typeName.getText()) ?? null;
  }

  if (Node.isQualifiedName(typeName)) {
    const left = typeName.getLeft();
    const right = typeName.getRight().getText();
    if (Node.isIdentifier(left) && scope.namespaces.has(left.getText())) {
      return COMPONENT_GROUPS[right] !== undefined ? right : null;
    }
  }

  return null;
};

/** The `@ui-kitten/components` export a JSX element name refers to, or null. */
export const uiKittenJsxNameOf = (elementName: string, scope: UiKittenScope): string | null => {
  if (!elementName.includes('.')) {
    return scope.names.get(elementName) ?? null;
  }

  const [namespace, member] = elementName.split('.');
  if (scope.namespaces.has(namespace) && COMPONENT_GROUPS[member] !== undefined) {
    return member;
  }

  return null;
};

/** Every type reference in a file, in source order. */
export const typeReferencesOf = (file: SourceFile): TypeReferenceNode[] => {
  return file.getDescendantsOfKind(SyntaxKind.TypeReference);
};
