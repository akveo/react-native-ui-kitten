# @ui-kitten/moment

## 6.2.1

### Patch Changes

- [#1936](https://github.com/akveo/react-native-ui-kitten/pull/1936) [`5c45109`](https://github.com/akveo/react-native-ui-kitten/commit/5c451099be089eb2c9984264b2ecf747216100be) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Add a README to every published package so the npm package page shows installation, usage and the v6 migration guide, point `homepage` at the documentation site, and publish `@ui-kitten/codemod` so `npx @ui-kitten/codemod` works.

## 6.1.1

### Patch Changes

- [#1888](https://github.com/akveo/react-native-ui-kitten/pull/1888) [`384758a`](https://github.com/akveo/react-native-ui-kitten/commit/384758af62a53b232dad44597224e4b55a55e754) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `MomentDateService.createDate` now builds a local-time moment, matching `today()` and `parse()`. It used `moment.utc`, so calendar dates constructed by the service drifted from "today" by the UTC offset.

## 6.0.2

### Patch Changes

- [#1882](https://github.com/akveo/react-native-ui-kitten/pull/1882) [`b326089`](https://github.com/akveo/react-native-ui-kitten/commit/b326089eefa35ee887e2159c4a5314bc868dfebe) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `MomentDateService.getDayOfWeekNames()` rotates the names to the locale's first day of week, matching
  `NativeDateService` and the calendar's column layout. Locales that start the week on Monday (for
  example `nl`, `de`, `en-gb`) showed the header one day off (#1603).
- Updated dependencies [[`f9d07a9`](https://github.com/akveo/react-native-ui-kitten/commit/f9d07a9ca810a18834b928e8108f543650704691), [`6038239`](https://github.com/akveo/react-native-ui-kitten/commit/60382394566708e3b4cf9b8fc279eb5894411eb0), [`24d8793`](https://github.com/akveo/react-native-ui-kitten/commit/24d8793f163a3fa1cd106f0b4fac95339f1f5112), [`f4c271f`](https://github.com/akveo/react-native-ui-kitten/commit/f4c271f0f6f0673899670d072c7fadfc3fafc4a4), [`018d6b2`](https://github.com/akveo/react-native-ui-kitten/commit/018d6b2a719bc5633ba6a0085005d6b9f263e1d7)]:
  - @ui-kitten/components@6.0.2

## 6.0.0

### Major Changes

- [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@bataevvlad](https://github.com/bataevvlad)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.

### Patch Changes

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`657fc23`](https://github.com/akveo/react-native-ui-kitten/commit/657fc23e8710a920454223f010ae0c886430d26a) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Stop shipping build leftovers in the published tarballs.

  builder-bob is configured with `source: "."`, so it swept the package root into the build output. Every ESM package published a `lib/module/package.json` that was a **copy of its own manifest** — with no `"type": "module"` field and a `main` pointing at a path that does not exist — alongside `lib/module/CHANGELOG.md` and `lib/module/tsconfig.build.json`. Toolchains that determine module type from the nearest `package.json` would read the ESM output as CommonJS; it only worked because Node falls back to syntax detection. bob now writes its own `{"type": "module"}` marker instead.

  `@ui-kitten/processor` also shipped 38 spec and spec-config files (its `!*.spec.*` exclusion only matched the package root, not `js/`), which is a third of the tarball.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`561a0ac`](https://github.com/akveo/react-native-ui-kitten/commit/561a0acb5778f16c6aadd3cb8e1051fea295363b) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Ship a dual CommonJS + ES module build with type definitions that work under every
  TypeScript module resolution.

  `@ui-kitten/components` published ESM-only output whose `.d.ts` files sat in an ES-module
  scope (`lib/typescript/package.json` with `"type": "module"`) but used extensionless relative
  imports. Under `moduleResolution: node16` / `nodenext` TypeScript rejected them with TS2834,
  which made every root export disappear (`Module '"@ui-kitten/components"' has no exported
member 'Button'`). `@ui-kitten/date-fns`, `@ui-kitten/eva-icons` and `@ui-kitten/moment`
  pointed `main` at ESM without a `"type"` field and `types` at their raw `.ts` source, so they
  were reported as `Masquerading as CJS` and consumers compiled the library's TypeScript under
  their own tsconfig.

  All four packages now build `lib/commonjs`, `lib/module` and generated declarations for both
  (`lib/typescript/commonjs`, `lib/typescript/module`) via react-native-builder-bob, and the
  relative imports in the ESM declarations carry explicit `.js` extensions. `exports` exposes
  `import` and `require` conditions with matching `types`; the `react-native` and `source`
  conditions still resolve to the TypeScript source for Metro. `@arethetypeswrong/cli` reports
  no problems for `node10`, `node16` (CJS and ESM) and `bundler`.

  Every export object also ends with a `default` condition pointing at the CommonJS build with
  matching types, as a fallback for resolvers that match none of `source`, `react-native`,
  `import` or `require`.

  The dual layout costs tarball size. Measured with `npm pack` (bytes, gzip):

  | package                 | 6.0.0-beta.2 (ESM only) | dual build | dual build, trimmed |
  | ----------------------- | ----------------------: | ---------: | ------------------: |
  | `@ui-kitten/components` |                 375 697 |    479 774 |             421 524 |
  | `@ui-kitten/moment`     |                   3 780 |      6 240 |               5 458 |
  | `@ui-kitten/eva-icons`  |                   2 760 |      4 591 |               4 082 |
  | `@ui-kitten/date-fns`   |                   2 343 |      3 651 |               3 362 |

  The trimmed column drops the `.js.map` files from `lib/commonjs` (the `module` tree keeps its
  source maps). The `.d.ts.map` files are kept in both declaration trees: without them,
  go-to-definition lands on the generated `.d.ts` instead of the shipped `.ts` source. The
  remaining growth is the second JavaScript build and the second copy of the declarations,
  which is the price of resolving correctly under both `require` and `import`.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`48f2806`](https://github.com/akveo/react-native-ui-kitten/commit/48f280674cc91d7f122f14548d9e5514c8e8c6cb) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Stop leaking type errors into consumer projects under `strict` without `skipLibCheck`.

  Six errors reached apps that typecheck their `node_modules`:

  - `ThemedThemeType` declared an optional `__themeId` on an interface extending an index-signature type, which emitted a TS2411 error in `themeStore.d.ts`.
  - `withStyles` left its style generic unconstrained, so the returned `ThemedComponentClass` emitted two TS2344 errors.
  - `MomentDateService.localeData` is assigned via `setLocale()` from the constructor, which TypeScript cannot see (TS2564).
  - `DateFnsService` passed the optional `options.format` straight to date-fns (TS2345, twice).

  `@ui-kitten/moment` and `@ui-kitten/date-fns` publish no `.d.ts` and point `types` at their raw TypeScript, so their source is typechecked directly by consumers — the last two now compile cleanly under `strict`.

- Updated dependencies [[`83bf8fd`](https://github.com/akveo/react-native-ui-kitten/commit/83bf8fd2e1aeed367e0fe7e6a6e9b7c93eeb7e7f), [`efe22dd`](https://github.com/akveo/react-native-ui-kitten/commit/efe22dd04ab91af058a77a82269d81eea4cc3900), [`c0e274d`](https://github.com/akveo/react-native-ui-kitten/commit/c0e274d5afcd6b1ee7d96782419617b6e8b778bd), [`657fc23`](https://github.com/akveo/react-native-ui-kitten/commit/657fc23e8710a920454223f010ae0c886430d26a), [`e8e14be`](https://github.com/akveo/react-native-ui-kitten/commit/e8e14bedfc93c86cfdc96947e7372b1c8e7f244b), [`561a0ac`](https://github.com/akveo/react-native-ui-kitten/commit/561a0acb5778f16c6aadd3cb8e1051fea295363b), [`73e517f`](https://github.com/akveo/react-native-ui-kitten/commit/73e517fdb764c5499938375bca750264e7777ddf), [`2bee712`](https://github.com/akveo/react-native-ui-kitten/commit/2bee712af38ba086eeee32b3966a173909ac4303), [`48f2806`](https://github.com/akveo/react-native-ui-kitten/commit/48f280674cc91d7f122f14548d9e5514c8e8c6cb), [`918ef23`](https://github.com/akveo/react-native-ui-kitten/commit/918ef23f15cad205efbf26ec1a87ff5b66d9c8a6), [`1d65240`](https://github.com/akveo/react-native-ui-kitten/commit/1d65240b75fdaa88305c89c5b4b6639f24676fc4), [`6ce4786`](https://github.com/akveo/react-native-ui-kitten/commit/6ce4786b85b05611ee888c3b5cfbbdd46c21f463), [`92eedc8`](https://github.com/akveo/react-native-ui-kitten/commit/92eedc8a7d329caca1a363cf8cdab3a782e495df), [`f00c66b`](https://github.com/akveo/react-native-ui-kitten/commit/f00c66bcec65d0d088f7eaf52bc844b16f547c7e), [`f8ca657`](https://github.com/akveo/react-native-ui-kitten/commit/f8ca65740fc59bf4d27c27bcd525a6a70e07f516), [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a)]:
  - @ui-kitten/components@6.0.0

## 6.0.0-beta.1

### Major Changes

- [#1862](https://github.com/akveo/react-native-ui-kitten/pull/1862) [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@github-actions](https://github.com/apps/github-actions)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.

### Patch Changes

- Updated dependencies [[`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a)]:
  - @ui-kitten/components@6.0.0-beta.1
