/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Node, SyntaxKind, type CallExpression, type SourceFile, type TypeReferenceNode } from 'ts-morph';
import { removeOrphanedNamedImports } from '../imports';
import {
  RuleMode,
  type Edit,
  type Finding,
  type RuleContext,
  type RuleResult,
  type SourceRule,
} from '../types';

const MAX_PASSES = 500;

const rightmostName = (node: Node): string => {
  const text = node.getText();
  const dot = text.lastIndexOf('.');
  return dot === -1 ? text : text.slice(dot + 1);
};

/* ------------------------------------------------------------------ useRef */

/**
 * React 19's typings dropped the zero-argument `useRef` overload, so every v5-era `useRef<SomeRef>()`
 * is now `TS2554: Expected 1 arguments, but got 0`. With a type argument present the fix is
 * mechanical: the initial value has always been `null`, which is what the hook returned anyway.
 *
 * A *bare* `useRef()` — no type argument either — is the same error but is not mechanically
 * fixable. `useRef(null)` infers `RefObject<null>`, which then fails to satisfy any `ref` prop, and
 * the type it should have had is only knowable from what the ref is attached to. Those are reported.
 */
export const useRefNullArgument: SourceRule = {
  kind: 'source',
  id: 'useref-null-arg',
  description: 'Add the explicit `null` initial value React 19 requires on useRef<T>()',
  mode: RuleMode.Automate,
  docsAnchor: 'useref-needs-an-initial-value',
  manualAction: 'Give every bare `React.useRef()` an explicit type argument and `null` initial value — React 19 removed the zero-argument overload, and only you know which ref type belongs there.',

  apply(file: SourceFile, context: RuleContext): RuleResult {
    const edits: Edit[] = [];
    const findings: Finding[] = [];
    const relativePath = context.relative(file.getFilePath());

    const zeroArgumentCalls = (): CallExpression[] => {
      return file.getDescendantsOfKind(SyntaxKind.CallExpression).filter((candidate) => {
        return rightmostName(candidate.getExpression()) === 'useRef'
          && candidate.getArguments().length === 0;
      });
    };

    for (const call of zeroArgumentCalls()) {
      if (call.getTypeArguments().length > 0) { continue; }

      findings.push({
        ruleId: this.id,
        file: relativePath,
        line: call.getStartLineNumber(),
        excerpt: call.getText(),
        reason: 'React 19 removed the zero-argument `useRef` overload, so this is `TS2554: Expected 1 arguments, but got 0`. With no type argument there is nothing to infer from: `useRef(null)` would produce `RefObject<null>`, which no `ref` prop accepts.',
        fix: 'Add the ref type this holds and an explicit initial value, e.g. `React.useRef<IconRef>(null)`. Which type depends on the component the ref is attached to — see the ref-type table in the migration guide.',
      });
    }

    for (let pass = 0; pass < MAX_PASSES; pass += 1) {
      const call = zeroArgumentCalls().find((candidate) => candidate.getTypeArguments().length > 0);

      if (!call) { return { edits, findings }; }

      edits.push({
        ruleId: this.id,
        file: relativePath,
        line: call.getStartLineNumber(),
        before: call.getText(),
        after: call.getText().replace(/\(\s*\)$/, '(null)'),
      });

      call.addArgument('null');
    }

    throw new Error(`${this.id}: exceeded ${MAX_PASSES} passes on ${file.getFilePath()}`);
  },
};

/* -------------------------------------------------------------- RefObject */

const REF_OBJECT_NAMES: ReadonlySet<string> = new Set(['RefObject', 'MutableRefObject']);

/**
 * Whether a type node already admits null, so widening it again would be noise — or, worse, an
 * infinite loop, since the rule rescans until it finds nothing left to do.
 *
 * In a *type* position `null` parses as a `LiteralType` wrapping a `NullKeyword`, not as a bare
 * `NullKeyword`; checking only for the latter never matches.
 */
const admitsNull = (node: Node): boolean => {
  const isNullish = (member: Node): boolean => {
    if (member.getKind() === SyntaxKind.UndefinedKeyword) { return true; }
    if (member.getKind() === SyntaxKind.NullKeyword) { return true; }
    if (Node.isLiteralTypeNode(member)) {
      return member.getLiteral().getKind() === SyntaxKind.NullKeyword;
    }
    return false;
  };

  if (isNullish(node)) { return true; }
  if (!Node.isUnionTypeNode(node)) { return false; }

  return node.getTypeNodes().some(isNullish);
};

/**
 * `React.createRef<T>()` returns `RefObject<T | null>`, so annotating its result as `RefObject<T>`
 * fails under `strictNullChecks` — which every React Native tsconfig preset enables.
 *
 * The brief's suggested v6 form, `const ref: React.RefObject<InputRef> = React.createRef()`, is
 * exactly this error; see `src/codemod/VERIFIED.md` §5 for the quoted `tsc` output.
 */
