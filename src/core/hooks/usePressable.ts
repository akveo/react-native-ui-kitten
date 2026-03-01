/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useState, useCallback } from 'react';
import type { GestureResponderEvent } from 'react-native';

interface UsePressableOptions {
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Callback when press begins */
  onPressIn?: (event: GestureResponderEvent) => void;
  /** Callback when press ends */
  onPressOut?: (event: GestureResponderEvent) => void;
  /** Callback when press is completed (finger lifted within bounds) */
  onPress?: (event: GestureResponderEvent) => void;
  /** Callback when press is held for a duration */
  onLongPress?: (event: GestureResponderEvent) => void;
  /** Minimum press duration to trigger onLongPress (ms) */
  delayLongPress?: number;
}

interface UsePressableResult {
  /** Whether the component is currently pressed */
  pressed: boolean;
  /** Props to spread onto the touchable component */
  pressHandlers: {
    onPressIn: (event: GestureResponderEvent) => void;
    onPressOut: (event: GestureResponderEvent) => void;
    onPress: (event: GestureResponderEvent) => void;
    onLongPress?: (event: GestureResponderEvent) => void;
    delayLongPress?: number;
  };
}

/**
 * Hook to manage press interaction state.
 *
 * Tracks whether a component is being pressed and provides
 * event handlers to attach to touchable components.
 *
 * @example
 * ```tsx
 * const { pressed, pressHandlers } = usePressable({
 *   onPress: () => console.log('Pressed!'),
 * });
 *
 * return (
 *   <TouchableOpacity {...pressHandlers}>
 *     <Text>{pressed ? 'Pressing...' : 'Press me'}</Text>
 *   </TouchableOpacity>
 * );
 * ```
 */
export function usePressable({
  disabled = false,
  onPressIn,
  onPressOut,
  onPress,
  onLongPress,
  delayLongPress,
}: UsePressableOptions = {}): UsePressableResult {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = useCallback((event: GestureResponderEvent) => {
    if (disabled) return;

    setPressed(true);
    onPressIn?.(event);
  }, [disabled, onPressIn]);

  const handlePressOut = useCallback((event: GestureResponderEvent) => {
    if (disabled) return;

    setPressed(false);
    onPressOut?.(event);
  }, [disabled, onPressOut]);

  const handlePress = useCallback((event: GestureResponderEvent) => {
    if (disabled) return;

    onPress?.(event);
  }, [disabled, onPress]);

  const handleLongPress = useCallback((event: GestureResponderEvent) => {
    if (disabled) return;

    onLongPress?.(event);
  }, [disabled, onLongPress]);

  return {
    pressed,
    pressHandlers: {
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
      onPress: handlePress,
      ...(onLongPress && { onLongPress: handleLongPress }),
      ...(delayLongPress !== undefined && { delayLongPress }),
    },
  };
}

/**
 * Creates a press state manager for use with render props pattern.
 * Returns both state and handlers in a format suitable for render props.
 */
export function usePressState(disabled = false): {
  pressed: boolean;
  setPressed: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const [pressed, setPressed] = useState(false);

  // Reset pressed state when disabled changes
  if (disabled && pressed) {
    setPressed(false);
  }

  return { pressed, setPressed };
}
