/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Project, QuoteKind, ScriptTarget } from 'ts-morph';
import { ALL_RULES } from '../rules';
import { jestTransformIgnore, patchPattern } from '../rules/jestTransformIgnore';
import { packageDependencies } from '../rules/packageDependencies';
import type { ProjectRule, ProjectRuleResult, RuleContext } from '../types';
import { fallbackVersions } from '../versions';

/**
 * Project rules read and write real files, so they get a real (temporary) directory rather than the
 * in-memory filesystem the source-rule fixtures use.
 */
const withTempApp = <T>(files: Record<string, string>, body: (root: string) => T): T => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'uik-codemod-'));

  try {
    for (const [name, contents] of Object.entries(files)) {
      const filePath = path.join(root, name);
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, contents, 'utf8');
    }
    return body(root);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
};

const runProjectRule = (
  rule: ProjectRule,
  root: string,
  overrides: Partial<RuleContext> = {},
): ProjectRuleResult => {
  const project = new Project({
    compilerOptions: {
      allowJs: true,
      checkJs: false,
      jsx: 1 as never,
      target: ScriptTarget.ESNext,
      noEmit: true,
    },
    skipAddingFilesFromTsConfig: true,
    manipulationSettings: { quoteKind: QuoteKind.Single },
  });

  const context: RuleContext = {
    root,
    project,
    relative: (absolutePath: string) => path.relative(root, absolutePath),
    targetVersions: fallbackVersions(),
    enabledRuleIds: new Set(ALL_RULES.map((r) => r.id)),
    referencedModules: new Set<string>(),
    orphanCandidates: new Set<string>(),
    pendingWrites: new Map<string, string>(),
    ...overrides,
  };

  return rule.apply(context);
};

describe('pkg-deps', () => {

  const V5_MANIFEST = JSON.stringify({
    name: 'my-app',
    dependencies: {
      '@eva-design/eva': '^2.2.0',
      '@ui-kitten/components': '5.3.1',
      '@ui-kitten/eva-icons': '5.3.1',
      'react-native-svg': '^12.1.0',
    },
    devDependencies: {
      '@ui-kitten/metro-config': '5.3.1',
    },
    scripts: {
      bootstrap: 'ui-kitten bootstrap @eva-design/eva',
    },
  }, null, 2) + '\n';

  it('bumps UI Kitten ranges and swaps the mapping package', () => {
    withTempApp({ 'package.json': V5_MANIFEST }, (root) => {
      const result = runProjectRule(packageDependencies, root);
      const written = result.writes.get(path.join(root, 'package.json'));

      expect(written).toBeDefined();
      const manifest = JSON.parse(written as string);

      expect(manifest.dependencies['@ui-kitten/components']).toBe('^6.0.0-beta.2');
      expect(manifest.dependencies['@ui-kitten/eva-icons']).toBe('^6.0.0-beta.1');
      expect(manifest.devDependencies['@ui-kitten/metro-config']).toBe('^6.0.0-beta.1');

      // The mapping package is replaced, not merely added alongside.
      expect(manifest.dependencies['@eva-design/eva']).toBeUndefined();
      expect(manifest.dependencies['@ui-kitten/eva']).toBe('^6.0.0-beta.1');

      // `ui-kitten bootstrap @eva-design/eva` hits the same allow-list as metro.config.
      expect(manifest.scripts.bootstrap).toBe('ui-kitten bootstrap @ui-kitten/eva');
    });
  });

  it('preserves the file\'s own indentation', () => {
    const fourSpaces = JSON.stringify({
      name: 'my-app',
      dependencies: { '@ui-kitten/components': '5.3.1' },
    }, null, 4) + '\n';

    withTempApp({ 'package.json': fourSpaces }, (root) => {
      const result = runProjectRule(packageDependencies, root);
      const written = result.writes.get(path.join(root, 'package.json')) as string;

      expect(written).toContain('\n    "dependencies"');
      expect(written.endsWith('\n')).toBe(true);
    });
  });

  it('keeps @eva-design/eva when the import rewrite was skipped', () => {
    withTempApp({ 'package.json': V5_MANIFEST }, (root) => {
      const enabled = new Set(ALL_RULES.map((r) => r.id));
      enabled.delete('eva-mapping-import');

      const result = runProjectRule(packageDependencies, root, { enabledRuleIds: enabled });
      const written = result.writes.get(path.join(root, 'package.json')) as string;
      const manifest = JSON.parse(written);

      expect(manifest.dependencies['@eva-design/eva']).toBe('^2.2.0');
      expect(manifest.dependencies['@ui-kitten/eva']).toBeUndefined();
      expect(result.findings.map((f) => f.reason)).toContainEqual(
        expect.stringContaining('eva-mapping-import` was skipped'),
      );
    });
  });

  it('does not remove a retired package the code still imports', () => {
    const manifestWithDss = JSON.stringify({
      name: 'my-app',
      dependencies: {
        '@eva-design/dss': '^2.2.0',
        '@ui-kitten/components': '5.3.1',
      },
    }, null, 2) + '\n';

    withTempApp({ 'package.json': manifestWithDss }, (root) => {
      const stillImported = runProjectRule(packageDependencies, root, {
        referencedModules: new Set(['@eva-design/dss']),
      });
      const kept = JSON.parse(stillImported.writes.get(path.join(root, 'package.json')) as string);
      expect(kept.dependencies['@eva-design/dss']).toBe('^2.2.0');

      const noLongerImported = runProjectRule(packageDependencies, root, {
        referencedModules: new Set<string>(),
      });
      const dropped = JSON.parse(noLongerImported.writes.get(path.join(root, 'package.json')) as string);
      expect(dropped.dependencies['@eva-design/dss']).toBeUndefined();
    });
  });

  it('flags a missing react-native-svg peer instead of choosing a version', () => {
    const noSvg = JSON.stringify({
      name: 'my-app',
      dependencies: { '@ui-kitten/components': '5.3.1' },
    }, null, 2) + '\n';

    withTempApp({ 'package.json': noSvg }, (root) => {
      const result = runProjectRule(packageDependencies, root);
      expect(result.findings.map((f) => f.reason)).toContainEqual(
        expect.stringContaining('react-native-svg'),
      );
    });
  });

  it('does nothing when there is no package.json', () => {
    withTempApp({}, (root) => {
      const result = runProjectRule(packageDependencies, root);
      expect(result.writes.size).toBe(0);
      expect(result.edits).toHaveLength(0);
    });
  });
});

