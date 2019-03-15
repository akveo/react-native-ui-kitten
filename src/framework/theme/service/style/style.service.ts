import { ThemedStyleType } from 'eva/packages/types';
import {
  ThemeType,
  StyleType,
} from '../../type';
import { getThemeValue } from '../theme';

export function createThemedStyle(mapping: ThemedStyleType,
                                  theme: ThemeType,
                                  validParams: string[]): StyleType {

  const reducedMapping: ThemedStyleType = getReducedMapping(mapping, validParams);
  return Object.keys(reducedMapping).reduce((acc: StyleType, current: string): StyleType => {
    const mappingValue: any = mapping[current];

    if (mappingValue instanceof Object) {
      acc[current] = createThemedStyle(mappingValue, theme, validParams);
    } else {
      acc[current] = getThemeValue(mappingValue, theme, mappingValue);
    }

    return acc;
  }, {});
}

export function getReducedMapping(mapping: ThemedStyleType,
                                  validParams: string[]): ThemedStyleType {

  const mappingKeys: string[] = Object.keys(mapping);
  const redundantKeys: string[] = validate(mappingKeys, validParams);
  showWarning(redundantKeys);
  redundantKeys.forEach((redundantKey: string) => delete mapping[redundantKey]);
  return mapping;
}

export function validate(lhs: string[], rhs: string[]): string[] {
  return lhs.filter((value: string) => !rhs.includes(value));
}

function showWarning(redundantKeys: string[]): void {
  if (redundantKeys && redundantKeys.length !== 0) {
    console.warn(
      'Before using these variables, describe them in the component configuration: ',
      redundantKeys,
    );
  }
}
