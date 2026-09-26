/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ControlMetaType,
  createStyle,
  MetaProcessor,
  needsAllVariantCases,
  SchemaType,
  StrictTheme,
  ThemedStyleType,
  ThemeStyleType,
} from '@ui-kitten/processor';

export interface StyleQuery {
  appearance: string;
  variants: string[];
  states: string[];
}

/**
 * A component entry that resolves style combinations on first request instead of holding
 * every pre-expanded combination. Shape-compatible with `ControlThemedStyleType`
 * (`meta` + `styles`), plus `resolve`.
 */
export interface OnDemandControlStyles {
  meta: ControlMetaType;
  styles: Record<string, ThemedStyleType>;
  resolve: (query: StyleQuery) => ThemedStyleType | undefined;
}

const SEPARATOR = '.';

/**
 * Builds the `{ [component]: { meta, styles, resolve } }` structure without processing the
 * mapping. `resolve` computes one appearance/variant/state combination with the processor's own
 * `createStyle` (identical merge order and strict-token substitution to the eager expansion) and
 * memoizes it under the same key the eager processor would have generated.
 *
 * Validation mirrors what the eager key set encodes: the appearance must exist, every variant
 * value must belong to a variant group (all groups covered unless the component has no default
 * path, in which case partial combinations are valid), and every state must be declared.
 */
export function createOnDemandStyles(schema: SchemaType): ThemeStyleType {
  const components = schema.components;
  const strictTheme: StrictTheme = new MetaProcessor().processStrictTheme(schema.strict || {});
  const result: Record<string, OnDemandControlStyles> = {};

  Object.keys(components).forEach((name: string) => {
    const meta: ControlMetaType = components[name].meta;
    const groupNames: string[] = Object.keys(meta.variantGroups);
    const stateNames: string[] = Object.keys(meta.states);
    const partialVariantsAllowed: boolean = needsAllVariantCases(components, name);

    // value -> group index, for ordering and validation
    const variantGroupIndex: Record<string, number> = {};
    groupNames.forEach((group: string, index: number) => {
      Object.keys(meta.variantGroups[group]).forEach((value: string) => {
        variantGroupIndex[value] = index;
      });
    });
    const stateIndex: Record<string, number> = {};
    stateNames.forEach((state: string, index: number) => {
      stateIndex[state] = index;
    });

    const cache: Map<string, ThemedStyleType> = new Map();
    const styles: Record<string, ThemedStyleType> = {};

    const resolve = (query: StyleQuery): ThemedStyleType | undefined => {
      if (!meta.appearances[query.appearance]) {
        return undefined;
      }
      const variants: string[] = [];
      const seenGroups: Set<number> = new Set();
      for (let i = 0; i < query.variants.length; i++) {
        const value = query.variants[i];
        const group = variantGroupIndex[value];
        if (group === undefined || seenGroups.has(group)) {
          return undefined;
        }
        seenGroups.add(group);
        variants.push(value);
      }
      if (!partialVariantsAllowed && variants.length !== groupNames.length) {
        return undefined;
      }
      const states: string[] = [];
      for (let i = 0; i < query.states.length; i++) {
        const state = query.states[i];
        if (stateIndex[state] === undefined || states.includes(state)) {
          return undefined;
        }
        states.push(state);
      }
      // Mapping order decides precedence, exactly as the eager key generation did.
      variants.sort((a, b) => variantGroupIndex[a] - variantGroupIndex[b]);
      states.sort((a, b) => stateIndex[a] - stateIndex[b]);

      const key = [query.appearance, ...variants, ...states].join(SEPARATOR);
      const cached = cache.get(key);
      if (cached) {
        return cached;
      }
      const style = createStyle(components, name, query.appearance, variants, states, strictTheme);
      cache.set(key, style);
      styles[key] = style;
      return style;
    };

    result[name] = { meta, styles, resolve };
  });

  return result as unknown as ThemeStyleType;
}
