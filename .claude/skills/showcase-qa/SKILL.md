---
name: showcase-qa
description: On-device regression sweep of every UI Kitten component using agent-device against the Expo showcase app (src/showcases). Use when asked to test the library on a simulator/emulator, hunt visual or interaction regressions, verify a component fix on device, or record/replay .ad scripts.
---

# Showcase QA with agent-device

Goal: drive the showcase app on a simulator, exercise every component section in all four
theme/mapping combinations, and report regressions with evidence. Facts about the app
(bundle id, test IDs, scripts) are in the repo `AGENTS.md`; read it first.

## 0. Preconditions (do once)

```bash
agent-device --version                       # must exist; never npx -y agent-device@latest
yarn showcases:start                         # Metro on :8081, background it (debug builds only)
yarn showcases:ios                           # prebuild + pod install + build + install
```

If `expo run:ios` fails with `Unable to boot device because we cannot determine the runtime
bundle`, pick a simulator whose runtime is installed: `xcrun simctl list devices available`, boot it
by UDID with `xcrun simctl boot <udid>`, then pass `--device <udid>`.

Do not run `agent-device doctor` as routine prep. Run it only when `open` fails.

## 1. Open

```bash
agent-device open com.uikitten.showcases --platform ios --relaunch --session qa
```

`open` returns the initial interactive snapshot. If it shows a LogBox/RedBox overlay, that is
finding #1: `screenshot --overlay-refs`, `react-devtools errors`, then
`agent-device react-native dismiss-overlay` and continue.

## 2. Sweep loop

The app is one `ScrollView` (`id="showcase-scroll"`). Sections in order:

Layout, Button, ButtonGroup, Input, CheckBox, Toggle, Radio, RadioGroup, Card, Avatar, Spinner,
ProgressBar, CircularProgressBar, Divider, Icon, List, ListItem, Menu, MenuItem, Select,
SelectItem, Popover, Tooltip, OverflowMenu, Modal, TopNavigation, TopNavigationAction,
BottomNavigation, BottomNavigationTab, Tab, TabBar, TabView, Drawer, DrawerItem, Calendar,
RangeCalendar, Datepicker, RangeDatepicker, Autocomplete, ViewPager.

For each section:

1. `agent-device scroll down --settle` until `id="section-<Name>-title"` is in the diff
   (or `agent-device wait 'id="section-<Name>-title"'` after a scroll).
2. `agent-device screenshot .agent-device/qa/<mapping>-<theme>/<Name>.png`.
3. Interact with what the section exposes, always with `--settle`, and verify from the diff:
   - Button/ButtonGroup: press each visible button; nothing should throw.
   - Input/Autocomplete: `fill` text, check the value echoes; `keyboard dismiss`.
   - CheckBox/Toggle/Radio/RadioGroup: press, verify `selected` flips (`is selected <selector>`).
   - Select/Datepicker/RangeDatepicker/Popover/Tooltip/OverflowMenu/Modal: press the trigger,
     verify the overlay content appears in the diff, pick an item, verify the overlay closes and
     the trigger reflects the choice. **Overlay not appearing, appearing at 0,0, or not closing
     is a regression.**
   - Calendar/RangeCalendar: press a day, verify selection; page next/prev month.
   - Tab/TabBar/TabView/BottomNavigation/ViewPager: press each tab, verify the selected
     indicator moves; swipe the ViewPager.
   - Menu/Drawer/List: press items, verify selection changes.
4. If a section looks wrong in the screenshot but the snapshot is fine, keep the screenshot as
   evidence and note it as "visual".

## 3. Theme / mapping matrix

Repeat the sweep for each of: Eva/Light (default), Eva/Dark, Material/Light, Material/Dark.
Switch with `press 'id="toggle-theme"' --settle` and `press 'id="toggle-mapping"' --settle`;
confirm via `get text 'id="theme-label"'`. Compare the screenshot of each section across the
four combinations; a section that renders identically in light and dark, or that loses
borders/contrast, is a theming regression.

## 4. Render health (optional, per suspect component)

```bash
agent-device react-devtools status
agent-device react-devtools wait --connected
agent-device react-devtools profile start
# interact with the suspect section a few times
agent-device react-devtools profile stop
agent-device react-devtools profile rerenders --limit 10
agent-device react-devtools profile slow --limit 5
```

Report render offenders separately from visual/interaction findings.

## 5. Save replays for the regression suite

