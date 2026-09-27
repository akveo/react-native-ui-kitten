# @ui-kitten/components

## 6.1.1

### Patch Changes

- [#1890](https://github.com/akveo/react-native-ui-kitten/pull/1890) [`db10b60`](https://github.com/akveo/react-native-ui-kitten/commit/db10b60de5b108e2b88e82ae00d41443bb7c7aed) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Card` accepts `contentContainerStyle` for the view that wraps its children. It overrides the body padding that the mapping applies and takes flex properties such as `flexDirection`, so a card body can be laid out as a row or fill the card without wrapping the children in a negative-margin view.

- [#1889](https://github.com/akveo/react-native-ui-kitten/pull/1889) [`8f29793`](https://github.com/akveo/react-native-ui-kitten/commit/8f29793e4f9fe74e93f283575257e82f77239f45) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Stop `Modal` and `Popover` from vibrating by one pixel when their content has a fractional size. `MeasureElement` now reports whole points, and a re-measure that moves the content by at most one point no longer repositions it: native layout snaps a fractional width to the pixel grid, so the measured width alternated with every move and the modal repositioned itself forever.

- [#1887](https://github.com/akveo/react-native-ui-kitten/pull/1887) [`cabcbb8`](https://github.com/akveo/react-native-ui-kitten/commit/cabcbb8660e0c262b0609cf4cc9824e34911b1b6) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Remove the unused `BaseCalendarComponent` class. `Calendar` and `RangeCalendar` have been hook-based since 6.0.0, and the class kept a second copy of the min/max and navigation logic that no longer ran. `BaseCalendarProps` now lives in `baseCalendar.props.ts`; it was never exported from the package entry point, so nothing changes for consumers.

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

### Patch Changes

- [#1883](https://github.com/akveo/react-native-ui-kitten/pull/1883) [`2e817db`](https://github.com/akveo/react-native-ui-kitten/commit/2e817dbdda8e9f2c3e693f5e18e8f63fed023454) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Keep `focusable={false}` touchables out of the keyboard tab order on web. react-native-web's `Pressable` always sets an explicit `tabIndex`, which overrode `focusable`, so the tap-forwarding wrapper around `Input` had become an extra Tab stop before the text field.

- Updated dependencies [[`0c0bdff`](https://github.com/akveo/react-native-ui-kitten/commit/0c0bdff8792ac4642f16ec7fca0c68649dc108c5)]:
  - @ui-kitten/processor@6.1.0

## 6.0.2

### Patch Changes

- [#1882](https://github.com/akveo/react-native-ui-kitten/pull/1882) [`f9d07a9`](https://github.com/akveo/react-native-ui-kitten/commit/f9d07a9ca810a18834b928e8108f543650704691) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Calendar`, `RangeCalendar`, `Datepicker` and `RangeDatepicker` header arrows no longer page past an
  explicit `min` or `max`. Navigating in the month, year-picker and month-picker views clamps to the
  bounds, so a picker with `min={2020}` cannot be paged back to year -16 (#1759).

- [#1880](https://github.com/akveo/react-native-ui-kitten/pull/1880) [`6038239`](https://github.com/akveo/react-native-ui-kitten/commit/60382394566708e3b4cf9b8fc279eb5894411eb0) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Icon` no longer forwards DOM-only handlers (`onClick` and the mouse events) to the icon element on
  iOS and Android. `TouchableWithoutFeedback` and the other touchables clone React Native's full
  `Pressability` handler set onto their child, so an `Icon` rendered as a touchable's child received
  `onClick`; on the legacy architecture react-native-svg crashed with
  `-[RNSVGSvgView setOnClick]: unrecognized selector` (#1801, #1733). Responder handlers still pass
  through, and on web every handler is kept because they are real DOM props there.

- [#1882](https://github.com/akveo/react-native-ui-kitten/pull/1882) [`24d8793`](https://github.com/akveo/react-native-ui-kitten/commit/24d8793f163a3fa1cd106f0b4fac95339f1f5112) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `RangeCalendar` and `RangeDatepicker` never produce a range that spans a filtered day. Picking an end
  date on the far side of a day that `filter` disables restarts the range from that end date instead of
  silently including the disabled day (#1654).

- [#1880](https://github.com/akveo/react-native-ui-kitten/pull/1880) [`f4c271f`](https://github.com/akveo/react-native-ui-kitten/commit/f4c271f0f6f0673899670d072c7fadfc3fafc4a4) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Render props given as elements keep their own `style`. `accessoryLeft`, `accessoryRight`, `label`,
  `caption`, `title` and every other `RenderProp` accepted a React element, but the style the parent
  component passed in (a `Button`'s text style, an `Input`'s icon size) replaced the element's own,
  so `<Button accessoryLeft={<Icon style={{ width: 32 }} />} />` rendered at the default icon size.
  The element's style is now merged on top of the parent's defaults (#1497, #1792).

- [#1882](https://github.com/akveo/react-native-ui-kitten/pull/1882) [`018d6b2`](https://github.com/akveo/react-native-ui-kitten/commit/018d6b2a719bc5633ba6a0085005d6b9f263e1d7) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Select`'s `size` now reaches its options. `SelectOption` gains a `size` variant group in the Eva
  and Material mappings (`small`, `medium`, `large`: text size, row padding and icon size), `SelectItem`
  accepts `size`, and `Select` forwards its own `size` to every item, so `<Select size='large'>` no longer
  renders 15px rows regardless of size (#1417, #1764).

## 6.0.1

### Patch Changes

- [#1875](https://github.com/akveo/react-native-ui-kitten/pull/1875) [`8683243`](https://github.com/akveo/react-native-ui-kitten/commit/868324319a37495f40cfdbd1599d43198a587e41) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Datepicker` and `RangeDatepicker` render their placeholder with the Eva `placeholderColor` and
  the text font instead of the selected-value text style. The placeholder style was computed but
  never applied, so the placeholder and a selected date looked identical (#1224). Ported from
  #1240 by @rmarquois.

- [#1875](https://github.com/akveo/react-native-ui-kitten/pull/1875) [`db57a62`](https://github.com/akveo/react-native-ui-kitten/commit/db57a62a6bc2c7d850ed83fc8bcd690b31cc52aa) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Input` no longer loses its focused styling on web when the pointer enters or leaves the field.
  Eva has no combined hover + focused state, so the hover handlers used to replace the focused
  interaction with hover and then clear it on mouse-out, leaving a focused field styled as idle
  (#1401). Hover is now ignored while the field is focused. Ported from #1779 by @raqso.

## 6.0.0

### Major Changes

- [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a) Thanks [@bataevvlad](https://github.com/bataevvlad)! - UI Kitten v6: React 19, React Native 0.81, Expo 54, all components migrated to functional, ESM build system, New Architecture ready.

### Minor Changes

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`83bf8fd`](https://github.com/akveo/react-native-ui-kitten/commit/83bf8fd2e1aeed367e0fe7e6a6e9b7c93eeb7e7f) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Add accessibility support for `Button`, `Input`, `CheckBox`, `Radio`, `RadioGroup`, `Toggle`,
  `Select`, `SelectItem`, `ProgressBar`, `CircularProgressBar`, `Spinner`, `Modal` and `Popover`.

  These components now expose a role, and where applicable their checked, selected, expanded,
  disabled, busy and numeric value state, to VoiceOver, TalkBack and web screen readers. Before
  this change no component in the library set a single accessibility prop, so screen reader
  users received an unlabelled view hierarchy.

  The props are emitted as `role` and `aria-*` rather than `accessibilityState` and
  `accessibilityValue`. React Native Web does not read either of those objects, so the
  conventional spelling would have produced correct native output and no web accessibility at
  all. `accessibilityRole` is emitted alongside `role` because `TouchableOpacity` ignores
  `role`. Anything a consumer passes — in modern or legacy spelling — still takes precedence.

  Overlays gain `aria-modal` and support the iOS escape gesture. `Modal` and `Popover` accept a
  new `backdropAccessibilityLabel` prop; without it the backdrop stays out of the accessibility
  tree rather than appearing as an unnamed control.

  Coverage is deliberately partial. Focus management in overlays, `Menu`, `Drawer`, the
  navigation components, `Autocomplete` and the calendar grid are not addressed — see the
  accessibility guide for the full list and for the touch-target sizes that fall below the
  platform minimums.

  **Behaviour change:** `Select` previously discarded every pass-through prop before rendering
  its trigger, so `aria-label`, `accessibilityLabel` and other `TouchableWebProps` members
  declared by `SelectProps` had no effect. They now reach the trigger as the type always
  implied. Code that passed such a prop to `Select` and relied on it being ignored will see it
  apply.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`c0e274d`](https://github.com/akveo/react-native-ui-kitten/commit/c0e274d5afcd6b1ee7d96782419617b6e8b778bd) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Calendar navigation is now reachable for assistive technology. `Calendar`, `RangeCalendar`,
  `Datepicker` and `RangeDatepicker` accept `arrowLeftAccessibilityLabel` and
  `arrowRightAccessibilityLabel` to name the header's previous / next controls, which were
  unlabelled buttons before. Day, month and year cells expose a `button` role with their selected
  and disabled state.

  `Autocomplete` documents that the enclosing `ScrollView` or list needs
  `keyboardShouldPersistTaps='handled'`; with React Native's default the first tap on an option
  only dismisses the keyboard.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`6ce4786`](https://github.com/akveo/react-native-ui-kitten/commit/6ce4786b85b05611ee888c3b5cfbbdd46c21f463) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Modal` (and therefore `Popover`, `Select`, `Autocomplete`, `Datepicker`, `RangeDatepicker`,
  `Tooltip` and `OverflowMenu`) now presents its content through a root-level panel that
  `ApplicationProvider` renders around the app, instead of rendering the React Native `Modal`
  at the call site.

  **What moved.** The native modal is still a React Native `Modal`, but in the React tree it is
  now a sibling of the app content rather than a descendant of the view that opened it. With
  the keyboard open, a `ScrollView`, `FlatList` or `SectionList` with the default
  `keyboardShouldPersistTaps='never'` used to claim the first tap on modal content during the
  responder capture phase (root to target, first `true` wins) and only dismiss the keyboard, so
  an `Autocomplete` option needed two taps. Modal content is no longer inside that list, so a
  single tap selects. Setting `keyboardShouldPersistTaps='handled'` on the host list is no
  longer required; it stays harmless.

  **Nesting.** iOS presents one chain of modals only: a second modal presented from a view
  controller that is already presenting is refused. An overlay opened from inside a UI Kitten
  `Modal` therefore registers with that modal as its parent and renders inside the parent's
  native modal, so Select, Tooltip, Popover and Datepicker keep working inside a `Modal`.

  **Consumer contexts.** The presented element leaves the call site, so React contexts
  provided _below_ `ApplicationProvider` (navigation, i18n, form libraries, your own providers)
  are no longer visible inside modal content. UI Kitten's own theme and mapping contexts are
  bridged, so nested `ThemeProvider` overrides still apply. Either move those providers above
  `ApplicationProvider`, wrap the modal content in them, or opt a given modal out with the new
  `renderInline` prop on `Modal` and `Popover`, which restores the previous inline rendering
  (and the first-tap behaviour) for that modal and everything nested inside it.

  **Overlay inside your own React Native `Modal`.** Such an overlay has no hoisted parent and
  would be presented from the root, which iOS refuses while your modal is showing. Either wrap
  that modal's content in a nested `ApplicationProvider` (its panel then presents overlays from
  inside your modal) or pass `renderInline`. Rendering
  `<ModalPanelContext.Provider value={null}>` forces inline rendering for a whole subtree.

  A `Modal` rendered without any `ApplicationProvider` above it still works: it renders inline
  as before and warns once in development.

### Patch Changes

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`efe22dd`](https://github.com/akveo/react-native-ui-kitten/commit/efe22dd04ab91af058a77a82269d81eea4cc3900) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Fix Popover, Tooltip, OverflowMenu, Select, Autocomplete and Datepicker content rendering on top of
  its anchor on edge-to-edge Android (React Native 0.81+, Expo 54). React Native presents every
  `Modal` window edge-to-edge there, so the anchor position measured below the status bar is now
  shifted by the status bar height without requiring `ModalService.setShouldUseTopInsets`. Also
  guards the `shouldUseTopInsets` offset against a missing `StatusBar.currentHeight`.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`657fc23`](https://github.com/akveo/react-native-ui-kitten/commit/657fc23e8710a920454223f010ae0c886430d26a) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Stop shipping build leftovers in the published tarballs.

  builder-bob is configured with `source: "."`, so it swept the package root into the build output. Every ESM package published a `lib/module/package.json` that was a **copy of its own manifest** — with no `"type": "module"` field and a `main` pointing at a path that does not exist — alongside `lib/module/CHANGELOG.md` and `lib/module/tsconfig.build.json`. Toolchains that determine module type from the nearest `package.json` would read the ESM output as CommonJS; it only worked because Node falls back to syntax detection. bob now writes its own `{"type": "module"}` marker instead.

  `@ui-kitten/processor` also shipped 38 spec and spec-config files (its `!*.spec.*` exclusion only matched the package root, not `js/`), which is a third of the tarball.

- [`e8e14be`](https://github.com/akveo/react-native-ui-kitten/commit/e8e14bedfc93c86cfdc96947e7372b1c8e7f244b) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Declare the `./devsupport` subpath in `exports` and stop the package importing itself.

  Four internal modules imported through the package's own name — `progressBar` and
  `circularProgressBar` pulled from `@ui-kitten/components` itself, a circular import of the
  package barrel, while `modal` and `calendarHeader` reached in via undeclared subpaths.
  Metro reported these as `not listed in the "exports"` and fell back to file-based
  resolution; they now use relative imports.

  `./devsupport` is a real public surface (`RenderProp`, `TouchableWebElement`) and is now a
  declared export with its own types, react-native, source, and default conditions.
  Bundling a consumer app produces no `exports` warnings.

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

- [`73e517f`](https://github.com/akveo/react-native-ui-kitten/commit/73e517fdb764c5499938375bca750264e7777ddf) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Export `AutocompleteRef`, `InputRef`, and `ListRef` from the package root.

  All three were defined and exported by their own modules but never re-exported from the
  barrel, so consumers had no way to type a ref for `Autocomplete`, `Input`, or `List` —
  the same gap that made `IconRef` unusable in practice. They now sit alongside the
  already-exported `CalendarRef`, `DatepickerRef`, `RangeCalendarRef`, `RangeDatepickerRef`,
  and `SelectRef`.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`2bee712`](https://github.com/akveo/react-native-ui-kitten/commit/2bee712af38ba086eeee32b3966a173909ac4303) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Export the types used by public component props from the package root.

  `EvaStatus`, `EvaSize`, `EvaInputSize`, `LiteralUnion`, `RenderProp`, `RenderFCProp` and `ChildrenWithProps` type props such as `ButtonProps.status`, `.size` and `.accessoryLeft`, but were only reachable through `@ui-kitten/components/devsupport` — a path whose name tells users not to import it. Anyone typing a wrapper component needed them.

  `RenderProp` and `RenderFCProp` also now default their type parameter, so the documented bare spelling compiles:

  ```ts
  import type { RenderProp } from "@ui-kitten/components";

  const accessory: RenderProp = <Icon name="star" />; // previously: TS2314
  ```

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`48f2806`](https://github.com/akveo/react-native-ui-kitten/commit/48f280674cc91d7f122f14548d9e5514c8e8c6cb) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Stop leaking type errors into consumer projects under `strict` without `skipLibCheck`.

  Six errors reached apps that typecheck their `node_modules`:

  - `ThemedThemeType` declared an optional `__themeId` on an interface extending an index-signature type, which emitted a TS2411 error in `themeStore.d.ts`.
  - `withStyles` left its style generic unconstrained, so the returned `ThemedComponentClass` emitted two TS2344 errors.
  - `MomentDateService.localeData` is assigned via `setLocale()` from the constructor, which TypeScript cannot see (TS2564).
  - `DateFnsService` passed the optional `options.format` straight to date-fns (TS2345, twice).

  `@ui-kitten/moment` and `@ui-kitten/date-fns` publish no `.d.ts` and point `types` at their raw TypeScript, so their source is typechecked directly by consumers — the last two now compile cleanly under `strict`.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`918ef23`](https://github.com/akveo/react-native-ui-kitten/commit/918ef23f15cad205efbf26ec1a87ff5b66d9c8a6) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Input` no longer derives `@undefined/container` and `@undefined/input` test identifiers when
  no `testID` is passed. Derived identifiers are only emitted for an explicit `testID`, so the
  wrapper and the text field stay free of placeholder identifiers in the accessibility tree.
  Components that wrap `Input`, such as `Autocomplete`, are covered by the same guard.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`1d65240`](https://github.com/akveo/react-native-ui-kitten/commit/1d65240b75fdaa88305c89c5b4b6639f24676fc4) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Fix the web bundle breaking with `"TurboModuleRegistry" is not exported by "react-native-web"`.
  The edge-to-edge Android check in `MeasureElement` now reads the `DeviceInfo` constants through
  `NativeModules`, which react-native-web ships as a shim and bridgeless React Native forwards to the
  TurboModule registry, so web bundlers such as Vite, Rollup and webpack resolve the import again.

- [`92eedc8`](https://github.com/akveo/react-native-ui-kitten/commit/92eedc8a7d329caca1a363cf8cdab3a782e495df) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Ship generated type definitions instead of raw source.

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

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`f00c66b`](https://github.com/akveo/react-native-ui-kitten/commit/f00c66bcec65d0d088f7eaf52bc844b16f547c7e) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Accept elements for `TopNavigation` accessories, and fix `RTLService.isRTL()` on web.

  `TopNavigationProps.accessoryLeft` and `accessoryRight` were typed `() => ReactElement` while the JSDoc promised `ReactElement | () => ReactElement` and the runtime accepted both — the element form rendered correctly but failed to typecheck. They are now `RenderProp`, matching `Button` and the rest of the library.

  `RTLService.isRTL()` returned `I18nManager.isRTL` unguarded. react-native-web leaves that undefined, so a method declared to return `boolean` returned `undefined` on web, and `ignoreRTL()`'s default argument came out undefined with it.

- [#1871](https://github.com/akveo/react-native-ui-kitten/pull/1871) [`f8ca657`](https://github.com/akveo/react-native-ui-kitten/commit/f8ca65740fc59bf4d27c27bcd525a6a70e07f516) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Document the v5 → v6 migration and ship a codemod that performs most of it.

  `website/docs/migration/5x-to-6.md` is new: ref types, the React 19 fallout, the `styled` removal,
  the `@eva-design/*` moves, and the Jest change the ESM-only build requires.

  The codemod itself lives at `src/codemod` and is private for now, so it does not join the release
  set. Two documentation samples that still imported `@eva-design/eva` now import `@ui-kitten/eva`,
  matching the install instructions.

- Updated dependencies [[`657fc23`](https://github.com/akveo/react-native-ui-kitten/commit/657fc23e8710a920454223f010ae0c886430d26a), [`03cad37`](https://github.com/akveo/react-native-ui-kitten/commit/03cad375ea68dc1bb7f10871edc44ef9228d2c99), [`e6651ad`](https://github.com/akveo/react-native-ui-kitten/commit/e6651adc16b6157fed425cee44e563752470409a)]:
  - @ui-kitten/processor@6.0.0
  - @ui-kitten/mapping-base@6.0.0

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