describe('jest-transform-ignore', () => {

  describe('patchPattern', () => {
    it('adds @ui-kitten to a flat alternation', () => {
      expect(patchPattern('node_modules/(?!(react-native|@react-native)/)'))
        .toBe('node_modules/(?!(react-native|@react-native|@ui-kitten)/)');
    });

    it('survives the nested groups the real React Native preset uses', () => {
      expect(patchPattern('node_modules/(?!((jest-)?react-native|@react-native(-community)?)/)'))
        .toBe('node_modules/(?!((jest-)?react-native|@react-native(-community)?|@ui-kitten)/)');
    });

    it('survives the Expo preset shape', () => {
      const expo = 'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*)/)';
      expect(patchPattern(expo))
        .toBe('node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@ui-kitten)/)');
    });

    it('leaves a pattern that already allows @ui-kitten', () => {
      expect(patchPattern('node_modules/(?!(react-native|@ui-kitten)/)')).toBeNull();
    });

    it('refuses shapes it does not recognise', () => {
      // No wrapping group: inserting an alternative here would change which packages are ignored.
      expect(patchPattern('node_modules/(?!react-native/)')).toBeNull();
      expect(patchPattern('/some/other/pattern/')).toBeNull();
    });
  });

  it('patches a jest.config.js', () => {
    const config = [
      "module.exports = {",
      "  preset: 'react-native',",
      "  transformIgnorePatterns: [",
      "    'node_modules/(?!(react-native|@react-native)/)',",
      "  ],",
      "};",
      '',
    ].join('\n');

    withTempApp({ 'jest.config.js': config }, (root) => {
      const result = runProjectRule(jestTransformIgnore, root);

      expect(result.edits).toHaveLength(1);
      expect(result.edits[0].after).toContain('@ui-kitten');

      // The config is a source file, so the change lands in the ts-morph project, not in `writes`.
      const file = result.writes.get(path.join(root, 'jest.config.js'));
      expect(file).toBeUndefined();
    });
  });

  it('patches a jest block inside package.json', () => {
    const manifest = JSON.stringify({
      name: 'my-app',
      jest: {
        preset: 'react-native',
        transformIgnorePatterns: ['node_modules/(?!(react-native|@react-native)/)'],
      },
    }, null, 2) + '\n';

    withTempApp({ 'package.json': manifest }, (root) => {
      const result = runProjectRule(jestTransformIgnore, root);
      const written = JSON.parse(result.writes.get(path.join(root, 'package.json')) as string);

      expect(written.jest.transformIgnorePatterns[0]).toContain('@ui-kitten');
    });
  });

  it('reports rather than invents a config that has no transformIgnorePatterns', () => {
    const manifest = JSON.stringify({
      name: 'my-app',
      jest: { preset: 'react-native' },
    }, null, 2) + '\n';

    withTempApp({ 'package.json': manifest }, (root) => {
      const result = runProjectRule(jestTransformIgnore, root);

      expect(result.writes.size).toBe(0);
      expect(result.findings).toHaveLength(1);
      expect(result.findings[0].fix).toContain('@ui-kitten');
      expect(result.findings[0].reason).toContain('ES modules only');
    });
  });

  it('does nothing when the app has no Jest setup', () => {
    withTempApp({ 'package.json': '{"name":"my-app"}\n' }, (root) => {
      const result = runProjectRule(jestTransformIgnore, root);
      expect(result.writes.size).toBe(0);
      expect(result.findings).toHaveLength(0);
    });
  });
});

describe('two project rules writing the same file', () => {

  /**
   * Regression: `pkg-deps` and `jest-transform-ignore` both target `package.json`. Before
   * `pendingWrites` existed, the second rule read the untouched file from disk and its write
   * silently discarded the first rule's dependency changes — which is exactly what the end-to-end
   * run surfaced.
   */
  it('keeps both rules\' changes', () => {
    const manifest = JSON.stringify({
      name: 'my-app',
      dependencies: {
        '@eva-design/eva': '^2.2.0',
        '@ui-kitten/components': '5.3.1',
      },
      jest: {
        preset: 'react-native',
        transformIgnorePatterns: ['node_modules/(?!(react-native|@react-native)/)'],
      },
    }, null, 2) + '\n';

    withTempApp({ 'package.json': manifest }, (root) => {
      const packageJsonPath = path.join(root, 'package.json');

      const first = runProjectRule(packageDependencies, root);
      const second = runProjectRule(jestTransformIgnore, root, {
        pendingWrites: first.writes,
      });

      const written = JSON.parse(second.writes.get(packageJsonPath) as string);

      // jest-transform-ignore's own change …
      expect(written.jest.transformIgnorePatterns[0]).toContain('@ui-kitten');
      // … and pkg-deps' changes, which it must not have thrown away.
      expect(written.dependencies['@ui-kitten/components']).toBe('^6.0.0-beta.2');
      expect(written.dependencies['@ui-kitten/eva']).toBe('^6.0.0-beta.1');
      expect(written.dependencies['@eva-design/eva']).toBeUndefined();
    });
  });
});
