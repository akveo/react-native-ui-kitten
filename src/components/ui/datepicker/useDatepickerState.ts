/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { useCallback, useState } from 'react';

export interface UseDatepickerStateResult {
  visible: boolean;
  setPickerVisible: () => void;
  setPickerInvisible: () => void;
  focus: () => void;
  blur: () => void;
  isFocused: () => boolean;
}

export interface UseDatepickerStateOptions {
  onFocus?: () => void;
  onBlur?: () => void;
}

export function useDatepickerState({
  onFocus,
  onBlur,
}: UseDatepickerStateOptions): UseDatepickerStateResult {
  const [visible, setVisible] = useState(false);

  const onPickerVisible = useCallback(() => {
    onFocus?.();
  }, [onFocus]);

  const onPickerInvisible = useCallback(() => {
    onBlur?.();
  }, [onBlur]);

  const setPickerVisible = useCallback(() => {
    setVisible(true);
    onPickerVisible();
  }, [onPickerVisible]);

  const setPickerInvisible = useCallback(() => {
    setVisible(false);
    onPickerInvisible();
  }, [onPickerInvisible]);

  const focus = useCallback(() => {
    setVisible(true);
    onPickerVisible();
  }, [onPickerVisible]);

  const blur = useCallback(() => {
    setVisible(false);
    onPickerInvisible();
  }, [onPickerInvisible]);

  const isFocused = useCallback((): boolean => {
    return visible;
  }, [visible]);

  return {
    visible,
    setPickerVisible,
    setPickerInvisible,
    focus,
    blur,
    isFocused,
  };
}
