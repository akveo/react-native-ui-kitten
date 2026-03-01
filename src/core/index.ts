/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

// Utils
export { mergeRefs, setRef } from './utils/mergeRefs';
export {
  isWeb,
  isIOS,
  isAndroid,
  supportsHover,
  supportsFocusVisible,
  platformSelect,
} from './utils/platform';

// Hooks
export {
  useControllable,
  useControllableBoolean,
  useControllableString,
} from './hooks/useControllable';
export { usePressable, usePressState } from './hooks/usePressable';
export { useHoverable, useHoverState } from './hooks/useHoverable';
export { useFocusable, useFocusState } from './hooks/useFocusable';
