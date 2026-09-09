---
id: accessibility
title: Accessibility
sidebar_label: Accessibility
description: What UI Kitten exposes to screen readers automatically, and what your app still has to provide.
keywords:
  - React Native
  - UI Kitten
  - Accessibility
  - VoiceOver
  - TalkBack
  - ARIA
---

# Accessibility

UI Kitten components expose roles, states and values to assistive technology — VoiceOver on
iOS, TalkBack on Android, and screen readers on the web via React Native Web.

Coverage is partial. This page states exactly which components are covered, what you still
have to supply yourself, and which parts of the library are not addressed yet.

## What is covered today

| Component | Role | State and value exposed |
| --- | --- | --- |
| `Button` | `button` | `disabled` |
| `Input` | — | `disabled`, name composed from `label` (and `caption` when `status='danger'`) |
| `CheckBox` | `checkbox` | `checked`, `mixed` when indeterminate, `disabled` |
| `Radio` | `radio` | `checked`, `disabled` |
| `RadioGroup` | `radiogroup` | groups its radios |
| `Toggle` | `switch` | `checked`, `disabled` |
| `Select` | `combobox` | `expanded`, `disabled` |
| `SelectItem` | `option` (`menuitem` on native) | `selected`, `disabled` |
| `ProgressBar` | `progressbar` | `0–100` value, or `busy` while indeterminate |
| `CircularProgressBar` | `progressbar` | `0–100` value |
| `Spinner` | `progressbar` | `busy` |
| `Modal`, `Popover` | — | `aria-modal`, iOS escape gesture closes the overlay |

`Tooltip`, `OverflowMenu`, `Select` and `Datepicker` all present through `Popover`, so they
inherit its modal semantics.

## What your app still has to provide

### Names for icon-only controls

React Native builds an element's accessible name by concatenating its child `Text` nodes.
`<Button>Save</Button>` therefore announces "Save" with no extra work. A button with only an
icon has no text to derive from, so it announces nothing useful:

```tsx
// Announces "Save"
<Button>Save</Button>

// Announces nothing — you must name it
<Button
  accessoryLeft={TrashIcon}
  aria-label='Delete item'
/>
```

The same applies to `TopNavigationAction` and any icon-only `OverflowMenu` trigger.

### Labels that are not plain strings

`Toggle` renders its label outside the touchable, and `Select` renders its label as a
sibling of the trigger, so neither is picked up by the automatic derivation. Both surface a
plain string label for you:

```tsx
// Announces "Dark mode"
<Toggle checked={checked}>Dark mode</Toggle>

// A render prop cannot be flattened to a string — name it yourself
<Toggle
  checked={checked}
  aria-label='Dark mode'
>
  {evaProps => <Text {...evaProps}>Dark mode</Text>}
</Toggle>
```

### A label for dismissable backdrops

`Modal` and `Popover` leave their backdrop unnamed, because the library ships no
translations and a hard-coded English string would be wrong for most apps. Supply one if you
want the backdrop to be reachable as a "close" control:

```tsx
<Modal
  visible={visible}
  backdropAccessibilityLabel='Close'
  onBackdropPress={onClose}
/>
```

Without it the backdrop stays out of the accessibility tree. Dismissal is still available
through the iOS escape gesture (two-finger Z) and the Android back button.

### Touch target sizes

Several Eva sizes fall below the 44×44pt iOS and 48×48dp Android minimums — `Button` at
`tiny` (24), `small` (32) and `medium` (40); `CheckBox` and `Radio` at 20×20; `Input` and
`Select` at `small` (32). Only `Button` at `large` (48) and `giant` (56) clear the bar.

The library does not silently expand these, because doing so would either change the visual
design or create overlapping touch areas in dense lists. If your app needs to meet
[WCAG 2.2 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html),
add padding around the control or use a larger size.

## Overriding what the library sets

Every accessibility prop is a default. Anything you pass wins, in either the modern or the
legacy spelling:

```tsx
// role becomes 'link', not 'button'
<Button role='link'>Open</Button>

// legacy props are honoured too
<CheckBox
  accessibilityRole='switch'
  accessibilityState={{ checked: false }}
/>
```

## Why `role` and `aria-*`

The library emits `role` and `aria-*` props rather than `accessibilityState` and
`accessibilityValue`.

React Native Web's `createDOMProps` reads `aria-*` and the flat deprecated `accessibility*`
props. It never reads the `accessibilityState` or `accessibilityValue` objects — it forwards
them untouched onto the DOM element, where they produce unknown-attribute warnings and no
ARIA state at all. A component built on them is fully accessible on native and completely
inaccessible on the web. React Native, meanwhile, resolves `aria-*` ahead of
`accessibilityState`, so `aria-*` is the one spelling that works on both.

`role` alone is not sufficient either: `TouchableOpacity`, which every interactive component
renders through, forwards `accessibilityRole` and ignores `role`. Both are emitted, so the
role survives on native and on the web.

A few ARIA roles have no React Native equivalent. `option` and `listbox` degrade to
`menuitem` and `list` on native, while the web keeps the exact ARIA role.

## Not covered yet

Ranked by how much they affect a screen reader user:

1. **Focus management in overlays.** `Modal`, `Popover`, `Tooltip` and `OverflowMenu` do not
   trap focus, do not move focus into the overlay on open, and do not restore it on close.
   React Native provides no focus-management primitive for this.
2. **`Menu`, `MenuItem`, `Drawer`, `ListItem`, `Card`** — no roles or states.
3. **`Tab`, `TabBar`, `TabView`, `BottomNavigation`, `TopNavigation`** — no `tab` / `tablist`
   roles and no selected state.
4. **`Autocomplete`** — no `combobox` semantics and no result-count announcements.
5. **`Calendar`, `RangeCalendar`, `Datepicker`, `RangeDatepicker`** — the date grid has no
   `grid` / `row` / `gridcell` roles and no roving focus.
6. **`ButtonGroup`, `ViewPager`, `Avatar`, `Icon`, `Divider`, `Layout`, `Text`** — no
   grouping or decorative-image semantics.
7. **`aria-controls` and `aria-activedescendant` on `Select`** — needs stable generated ids.

## Testing

Automated queries prove the props are set; they do not prove a screen reader reads the
result sensibly. Test with VoiceOver and TalkBack before claiming an app is accessible.

The library's own tests use the accessibility queries from
[`@testing-library/react-native`](https://callstack.github.io/react-native-testing-library/):

```tsx
import { render } from '@testing-library/react-native';

const { getByRole } = render(<CheckBox checked={true}>Remember me</CheckBox>);

expect(getByRole('checkbox')).toBeChecked();
expect(getByRole('checkbox')).toHaveAccessibleName('Remember me');
```
