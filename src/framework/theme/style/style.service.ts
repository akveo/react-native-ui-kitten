import { ThemedStyleType } from '@eva/core';
import { StyleType } from './type';
import { getThemeValue } from '../theme/theme.service';
import { ThemeType } from '../theme/type';

export function createThemedStyle(mapping: ThemedStyleType, theme: ThemeType): StyleType {
  return Object.keys(mapping).reduce((acc: StyleType, current: string): StyleType => {
    const mappingValue: any = mapping[current];

    return { ...acc, [current]: getThemeValue(mappingValue, theme, mappingValue) };
  }, {});
}
