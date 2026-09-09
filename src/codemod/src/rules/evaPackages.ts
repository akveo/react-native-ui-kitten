/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Node, type SourceFile } from 'ts-morph';
import { moduleSpecifierLiterals } from '../moduleSpecifiers';
import { RuleMode, type Edit, type RuleContext, type RuleResult, type SourceRule } from '../types';

const MAX_PASSES = 500;

/** Rewrites module specifiers according to a fixed map, in every import form. */
const specifierRule = (options: {
  id: string;
  description: string;
  docsAnchor: string;
  optional?: boolean;
  moves: Readonly<Record<string, string>>;
  /** Applied to the declaration after the specifier is rewritten. */
  afterRewrite?: (literal: Node) => void;
}): SourceRule => {
  return {
    kind: 'source',
    id: options.id,
    description: options.description,
    mode: RuleMode.Automate,
    optional: options.optional,
    docsAnchor: options.docsAnchor,

    apply(file: SourceFile, context: RuleContext): RuleResult {
      const edits: Edit[] = [];
      const relativePath = context.relative(file.getFilePath());

      for (let pass = 0; pass < MAX_PASSES; pass += 1) {
        const literal = moduleSpecifierLiterals(file)
          .find((candidate) => options.moves[candidate.getLiteralValue()] !== undefined);

        if (!literal) { return { edits, findings: [] }; }

        const from = literal.getLiteralValue();
        const to = options.moves[from];

        edits.push({
          ruleId: options.id,
          file: relativePath,
          line: literal.getStartLineNumber(),
          before: from,
          after: to,
        });

        literal.setLiteralValue(to);
        options.afterRewrite?.(literal);
      }

      throw new Error(`${options.id}: exceeded ${MAX_PASSES} passes on ${file.getFilePath()}`);
    },
  };
};

/**
 * `@eva-design/dss` shipped 19 type declarations and zero runtime exports — its `index.js` body is
 * nothing but the `__esModule` marker. `@ui-kitten/processor` re-exports the same names from files
 * that are byte-identical to the originals (`diff -rq` reports no difference), so the move is a pure
 * rename and can safely be emitted as `import type`.
 */
export const importDss: SourceRule = specifierRule({
  id: 'import-dss',
  description: 'Move @eva-design/dss type imports to @ui-kitten/processor',
  docsAnchor: 'eva-design-dss-moved',
  moves: { '@eva-design/dss': '@ui-kitten/processor' },
  afterRewrite: (literal) => {
    const declaration = literal.getParent();
    if (Node.isImportDeclaration(declaration) && !declaration.isTypeOnly()) {
      // Safe precisely because the source package had no runtime exports to lose.
      declaration.setIsTypeOnly(true);
    }
  },
});

/**
 * `@eva-design/processor` exported only `SchemaProcessor`. `@ui-kitten/processor` exports that plus
 * `clearProcessorCache` and `getProcessorCacheStats`, so it is a strict superset.
 */
export const importEvaProcessor: SourceRule = specifierRule({
  id: 'import-eva-processor',
  description: 'Move @eva-design/processor imports to @ui-kitten/processor',
  docsAnchor: 'eva-design-processor-moved',
  moves: { '@eva-design/processor': '@ui-kitten/processor' },
});

/**
 * The mapping packages.
 *
 * This one is a recommendation rather than a break, and the distinction matters enough to state
 * plainly: `@eva-design/eva@2.2.0` and `@ui-kitten/eva@6.0.0-beta.1` ship the same `mapping.json`
 * apart from the `$schema` pointer, which the processor never reads, and byte-identical themes.
 * A v5 app that keeps importing `@eva-design/eva` renders identically under v6 — proven by
 * `src/components/theme/application/evaDesignCompat.spec.tsx`.
 *
 * It is rewritten by default anyway, because `@ui-kitten/eva` is the version-matched, supported
 * source and is what `@ui-kitten/metro-config` requires. Users who want to stay on the Eva Design
 * packages can pass `--skip=eva-mapping-import`.
 */
export const evaMappingImport: SourceRule = specifierRule({
  id: 'eva-mapping-import',
  description: 'Point mapping imports at @ui-kitten/eva and @ui-kitten/material',
  docsAnchor: 'eva-design-eva',
  optional: true,
  moves: {
    '@eva-design/eva': '@ui-kitten/eva',
    '@eva-design/material': '@ui-kitten/material',
  },
});
