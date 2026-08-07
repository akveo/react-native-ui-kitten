# @ui-kitten/components

## 6.0.0-beta.2

### Patch Changes

- [#1868](https://github.com/akveo/react-native-ui-kitten/pull/1868) [`e8e14be`](https://github.com/akveo/react-native-ui-kitten/commit/e8e14bedfc93c86cfdc96947e7372b1c8e7f244b) Thanks [@github-actions](https://github.com/apps/github-actions)! - Declare the `./devsupport` subpath in `exports` and stop the package importing itself.

  Four internal modules imported through the package's own name — `progressBar` and
  `circularProgressBar` pulled from `@ui-kitten/components` itself, a circular import of the
  package barrel, while `modal` and `calendarHeader` reached in via undeclared subpaths.
  Metro reported these as `not listed in the "exports"` and fell back to file-based
  resolution; they now use relative imports.

  `./devsupport` is a real public surface (`RenderProp`, `TouchableWebElement`) and is now a
  declared export with its own types, react-native, source, and default conditions.
  Bundling a consumer app produces no `exports` warnings.

- [`73e517f`](https://github.com/akveo/react-native-ui-kitten/commit/73e517fdb764c5499938375bca750264e7777ddf) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Export `AutocompleteRef`, `InputRef`, and `ListRef` from the package root.

  All three were defined and exported by their own modules but never re-exported from the
  barrel, so consumers had no way to type a ref for `Autocomplete`, `Input`, or `List` —
  the same gap that made `IconRef` unusable in practice. They now sit alongside the
  already-exported `CalendarRef`, `DatepickerRef`, `RangeCalendarRef`, `RangeDatepickerRef`,
  and `SelectRef`.

- [#1868](https://github.com/akveo/react-native-ui-kitten/pull/1868) [`92eedc8`](https://github.com/akveo/react-native-ui-kitten/commit/92eedc8a7d329caca1a363cf8cdab3a782e495df) Thanks [@github-actions](https://github.com/apps/github-actions)! - Ship generated type definitions instead of raw source.

  `types` pointed at `./index.ts`, so consuming projects typechecked the library's own
  source under their tsconfig and saw 221 errors from `node_modules` — with no workaround,
  since `skipLibCheck` only skips `.d.ts` files. The package now builds `.d.ts` via
  react-native-builder-bob's `typescript` target and points `types` at
  `./lib/typescript/index.d.ts`.

  Fixing the 22 type errors that blocked declaration output also corrected real bugs:

  - `React.ReactText` was removed in React 19; replaced with `string | number` across 19 sites
  - `Calendar`'s `getViewMode()` was typed `() => string` but returns a `CalendarViewMode`
  - `TabView`'s view pager ref was typed as the component value rather than `ViewPagerRef`
  - `DatepickerProps` declared conflicting `onBlur`/`onFocus` inherited from `ViewProps`
  - `dateService` widened to `NativeDateService | DateService<D>` instead of `DateService<D>`

  `Button`, `Select`, and `Datepicker` now accept `string | number` for text props, matching
  `CheckBox`/`Toggle`/`Radio` and the runtime behaviour of `FalsyText`. Previously the
  idiomatic `<Button>TEXT</Button>` did not typecheck.

  Type-only changes — the compiled bundle is byte-identical.

## 6.0.0-beta.1

### Major Changes

- [#1862](https://github.com/akveo/react-native-ui-kitten/pull/1862) [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@github-actions](https://github.com/apps/github-actions)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.

### Patch Changes

- Updated dependencies [[`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a)]:
  - @ui-kitten/processor@6.0.0-beta.1
  - @ui-kitten/mapping-base@6.0.0-beta.1
