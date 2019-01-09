import {
  ThemeType,
  StyleType,
} from '../../type';

export function createThemedStyle(mapping: any, theme: ThemeType): StyleType {
  return Object.keys(mapping).reduce((acc, current) => {
    const key = mapping[current];
    acc[current] = theme[key] || key;
    return acc;
  }, {});
}
