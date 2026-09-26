# @ui-kitten/processor

## 6.0.0

### Major Changes

- [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@bataevvlad](https://github.com/bataevvlad)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.

### Patch Changes

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`657fc23`](https://github.com/akveo/react-native-ui-kitten/commit/657fc23e8710a920454223f010ae0c886430d26a) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Stop shipping build leftovers in the published tarballs.

  builder-bob is configured with `source: "."`, so it swept the package root into the build output. Every ESM package published a `lib/module/package.json` that was a **copy of its own manifest** — with no `"type": "module"` field and a `main` pointing at a path that does not exist — alongside `lib/module/CHANGELOG.md` and `lib/module/tsconfig.build.json`. Toolchains that determine module type from the nearest `package.json` would read the ESM output as CommonJS; it only worked because Node falls back to syntax detection. bob now writes its own `{"type": "module"}` marker instead.

  `@ui-kitten/processor` also shipped 38 spec and spec-config files (its `!*.spec.*` exclusion only matched the package root, not `js/`), which is a third of the tarball.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`03cad37`](https://github.com/akveo/react-native-ui-kitten/commit/03cad375ea68dc1bb7f10871edc44ef9228d2c99) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Stop publishing `js/src/tests/*`. The `files` field excluded `**/*.spec.*` and `**/__tests__/**`
  but not the `tests/` directory, so six test files (and their `.d.ts` / `.map`) shipped in
  `6.0.0-beta.1`. Every `@ui-kitten/*` package now excludes `**/__tests__/**`, `**/*.spec.*` and
  `**/tests/**` consistently.

## 6.0.0-beta.1

### Major Changes

- [#1862](https://github.com/akveo/react-native-ui-kitten/pull/1862) [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@github-actions](https://github.com/apps/github-actions)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.
