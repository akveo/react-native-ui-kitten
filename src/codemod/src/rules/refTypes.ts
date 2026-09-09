/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Node, SyntaxKind, type SourceFile, type TypeReferenceNode } from 'ts-morph';
import {
  COMPONENT_REF,
  EXPORTED_REF,
  EXPORTED_REF_DROP_ARGS,
  EXPORTED_REF_GENERIC,
  type ComponentRefInfo,
} from '../componentMap';
import { ensureNamedImport } from '../imports';
import { isRefPosition } from '../refPositions';
import { RuleMode, type Edit, type RuleContext, type RuleResult, type SourceRule } from '../types';
import {
  UI_KITTEN_COMPONENTS,
  uiKittenNameOf,
  uiKittenScopeOf,
  typeReferencesOf,
  type UiKittenScope,
} from '../uiKittenScope';

/**
 * Each pass rewrites exactly one node and rescans.
 *
 * ts-morph invalidates node handles when the text around them changes, so holding a list of nodes
 * across edits is unsound. Rescanning is O(n²) in the number of matches per file, which for real
 * files means a handful of passes.
 */
const MAX_PASSES = 500;

interface Target {
  readonly reference: TypeReferenceNode;
  readonly componentName: string;
  readonly replacement: string;
  /** True when the name came in through `import * as X`, so no named import is needed. */
  readonly viaNamespace?: boolean;
}

/** The namespace a qualified type reference is rooted in, when that namespace is UI Kitten's. */
const namespaceQualifierOf = (reference: TypeReferenceNode, scope: UiKittenScope): string | null => {
  const typeName = reference.getTypeName();
  if (!Node.isQualifiedName(typeName)) { return null; }

  const left = typeName.getLeft().getText();
  return scope.namespaces.has(left) ? left : null;
};

type TargetFinder = (file: SourceFile, context: RuleContext) => Target | null;

const editFor = (ruleId: string, file: SourceFile, target: Target, context: RuleContext): Edit => {
  return {
    ruleId,
    file: context.relative(file.getFilePath()),
    line: target.reference.getStartLineNumber(),
    before: target.reference.getText(),
    after: target.replacement,
  };
};

/** Drives find-one-and-replace until a file is stable. */
const rewriteAll = (
  ruleId: string,
  file: SourceFile,
  context: RuleContext,
  findTarget: TargetFinder,
  afterEach?: (file: SourceFile, componentName: string, target: Target) => void,
): Edit[] => {
  const edits: Edit[] = [];

  for (let pass = 0; pass < MAX_PASSES; pass += 1) {
    const target = findTarget(file, context);
    if (!target) { return edits; }

    const before = file.getFullText();

    edits.push(editFor(ruleId, file, target, context));
    const componentName = target.componentName;
    target.reference.replaceWithText(target.replacement);
    afterEach?.(file, componentName, target);

    // A rewrite that changes nothing would loop forever. Fail closed rather than hang.
    if (file.getFullText() === before) {
      throw new Error(`${ruleId}: rewriting ${target.reference.getText()} made no change in ${file.getFilePath()}`);
    }
  }

  throw new Error(`${ruleId}: exceeded ${MAX_PASSES} passes on ${file.getFilePath()}`);
};

const typeArgumentsText = (reference: TypeReferenceNode): string => {
  const args = reference.getTypeArguments();
  return args.length === 0 ? '' : `<${args.map((a) => a.getText()).join(', ')}>`;
};

/**
 * Builds a rule that rewrites component names in ref positions to an exported `<Name>Ref` type.
 *
 * `keepTypeArguments` is the whole difference between the two exported-ref shapes: `CalendarRef<D>`
 * is generic exactly like the v5 `Calendar<D>` class, whereas `IconRef` and `ListRef` are not, so
 * `useRef<Icon<Partial<ImageProps>>>()` must lose its argument rather than carry it across.
 */
