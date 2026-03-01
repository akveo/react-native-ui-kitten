/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseControllableOptions<T> {
  /** Controlled value (when provided, component is controlled) */
  value?: T;
  /** Default value for uncontrolled mode */
  defaultValue: T;
  /** Callback when value changes */
  onChange?: (value: T) => void;
}

interface UseControllableResult<T> {
  /** Current value (either controlled or internal state) */
  value: T;
  /** Update the value - calls onChange and updates internal state if uncontrolled */
  setValue: (newValue: T | ((prev: T) => T)) => void;
  /** Whether the component is controlled */
  isControlled: boolean;
}

/**
 * Hook to handle both controlled and uncontrolled component patterns.
 *
 * In controlled mode (when `value` is provided), the component's state
 * is managed externally via props.
 *
 * In uncontrolled mode, the component manages its own internal state,
 * optionally calling `onChange` to notify parent components.
 *
 * @example Controlled mode
 * ```tsx
 * const [checked, setChecked] = useState(false);
 * <Checkbox checked={checked} onChange={setChecked} />
 * ```
 *
 * @example Uncontrolled mode
 * ```tsx
 * <Checkbox defaultChecked={false} onChange={(val) => console.log(val)} />
 * ```
 */
export function useControllable<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableOptions<T>): UseControllableResult<T> {
  // Determine if controlled based on whether value prop is provided
  const isControlled = controlledValue !== undefined;

  // Track controlled state across renders to warn on mode changes
  const wasControlledRef = useRef(isControlled);

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState<T>(defaultValue);

  // Warn if switching between controlled and uncontrolled
  useEffect(() => {
    if (wasControlledRef.current !== isControlled) {
      console.warn(
        'Component is switching between controlled and uncontrolled modes. ' +
        'This can lead to unexpected behavior. ' +
        'Decide whether to use controlled or uncontrolled mode for the lifetime of the component.',
      );
    }
    wasControlledRef.current = isControlled;
  }, [isControlled]);

  // Current value - use controlled value if provided, otherwise internal state
  const value = isControlled ? controlledValue : internalValue;

  // Update function that handles both modes
  const setValue = useCallback((newValue: T | ((prev: T) => T)) => {
    // Resolve the new value if it's a function
    const resolvedValue = typeof newValue === 'function'
      ? (newValue as (prev: T) => T)(value)
      : newValue;

    // In uncontrolled mode, update internal state
    if (!isControlled) {
      setInternalValue(resolvedValue);
    }

    // Always call onChange if provided
    onChange?.(resolvedValue);
  }, [isControlled, value, onChange]);

  return {
    value,
    setValue,
    isControlled,
  };
}

/**
 * Simplified hook for boolean controlled/uncontrolled state.
 */
export function useControllableBoolean(options: {
  value?: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}): UseControllableResult<boolean> {
  return useControllable({
    value: options.value,
    defaultValue: options.defaultValue ?? false,
    onChange: options.onChange,
  });
}

/**
 * Simplified hook for string controlled/uncontrolled state.
 */
export function useControllableString(options: {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}): UseControllableResult<string> {
  return useControllable({
    value: options.value,
    defaultValue: options.defaultValue ?? '',
    onChange: options.onChange,
  });
}
