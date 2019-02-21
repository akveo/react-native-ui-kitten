import { StyleMappingType } from 'eva/packages/common';
import {
  ThemeType,
  StyleType,
} from '../../type';
import { getThemeValue } from '../theme';

export function createThemedStyle(mapping: StyleMappingType, theme: ThemeType): StyleType {
  return Object.keys(mapping).reduce((acc: StyleType, current: string): StyleType => {
    const mappingValue: any = mapping[current];

    if (mappingValue instanceof Object) {
      acc[current] = createThemedStyle(mappingValue, theme);
    } else {
      acc[current] = getThemeValue(mappingValue, theme, mappingValue);
    }

    return acc;
  }, {});
}
