/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { renderHook, act } from '@testing-library/react-native';
import { usePressable, usePressState } from '../usePressable';

describe('usePressable', () => {
  const createMockEvent = () => ({} as any);

  it('should start with pressed = false', () => {
    const { result } = renderHook(() => usePressable());

    expect(result.current.pressed).toBe(false);
  });

  it('should set pressed = true on pressIn', () => {
    const { result } = renderHook(() => usePressable());

    act(() => {
      result.current.pressHandlers.onPressIn(createMockEvent());
    });

    expect(result.current.pressed).toBe(true);
  });

  it('should set pressed = false on pressOut', () => {
    const { result } = renderHook(() => usePressable());

    act(() => {
      result.current.pressHandlers.onPressIn(createMockEvent());
    });
    expect(result.current.pressed).toBe(true);

    act(() => {
      result.current.pressHandlers.onPressOut(createMockEvent());
    });
    expect(result.current.pressed).toBe(false);
  });

  it('should call onPress callback', () => {
    const onPress = jest.fn();
    const { result } = renderHook(() => usePressable({ onPress }));

    act(() => {
      result.current.pressHandlers.onPress(createMockEvent());
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('should call onPressIn callback', () => {
    const onPressIn = jest.fn();
    const { result } = renderHook(() => usePressable({ onPressIn }));

    act(() => {
      result.current.pressHandlers.onPressIn(createMockEvent());
    });

    expect(onPressIn).toHaveBeenCalledTimes(1);
  });

  it('should call onPressOut callback', () => {
    const onPressOut = jest.fn();
    const { result } = renderHook(() => usePressable({ onPressOut }));

    act(() => {
      result.current.pressHandlers.onPressOut(createMockEvent());
    });

    expect(onPressOut).toHaveBeenCalledTimes(1);
  });

  it('should not change state when disabled', () => {
    const onPress = jest.fn();
    const { result } = renderHook(() =>
      usePressable({ disabled: true, onPress }),
    );

    act(() => {
      result.current.pressHandlers.onPressIn(createMockEvent());
    });
    expect(result.current.pressed).toBe(false);

    act(() => {
      result.current.pressHandlers.onPress(createMockEvent());
    });
    expect(onPress).not.toHaveBeenCalled();
  });

  it('should include onLongPress when provided', () => {
    const onLongPress = jest.fn();
    const { result } = renderHook(() => usePressable({ onLongPress }));

    expect(result.current.pressHandlers.onLongPress).toBeDefined();

    act(() => {
      result.current.pressHandlers.onLongPress?.(createMockEvent());
    });

    expect(onLongPress).toHaveBeenCalledTimes(1);
  });

  it('should not include onLongPress when not provided', () => {
    const { result } = renderHook(() => usePressable());

    expect(result.current.pressHandlers.onLongPress).toBeUndefined();
  });

  it('should include delayLongPress when provided', () => {
    const { result } = renderHook(() =>
      usePressable({ onLongPress: jest.fn(), delayLongPress: 500 }),
    );

    expect(result.current.pressHandlers.delayLongPress).toBe(500);
  });
});

describe('usePressState', () => {
  it('should return initial pressed state as false', () => {
    const { result } = renderHook(() => usePressState());

    expect(result.current.pressed).toBe(false);
  });

  it('should allow setting pressed state', () => {
    const { result } = renderHook(() => usePressState());

    act(() => {
      result.current.setPressed(true);
    });

    expect(result.current.pressed).toBe(true);
  });
});
