import {
  DesignType,
  MappingType,
} from '@rk-kit/design';
import {
  getComponentMappings,
  defaultVariant,
} from './designUtil.service';
import {
  ThemeType,
  StyleType,
} from '../../theme';

const variantSeparator = ' ';

/**
 * Creates flat style object which can be used to create StyleSheet styles.
 *
 * @param theme: ThemeType - theme object
 * @param design: DesignType - component design configuration
 * @param variant: string | string[] - variant name. Default is 'default'.
 * Supported argument formats:
 * - 'dark'
 * - 'dark success'
 * - ['dark', 'success']
 *
 * @return any.
 */
export function createFlatStyle(theme: ThemeType,
                                design: DesignType,
                                variant: string[] | string = [defaultVariant]): StyleType {

  const variants: string[] = Array.isArray(variant) ? variant : variant.split(variantSeparator);

  const mapVariant = (v: string) => createStyleFromVariant(theme, design, v);
  const mergeStyles = (origin: StyleType, next: StyleType) => ({ ...origin, ...next });

  const defaultStyle = createStyleFromVariant(theme, design, defaultVariant);
  return variants.map(mapVariant).reduce(mergeStyles, defaultStyle);
}

/**
 * @param name: ThemeOption - theme property name, like `backgroundColor`
 * @param theme: ThemeType - theme
 *
 * @return any. ThemeOption value if it presents in theme, undefined otherwise
 */
export function getThemeValue(name: string, theme: ThemeType): any | undefined {
  return theme[name];
}

function createStyleFromVariant(theme: ThemeType, design: DesignType, variant: string): StyleType {
  const variantMapping = getComponentMappings(design, variant);
  return createStyleFromMapping(variantMapping, theme);
}

function createStyleFromMapping(mapping: MappingType[], theme: ThemeType): StyleType {
  const assignParameter = (style: any, prop: MappingType) => {
    style[prop.parameter] = getThemeValue(prop.token, theme);
    return style;
  };
  return mapping.reduce(assignParameter, {});
}
