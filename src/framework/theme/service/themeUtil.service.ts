import {
  getComponentMappings,
  VARIANT_DEFAULT,
} from './mappingUtil.service';
import {
  ThemeMappingType,
  MappingType,
  ThemeType,
  StyleType,
} from '../component';

const variantSeparator = ' ';

/**
 * Creates style object which can be used to create StyleSheet styles.
 *
 * @param theme: ThemeType - theme object
 * @param mapping: ThemeMappingType - component theme mapping configuration
 * @param variant: string | string[] - variant name. Default is 'default'.
 * Supported argument formats:
 * - 'dark'
 * - 'dark success'
 * - ['dark', 'success']
 *
 * @return any.
 */
export function createStyle(theme: ThemeType,
                            mapping: ThemeMappingType,
                            variant: string[] | string = [VARIANT_DEFAULT]): StyleType {

  const variants: string[] = Array.isArray(variant) ? variant : variant.split(variantSeparator);

  const mapVariant = (v: string) => createStyleFromVariant(theme, mapping, v);
  const mergeStyles = (origin: StyleType, next: StyleType) => ({ ...origin, ...next });

  const defaultStyle = createStyleFromVariant(theme, mapping, VARIANT_DEFAULT);
  return variants.map(mapVariant).reduce(mergeStyles, defaultStyle);
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

function createStyleFromVariant(theme: ThemeType, mapping: ThemeMappingType, variant: string): StyleType {
  const variantMapping = getComponentMappings(mapping, variant);
  return createStyleFromMapping(variantMapping, theme);
}

function createStyleFromMapping(mapping: MappingType[], theme: ThemeType): StyleType {
  const assignParameter = (style: any, prop: MappingType) => {
    style[prop.parameter] = getThemeValue(prop.token, theme);
    return style;
  };
  return mapping.reduce(assignParameter, {});
}
