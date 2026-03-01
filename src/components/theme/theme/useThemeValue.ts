/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useContext, useRef, useSyncExternalStore } from 'react';
import { ThemeStoreContext, ThemedThemeType } from './themeStore';

/**
 * Hook that only re-renders when the selected theme value changes.
 * Uses React 18's useSyncExternalStore for concurrent rendering support.
 *
 * @param selector - Function that extracts a value from the theme
 * @returns The selected value from the theme
 *
 * @example
 * ```tsx
 * // Only re-renders when color-primary-default changes
 * const primaryColor = useThemeValue(theme => theme['color-primary-default']);
 *
 * // Extract multiple related values
 * const colors = useThemeValue(theme => ({
 *   primary: theme['color-primary-default'],
 *   background: theme['background-basic-color-1'],
 * }));
 * ```
 */
export function useThemeValue<T>(selector: (theme: ThemedThemeType) => T): T {
  const store = useContext(ThemeStoreContext);

  if (!store) {
    throw new Error(
      'useThemeValue must be used within a ThemeProvider. ' +
      'Make sure your component is wrapped in ApplicationProvider or ThemeProvider.',
    );
  }

  // Ref to hold the latest selector - prevents recreating getSnapshot
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  // Ref to memoize previous result for referential equality
  const prevResultRef = useRef<T | undefined>(undefined);
  const prevThemeRef = useRef<ThemedThemeType | undefined>(undefined);

  const getSnapshot = (): T => {
    const theme = store.getSnapshot();

    // If theme hasn't changed, return cached result
    if (theme === prevThemeRef.current && prevResultRef.current !== undefined) {
      return prevResultRef.current;
    }

    const result = selectorRef.current(theme);

    // Check shallow equality for objects
    if (
      prevResultRef.current !== undefined &&
      shallowEqual(result, prevResultRef.current)
    ) {
      return prevResultRef.current;
    }

    prevThemeRef.current = theme;
    prevResultRef.current = result;
    return result;
  };

  const getServerSnapshot = (): T => {
    return selectorRef.current(store.getServerSnapshot());
  };

  return useSyncExternalStore(store.subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Hook for selecting multiple theme values efficiently.
 * Each selector is tracked independently for optimal re-render behavior.
 *
 * @param selectors - Object mapping names to selector functions
 * @returns Object with the selected values
 *
 * @example
 * ```tsx
 * const { primary, success, background } = useThemeValues({
 *   primary: theme => theme['color-primary-default'],
 *   success: theme => theme['color-success-default'],
 *   background: theme => theme['background-basic-color-1'],
 * });
 * ```
 */
export function useThemeValues<
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends Record<string, (theme: ThemedThemeType) => unknown>,
>(selectors: T): { [K in keyof T]: ReturnType<T[K]> } {
  const store = useContext(ThemeStoreContext);

  if (!store) {
    throw new Error(
      'useThemeValues must be used within a ThemeProvider. ' +
      'Make sure your component is wrapped in ApplicationProvider or ThemeProvider.',
    );
  }

  // Ref to hold latest selectors
  const selectorsRef = useRef(selectors);
  selectorsRef.current = selectors;

  // Ref for memoization
  const prevResultRef = useRef<{ [K in keyof T]: ReturnType<T[K]> } | undefined>(
    undefined,
  );
  const prevThemeRef = useRef<ThemedThemeType | undefined>(undefined);

  const getSnapshot = (): { [K in keyof T]: ReturnType<T[K]> } => {
    const theme = store.getSnapshot();

    // If theme hasn't changed, return cached result
    if (theme === prevThemeRef.current && prevResultRef.current !== undefined) {
      return prevResultRef.current;
    }

    const result = {} as { [K in keyof T]: ReturnType<T[K]> };

    for (const key in selectorsRef.current) {
      result[key] = selectorsRef.current[key](theme) as ReturnType<T[typeof key]>;
    }

    // Check if values actually changed
    if (
      prevResultRef.current !== undefined &&
      shallowEqualObjects(result, prevResultRef.current)
    ) {
      return prevResultRef.current;
    }

    prevThemeRef.current = theme;
    prevResultRef.current = result;
    return result;
  };

  const getServerSnapshot = (): { [K in keyof T]: ReturnType<T[K]> } => {
    const theme = store.getServerSnapshot();
    const result = {} as { [K in keyof T]: ReturnType<T[K]> };

    for (const key in selectorsRef.current) {
      result[key] = selectorsRef.current[key](theme) as ReturnType<T[typeof key]>;
    }

    return result;
  };

  return useSyncExternalStore(store.subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Shallow equality check for primitive values or objects.
 */
function shallowEqual<T>(a: T, b: T): boolean {
  if (a === b) {
    return true;
  }

  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  if (a === null || b === null) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every(
    (key) =>
      (a as Record<string, unknown>)[key] === (b as Record<string, unknown>)[key],
  );
}

/**
 * Shallow equality check specifically for objects.
 */
function shallowEqualObjects<T extends object>(a: T, b: T): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  return keysA.every(
    (key) =>
      (a as Record<string, unknown>)[key] === (b as Record<string, unknown>)[key],
  );
}
