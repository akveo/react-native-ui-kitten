/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Node, type TypeReferenceNode } from 'ts-morph';

/**
 * Type constructors whose type argument holds a ref.
 *
 * `ComponentRef`/`ElementRef` are included so the codemod recognises its own output and stays
 * idempotent on a second run.
 */
const REF_TYPE_WRAPPERS: ReadonlySet<string> = new Set([
  'Ref',
  'RefObject',
  'MutableRefObject',
  'LegacyRef',
  'ForwardedRef',
  'RefAttributes',
  'ComponentRef',
  'ElementRef',
]);

/** Calls whose type argument holds a ref. `forwardRef` only in its first position. */
const REF_CALLS: ReadonlySet<string> = new Set([
  'useRef',
  'createRef',
  'forwardRef',
]);

/** The last segment of a possibly-qualified name: `React.RefObject` -> `RefObject`. */
const rightmostName = (node: Node): string => {
  const text = node.getText();
  const dot = text.lastIndexOf('.');
  return dot === -1 ? text : text.slice(dot + 1);
};

/**
 * Whether a type reference sits somewhere a ref type belongs.
 *
 * v5 code used component names as types almost exclusively for refs, but not entirely — an
 * instance-typed field (`private input: Input`) is also a v5 type position, and it has no v6
 * equivalent because the component is no longer a class. Restricting the rewrite to genuine ref
 * positions keeps the codemod from inventing a meaning for those; they are reported instead.
 */
export const isRefPosition = (reference: TypeReferenceNode): boolean => {
  const parent = reference.getParent();
  if (!parent) { return false; }

  // `React.RefObject<Input>` / `React.Ref<Select>` — argument of a ref type constructor.
  if (Node.isTypeReference(parent)) {
    return REF_TYPE_WRAPPERS.has(rightmostName(parent.getTypeName()));
  }

  // `useRef<Input>()`, `createRef<Select>()`, `forwardRef<Input, Props>(…)`.
  if (Node.isCallExpression(parent)) {
    const callee = rightmostName(parent.getExpression());
    if (!REF_CALLS.has(callee)) { return false; }

    if (callee === 'forwardRef') {
      // `forwardRef<Ref, Props>` — only the first argument is the ref.
      return parent.getTypeArguments()[0] === reference;
    }

    return true;
  }

  return false;
};

/**
 * The `ref` attribute on a JSX element, if present.
 *
 * Used to flag `<Tooltip ref={…}>` on components that no longer accept one — the ref may have been
 * load-bearing, so removing it automatically could silently change behaviour.
 */
export const jsxRefAttribute = (element: Node): Node | undefined => {
  if (!Node.isJsxOpeningElement(element) && !Node.isJsxSelfClosingElement(element)) {
    return undefined;
  }

  return element.getAttributes().find((attribute) => {
    return Node.isJsxAttribute(attribute) && attribute.getNameNode().getText() === 'ref';
  });
};
