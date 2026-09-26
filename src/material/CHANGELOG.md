# @ui-kitten/material

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

## 6.0.0-beta.1

### Major Changes

- [#1862](https://github.com/akveo/react-native-ui-kitten/pull/1862) [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@github-actions](https://github.com/apps/github-actions)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.
