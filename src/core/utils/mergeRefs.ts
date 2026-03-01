/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import type { Ref, MutableRefObject, RefCallback } from 'react';

type PossibleRef<T> = Ref<T> | undefined;

/**
 * Merges multiple refs into a single ref callback.
 * Useful when you need to pass a ref to both a parent component and use it internally.
 *
 * @example
 * ```tsx
 * const Component = forwardRef((props, ref) => {
 *   const internalRef = useRef(null);
 *   return <View ref={mergeRefs(ref, internalRef)} />;
 * });
 * ```
 */
export function mergeRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  return (value: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref !== null && ref !== undefined) {
        (ref as MutableRefObject<T | null>).current = value;
      }
    });
  };
}

/**
 * Sets a ref value, handling both callback refs and ref objects.
 */
export function setRef<T>(ref: PossibleRef<T>, value: T | null): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref !== null && ref !== undefined) {
    (ref as MutableRefObject<T | null>).current = value;
  }
}
