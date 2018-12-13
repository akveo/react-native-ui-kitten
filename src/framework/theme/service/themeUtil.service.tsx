import {
  getComponentVariant,
  VARIANT_DEFAULT,
} from './mappingUtil.service';
import { StyleType, ThemeMappingType, ThemeType } from '../component';

const variantSeparator = ' ';

/**
 * Creates style object which can be used to create StyleSheet styles.
 *
 * @param theme: ThemeType - theme object
 * @param mapping: ThemeMappingType - component theme mapping configuration
 * @param variant: string | string[] - variant name.
 * @param state: string - variant state. Default is `undefined`.
 * Supported argument formats:
 * - 'dark'
 * - 'dark success'
 * - ['dark', 'success']
 *
 * @return any.
 */
export function createStyle(theme: ThemeType,
                            mapping: ThemeMappingType,
                            variant: string[] | string = [VARIANT_DEFAULT],
                            state?: string): StyleType {

  const variants: string[] = Array.isArray(variant) ? variant : variant.split(variantSeparator);

  const mapVariant = (v: string) => createStyleFromVariant(theme, mapping, v);
  const mapStateVariant = (v: string) => state && createStyleFromVariant(theme, mapping, v, state);
  const mergeStyles = (origin: StyleType, next: StyleType) => ({ ...origin, ...next });

  const defaultStyle = mapVariant(VARIANT_DEFAULT);
  const variantStyle = variants.map(mapVariant).reduce(mergeStyles, defaultStyle);
  const variantStateStyle = variants.map(mapStateVariant).reduce(mergeStyles, {});

  return mergeStyles(variantStyle, variantStateStyle);
}

/**
 * @param name: string - theme property name, like `backgroundColor`
 * @param theme: ThemeType - theme
 *
 * @return any. Theme property value if it presents in theme, undefined otherwise
 */
export function getThemeValue(name: string, theme: ThemeType): any | undefined {
  return theme[name];
}

export function createStyleFromVariant(theme: ThemeType,
                                       mapping: ThemeMappingType,
                                       variant: string,
                                       state?: string): StyleType {

  const componentVariant = getComponentVariant(variant, mapping, state);
  if (componentVariant === undefined) {
    return undefined;
  }
  const assignParameter = (style: StyleType, parameter: any) => {
    style[parameter] = getThemeValue(componentVariant[parameter], theme);
    return style;
  };
  return Object.keys(componentVariant).reduce(assignParameter, {});
}
