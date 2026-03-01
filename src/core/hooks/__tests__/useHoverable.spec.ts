/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { renderHook, act } from '@testing-library/react-native';
import { useHoverable, useHoverState } from '../useHoverable';

// Mock the platform module
jest.mock('../../utils/platform', () => ({
  supportsHover: true,
}));

describe('useHoverable', () => {
  const createMockEvent = () => ({} as any);

  it('should start with hovered = false', () => {
    const { result } = renderHook(() => useHoverable());

    expect(result.current.hovered).toBe(false);
  });

  it('should set hovered = true on mouse enter', () => {
    const { result } = renderHook(() => useHoverable());

    act(() => {
      result.current.hoverHandlers.onMouseEnter?.(createMockEvent());
    });

    expect(result.current.hovered).toBe(true);
  });

  it('should set hovered = false on mouse leave', () => {
    const { result } = renderHook(() => useHoverable());

    act(() => {
      result.current.hoverHandlers.onMouseEnter?.(createMockEvent());
    });
    expect(result.current.hovered).toBe(true);

    act(() => {
      result.current.hoverHandlers.onMouseLeave?.(createMockEvent());
    });
    expect(result.current.hovered).toBe(false);
  });

  it('should call onMouseEnter callback', () => {
    const onMouseEnter = jest.fn();
    const { result } = renderHook(() => useHoverable({ onMouseEnter }));

    act(() => {
      result.current.hoverHandlers.onMouseEnter?.(createMockEvent());
    });

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseLeave callback', () => {
    const onMouseLeave = jest.fn();
    const { result } = renderHook(() => useHoverable({ onMouseLeave }));

    act(() => {
      result.current.hoverHandlers.onMouseLeave?.(createMockEvent());
    });

    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should not change state when disabled', () => {
    const onMouseEnter = jest.fn();
    const { result } = renderHook(() =>
      useHoverable({ disabled: true, onMouseEnter }),
    );

    act(() => {
      result.current.hoverHandlers.onMouseEnter?.(createMockEvent());
    });

    expect(result.current.hovered).toBe(false);
    expect(onMouseEnter).not.toHaveBeenCalled();
  });

  it('should provide hover handlers on platforms that support hover', () => {
    const { result } = renderHook(() => useHoverable());

    expect(result.current.hoverHandlers.onMouseEnter).toBeDefined();
    expect(result.current.hoverHandlers.onMouseLeave).toBeDefined();
  });
});

describe('useHoverState', () => {
  it('should return initial hovered state as false', () => {
    const { result } = renderHook(() => useHoverState());

    expect(result.current.hovered).toBe(false);
  });

  it('should allow setting hovered state', () => {
    const { result } = renderHook(() => useHoverState());

    act(() => {
      result.current.setHovered(true);
    });

    expect(result.current.hovered).toBe(true);
  });
});
