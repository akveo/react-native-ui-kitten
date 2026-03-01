/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useFocusable, useFocusState } from '../useFocusable';

describe('useFocusable', () => {
  const createMockEvent = () => ({} as any);

  it('should start with focused = false', () => {
    const { result } = renderHook(() => useFocusable());

    expect(result.current.focused).toBe(false);
  });

  it('should set focused = true on focus', () => {
    const { result } = renderHook(() => useFocusable());

    act(() => {
      result.current.focusHandlers.onFocus(createMockEvent());
    });

    expect(result.current.focused).toBe(true);
  });

  it('should set focused = false on blur', () => {
    const { result } = renderHook(() => useFocusable());

    act(() => {
      result.current.focusHandlers.onFocus(createMockEvent());
    });
    expect(result.current.focused).toBe(true);

    act(() => {
      result.current.focusHandlers.onBlur(createMockEvent());
    });
    expect(result.current.focused).toBe(false);
  });

  it('should call onFocus callback', () => {
    const onFocus = jest.fn();
    const { result } = renderHook(() => useFocusable({ onFocus }));

    act(() => {
      result.current.focusHandlers.onFocus(createMockEvent());
    });

    expect(onFocus).toHaveBeenCalledTimes(1);
  });

  it('should call onBlur callback', () => {
    const onBlur = jest.fn();
    const { result } = renderHook(() => useFocusable({ onBlur }));

    act(() => {
      result.current.focusHandlers.onBlur(createMockEvent());
    });

    expect(onBlur).toHaveBeenCalledTimes(1);
  });

  it('should not change state when disabled', () => {
    const onFocus = jest.fn();
    const { result } = renderHook(() =>
      useFocusable({ disabled: true, onFocus }),
    );

    act(() => {
      result.current.focusHandlers.onFocus(createMockEvent());
    });

    expect(result.current.focused).toBe(false);
    expect(onFocus).not.toHaveBeenCalled();
  });
});

describe('useFocusState', () => {
  it('should return initial focused state as false', () => {
    const { result } = renderHook(() => useFocusState());

    expect(result.current.focused).toBe(false);
  });

  it('should allow setting focused state', () => {
    const { result } = renderHook(() => useFocusState());

    act(() => {
      result.current.setFocused(true);
    });

    expect(result.current.focused).toBe(true);
  });
});
