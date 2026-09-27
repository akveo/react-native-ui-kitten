# @ui-kitten/processor

## 6.1.0

### Minor Changes

- [#1883](https://github.com/akveo/react-native-ui-kitten/pull/1883) [`0c0bdff`](https://github.com/akveo/react-native-ui-kitten/commit/0c0bdff8792ac4642f16ec7fca0c68649dc108c5) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Resolve component styles on demand instead of expanding every appearance, variant and state combination when `ApplicationProvider` mounts.

  Runtime mapping processing used to build all 4051 style entries of the Eva mapping (about 1.8 MB) before the first frame, which took ~350 ms on a Pixel 7 emulator with Hermes and seconds on low-end Android phones. `ApplicationProvider` now builds a per-component resolver that compiles a single combination the first time a component asks for it and memoizes it. Startup cost drops to under 10 ms; the compiled styles are identical, and the `styles` prop produced by `@ui-kitten/metro-config` keeps working unchanged.

  `@ui-kitten/processor` now exports `createStyle`, `needsAllVariantCases` and `MetaProcessor`, which the resolver uses.

  Per-render work is reduced as well:

  - Every interactive component now presses through `Pressable` instead of `TouchableOpacity`. UI Kitten paints its own press, hover and focus states, so the opacity animation `TouchableOpacity` set up on every render did nothing visible and cost up to a quarter of render time. Public props are unchanged (`onMouseEnter` / `onMouseLeave` map to Pressable's hover events); refs now point at a `View`, and `activeOpacity` is ignored.
  - Exported components are wrapped in `React.memo`. A parent re-render with referentially equal props no longer re-renders them; theme changes still reach them. Inline callbacks, element children and render-prop accessories keep re-rendering as before, so hoist or memoize those to benefit.

    **Check for in-place mutation.** Because props are compared shallowly, a component whose data is mutated in place no longer re-renders: `items.push(item); setCount(count + 1)` leaves a `List`, `Menu`, `Select` or `Drawer` showing the old `items`, and `range.endDate = date` leaves a `RangeCalendar` unchanged. Create a new array or object instead (`setItems([...items, item])`, `setRange({ ...range, endDate: date })`), which is how React expects state to change anyway. Code that already follows that rule needs no change.

  - Theme compilation and style resolution use plain loops instead of `reduce` with object spread.
  - Component trees are shallower: `TouchableWeb` renders the `Pressable` itself, a label whose parent already resolved the full text style (Button, CheckBox, Toggle, Radio, ...) is a plain React Native `Text` instead of a second styled `Text`, and empty accessory or label slots render nothing. Refs from `TouchableWeb` keep pointing at the same class instance.
  - `Popover` (and `Tooltip`, `Select`, `Datepicker`, `OverflowMenu` through it) mounts its measurement and modal machinery the first time it becomes visible, so a screen full of closed popovers costs only the anchors.

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
