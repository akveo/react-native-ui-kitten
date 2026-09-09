/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { AccessibilityProps, AccessibilityRole, Role } from 'react-native';

/**
 * `role` alone is not enough.
 *
 * `TouchableOpacity` — which every interactive component here renders through —
 * forwards `accessibilityRole` to its underlying view and ignores `role`
 * entirely, so on native the role would simply be lost. react-native-web reads
 * `role || accessibilityRole`, so emitting both is correct on both targets.
 *
 * A few ARIA roles have no member in react-native's narrower
 * `AccessibilityRole` union. They are mapped to the closest native analogue so
 * that something sensible is still announced; `role` keeps the exact ARIA value
 * for the web.
 */
const NATIVE_ROLE_FALLBACK: Record<string, AccessibilityRole> = {
  option: 'menuitem',
  listbox: 'list',
};

const NATIVE_ROLES: ReadonlySet<string> = new Set<AccessibilityRole>([
  'none', 'button', 'togglebutton', 'link', 'search', 'image', 'keyboardkey',
  'text', 'adjustable', 'imagebutton', 'header', 'summary', 'alert', 'checkbox',
  'combobox', 'menu', 'menubar', 'menuitem', 'progressbar', 'radio',
  'radiogroup', 'scrollbar', 'spinbutton', 'switch', 'tab', 'tabbar', 'tablist',
  'timer', 'list', 'toolbar',
]);

const toNativeRole = (role?: Role): AccessibilityRole | undefined => {
  if (!role) {
    return undefined;
  }

  return NATIVE_ROLES.has(role) ? role as AccessibilityRole : NATIVE_ROLE_FALLBACK[role];
};

/**
 * Accessibility semantics a component derives from its own props.
 *
 * Deliberately expressed as a plain object rather than as `accessibilityState`:
 * `accessibilityState` and `accessibilityValue` are dropped entirely by
 * react-native-web, which only reads `aria-*` and the flat deprecated
 * `accessibility*` forms. Emitting `role` + `aria-*` is the only shape that
 * reaches assistive technology on both React Native and react-native-web.
 */
export interface AccessibilitySemantics {
  role?: Role;
  checked?: boolean | 'mixed';
  disabled?: boolean;
  expanded?: boolean;
  selected?: boolean;
  busy?: boolean;
  label?: string;
  valueMin?: number;
  valueMax?: number;
  valueNow?: number;
  valueText?: string;
}

/**
 * The subset of props consumers may pass to override derived semantics.
 * Both the modern (`role`, `aria-*`) and the legacy (`accessibilityRole`,
 * `accessibilityState`) spellings are honoured, so existing consumer code
 * keeps working.
 */
export type AccessibilityOverrides = Pick<AccessibilityProps,
  | 'accessibilityRole'
  | 'accessibilityState'
  | 'accessibilityValue'
  | 'accessibilityLabel'
  | 'aria-busy'
  | 'aria-checked'
  | 'aria-disabled'
  | 'aria-expanded'
  | 'aria-label'
  | 'aria-selected'
  | 'aria-valuemax'
  | 'aria-valuemin'
  | 'aria-valuenow'
  | 'aria-valuetext'> & { role?: Role };

export interface AccessibilityDOMProps {
  role?: Role;
  accessibilityRole?: AccessibilityRole;
  'aria-busy'?: boolean;
  'aria-checked'?: boolean | 'mixed';
  'aria-disabled'?: boolean;
  'aria-expanded'?: boolean;
  'aria-label'?: string;
  'aria-selected'?: boolean;
  'aria-valuemax'?: number;
  'aria-valuemin'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
}

const firstDefined = <T> (...values: (T | undefined)[]): T | undefined => {
  return values.find(value => value !== undefined);
};

/**
 * Builds the accessibility props a component should render, resolving
 * component-derived semantics against anything the consumer passed.
 *
 * Consumer values always win. Keys that resolve to `undefined` are omitted so
 * that React Native's own derivation (notably the accessible name built by
 * concatenating child `Text` nodes) is left untouched.
 */
export const buildAccessibilityProps = (
  semantics: AccessibilitySemantics,
  overrides: AccessibilityOverrides = {},
): AccessibilityDOMProps => {

  const state = overrides.accessibilityState ?? {};
  const value = overrides.accessibilityValue ?? {};

  const role = firstDefined(overrides.role, overrides.accessibilityRole as Role, semantics.role);

  const resolved: AccessibilityDOMProps = {
    role,
    accessibilityRole: firstDefined(overrides.accessibilityRole, toNativeRole(role)),
    'aria-busy': firstDefined(overrides['aria-busy'], state.busy, semantics.busy),
    'aria-checked': firstDefined(overrides['aria-checked'], state.checked, semantics.checked),
    'aria-disabled': firstDefined(overrides['aria-disabled'], state.disabled, semantics.disabled),
    'aria-expanded': firstDefined(overrides['aria-expanded'], state.expanded, semantics.expanded),
    'aria-selected': firstDefined(overrides['aria-selected'], state.selected, semantics.selected),
    'aria-label': firstDefined(overrides['aria-label'], overrides.accessibilityLabel, semantics.label),
    'aria-valuemax': firstDefined(overrides['aria-valuemax'], value.max, semantics.valueMax),
    'aria-valuemin': firstDefined(overrides['aria-valuemin'], value.min, semantics.valueMin),
    'aria-valuenow': firstDefined(overrides['aria-valuenow'], value.now, semantics.valueNow),
    'aria-valuetext': firstDefined(overrides['aria-valuetext'], value.text, semantics.valueText),
  };

  Object.keys(resolved).forEach((key: keyof AccessibilityDOMProps) => {
    if (resolved[key] === undefined) {
      delete resolved[key];
    }
  });

  return resolved;
};

/**
 * Resolves a component's text-ish child into an accessible name.
 *
 * Only plain strings and numbers can be surfaced: React Native builds the name
 * from child `Text` nodes automatically when they are rendered inside the
 * accessible element, but components that render their label outside the
 * touchable (Toggle) or into a separate element (Select, Input) must pass it
 * explicitly. Render props and elements cannot be flattened to a string here,
 * so those cases require the consumer to pass `aria-label`.
 */
/**
 * Composes the accessible name for a text field out of its label and caption.
 *
 * The caption is only folded in when it carries an error, matching how sighted
 * users read it: decorative hints stay out of the name, validation messages
 * become part of it so a screen reader announces why the field is rejected.
 */
export const accessibleInputName = (
  label: unknown,
  caption: unknown,
  status?: string,
): string | undefined => {

  const chunks: string[] = [];
  const labelName = accessibleNameOf(label);

  if (labelName) {
    chunks.push(labelName);
  }

  if (status === 'danger') {
    const captionName = accessibleNameOf(caption);

    if (captionName) {
      chunks.push(captionName);
    }
  }

  return chunks.length ? chunks.join(' ') : undefined;
};

export const accessibleNameOf = (component: unknown): string | undefined => {
  if (typeof component === 'string') {
    return component;
  }

  if (typeof component === 'number') {
    return String(component);
  }

  return undefined;
};
