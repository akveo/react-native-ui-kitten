/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Node, SyntaxKind, type SourceFile, type StringLiteral } from 'ts-morph';

/**
 * Every place a module specifier can appear, as string literals.
 *
 * Covers `import`/`export … from`, `require(…)` and dynamic `import(…)`. A v5 app written in
 * JavaScript reaches `@eva-design/eva` through `require`, so restricting this to `ImportDeclaration`
 * would quietly skip every `.js` file — the exact population the codemod exists to help.
 */
export const moduleSpecifierLiterals = (file: SourceFile): StringLiteral[] => {
  const literals: StringLiteral[] = [];

  for (const declaration of file.getImportDeclarations()) {
    literals.push(declaration.getModuleSpecifier());
  }

  for (const declaration of file.getExportDeclarations()) {
    const specifier = declaration.getModuleSpecifier();
    if (specifier) { literals.push(specifier); }
  }

  for (const call of file.getDescendantsOfKind(SyntaxKind.CallExpression)) {
    const expression = call.getExpression();
    const isRequire = Node.isIdentifier(expression) && expression.getText() === 'require';
    const isDynamicImport = expression.getKind() === SyntaxKind.ImportKeyword;
    if (!isRequire && !isDynamicImport) { continue; }

    const [first] = call.getArguments();
    if (first && Node.isStringLiteral(first)) { literals.push(first); }
  }

  return literals;
};
