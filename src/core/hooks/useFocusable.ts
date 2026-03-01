/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useState, useCallback } from 'react';
import type { NativeSyntheticEvent, TargetedEvent } from 'react-native';

interface UseFocusableOptions {
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Callback when component gains focus */
  onFocus?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  /** Callback when component loses focus */
  onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
}

interface UseFocusableResult {
  /** Whether the component is currently focused */
  focused: boolean;
  /** Props to spread onto the component */
  focusHandlers: {
    onFocus: (event: NativeSyntheticEvent<TargetedEvent>) => void;
    onBlur: (event: NativeSyntheticEvent<TargetedEvent>) => void;
  };
}

/**
 * Hook to manage focus interaction state.
 *
 * Tracks whether a component has keyboard focus and provides
 * event handlers to attach to focusable components.
 *
 * @example
 * ```tsx
 * const { focused, focusHandlers } = useFocusable();
 *
 * return (
 *   <TextInput
 *     {...focusHandlers}
 *     style={{ borderColor: focused ? 'blue' : 'gray' }}
 *   />
 * );
 * ```
 */
export function useFocusable({
  disabled = false,
  onFocus,
  onBlur,
}: UseFocusableOptions = {}): UseFocusableResult {
  const [focused, setFocused] = useState(false);

  const handleFocus = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
    if (disabled) return;

    setFocused(true);
    onFocus?.(event);
  }, [disabled, onFocus]);

  const handleBlur = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
    if (disabled) return;

    setFocused(false);
    onBlur?.(event);
  }, [disabled, onBlur]);

  return {
    focused,
    focusHandlers: {
      onFocus: handleFocus,
      onBlur: handleBlur,
    },
  };
}

/**
 * Creates a focus state manager for use with render props pattern.
 */
export function useFocusState(disabled = false): {
  focused: boolean;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const [focused, setFocused] = useState(false);

  // Reset focus state when disabled changes
  if (disabled && focused) {
    setFocused(false);
  }

  return { focused, setFocused };
}
