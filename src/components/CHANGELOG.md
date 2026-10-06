# @ui-kitten/components

## 6.2.1

### Patch Changes

- [#1936](https://github.com/akveo/react-native-ui-kitten/pull/1936) [`5c45109`](https://github.com/akveo/react-native-ui-kitten/commit/5c451099be089eb2c9984264b2ecf747216100be) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Add a README to every published package so the npm package page shows installation, usage and the v6 migration guide, point `homepage` at the documentation site, and publish `@ui-kitten/codemod` so `npx @ui-kitten/codemod` works.

- Updated dependencies [[`5c45109`](https://github.com/akveo/react-native-ui-kitten/commit/5c451099be089eb2c9984264b2ecf747216100be)]:
  - @ui-kitten/processor@6.2.1
  - @ui-kitten/mapping-base@6.2.1

## 6.2.0

### Minor Changes

- [#1926](https://github.com/akveo/react-native-ui-kitten/pull/1926) [`82b9931`](https://github.com/akveo/react-native-ui-kitten/commit/82b9931b926d4d909fc7a859405b3d96ebc7748e) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Avatar` gains `name` and `status`. Without a `source`, or when the image fails to load, `name` renders
  as initials (the first letter of the first two words) in a frame of the same size and shape, coloured by
  `status`, and is the avatar's accessible name. The Eva and Material `Avatar` mappings gain `textFontSize`
  per size, `textFontFamily` / `textFontWeight`, and a `status` variant group with `backgroundColor` /
  `textColor` (#1806).

- [#1922](https://github.com/akveo/react-native-ui-kitten/pull/1922) [`e4413ec`](https://github.com/akveo/react-native-ui-kitten/commit/e4413ec7eda65d87754ecc2cd15fe234e1eb47a2) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `ButtonGroup` no longer overwrites `appearance`, `status` and `size` set on a child `Button`; the child's
  values win over the group's. It also gains `selectedIndex` and `onSelect`: the selected button renders
  `filled` while the others keep the group appearance, and `onSelect` receives the index of the pressed
  button after that button's own `onPress`, which makes a segmented toggle a two-prop change (#1369).

- [#1925](https://github.com/akveo/react-native-ui-kitten/pull/1925) [`71e6a27`](https://github.com/akveo/react-native-ui-kitten/commit/71e6a2752b00e5827fe59aedfd3afcf93acd9949) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Datepicker` and `RangeDatepicker` gain `popoverProps`, props for the `Popover` that shows the calendar:
  `fullWidth` makes the calendar take the width of the control (the calendar already shrinks to its container
  since 6.1.3), `style` is merged after the built-in popover style, and `blocking`, `anchorContainerStyle` or
  `onBackdropPress` (called before the picker closes) pass through. `placement` and `backdropStyle` set directly
  on the picker win (#1707).

- [#1927](https://github.com/akveo/react-native-ui-kitten/pull/1927) [`30cdeb7`](https://github.com/akveo/react-native-ui-kitten/commit/30cdeb7350dbe4b1a99d690a1932c826c2990db2) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Input` gains `textInputRef`, a ref to the underlying React Native `TextInput`, for libraries that expect a
  native input (`setNativeProps`, `measure`, ...). The component ref keeps the `InputRef` API (`focus`, `blur`,
  `isFocused`, `clear`). `Autocomplete` forwards it to its `Input` (#1520).

- [#1929](https://github.com/akveo/react-native-ui-kitten/pull/1929) [`c1bbc79`](https://github.com/akveo/react-native-ui-kitten/commit/c1bbc7950bd4052bb279846ee33e1ceda1738bf6) Thanks [@bataevvlad](https://github.com/bataevvlad)! - New `PageIndicator`: dots for a `ViewPager`, one per page, the selected one wider and coloured by `status`.
  Feed it `selectedIndex`, optionally `progress` (`offset / pageWidth` from `onOffsetChange`) so the dots
  follow the swipe, and `onSelect` to jump to a pressed dot. Dot size, spacing and colours come from the new
  `PageIndicator` block of the Eva and Material mappings. `ViewPager` now forwards a consumer `onLayout` (the
  layout of its content strip, pages x page width) instead of dropping it (#1355).

- [#1916](https://github.com/akveo/react-native-ui-kitten/pull/1916) [`0fb3c97`](https://github.com/akveo/react-native-ui-kitten/commit/0fb3c9783370c11709ccb8775d9642b06498d178) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Select` accepts `listRef` and `listProps` (#1912): a ref to the `List` that renders the options and props forwarded to it such as `getItemLayout` or `initialScrollIndex`, so a long options list can be scrolled to the selected option when it opens.

- [#1923](https://github.com/akveo/react-native-ui-kitten/pull/1923) [`c9a4c75`](https://github.com/akveo/react-native-ui-kitten/commit/c9a4c75fdecffeb923b07433d7492dc224cfd6c4) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Select` gains `placement` (default `bottom`, the same values as `Autocomplete` and `Datepicker`) and
  `popoverProps`, props for the `Popover` that shows the options: `fullWidth` (still `true` by default; `false`
  sizes the list by its content or `style`), `blocking`, `anchorContainerStyle`, `backdropStyle`, `style` and
  `onBackdropPress`, which runs before the list closes (#1331).

- [#1928](https://github.com/akveo/react-native-ui-kitten/pull/1928) [`653516d`](https://github.com/akveo/react-native-ui-kitten/commit/653516d255776bd6cca3f700244ad9223f46deeb) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Typed theme tokens. `@ui-kitten/eva` exports `EvaThemeKey` (the union of every token in the light and dark
  themes) and `EvaTheme`, and types `light` / `dark` with it; `@ui-kitten/material` does the same with
  `MaterialThemeKey` / `MaterialTheme`. `@ui-kitten/components` exports `KnownThemeKey` (the union of both)
  and `ThemeKey` (`KnownThemeKey | string`); `ThemeType`, `useTheme()` and the `useThemeValue` selectors
  suggest the known tokens while custom tokens still type-check through the `string` index signature.
  The types are generated from the theme JSON files (`yarn theme-types:generate`, checked in CI) (#1682).

### Patch Changes

- [#1930](https://github.com/akveo/react-native-ui-kitten/pull/1930) [`a8db98a`](https://github.com/akveo/react-native-ui-kitten/commit/a8db98a4c0f8864bd4ad9da8a495e1a29991c672) Thanks [@bataevvlad](https://github.com/bataevvlad)! - On Android, text with the default `System` font family now keeps its exact `fontWeight`. React Native Android treats any `fontFamily` as a custom family and rounds the weight to regular or bold, so `500` / `600` text (subtitles, labels, radio and checkbox text, avatar initials) rendered regular. Styles resolved from the theme now leave the family unset when it is `System` on Android; iOS and custom families are unchanged.

- [#1931](https://github.com/akveo/react-native-ui-kitten/pull/1931) [`00168fa`](https://github.com/akveo/react-native-ui-kitten/commit/00168faf67b751e4879797be4ae31083b127a638) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Autocomplete` derives its input field's test ids from `testID` (`@@<testID>/input/input`, container `@@<testID>/input/container`) instead of the fixed `@@autocomplete/input/input`, so several autocompletes on one screen can be told apart in tests. Without a `testID` the field keeps the old id.

- [#1917](https://github.com/akveo/react-native-ui-kitten/pull/1917) [`ce75d36`](https://github.com/akveo/react-native-ui-kitten/commit/ce75d36bc2f9531b232a0077bbe1018afd34578a) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Button`, `CheckBox`, `Radio` and `Toggle` render nothing for an empty string label instead of an empty text node inside their `View` (#1913), which react-native-web reported as "Unexpected text node".

- [#1933](https://github.com/akveo/react-native-ui-kitten/pull/1933) [`ff7c701`](https://github.com/akveo/react-native-ui-kitten/commit/ff7c70135b51b458e5f0de664559bbb6d8ff7940) Thanks [@bataevvlad](https://github.com/bataevvlad)! - A numeric `0` label or title now renders as "0" instead of nothing. `FalsyText` (used for the labels, captions and titles of `Button`, `CheckBox`, `Radio`, `Toggle`, `Input`, `ListItem` and others) rendered nothing for any falsy value; it now skips only `null`, `undefined`, `false` and an empty string.

  Apps that hide a text prop with a number and `&&` now show a stray "0": `` description={count && `${count} items`} `` renders "0" when `count` is 0, as React itself does for `{0 && ...}`. Use `count > 0 && ...` instead.

- [#1921](https://github.com/akveo/react-native-ui-kitten/pull/1921) [`e42b131`](https://github.com/akveo/react-native-ui-kitten/commit/e42b131486c5661dcb51acb617a668f5e72f5e25) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Input`, `Select`, `Datepicker` and `RangeDatepicker` space their caption from the field by the mapping `captionMarginTop` (4 in Eva and Material); the token was defined but never applied, so captions sat flush under the field. The Eva mapping gains the token for `Input`, `Select` and `Datepicker` (Material already had it). The `Datepicker` popover no longer takes `captionMarginTop` as its bottom margin. Screens with captions move them 4 dp down.

- [#1915](https://github.com/akveo/react-native-ui-kitten/pull/1915) [`4c78a53`](https://github.com/akveo/react-native-ui-kitten/commit/4c78a53a6abeb1d194c84d9a1d14f538a8adc66b) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Modal` and `Popover` (so also `Select`, `Datepicker`, `RangeDatepicker`, `OverflowMenu`, `Tooltip`) allow every orientation by default (#1911). React Native's `Modal` supports portrait only when `supportedOrientations` is omitted, so a popover opened while the device was in landscape came up rotated. iOS still restricts the modal to the orientations in the app's `Info.plist`.

- [#1914](https://github.com/akveo/react-native-ui-kitten/pull/1914) [`6e656a9`](https://github.com/akveo/react-native-ui-kitten/commit/6e656a9c7c9491bc61742b51d44cf69c478db617) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Popover` (and `Select`, `Datepicker`, `Tooltip`, `OverflowMenu`) no longer draws its content at the window origin for a frame on the first open (#1910). The anchor keeps the same place in the element tree from the start, so opening the popover no longer remounts it (an `Autocomplete` field no longer loses focus on the first tap); a closed popover still measures nothing. The content stays off screen until the anchor frame is known and follows the anchor when its frame changes while open.

- [#1920](https://github.com/akveo/react-native-ui-kitten/pull/1920) [`a524b74`](https://github.com/akveo/react-native-ui-kitten/commit/a524b7486667f9c9fc547b7abd32162344e633b2) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Tooltip` (and any `Popover` with an `indicator`) keeps its arrow pointing at the anchor when the content was moved to stay on screen, for example a wide tooltip on a button near a screen edge: the arrow follows the anchor centre instead of staying in the middle of the tooltip, and stays inside the tooltip's edges.

- [#1919](https://github.com/akveo/react-native-ui-kitten/pull/1919) [`c9dd4e3`](https://github.com/akveo/react-native-ui-kitten/commit/c9dd4e351b0673eb34e4f801819d0d9e0701e8a1) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Popover` (and `Autocomplete`, `Select`, `Datepicker`, `Tooltip`, `OverflowMenu`) keeps its content out from under the software keyboard: the keyboard height is subtracted from the placement bounds, so a list that would open under the keyboard flips to the other side of the anchor, and the placement is redone when the keyboard appears or hides while the popover is open. A non-blocking popover (`Autocomplete`) now follows its anchor while the screen behind it scrolls, and hides the content while the anchor is out of view.

- [#1924](https://github.com/akveo/react-native-ui-kitten/pull/1924) [`6ac1299`](https://github.com/akveo/react-native-ui-kitten/commit/6ac12994ccc4b325cea2803be7c8a36c5864e6c3) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Select` scrolls its options to the selected one when the list opens (the first selected option of a
  multi-select, the group row of a grouped option), so a selection past the visible rows is in view on
  reopen. A `listProps.initialScrollIndex` takes over when set (#822).

- [#1934](https://github.com/akveo/react-native-ui-kitten/pull/1934) [`73e990f`](https://github.com/akveo/react-native-ui-kitten/commit/73e990f1ac4364faceb12531fcf2c263dee548e8) Thanks [@bataevvlad](https://github.com/bataevvlad)! - On web, clicking an `Autocomplete` option with the mouse selects it: the mouse-down no longer moves the focus away from the input, whose blur closed the list before the click arrived. `Modal` sets `pointerEvents` through its style, which removes react-native-web's "props.pointerEvents is deprecated" warning.

## 6.1.3

### Patch Changes

- [#1908](https://github.com/akveo/react-native-ui-kitten/pull/1908) [`c7c9d25`](https://github.com/akveo/react-native-ui-kitten/commit/c7c9d257fdb129fb76ba92c5731bccaa68d2ea42) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `Autocomplete` no longer opens its suggestions in a modal. The list floats above the app through the `ApplicationProvider` panel without a backdrop, so the first tap on a button beside the field reaches that button instead of only closing the list, and the field is a single real `TextInput`: `onFocus` / `onBlur` are its own focus events and `onBlur` fires when it loses focus. The list closes on blur, on selection, on submit and when the keyboard is dismissed. The default `placement` is now `bottom` (the `inner` placements cover the field). `Modal` and `Popover` gain a `blocking` prop (default `true`) that exposes the same non-blocking presentation.

- [#1905](https://github.com/akveo/react-native-ui-kitten/pull/1905) [`af419a3`](https://github.com/akveo/react-native-ui-kitten/commit/af419a391f044f2072c569c64cec9b6744bbc0f9) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Keep the `Datepicker` and `RangeDatepicker` calendar inside the window on screens narrower than the mapping's 344 dp calendar width (320 dp devices): the picker popover is clamped to the window width with an 8 dp inset on each side, and the `Calendar` / `RangeCalendar` container is capped at its parent width so day cells flex instead of the Saturday column being clipped at the right edge.

- [#1902](https://github.com/akveo/react-native-ui-kitten/pull/1902) [`f31918b`](https://github.com/akveo/react-native-ui-kitten/commit/f31918be525df9309851c6401f06fd37d1a0632c) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Stop adding the status bar height to measured frames on edge-to-edge Android with React Native 0.86 and newer. React Native 0.86 changed Android `measureInWindow` to report positions from the top of an edge-to-edge window, the same coordinate space its `Modal` windows use, so the compensation that closed the gap on 0.81 through 0.85 now pushed every `Select`, `Popover`, `Tooltip`, `Autocomplete`, `Datepicker` and `OverflowMenu` down by one status bar. The offset is now applied only on the React Native versions that still measure below the status bar.

- [#1903](https://github.com/akveo/react-native-ui-kitten/pull/1903) [`29c4424`](https://github.com/akveo/react-native-ui-kitten/commit/29c44246d822654e01beb949deca4de3a9769988) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Keep the press and focus highlight of `Toggle`, `CheckBox` and `Radio` rounded on Android. Fabric drops the border radius of a view whose background turns from transparent into a colour after it is mounted (facebook/react-native#52415, React Native 0.80 and newer), so the outline drew as a rectangle while pressed. The highlight now clips to its own shape.

- [#1907](https://github.com/akveo/react-native-ui-kitten/pull/1907) [`8ed10a6`](https://github.com/akveo/react-native-ui-kitten/commit/8ed10a608cf82be5c313e9adc19e2057cdd7bd67) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Add `anchorContainerStyle` to `Popover` (and through it `Tooltip` and `OverflowMenu`). The anchor is rendered inside a wrapper view that is measured for placement, so `flex` on the anchor element only sized it inside that wrapper and two popovers could not share a row; the new prop styles the wrapper itself.

- [#1906](https://github.com/akveo/react-native-ui-kitten/pull/1906) [`f73b265`](https://github.com/akveo/react-native-ui-kitten/commit/f73b265b3d1f72f6eebc97242e55cedefa4467cc) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Hide the non-selected `ViewPager` (and therefore `TabView`) pages from assistive technology. Every page stays mounted and translated off screen, so VoiceOver and TalkBack walked into pages the user could not see; the page wrappers now carry `aria-hidden` (`accessibilityElementsHidden` on iOS, `importantForAccessibility='no-hide-descendants'` on Android) for every index other than `selectedIndex`.

## 6.1.2

### Patch Changes

- [#1893](https://github.com/akveo/react-native-ui-kitten/pull/1893) [`c7efa0b`](https://github.com/akveo/react-native-ui-kitten/commit/c7efa0b8dc21e0be519da2b797d7193f02483f45) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Keep `Popover` and `Tooltip` content on screen. The content is now capped at the window width, so a long text measures the same wherever it is placed instead of one very wide line off screen, and when no placement fits next to the anchor the chosen frame is moved back inside the window rather than left cut off at the edge.

- [#1896](https://github.com/akveo/react-native-ui-kitten/pull/1896) [`07f77ac`](https://github.com/akveo/react-native-ui-kitten/commit/07f77acdb6783e9d9d76485d806ea7a1d87181c4) Thanks [@bataevvlad](https://github.com/bataevvlad)! - Style cache entries are now keyed by the compiled mapping as well, so a `customMapping` that changes at runtime restyles the components, and two `ApplicationProvider`s with different mappings no longer share styles. `ApplicationProvider` warns in development when `customMapping` is passed next to build-time `styles`, where it is ignored.

- [#1892](https://github.com/akveo/react-native-ui-kitten/pull/1892) [`7fcbe88`](https://github.com/akveo/react-native-ui-kitten/commit/7fcbe88f6aa4ad81e5726fa643a1bdf8be38680d) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `TopNavigation` renders the subtitle below the title for the default (`start`) alignment. The title container was a row, so the subtitle sat next to the title unless `alignment='center'` was set.

- [#1897](https://github.com/akveo/react-native-ui-kitten/pull/1897) [`9e38cc2`](https://github.com/akveo/react-native-ui-kitten/commit/9e38cc23a151b5ac8eae1de9115091ca4d9db8c4) Thanks [@bataevvlad](https://github.com/bataevvlad)! - `ViewPager` and `TabView` stay quiet while laid out at zero width. On react-native-web a navigator keeps inactive screens mounted but hidden, and the pager used to report `NaN` as the selected index from there, which re-triggered its own animation in a loop and left the tabs unresponsive once the screen was shown again.

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
