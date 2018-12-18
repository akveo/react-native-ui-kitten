import { getThemeToken } from './themeUtil.service';
import {
  getMappingVariant,
  VARIANT_DEFAULT,
} from './mappingUtil.service';
import {
  ThemeType,
  StyleType,
  ThemeMappingType,
} from '../component';

const SEPARATOR_VARIANT = ' ';
const SEPARATOR_STATE = ' ';

/**
 * Creates style object for variant/list of variants and its state/list of states(optional)
 *
 * Examples
 *
 * 1. Default variant:
 *
 * <Component /> - will return styles for `default` variant
 *
 * 2. Custom variant:
 *
 * <Component variant='dark'/> - will return styles for `dark` merged `default`
 *
 * 3. Multiple custom variants:
 *
 * <Component variant='dark success'> which is currently `selected` `disabled`
 *
 * State merging is the same as variant merging
 * But state parameters override variant parameters
 *
 * @param theme: ThemeType - theme object
 * @param mapping: ThemeMappingType - component theme mapping configuration
 * @param variant: string | string[] - variant name. Default is [`default`]
 * @param state: string | string[] - variant state. Default is []
 *
 * @return StyleType - compiled component styles declared in mappings, mapped to theme values
 */
export function createStyle(theme: ThemeType,
                            mapping: ThemeMappingType,
                            variant: string[] | string = [VARIANT_DEFAULT],
                            state: string[] | string = []): StyleType {

  const variants: string[] = Array.isArray(variant) ? variant : variant.split(SEPARATOR_VARIANT);
  const states: string[] = Array.isArray(state) ? state : state.split(SEPARATOR_STATE);

  const mapVariant = (v: string) => {
    return createStyleForVariant(theme, mapping, v);
  };
  const mapVariantState = (v: string, s: string) => {
    const isEmpty = s === undefined || s.length === 0;
    return isEmpty ? undefined : createStyleForVariant(theme, mapping, v, s);
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
 * Creates style object for single variant its state(optional)
 *
 * Examples
 *
 * 1. Default variant:
 *
 * <Component /> - will return styles for `default` variant
 *
 * 2. Custom variant:
 *
 * <Component variant='dark'/> - will return styles for `dark`
 *
 * 3. Custom variant with state:
 *
 * <Component variant='dark'/> - with `active` state
 * will return styles for `dark` variant with overriding parameters by parameters from `active` state
 *
 * @param theme: ThemeType - theme object
 * @param mapping: ThemeMappingType - component theme mapping configuration
 * @param variant: string - variant name
 * @param state: string - variant state. Default is `undefined`
 *
 * @return StyleType - compiled component styles declared in variant mappings, mapped to theme values.
 */
export function createStyleForVariant(theme: ThemeType,
                                      mapping: ThemeMappingType,
                                      variant: string,
                                      state?: string): StyleType | undefined {

  const componentVariant = getMappingVariant(mapping, variant, state);
  if (componentVariant === undefined) {
    return undefined;
  }
  const assignParameter = (style: StyleType, parameter: string) => {
    style[parameter] = getTokenValue(componentVariant, parameter, theme);
    return style;
  };
  return Object.keys(componentVariant).reduce(assignParameter, {});
}

/**
 * Examples
 *
 * 1. Mapped value:
 *
 * "tintColor": "colorPrimary" - will return value for "colorPrimary" token declared in theme
 *
 * 2. Implicit value:
 *
 * "tintColor: "#F0F0F0" - will return "#F0F0F0"
 *
 * @param variant: any - component variant, like `danger`
 * @param parameter: string - variant parameter name, like `backgroundColor`
 * @param theme: ThemeType - theme object
 *
 * @return any. Theme property value if it presents in theme,
 * variant parameter value otherwise,
 * undefined if not declared in variant
 */
export function getTokenValue(variant: any, parameter: string, theme: ThemeType): any | undefined {
  const tokenName = variant[parameter];
  return getThemeToken(theme, tokenName) || tokenName;
}
