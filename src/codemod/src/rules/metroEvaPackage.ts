/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Node, SyntaxKind, type SourceFile } from 'ts-morph';
import { RuleMode, type Edit, type RuleContext, type RuleResult, type SourceRule } from '../types';

const MAX_PASSES = 100;

const MOVES: Readonly<Record<string, string>> = {
  '@eva-design/eva': '@ui-kitten/eva',
  '@eva-design/material': '@ui-kitten/material',
};

/**
 * The one place `@eva-design/eva` genuinely stops working under v6.
 *
 * `EvaConfigService.MAPPING_PACKAGE_NAMES` accepts only `@ui-kitten/eva` and `@ui-kitten/material`
 * (`src/metro-config/services/eva-config.service.ts:31`). Given anything else,
 * `validateConfigOrWarn` logs a warning and returns `false`, so build-time style generation stops
 * — silently, as far as a running app is concerned, because runtime processing takes over. In a
 * TypeScript metro config it is a compile error instead, since `EvaMappingPackageName` is that same
 * two-member union.
 *
 * This is why the rule is not optional even though `eva-mapping-import` is.
 */
export const metroEvaPackage: SourceRule = {
  kind: 'source',
  id: 'metro-eva-package',
  description: 'Point the metro config `evaPackage` at a mapping package v6 accepts',
  mode: RuleMode.Automate,
  docsAnchor: 'metro-config-evapackage',

  apply(file: SourceFile, context: RuleContext): RuleResult {
    const edits: Edit[] = [];
    const relativePath = context.relative(file.getFilePath());

    for (let pass = 0; pass < MAX_PASSES; pass += 1) {
      const assignment = file.getDescendantsOfKind(SyntaxKind.PropertyAssignment)
        .find((candidate) => {
          if (candidate.getName().replace(/['"]/g, '') !== 'evaPackage') { return false; }
          const initializer = candidate.getInitializer();
          return Boolean(initializer)
            && Node.isStringLiteral(initializer)
            && MOVES[initializer.getLiteralValue()] !== undefined;
        });

      if (!assignment) { return { edits, findings: [] }; }

      const initializer = assignment.getInitializerIfKindOrThrow(SyntaxKind.StringLiteral);
      const from = initializer.getLiteralValue();

      edits.push({
        ruleId: this.id,
        file: relativePath,
        line: initializer.getStartLineNumber(),
        before: from,
        after: MOVES[from],
      });

      initializer.setLiteralValue(MOVES[from]);
    }

    throw new Error(`${this.id}: exceeded ${MAX_PASSES} passes on ${file.getFilePath()}`);
  },
};