For a flow worth guarding, re-run it with recording armed and durable selectors (ids/labels,
not `@refs`), then commit the script under `src/showcases/e2e/`:

```bash
agent-device open com.uikitten.showcases --platform ios --relaunch --session rec \
  --save-script src/showcases/e2e/<name>.ad
# ... steps using id="..." selectors and --settle ...
agent-device close --session rec
```

Every script must start with `context platform=ios` (add `context timeout=` if needed) so
`agent-device test` can discover it. Run the suite: `yarn e2e:ios`.

## Selector gotchas (verified on iOS simulator)

- Nodes exposed as `[other]` (CheckBox, Radio, MenuItem, SelectItem, calendar days, Datepicker
  input) do **not** match `label="..."` or `text="..."` selectors. Use the `@eN` ref from the latest
  `snapshot -i`, or `find "<text>" press --first|--last`.
- `press` has no `--first/--last`; `find` and `gesture` have no `--settle`. After `find ... press`,
  run `wait stable`.
- A text field's placeholder is not its label. Focus it by ref, then `type "<text>"`.
- `scroll <dir> <fraction>` lands by scroll physics, not exact offset. Loop
  `is visible 'id="section-<Name>-title"'` / `scroll down 0.5 --settle` instead of counting.
- `keyboard dismiss` fails on iOS (no dismiss key). Tap a neutral area, never the header buttons
  (`toggle-theme` / `toggle-mapping` sit at the top right and are easy to hit by accident).
- Never start Metro with `CI=1`: Expo disables watch mode ("reloads are disabled") and every edit
  after startup is silently ignored. Verify an edit landed by fetching the bundle:
  `curl -s 'http://127.0.0.1:8081/src/showcases/index.ts.bundle?platform=ios&dev=true' | grep -c <marker>`.
- Set `AGENT_DEVICE_SESSION=qa` in the shell rather than passing `--session` from a zsh variable;
  unquoted `$VAR` is not word-split in zsh.

- The iOS backend never exposes the `selected` trait: `is selected` errors on every element, even
  the active BottomNavigation tab, and `get attrs` lists only type/label/value/rect. Verify
  selection through visible state (label, value, diff) instead. Do not report "selected state
  missing" from agent-device output alone.
- Roles without a native iOS trait (checkbox, radio, menuitem) show as `[other]`. Check
  `snapshot --raw`: React Native folds role + state into `value`, e.g.
  `"value":"checkbox, checked"`, which is what VoiceOver announces. That is RN's design, not a
  library bug. Switch/button/text-field have native traits and show their own type.
- A `Card` exposes its children as one grouped `[other]` node ("Welcome…, SHOW TOOLTIP, DISMISS").
  `find "DISMISS" press --first` then taps the group's centre, not the button. Read the button's
  position from a screenshot and `press <x> <y> --settle`.
- Overlay content covers the header, so `press 'id="toggle-theme"'` while a Popover is open only
  closes the Popover. Flip the theme first, then open the overlay and inspect its colours.
- When two calendars are on screen (Calendar showcase + an open Datepicker), `label="16"` is
  ambiguous; the error lists candidates with `@eN~sM` refs, and the later one is the picker's.
  A bare `@eN` from an older snapshot may silently do nothing: prefer the `~s` form it printed.
- Closing a Tooltip by tapping "outside" must avoid the bubble itself; tap well below the anchor.
- A `TextInput` focused inside a `Modal` makes the first tap on a nested `Select` option only blur
  the input (Select's own list has no `keyboardShouldPersistTaps`). Tap twice or blur first.
- Android emulator: if the app shows "Unable to load script" and logcat says
  `Failed to connect to /10.0.2.2:8081`, the emulator's NAT is down. `adb reverse` plus editing
  `debug_http_host` does not stick (the app rewrites it to `10.0.2.2:8081` on launch). Use a
  Release build (`expo run:android --variant release`, embedded bundle) or reboot the emulator.
- `expo run:android --device` wants an AVD *name* (`Pixel_7_API_34`), not `emulator-5554`; with a
  single running emulator, omit it.

## 6. Close and report

`agent-device close --session qa`.

Report format (one bullet per finding, no praise):

- `<Component> · <mapping>/<theme> · <regression|visual|render|crash>`: what was expected, what
  happened, evidence path(s). Include the RN overlay text verbatim if one appeared.
- End with a table: component × combination, ✓ / ✗ / not exercised.
