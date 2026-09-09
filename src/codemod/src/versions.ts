/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { execFileSync } from 'child_process';

/**
 * Used only when the registry cannot be reached.
 *
 * These are real published versions, not placeholders, so an offline run still produces a correct
 * `package.json` — just one that may lag the newest beta.
 */
const FALLBACK_VERSIONS: Readonly<Record<string, string>> = {
  '@ui-kitten/components': '6.0.0-beta.2',
  '@ui-kitten/eva': '6.0.0-beta.1',
  '@ui-kitten/material': '6.0.0-beta.1',
  '@ui-kitten/eva-icons': '6.0.0-beta.1',
  '@ui-kitten/metro-config': '6.0.0-beta.1',
  '@ui-kitten/date-fns': '6.0.0-beta.1',
  '@ui-kitten/moment': '6.0.0-beta.1',
};

const MINIMUM_MAJOR = 6;

const majorOf = (version: string): number => {
  return Number.parseInt(version.split('.')[0], 10);
};

const npmView = (spec: string): string | null => {
  try {
    const raw = execFileSync('npm', ['view', spec, 'version'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
      timeout: 30_000,
    });
    const version = raw.trim().split('\n').at(-1)?.trim();
    return version && version.length > 0 ? version : null;
  } catch {
    return null;
  }
};

/**
 * Resolves the version each package should be pinned to.
 *
 * Ranges are looked up when the codemod runs rather than baked into the source, so the tool does
 * not have to be republished every time a beta ships. When the requested dist-tag still points at
 * a v5 release — which is the case while v6 lives on the `beta` tag — the lookup retries against
 * `beta`, so the default works both before and after v6 becomes `latest`.
 */
export const resolveTargetVersions = (tag: string, offline: boolean): Map<string, string> => {
  const resolved = new Map<string, string>();

  for (const name of Object.keys(FALLBACK_VERSIONS)) {
    if (offline) {
      resolved.set(name, FALLBACK_VERSIONS[name]);
      continue;
    }

    let version = npmView(`${name}@${tag}`);

    if (version && majorOf(version) < MINIMUM_MAJOR && tag !== 'beta') {
      version = npmView(`${name}@beta`) ?? version;
    }

    if (!version || majorOf(version) < MINIMUM_MAJOR) {
      version = FALLBACK_VERSIONS[name];
    }

    resolved.set(name, version);
  }

  return resolved;
};

export const fallbackVersions = (): Map<string, string> => {
  return new Map(Object.entries(FALLBACK_VERSIONS));
};
