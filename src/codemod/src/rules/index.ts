/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { importDss, importEvaProcessor, evaMappingImport } from './evaPackages';
import { importHygiene } from './importHygiene';
import { jestTransformIgnore } from './jestTransformIgnore';
import { metroEvaPackage } from './metroEvaPackage';
import { packageDependencies } from './packageDependencies';
import { reactText, refObjectNullable, useRefNullArgument } from './react19';
import { refTypeComponentRef, refTypeExported, refTypeGenericDrop, refTypeGenericKeep } from './refTypes';
import { refUnsupported } from './refUnsupported';
import { lodashMerge, styledDecorator } from './reportOnly';
import type { ProjectRule, Rule, SourceRule } from '../types';

/**
 * Rule order matters in three places, and only three:
 *
 *  - the ref rewrites run before `useref-null-arg`, so the `null` is added to a call whose type
 *    argument is already the v6 one;
 *  - `refobject-nullable` runs after the ref rewrites for the same reason;
 *  - `import-hygiene` runs last, because it cleans up after everything else.
 *
 * Everything in between is order-independent.
 */
export const SOURCE_RULES: readonly SourceRule[] = [
  refTypeExported,
  refTypeGenericKeep,
  refTypeGenericDrop,
  refTypeComponentRef,
  useRefNullArgument,
  refObjectNullable,
  reactText,
  importDss,
  importEvaProcessor,
  evaMappingImport,
  metroEvaPackage,
  refUnsupported,
  styledDecorator,
  lodashMerge,
  importHygiene,
];

/** Project rules run after every source rule, so they can see the post-rewrite import graph. */
export const PROJECT_RULES: readonly ProjectRule[] = [
  packageDependencies,
  jestTransformIgnore,
];

export const ALL_RULES: readonly Rule[] = [...SOURCE_RULES, ...PROJECT_RULES];

export const ruleById = (id: string): Rule | undefined => {
  return ALL_RULES.find((rule) => rule.id === id);
};

export {
  evaMappingImport,
  importDss,
  importEvaProcessor,
  importHygiene,
  jestTransformIgnore,
  lodashMerge,
  metroEvaPackage,
  packageDependencies,
  reactText,
  refObjectNullable,
  refTypeComponentRef,
  refTypeExported,
  refTypeGenericDrop,
  refTypeGenericKeep,
  refUnsupported,
  styledDecorator,
  useRefNullArgument,
};