const exportedRefRule = (options: {
  id: string;
  description: string;
  docsAnchor: string;
  components: Readonly<Record<string, ComponentRefInfo>>;
  keepTypeArguments: boolean;
}): SourceRule => {
  return {
    kind: 'source',
    id: options.id,
    description: options.description,
    mode: RuleMode.Automate,
    docsAnchor: options.docsAnchor,

    apply(file: SourceFile, context: RuleContext): RuleResult {
      const findTarget: TargetFinder = (current) => {
        const scope = uiKittenScopeOf(current);
        if (scope.names.size === 0 && scope.namespaces.size === 0) { return null; }

        for (const reference of typeReferencesOf(current)) {
          const componentName = uiKittenNameOf(reference, scope);
          if (!componentName) { continue; }

          const info = options.components[componentName];
          if (!info) { continue; }
          if (!isRefPosition(reference)) { continue; }

          const suffix = options.keepTypeArguments ? typeArgumentsText(reference) : '';

          if (!options.keepTypeArguments) {
            // `Icon<Partial<ImageProps>>` becomes `IconRef`, which can strand the `ImageProps`
            // import that existed only to spell the discarded argument.
            for (const argument of reference.getTypeArguments()) {
              for (const identifier of argument.getDescendantsOfKind(SyntaxKind.Identifier)) {
                context.orphanCandidates.add(identifier.getText());
              }
            }
          }

          // `UIKitten.Input` becomes `UIKitten.InputRef`: the namespace already exposes the ref
          // type, so no import is needed and adding one would shadow the namespace.
          const namespace = namespaceQualifierOf(reference, scope);
          const prefix = namespace ? `${namespace}.` : '';

          return {
            reference,
            componentName,
            replacement: `${prefix}${info.refType}${suffix}`,
            viaNamespace: Boolean(namespace),
          };
        }

        return null;
      };

      const edits = rewriteAll(options.id, file, context, findTarget, (current, componentName, target) => {
        if (target.viaNamespace) { return; }
        ensureNamedImport(current, UI_KITTEN_COMPONENTS, options.components[componentName].refType);
      });

      return { edits, findings: [] };
    },
  };
};

export const refTypeExported: SourceRule = exportedRefRule({
  id: 'ref-type-exported',
  description: 'Rewrite v5 component names in ref positions to the v6 exported ref type',
  docsAnchor: 'ref-types',
  components: EXPORTED_REF,
  keepTypeArguments: false,
});

export const refTypeGenericKeep: SourceRule = exportedRefRule({
  id: 'ref-type-generic-keep',
  description: 'Rewrite generic v5 component ref types, preserving the type argument',
  docsAnchor: 'ref-types',
  components: EXPORTED_REF_GENERIC,
  keepTypeArguments: true,
});

export const refTypeGenericDrop: SourceRule = exportedRefRule({
  id: 'ref-type-generic-drop',
  description: 'Rewrite Icon/List ref types, discarding the now-meaningless type argument',
  docsAnchor: 'ref-types',
  components: EXPORTED_REF_DROP_ARGS,
  keepTypeArguments: false,
});

/* -------------------------------------------------------------------------- */

const REACT_MODULE = 'react';

/** Whether `React` is bound in this file, so `React.ComponentRef<…>` is legal. */
const hasReactNamespace = (file: SourceFile): boolean => {
  return file.getImportDeclarations()
    .filter((declaration) => declaration.getModuleSpecifierValue() === REACT_MODULE)
    .some((declaration) => Boolean(declaration.getDefaultImport() ?? declaration.getNamespaceImport()));
};

/**
 * Components that take a ref whose ref type is not importable.
 *
 * `React.ComponentRef<typeof X>` is used rather than the underlying type because every alternative
 * is worse: `Button`, `ListItem`, `MenuItem` and `SelectItem` resolve to `TouchableWeb`, which lives
 * behind the `@ui-kitten/components/devsupport` subpath; `Text` resolves to react-native's `Text`,
 * which collides with the UI Kitten `Text` the file already imports; and `TabBar`/`ViewPager`
 * resolve to `TabBarRef`/`ViewPagerRef`, which v6 does not export at all. `ComponentRef` needs no
 * new import beyond React, which such a file already has.
 */
export const refTypeComponentRef: SourceRule = {
  kind: 'source',
  id: 'ref-type-componentref',
  description: 'Rewrite ref types with no importable v6 name to React.ComponentRef<typeof X>',
  mode: RuleMode.Automate,
  optional: true,
  docsAnchor: 'ref-types-without-an-exported-name',
  manualAction: 'Check any `React.ComponentRef<typeof X>` the codemod introduced — it needs @types/react 18.3 or newer; on older typings use the equivalent `React.ElementRef`.',

  apply(file: SourceFile, context: RuleContext): RuleResult {
    const findTarget: TargetFinder = (current) => {
      const scope = uiKittenScopeOf(current);
      if (scope.names.size === 0 && scope.namespaces.size === 0) { return null; }

      for (const reference of typeReferencesOf(current)) {
        const componentName = uiKittenNameOf(reference, scope);
        if (!componentName) { continue; }
        if (COMPONENT_REF[componentName] === undefined) { continue; }
        if (!isRefPosition(reference)) { continue; }

        // Keep the local spelling so aliased and namespaced imports still resolve.
        const localName = reference.getTypeName().getText();
        const qualifier = hasReactNamespace(current) ? 'React.' : '';

        return {
          reference,
          componentName,
          replacement: `${qualifier}ComponentRef<typeof ${localName}>`,
        };
      }

      return null;
    };

    const edits = rewriteAll(this.id, file, context, findTarget, (current) => {
      if (!hasReactNamespace(current)) {
        ensureNamedImport(current, REACT_MODULE, 'ComponentRef');
      }
    });

    return { edits, findings: [] };
  },
};
