# @ui-kitten/eva

## 6.2.1

### Patch Changes

- [#1936](https://github.com/akveo/react-native-ui-kitten/pull/1936) [`5c45109`](https://github.com/akveo/react-native-ui-kitten/commit/5c451099be089eb2c9984264b2ecf747216100be) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Add a README to every published package so the npm package page shows installation, usage and the v6 migration guide, point `homepage` at the documentation site, and publish `@ui-kitten/codemod` so `npx @ui-kitten/codemod` works.

## 6.2.0

### Minor Changes

- [#1926](https://github.com/akveo/react-native-ui-kitten/pull/1926) [`82b9931`](https://github.com/akveo/react-native-ui-kitten/commit/82b9931b926d4d909fc7a859405b3d96ebc7748e) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Avatar` gains `name` and `status`. Without a `source`, or when the image fails to load, `name` renders
  as initials (the first letter of the first two words) in a frame of the same size and shape, coloured by
  `status`, and is the avatar's accessible name. The Eva and Material `Avatar` mappings gain `textFontSize`
  per size, `textFontFamily` / `textFontWeight`, and a `status` variant group with `backgroundColor` /
  `textColor` (#1806).

- [#1929](https://github.com/akveo/react-native-ui-kitten/pull/1929) [`c1bbc79`](https://github.com/akveo/react-native-ui-kitten/commit/c1bbc7950bd4052bb279846ee33e1ceda1738bf6) Thanks [@bataevvlad](https://github.com/bataevvlad)! - New `PageIndicator`: dots for a `ViewPager`, one per page, the selected one wider and coloured by `status`.
  Feed it `selectedIndex`, optionally `progress` (`offset / pageWidth` from `onOffsetChange`) so the dots
  follow the swipe, and `onSelect` to jump to a pressed dot. Dot size, spacing and colours come from the new
  `PageIndicator` block of the Eva and Material mappings. `ViewPager` now forwards a consumer `onLayout` (the
  layout of its content strip, pages x page width) instead of dropping it (#1355).

- [#1928](https://github.com/akveo/react-native-ui-kitten/pull/1928) [`653516d`](https://github.com/akveo/react-native-ui-kitten/commit/653516d255776bd6cca3f700244ad9223f46deeb) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Typed theme tokens. `@ui-kitten/eva` exports `EvaThemeKey` (the union of every token in the light and dark
  themes) and `EvaTheme`, and types `light` / `dark` with it; `@ui-kitten/material` does the same with
  `MaterialThemeKey` / `MaterialTheme`. `@ui-kitten/components` exports `KnownThemeKey` (the union of both)
  and `ThemeKey` (`KnownThemeKey | string`); `ThemeType`, `useTheme()` and the `useThemeValue` selectors
  suggest the known tokens while custom tokens still type-check through the `string` index signature.
  The types are generated from the theme JSON files (`yarn theme-types:generate`, checked in CI) (#1682).

### Patch Changes

- [#1921](https://github.com/akveo/react-native-ui-kitten/pull/1921) [`e42b131`](https://github.com/akveo/react-native-ui-kitten/commit/e42b131486c5661dcb51acb617a668f5e72f5e25) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Input`, `Select`, `Datepicker` and `RangeDatepicker` space their caption from the field by the mapping `captionMarginTop` (4 in Eva and Material); the token was defined but never applied, so captions sat flush under the field. The Eva mapping gains the token for `Input`, `Select` and `Datepicker` (Material already had it). The `Datepicker` popover no longer takes `captionMarginTop` as its bottom margin. Screens with captions move them 4 dp down.

## 6.0.2

### Patch Changes

- [#1882](https://github.com/akveo/react-native-ui-kitten/pull/1882) [`de7119f`](https://github.com/akveo/react-native-ui-kitten/commit/de7119f56fce774a02a4762a2c80284b56e04d86) Thanks [@bataevvlad](https://github.com/bataevvlad)! - A disabled ghost `Button` stays transparent. The `disabled` state of every ghost status set
  `backgroundColor` to the literal `color-basic-transparent-200`, painting a grey fill that no theme
  token could override (#1507).

- [#1882](https://github.com/akveo/react-native-ui-kitten/pull/1882) [`018d6b2`](https://github.com/akveo/react-native-ui-kitten/commit/018d6b2a719bc5633ba6a0085005d6b9f263e1d7) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Select`'s `size` now reaches its options. `SelectOption` gains a `size` variant group in the Eva
  and Material mappings (`small`, `medium`, `large`: text size, row padding and icon size), `SelectItem`
  accepts `size`, and `Select` forwards its own `size` to every item, so `<Select size='large'>` no longer
  renders 15px rows regardless of size (#1417, #1764).

## 6.0.1

### Patch Changes

- [#1875](https://github.com/akveo/react-native-ui-kitten/pull/1875) [`8683243`](https://github.com/akveo/react-native-ui-kitten/commit/868324319a37495f40cfdbd1599d43198a587e41) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Datepicker` with the default `basic` status now uses `text-basic-color` for the selected date,
  matching `Input` and `Select`. It used `text-hint-color`, the same value as its placeholder, so a
  selected date was indistinguishable from an empty picker (#1224).

## 6.0.0

### Major Changes

- [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@bataevvlad](https://github.com/bataevvlad)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.

### Patch Changes

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`2652958`](https://github.com/akveo/react-native-ui-kitten/commit/265295803872bef2249b954d912996fe3023774d) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Remove stale trailing blank lines from `index.js`, left behind by earlier `exports.styles`
  appends. The file now ends with a single newline.

## 6.0.0-beta.1

### Major Changes

- [#1862](https://github.com/akveo/react-native-ui-kitten/pull/1862) [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@github-actions](https://github.com/apps/github-actions)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.
