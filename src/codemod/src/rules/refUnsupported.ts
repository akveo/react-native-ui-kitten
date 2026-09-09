/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Node, SyntaxKind, type SourceFile } from 'ts-morph';
import { COMPONENT_GROUPS, COMPONENT_REF, RefGroup } from '../componentMap';
import { isRefPosition, jsxRefAttribute } from '../refPositions';
import { RuleMode, type Finding, type RuleContext, type RuleResult, type SourceRule } from '../types';
import { uiKittenJsxNameOf, uiKittenNameOf, uiKittenScopeOf, typeReferencesOf } from '../uiKittenScope';

const excerptOf = (node: Node): string => {
  return node.getText().split('\n')[0].trim().slice(0, 160);
};

/**
 * Everything ref-shaped that the codemod refuses to rewrite.
 *
 * Three distinct situations end up here, and the report distinguishes them because the manual fix
 * differs:
 *
 *  - the component became a plain function component and accepts no ref at all;
 *  - a v5 component name is used as a type somewhere that is not a ref, so there is no mechanical
 *    v6 equivalent — the class it named no longer exists;
 *  - `ref-type-componentref` was skipped, so its targets need a hand-written ref type.
 */
export const refUnsupported: SourceRule = {
  kind: 'source',
  id: 'ref-unsupported',
  description: 'Report refs on components that no longer accept one, and non-ref type positions',
  mode: RuleMode.Report,
  docsAnchor: 'components-that-no-longer-accept-a-ref',
  manualAction: 'Remove `ref` from components that are plain function components in v6 (Tooltip, OverflowMenu, Modal, Card, Menu, Drawer and the rest listed in the report), or drive them through their props instead.',

  apply(file: SourceFile, context: RuleContext): RuleResult {
    const scope = uiKittenScopeOf(file);
    if (scope.names.size === 0 && scope.namespaces.size === 0) {
      return { edits: [], findings: [] };
    }

    const relativePath = context.relative(file.getFilePath());
    const findings: Finding[] = [];

    const componentRefEnabled = context.enabledRuleIds.has('ref-type-componentref');

    for (const reference of typeReferencesOf(file)) {
      const componentName = uiKittenNameOf(reference, scope);
      if (!componentName) { continue; }

      const group = COMPONENT_GROUPS[componentName];
      if (group === undefined || group === RefGroup.StillClass) { continue; }

      if (!isRefPosition(reference)) {
        findings.push({
          ruleId: this.id,
          file: relativePath,
          line: reference.getStartLineNumber(),
          excerpt: excerptOf(reference.getParent() ?? reference),
          reason: `\`${componentName}\` was a class in v5, so its name doubled as an instance type. In v6 it is a function component, and this type position is not a ref, so there is no mechanical replacement.`,
          fix: `Decide what the annotation was for. If it was holding a ref, wrap it in \`React.RefObject<…>\` and re-run the codemod; otherwise replace it with the prop type (\`${componentName}Props\`) or the element type (\`${componentName}Element\`).`,
        });
        continue;
      }

      if (group === RefGroup.NoRef) {
        findings.push({
          ruleId: this.id,
          file: relativePath,
          line: reference.getStartLineNumber(),
          excerpt: excerptOf(reference.getParent() ?? reference),
          reason: `\`${componentName}\` is a plain function component in v6 and accepts no ref.`,
          fix: `Remove the ref. If it was used to call an imperative method, drive \`${componentName}\` through its props instead — v5 exposed no public methods on it either.`,
        });
        continue;
      }

      if (group === RefGroup.ComponentRef && !componentRefEnabled) {
        findings.push({
          ruleId: this.id,
          file: relativePath,
          line: reference.getStartLineNumber(),
          excerpt: excerptOf(reference.getParent() ?? reference),
          reason: `\`${componentName}\` forwards its ref to \`${COMPONENT_REF[componentName]}\`, which v6 does not export under that name. \`ref-type-componentref\` was skipped for this run.`,
          fix: `Replace \`${componentName}\` here with \`React.ComponentRef<typeof ${componentName}>\`, or re-run without \`--skip=ref-type-componentref\`.`,
        });
      }
    }

    const openingElements = [
      ...file.getDescendantsOfKind(SyntaxKind.JsxOpeningElement),
      ...file.getDescendantsOfKind(SyntaxKind.JsxSelfClosingElement),
    ];

    for (const element of openingElements) {
      const componentName = uiKittenJsxNameOf(element.getTagNameNode().getText(), scope);
      if (!componentName) { continue; }
      if (COMPONENT_GROUPS[componentName] !== RefGroup.NoRef) { continue; }

      const attribute = jsxRefAttribute(element);
      if (!attribute) { continue; }

      findings.push({
        ruleId: this.id,
        file: relativePath,
        line: attribute.getStartLineNumber(),
        excerpt: excerptOf(element),
        reason: `\`<${componentName} ref={…}>\` — \`${componentName}\` is a plain function component in v6, so this is a type error and the ref is never populated.`,
        fix: 'Remove the `ref` prop. Removing it automatically is not safe: only you know whether the ref was load-bearing.',
      });
    }

    return { edits: [], findings };
  },
};
