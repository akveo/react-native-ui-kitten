/**
 * Creates array from `source` parameter if needed
 *
 * @param source (T | T[]) - any object which should be wrapped to an array
 * @returns (T[]) - wrapped `source` if was need to wrap, `source` otherwise
 */

export function toArray<T>(source: T | T[]): T[] {
  if (Array.isArray(source)) {
    return source;
  }
  return [source];
}
