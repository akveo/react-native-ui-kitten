/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Shallow props comparison for `React.memo`, identical to React's default.
 *
 * It is passed explicitly so that React keeps the memo wrapper as its own fiber for plain function
 * components too (React folds `memo(fn)` without a comparator into the function's fiber). That keeps
 * `UNSAFE_getByType(Component)` and similar type-based queries in existing test suites working.
 */
export const areEqualProps = (prev: object, next: object): boolean => {
  if (Object.is(prev, next)) {
    return true;
  }
  const prevKeys = Object.keys(prev);
  const nextKeys = Object.keys(next);
  if (prevKeys.length !== nextKeys.length) {
    return false;
  }
  for (let i = 0; i < prevKeys.length; i++) {
    const key = prevKeys[i];
    if (!Object.prototype.hasOwnProperty.call(next, key) || !Object.is(prev[key], next[key])) {
      return false;
    }
  }
  return true;
};
