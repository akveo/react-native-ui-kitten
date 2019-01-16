import { StyleMappingType } from 'eva/packages/common';
import {
  ThemeType,
  StyleType,
} from '../../type';

export function createThemedStyle(mapping: StyleMappingType, theme: ThemeType): StyleType {
  return Object.keys(mapping).reduce((acc, current) => {
    const key = mapping[current];
    acc[current] = theme[key] || key;
    return acc;
  }, {});
}
