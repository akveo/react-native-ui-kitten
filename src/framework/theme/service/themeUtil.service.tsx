import {
  getComponentVariant,
  VARIANT_DEFAULT,
} from './mappingUtil.service';
import {
  ThemeMappingType,
  ThemeType,
  StyleType,
} from '../component';

const SEPARATOR_VARIANT = ' ';
const SEPARATOR_STATE = ' ';

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
                            state: string[] | string = []): StyleType {

  const variants: string[] = Array.isArray(variant) ? variant : variant.split(SEPARATOR_VARIANT);
  const states: string[] = Array.isArray(state) ? state : state.split(SEPARATOR_STATE);

  const mapVariant = (v: string) => {
    return createStyleFromVariant(theme, mapping, v);
  };
  const mapVariantState = (v: string, s: string) => {
    const isEmpty = s === undefined || s.length === 0;
    return isEmpty ? undefined : createStyleFromVariant(theme, mapping, v, s);
  };
  const mapVariantStates = (v: string) => {
    return states.map(s => mapVariantState(v, s)).reduce(mergeStyles, {});
  };
  const mergeStyles = (origin: StyleType, next: StyleType) => {
    return { ...origin, ...next };
  };

  const defaultStyle = mapVariant(VARIANT_DEFAULT);
  const defaultStateStyle = mapVariantStates(VARIANT_DEFAULT);
  const variantStyle = variants.map(mapVariant).reduce(mergeStyles, defaultStyle);
  const variantStateStyle = variants.map(mapVariantStates).reduce(mergeStyles, defaultStateStyle);

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
                                       state?: string): StyleType | undefined {

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