export const refObjectNullable: SourceRule = {
  kind: 'source',
  id: 'refobject-nullable',
  description: 'Widen RefObject<T> to RefObject<T | null> where it annotates a createRef() result',
  mode: RuleMode.Automate,
  docsAnchor: 'createref-and-strictnullchecks',

  apply(file: SourceFile, context: RuleContext): RuleResult {
    const edits: Edit[] = [];
    const relativePath = context.relative(file.getFilePath());

    for (let pass = 0; pass < MAX_PASSES; pass += 1) {
      const target = file.getDescendantsOfKind(SyntaxKind.VariableDeclaration)
        .map((declaration) => {
          const typeNode = declaration.getTypeNode();
          const initializer = declaration.getInitializer();

          if (!typeNode || !Node.isTypeReference(typeNode)) { return null; }
          if (!initializer || !Node.isCallExpression(initializer)) { return null; }
          if (rightmostName(initializer.getExpression()) !== 'createRef') { return null; }
          if (!REF_OBJECT_NAMES.has(rightmostName(typeNode.getTypeName()))) { return null; }

          const args = typeNode.getTypeArguments();
          if (args.length !== 1) { return null; }
          if (admitsNull(args[0])) { return null; }

          return { typeNode: typeNode as TypeReferenceNode, argument: args[0] };
        })
        .find((candidate) => candidate !== null);

      if (!target) { return { edits, findings: [] }; }

      const before = target.typeNode.getText();
      const after = `${target.typeNode.getTypeName().getText()}<${target.argument.getText()} | null>`;

      if (before === after) {
        throw new Error(`${this.id}: rewriting ${before} made no change in ${file.getFilePath()}`);
      }

      edits.push({
        ruleId: this.id,
        file: relativePath,
        line: target.typeNode.getStartLineNumber(),
        before,
        after,
      });

      target.typeNode.replaceWithText(after);
    }

    throw new Error(`${this.id}: exceeded ${MAX_PASSES} passes on ${file.getFilePath()}`);
  },
};

/* --------------------------------------------------------------- ReactText */

const REACT_TEXT_REPLACEMENT = 'string | number';

/**
 * `React.ReactText` was removed in React 19. It was always exactly `string | number`, so the
 * substitution is total — there is no case where the alias meant anything else.
 *
 * The replacement is parenthesised whenever it lands inside a union, intersection or array, because
 * `ReactText[]` must become `(string | number)[]` rather than `string | number[]`.
 */
export const reactText: SourceRule = {
  kind: 'source',
  id: 'react-text',
  description: 'Replace the removed React.ReactText alias with `string | number`',
  mode: RuleMode.Automate,
  docsAnchor: 'reacttext-was-removed',

  apply(file: SourceFile, context: RuleContext): RuleResult {
    const edits: Edit[] = [];
    const relativePath = context.relative(file.getFilePath());

    const localNames = new Set<string>(['React.ReactText']);
    for (const declaration of file.getImportDeclarations()) {
      if (declaration.getModuleSpecifierValue() !== 'react') { continue; }
      for (const named of declaration.getNamedImports()) {
        if (named.getName() === 'ReactText') {
          localNames.add(named.getAliasNode()?.getText() ?? 'ReactText');
        }
      }
    }

    for (let pass = 0; pass < MAX_PASSES; pass += 1) {
      const reference = file.getDescendantsOfKind(SyntaxKind.TypeReference)
        .find((candidate) => localNames.has(candidate.getTypeName().getText()));

      if (!reference) { break; }

      // `ReactText[]` must become `(string | number)[]`, and an intersection member needs the same
      // protection. A *union* member does not — `string | number | boolean` is already right, and
      // adding parentheses there would be noise in the diff.
      const parent = reference.getParent();
      const needsParentheses = Boolean(parent) && (
        Node.isIntersectionTypeNode(parent)
        || Node.isArrayTypeNode(parent)
      );

      const after = needsParentheses ? `(${REACT_TEXT_REPLACEMENT})` : REACT_TEXT_REPLACEMENT;

      edits.push({
        ruleId: this.id,
        file: relativePath,
        line: reference.getStartLineNumber(),
        before: reference.getText(),
        after,
      });

      reference.replaceWithText(after);

      if (pass === MAX_PASSES - 1) {
        throw new Error(`${this.id}: exceeded ${MAX_PASSES} passes on ${file.getFilePath()}`);
      }
    }

    if (edits.length > 0) {
      removeOrphanedNamedImports(file, 'react', new Set([...localNames].filter((n) => !n.includes('.'))));
    }

    return { edits, findings: [] };
  },
};
