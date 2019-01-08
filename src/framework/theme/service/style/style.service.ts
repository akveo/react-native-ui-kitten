import {
  ThemeType,
  StyleType,
} from '../../component';

export function createThemedStyle(mapping: any, theme: ThemeType): StyleType {
  return Object.keys(mapping).reduce((acc, current) => {
    const key = mapping[current];
    acc[current] = theme[key] || key;
    return acc;
  }, {});
}
