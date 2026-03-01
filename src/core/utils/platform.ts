/**
 * @license
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Platform } from 'react-native';

/**
 * Whether the current platform is web.
 */
export const isWeb = Platform.OS === 'web';

/**
 * Whether the current platform is iOS.
 */
export const isIOS = Platform.OS === 'ios';

/**
 * Whether the current platform is Android.
 */
export const isAndroid = Platform.OS === 'android';

/**
 * Whether the current platform supports hover events.
 * Web and some desktop environments support hover.
 */
export const supportsHover = isWeb;

/**
 * Whether the current platform supports keyboard focus styling.
 */
export const supportsFocusVisible = isWeb;

/**
 * Select a value based on platform.
 */
export function platformSelect<T>(options: {
  ios?: T;
  android?: T;
  web?: T;
  default: T;
}): T {
  switch (Platform.OS) {
    case 'ios':
      return options.ios ?? options.default;
    case 'android':
      return options.android ?? options.default;
    case 'web':
      return options.web ?? options.default;
    default:
      return options.default;
  }
}
