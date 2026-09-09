/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Node, SyntaxKind, type SourceFile } from 'ts-morph';
import { moduleSpecifierLiterals } from '../moduleSpecifiers';
import { RuleMode, type Finding, type RuleContext, type RuleResult, type SourceRule } from '../types';
import { UI_KITTEN_COMPONENTS } from '../uiKittenScope';

const excerpt = (node: Node): string => {
  return node.getText().split('\n')[0].trim().slice(0, 160);
};

/**
 * The `styled` decorator.
 *
 * `styled` is the only export v6 removed. It still exists in the source
 * (`src/components/theme/style/styled.tsx`), but nothing re-exports it and the package's `exports`
 * map declares no subpath that reaches it, so `import { styled } from '@ui-kitten/components'` is a
 * hard break rather than a deprecation.
 *
 * It is not rewritten because its replacement, `useStyled(name, options)`, is a hook: a decorated
 * class has to become a function component before the replacement is even applicable. That is a
 * restructuring, not a substitution, and getting it wrong is worse than saying so. `withStyles`,
 * `StyledComponentProps` and `EvaProp` are unaffected and still exported.
 */
export const styledDecorator: SourceRule = {
  kind: 'source',
  id: 'styled-decorator',
  description: 'Report uses of the removed `styled` decorator',
  mode: RuleMode.Report,
  docsAnchor: 'the-styled-decorator-was-removed',
  manualAction: 'Convert each `@styled(...)` class to a function component using the `useStyled` hook. `withStyles`, `StyledComponentProps` and `EvaProp` are unchanged, so a class that only needs theme values can move to `withStyles` instead.',

  apply(file: SourceFile, context: RuleContext): RuleResult {
    const relativePath = context.relative(file.getFilePath());
    const findings: Finding[] = [];

    const importsStyled = file.getImportDeclarations()
      .filter((declaration) => declaration.getModuleSpecifierValue() === UI_KITTEN_COMPONENTS)
      .flatMap((declaration) => declaration.getNamedImports())
      .some((named) => named.getName() === 'styled');

    if (!importsStyled) { return { edits: [], findings: [] }; }

    const decorators = file.getDescendantsOfKind(SyntaxKind.Decorator)
      .filter((decorator) => {
        const expression = decorator.getExpression();
        const callee = Node.isCallExpression(expression) ? expression.getExpression() : expression;
        return callee.getText() === 'styled';
      });

    for (const decorator of decorators) {
      findings.push({
        ruleId: this.id,
        file: relativePath,
        line: decorator.getStartLineNumber(),
        excerpt: excerpt(decorator),
        reason: '`styled` is not exported from `@ui-kitten/components` v6, and no subpath reaches it.',
        fix: 'Convert this class to a function component and call `useStyled(name, options)` inside it. If it only reads theme values, `withStyles` is still exported and needs no restructuring.',
      });
    }

    if (decorators.length === 0) {
      // Imported but used as a plain call — `styled('Name')(Component)`.
      const calls = file.getDescendantsOfKind(SyntaxKind.CallExpression)
        .filter((call) => call.getExpression().getText() === 'styled');

      for (const call of calls) {
        findings.push({
          ruleId: this.id,
          file: relativePath,
          line: call.getStartLineNumber(),
          excerpt: excerpt(call),
          reason: '`styled` is not exported from `@ui-kitten/components` v6, and no subpath reaches it.',
          fix: 'Replace the wrapper with the `useStyled` hook inside a function component, or with `withStyles` if the component only needs theme values.',
        });
      }

      if (calls.length === 0) {
        const declaration = file.getImportDeclarations()
          .find((candidate) => candidate.getModuleSpecifierValue() === UI_KITTEN_COMPONENTS);

        findings.push({
          ruleId: this.id,
          file: relativePath,
          line: declaration ? declaration.getStartLineNumber() : 1,
          excerpt: declaration ? excerpt(declaration) : "import { styled } from '@ui-kitten/components'",
          reason: '`styled` is imported but v6 does not export it, so this import fails to resolve.',
          fix: 'Remove the import and move any styled components to the `useStyled` hook or `withStyles`.',
        });
      }
    }

    return { edits: [], findings };
  },
};

/**
 * `lodash.merge`.
 *
 * v5's `@ui-kitten/components` depended on it, so an app importing it directly happened to work
 * without declaring it. v6 dropped the dependency, so that app now relies on a package it never
 * asked for.
 *
 * Nothing is removed here: `lodash.merge` was never part of the UI Kitten API, and an app's own
 * dependency is not the codemod's to delete. All that changed is who has to declare it.
 */
export const lodashMerge: SourceRule = {
  kind: 'source',
  id: 'lodash-merge',
  description: 'Report direct lodash.merge usage that v5 supplied transitively',
  mode: RuleMode.Report,
  docsAnchor: 'lodash-merge-is-no-longer-transitive',
  manualAction: 'Add `lodash.merge` to your own dependencies if you import it directly — v5 pulled it in through `@ui-kitten/components`, and v6 does not.',

  apply(file: SourceFile, context: RuleContext): RuleResult {
    const relativePath = context.relative(file.getFilePath());
    const findings: Finding[] = [];

    for (const literal of moduleSpecifierLiterals(file)) {
      if (literal.getLiteralValue() !== 'lodash.merge') { continue; }

      findings.push({
        ruleId: this.id,
        file: relativePath,
        line: literal.getStartLineNumber(),
        excerpt: excerpt(literal.getParent() ?? literal),
        reason: 'v5\'s `@ui-kitten/components` depended on `lodash.merge`, so this import resolved without being declared. v6 dropped that dependency.',
        fix: 'Add `lodash.merge` (and `@types/lodash.merge` if you use TypeScript) to your own `dependencies`. Nothing about the API changed — only who provides the package.',
      });
    }

    return { edits: [], findings };
  },
};
