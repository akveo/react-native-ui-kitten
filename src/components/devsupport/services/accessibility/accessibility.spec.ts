/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  accessibleInputName,
  accessibleNameOf,
  buildAccessibilityProps,
} from './accessibility.service';

describe('@accessibility: service checks', () => {

  it('should emit role and aria props from semantics', () => {
    const props = buildAccessibilityProps({
      role: 'checkbox',
      checked: true,
      disabled: false,
    });

    expect(props).toEqual({
      role: 'checkbox',
      accessibilityRole: 'checkbox',
      'aria-checked': true,
      'aria-disabled': false,
    });
  });

  it('should omit keys with no value so react-native derivation is untouched', () => {
    const props = buildAccessibilityProps({ role: 'button' });

    expect(props).toEqual({ role: 'button', accessibilityRole: 'button' });
    expect('aria-label' in props).toBe(false);
    expect('aria-checked' in props).toBe(false);
  });

  it('should never emit accessibilityState or accessibilityValue', () => {
    // react-native-web drops both, so they must not be part of the output.
    const props = buildAccessibilityProps(
      { role: 'checkbox', checked: true, valueNow: 5 },
      { accessibilityState: { checked: false } },
    );

    expect('accessibilityState' in props).toBe(false);
    expect('accessibilityValue' in props).toBe(false);
  });

  it('should let a consumer aria prop win over derived semantics', () => {
    const props = buildAccessibilityProps(
      { role: 'checkbox', checked: true },
      { 'aria-checked': false, role: 'switch' },
    );

    expect(props.role).toEqual('switch');
    expect(props['aria-checked']).toEqual(false);
  });

  it('should let legacy accessibilityRole and accessibilityState win', () => {
    const props = buildAccessibilityProps(
      { role: 'checkbox', checked: true, disabled: false },
      { accessibilityRole: 'radio', accessibilityState: { checked: false, disabled: true } },
    );

    expect(props.role).toEqual('radio');
    expect(props['aria-checked']).toEqual(false);
    expect(props['aria-disabled']).toEqual(true);
  });

  it('should prefer modern aria props over legacy ones', () => {
    const props = buildAccessibilityProps(
      { role: 'checkbox' },
      { role: 'switch', accessibilityRole: 'radio' },
    );

    expect(props.role).toEqual('switch');
  });

  it('should treat false as a real value rather than a missing one', () => {
    const props = buildAccessibilityProps({ checked: false, disabled: false, busy: false });

    expect(props['aria-checked']).toEqual(false);
    expect(props['aria-disabled']).toEqual(false);
    expect(props['aria-busy']).toEqual(false);
  });

  it('should carry indeterminate state as mixed', () => {
    const props = buildAccessibilityProps({ role: 'checkbox', checked: 'mixed' });

    expect(props['aria-checked']).toEqual('mixed');
  });

  it('should mirror role into accessibilityRole for TouchableOpacity', () => {
    // TouchableOpacity forwards accessibilityRole and ignores role entirely.
    const props = buildAccessibilityProps({ role: 'switch' });

    expect(props.accessibilityRole).toEqual('switch');
  });

  it('should degrade ARIA-only roles to a native analogue', () => {
    // `option` and `listbox` have no member in react-native's AccessibilityRole.
    expect(buildAccessibilityProps({ role: 'option' })).toEqual({
      role: 'option',
      accessibilityRole: 'menuitem',
    });
  });

  it('should resolve accessible names only from strings and numbers', () => {
    expect(accessibleNameOf('Save')).toEqual('Save');
    expect(accessibleNameOf(42)).toEqual('42');
    expect(accessibleNameOf(undefined)).toBeUndefined();
    expect(accessibleNameOf(() => null)).toBeUndefined();
  });

  it('should compose an input name from label only when there is no error', () => {
    expect(accessibleInputName('Email', 'We never share it', 'basic')).toEqual('Email');
  });

  it('should fold the caption into the input name when status is danger', () => {
    expect(accessibleInputName('Email', 'Invalid address', 'danger')).toEqual('Email Invalid address');
  });

  it('should produce no input name when there is nothing to say', () => {
    expect(accessibleInputName(undefined, undefined, 'basic')).toBeUndefined();
  });
});
