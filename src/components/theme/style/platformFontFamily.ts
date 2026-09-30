/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Platform,
  PlatformOSType,
} from 'react-native';

const FONT_FAMILY_KEY = /fontFamily$/i;
const SYSTEM_FONT_FAMILY = 'System';

/**
 * Resolves a themed style value for the current platform's font handling.
 *
 * `System` names the platform font. iOS resolves it as such, but React Native Android treats any
 * `fontFamily` as a custom family: it rounds `fontWeight` to normal or bold (the asset lookup only
 * knows `_bold` files) and falls back to the default typeface, so 500 and 600 render as 400.
 * Without a `fontFamily` Android keeps the numeric weight on the default typeface.
 *
 * So on Android a `System` value of a `*fontFamily` key resolves to `undefined`. Callers keep the key
 * (with `undefined`) so a flattened style still reports that the mapping set a font family; see
 * `FalsyText`. Every other value, key and platform passes through unchanged.
 */
export const resolvePlatformFontFamily = (
  key: string,
  value: unknown,
  os: PlatformOSType = Platform.OS,
): unknown => {
  if (os === 'android' && value === SYSTEM_FONT_FAMILY && FONT_FAMILY_KEY.test(key)) {
    return undefined;
  }
  return value;
};
