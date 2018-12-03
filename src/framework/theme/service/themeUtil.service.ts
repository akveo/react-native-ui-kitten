import { DesignType, MappingType } from '@rk-kit/design';
import { getComponentMapping } from './designUtil.service';
import { ThemeType } from '../../theme';

const variantSeparator = ' ';

/**
 * Creates flat style object which can be used to create StyleSheet styles.
 *
 * @param theme: ThemeType - theme object
 * @param design: DesignType - component design configuration
 * @param variant: string - variant name. Default is 'default'
 *
 * @return any.
 */

// TODO(theme/@type): declare Style type
type StyleType = any;

export function createFlatStyle(theme: ThemeType,
                                design: DesignType,
                                variant: string = 'default'): StyleType {

  const mapVariant = (v: string) => createStyleFromVariant(theme, design, v);
  const mergeStyles = (origin: StyleType, next: StyleType) => ({ ...origin, ...next });

  const defaultStyle = createStyleFromVariant(theme, design, 'default');
  return variant.split(variantSeparator).map(mapVariant).reduce(mergeStyles, defaultStyle);
}

function createStyleFromVariant(theme: ThemeType, design: DesignType, variant: string): StyleType {
  const variantMapping = getComponentMapping(design, variant);
  return createStyleFromMapping(variantMapping, theme);
}

function createStyleFromMapping(mapping: MappingType[], theme: ThemeType): StyleType {
  const assignParameter = (style: any, prop: MappingType) => {
    style[prop.parameter] = theme.find(value => value.name === prop.token).value;
    return style;
  };
  return mapping.reduce(assignParameter, {});
}
