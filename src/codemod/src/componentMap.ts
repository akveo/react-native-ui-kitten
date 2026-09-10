/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

/**
 * GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Regenerate with:
 *   yarn build && node src/codemod/scripts/generate-component-map.cjs
 *
 * Derived from the built v6 typings (`src/components/lib/typescript/commonjs/index.d.ts`) and the
 * `v5.3.1` git tag. See src/codemod/VERIFIED.md for how each group was validated.
 */

/** What a v5 component name in a type position becomes under v6. */
export enum RefGroup {
  /** v6 exports a `<Name>Ref`; the v5 name had no type arguments. Rewrite 1:1. */
  ExportedRef = 'exported-ref',
  /** v6 exports a generic `<Name>Ref<D>`; a v5 type argument is preserved. */
  ExportedRefGeneric = 'exported-ref-generic',
  /** v6 exports a non-generic `<Name>Ref`, but the v5 class was generic; drop the argument. */
  ExportedRefDropArgs = 'exported-ref-drop-args',
  /** Accepts a ref, but its ref type is not importable. Use `React.ComponentRef<typeof Name>`. */
  ComponentRef = 'component-ref',
  /** Plain function component in v6 — accepts no ref at all. Report, never rewrite. */
  NoRef = 'no-ref',
  /** Still a class in v6, so the v5 type position is still valid. Never touch. */
  StillClass = 'still-class',
}

export interface ComponentRefInfo {
  readonly refType: string;
  readonly v5TypeParams: number;
}

/** Ref type names v6 exports from `@ui-kitten/components`. */
export const EXPORTED_REF_TYPES: readonly string[] = [
  'AutocompleteRef',
  'CalendarRef',
  'DatepickerRef',
  'IconRef',
  'InputRef',
  'ListRef',
  'RangeCalendarRef',
  'RangeDatepickerRef',
  'SelectRef',
];

/** v5 name had no type arguments; v6 exports a matching non-generic ref type. */
export const EXPORTED_REF: Readonly<Record<string, ComponentRefInfo>> = {
  Autocomplete: { refType: 'AutocompleteRef', v5TypeParams: 0 },
  Input: { refType: 'InputRef', v5TypeParams: 0 },
  Select: { refType: 'SelectRef', v5TypeParams: 0 },
};

/** v6 ref type is generic with the same `D = Date` default; keep any v5 type argument. */
export const EXPORTED_REF_GENERIC: Readonly<Record<string, ComponentRefInfo>> = {
  Calendar: { refType: 'CalendarRef', v5TypeParams: 1 },
  Datepicker: { refType: 'DatepickerRef', v5TypeParams: 1 },
  RangeCalendar: { refType: 'RangeCalendarRef', v5TypeParams: 1 },
  RangeDatepicker: { refType: 'RangeDatepickerRef', v5TypeParams: 1 },
};

/** v5 class was generic but the v6 ref type is not; the type argument must be discarded. */
export const EXPORTED_REF_DROP_ARGS: Readonly<Record<string, ComponentRefInfo>> = {
  Icon: { refType: 'IconRef', v5TypeParams: 1 },
  List: { refType: 'ListRef', v5TypeParams: 1 },
};

/**
 * Takes a ref, but the ref type is unreachable from the package root — either it is not exported
 * (`ViewPagerRef`, `TabBarRef`), or it lives behind `@ui-kitten/components/devsupport`
 * (`TouchableWeb`), or naming it would collide with an existing import (react-native's `Text`).
 * `React.ComponentRef<typeof Name>` avoids all three and needs no new import.
 */
export const COMPONENT_REF: Readonly<Record<string, string>> = {
  Button: 'TouchableWeb',
  Divider: 'View',
  Layout: 'View',
  ListItem: 'TouchableWeb',
  MenuItem: 'TouchableWeb',
  Popover: 'View',
  SelectItem: 'TouchableWeb',
  TabBar: 'TabBarRef',
  Text: 'Text',
  ViewPager: 'ViewPagerRef',
};

/** Plain function components in v6: passing a ref is a type error. Report, do not rewrite. */
export const NO_REF: readonly string[] = [
  'ApplicationProvider',
  'Avatar',
  'BottomNavigation',
  'BottomNavigationTab',
  'ButtonGroup',
  'Card',
  'CheckBox',
  'CircularProgressBar',
  'Drawer',
  'DrawerItem',
  'Menu',
  'Modal',
  'OverflowMenu',
  'ProgressBar',
  'Radio',
  'RadioGroup',
  'Spinner',
  'Tab',
  'TabView',
  'ThemeProvider',
  'Toggle',
  'Tooltip',
  'TopNavigation',
  'TopNavigationAction',
];

/** Still classes in v6 — `useRef<MenuGroup>()` remains valid. MUST NOT be rewritten. */
export const STILL_CLASS: readonly string[] = [
  'AutocompleteItem',
  'DrawerGroup',
  'IconRegistry',
  'MenuGroup',
  'SelectGroup',
];

/** Every v5 component name that could legally appear in a type position, with its v6 group. */
export const COMPONENT_GROUPS: Readonly<Record<string, RefGroup>> = {
  ApplicationProvider: RefGroup.NoRef,
  Autocomplete: RefGroup.ExportedRef,
  AutocompleteItem: RefGroup.StillClass,
  Avatar: RefGroup.NoRef,
  BottomNavigation: RefGroup.NoRef,
  BottomNavigationTab: RefGroup.NoRef,
  Button: RefGroup.ComponentRef,
  ButtonGroup: RefGroup.NoRef,
  Calendar: RefGroup.ExportedRefGeneric,
  Card: RefGroup.NoRef,
  CheckBox: RefGroup.NoRef,
  CircularProgressBar: RefGroup.NoRef,
  Datepicker: RefGroup.ExportedRefGeneric,
  Divider: RefGroup.ComponentRef,
  Drawer: RefGroup.NoRef,
  DrawerGroup: RefGroup.StillClass,
  DrawerItem: RefGroup.NoRef,
  Icon: RefGroup.ExportedRefDropArgs,
  IconRegistry: RefGroup.StillClass,
  Input: RefGroup.ExportedRef,
  Layout: RefGroup.ComponentRef,
  List: RefGroup.ExportedRefDropArgs,
  ListItem: RefGroup.ComponentRef,
  Menu: RefGroup.NoRef,
  MenuGroup: RefGroup.StillClass,
  MenuItem: RefGroup.ComponentRef,
  Modal: RefGroup.NoRef,
  OverflowMenu: RefGroup.NoRef,
  Popover: RefGroup.ComponentRef,
  ProgressBar: RefGroup.NoRef,
  Radio: RefGroup.NoRef,
  RadioGroup: RefGroup.NoRef,
  RangeCalendar: RefGroup.ExportedRefGeneric,
  RangeDatepicker: RefGroup.ExportedRefGeneric,
  Select: RefGroup.ExportedRef,
  SelectGroup: RefGroup.StillClass,
  SelectItem: RefGroup.ComponentRef,
  Spinner: RefGroup.NoRef,
  Tab: RefGroup.NoRef,
  TabBar: RefGroup.ComponentRef,
  TabView: RefGroup.NoRef,
  Text: RefGroup.ComponentRef,
  ThemeProvider: RefGroup.NoRef,
  Toggle: RefGroup.NoRef,
  Tooltip: RefGroup.NoRef,
  TopNavigation: RefGroup.NoRef,
  TopNavigationAction: RefGroup.NoRef,
  ViewPager: RefGroup.ComponentRef,
};
