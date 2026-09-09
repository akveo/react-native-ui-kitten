/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * Indentation a JSON file already uses.
 *
 * A `package.json` rewritten with the wrong indent produces a diff touching every line, which
 * buries the two lines the codemod actually changed.
 */
export const detectIndent = (source: string): string => {
  const match = /\n([ \t]+)"/.exec(source);
  return match ? match[1] : '  ';
};

/** Serialises with the file's own indentation and a trailing newline, as npm itself writes. */
export const stringifyLike = (value: unknown, source: string): string => {
  return `${JSON.stringify(value, null, detectIndent(source))}\n`;
};

/**
 * Reads a file as a project rule should: whatever an earlier rule in this run already decided to
 * write, falling back to what is on disk.
 */
export const readProjectFile = (
  pendingWrites: ReadonlyMap<string, string>,
  absolutePath: string,
  readFromDisk: (p: string) => string,
): string => {
  return pendingWrites.get(absolutePath) ?? readFromDisk(absolutePath);
};
