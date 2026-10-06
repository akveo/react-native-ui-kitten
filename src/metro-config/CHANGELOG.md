# @ui-kitten/metro-config

## 6.2.1

### Patch Changes

- [#1936](https://github.com/akveo/react-native-ui-kitten/pull/1936) [`5c45109`](https://github.com/akveo/react-native-ui-kitten/commit/5c451099be089eb2c9984264b2ecf747216100be) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Add a README to every published package so the npm package page shows installation, usage and the v6 migration guide, point `homepage` at the documentation site, and publish `@ui-kitten/codemod` so `npx @ui-kitten/codemod` works.

- Updated dependencies [[`5c45109`](https://github.com/akveo/react-native-ui-kitten/commit/5c451099be089eb2c9984264b2ecf747216100be)]:
  - @ui-kitten/processor@6.2.1
  - @ui-kitten/mapping-base@6.2.1

## 6.0.2

### Patch Changes

- [#1882](https://github.com/akveo/react-native-ui-kitten/pull/1882) [`e4129c4`](https://github.com/akveo/react-native-ui-kitten/commit/e4129c47ca0894e468367019040027a1378b8081) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `@ui-kitten/metro-config` no longer replaces Metro's default reporter. `create()` returned its own
  `reporter` even when the project passed none, which shadowed Metro's `TerminalReporter` and silenced
  every bundler log line and warning (#1763). A reporter the project supplies is still wrapped so the
  `initialize_started` re-bootstrap keeps working.

## 6.0.0

### Major Changes

- [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@bataevvlad](https://github.com/bataevvlad)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.

### Patch Changes

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`2376396`](https://github.com/akveo/react-native-ui-kitten/commit/237639647c92e458028daa7059ffec72ec589944) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Fix `@ui-kitten/metro-config` being unusable from `metro.config.js`.

  The package is loaded by Node, not by Metro, but it was published as ESM only. `services/project.service.ts` used `__dirname`, which does not exist in ESM, so the documented usage threw `ReferenceError: __dirname is not defined in ES module scope` and took the whole Metro config down with it. The `ui-kitten` CLI binary was broken for a related reason: `bin/ui-kitten` required `../cli`, a directory that ships only TypeScript sources.

  - Build this package as CommonJS instead of ESM, and emit real `.d.ts` files instead of pointing `types` at the raw source.
  - Resolve the project root from `process.cwd()` rather than from the module's own location, which was also off by two directory levels in the compiled output.
  - Point the `ui-kitten` binary at the compiled CLI.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`5714ed0`](https://github.com/akveo/react-native-ui-kitten/commit/5714ed061d7facb807a17c4e3b149586795ac658) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Compile Eva styles when `metro.config.js` is loaded, not on a Metro reporter event.

  `MetroConfig.create()` only ran the bootstrap from its `reporter.update` handler when Metro
  emitted `initialize_started`. Tools that replace the reporter never delivered that event, so
  under Expo CLI (`expo start`, `expo export`) the cache in `node_modules/.cache/ui-kitten/` was
  never written and `@ui-kitten/eva/index.js` never received its `exports.styles` line. The
  bootstrap now runs eagerly and synchronously inside `create()`; the reporter hook is kept for
  bare Metro and still runs it again (idempotently) on `initialize_started`.

  Other fixes in the same package:

  - The custom-mapping watcher is installed from `create()` itself (so it also works under
    Expo CLI, which never delivers Metro's `initialize_started` event), and only when
    `customMappingPath` is a non-empty string pointing at an existing file. It polls with
    `persistent: false`, so a dev server keeps recompiling on changes while one-shot processes
    (`expo export`, a script that requires `metro.config.js`, the CLI) still exit on their own.
    Previously an absent path resolved to the project root, so `fs.watchFile('./')` polled the
    whole project directory every 100 ms and kept any Node process that loaded the config alive.
  - A missing or non-JSON custom mapping is reported as a `warn` naming the path that was tried,
    instead of crashing with `TypeError: Cannot read properties of null (reading 'length')`.
  - `BootstrapService.run` returns a boolean, and `ui-kitten bootstrap` sets exit code 1 on an
    unknown package, a project without Eva packages or a bad custom mapping, so CI can detect it.
  - The `exports.styles` line is appended without accumulating blank lines; the eva index always
    ends with exactly one newline after the append.
  - `success Successfully bootstrapped …` is only printed when the cache was written or the
    export line was appended. A no-op run prints nothing from the service; the CLI prints
    `info <package> styles are up to date` instead, so a `postinstall` or a bundler that
    bootstraps twice no longer repeats the success line.
  - The cache checksum now covers the eva mapping as well as the custom mapping, so the styles
    are rebuilt exactly when either file changed (including after upgrading the eva package)
    and are left alone otherwise.
  - Installed-package checks look at the file system instead of `require`-ing the eva package
    index. Once bootstrapped, that index requires the generated cache, so wiping
    `node_modules/.cache` used to make the next bootstrap report the package as not installed
    instead of regenerating the cache.

- Updated dependencies [[`657fc23`](https://github.com/akveo/react-native-ui-kitten/commit/657fc23e8710a920454223f010ae0c886430d26a), [`03cad37`](https://github.com/akveo/react-native-ui-kitten/commit/03cad375ea68dc1bb7f10871edc44ef9228d2c99), [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a)]:
  - @ui-kitten/processor@6.0.0
  - @ui-kitten/mapping-base@6.0.0

## 6.0.0-beta.1

### Major Changes

- [#1862](https://github.com/akveo/react-native-ui-kitten/pull/1862) [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@github-actions](https://github.com/apps/github-actions)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.

### Patch Changes

- Updated dependencies [[`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a)]:
  - @ui-kitten/processor@6.0.0-beta.1
  - @ui-kitten/mapping-base@6.0.0-beta.1
