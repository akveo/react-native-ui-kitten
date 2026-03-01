/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useState, useCallback } from 'react';
import type { NativeSyntheticEvent, TargetedEvent } from 'react-native';
import { supportsHover } from '../utils/platform';

interface UseHoverableOptions {
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Callback when mouse enters */
  onMouseEnter?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  /** Callback when mouse leaves */
  onMouseLeave?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
}

interface UseHoverableResult {
  /** Whether the component is currently hovered */
  hovered: boolean;
  /** Props to spread onto the component (web only) */
  hoverHandlers: {
    onMouseEnter?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
    onMouseLeave?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  };
}

/**
 * Hook to manage hover interaction state.
 *
 * Only active on platforms that support hover (web/desktop).
 * On mobile, hovered will always be false.
 *
 * @example
 * ```tsx
 * const { hovered, hoverHandlers } = useHoverable();
 *
 * return (
 *   <View {...hoverHandlers}>
 *     <Text>{hovered ? 'Hovering!' : 'Hover me'}</Text>
 *   </View>
 * );
 * ```
 */
export function useHoverable({
  disabled = false,
  onMouseEnter,
  onMouseLeave,
}: UseHoverableOptions = {}): UseHoverableResult {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
    if (disabled || !supportsHover) return;

    setHovered(true);
    onMouseEnter?.(event);
  }, [disabled, onMouseEnter]);

  const handleMouseLeave = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
    if (disabled || !supportsHover) return;

    setHovered(false);
    onMouseLeave?.(event);
  }, [disabled, onMouseLeave]);

  // Only provide handlers on platforms that support hover
  const hoverHandlers = supportsHover
    ? {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      }
    : {};

  return {
    hovered: supportsHover ? hovered : false,
    hoverHandlers,
  };
}

/**
 * Creates a hover state manager for use with render props pattern.
 */
export function useHoverState(disabled = false): {
  hovered: boolean;
  setHovered: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const [hovered, setHovered] = useState(false);

  // Reset hover state when disabled changes
  if (disabled && hovered) {
    setHovered(false);
  }

  // Always return false on non-hover platforms
  return {
    hovered: supportsHover ? hovered : false,
    setHovered,
  };
}
