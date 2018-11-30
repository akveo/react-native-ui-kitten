import {
  DesignType,
  MappingType,
} from '@rk-kit/design';
import { getComponentMapping } from './designUtil.service';
import { ThemeType } from '../../theme';

/**
 * Creates flat style object which can be used to create StyleSheet styles.
 *
 * @param theme: ThemeType - theme object
 * @param design: DesignType - component design configuration
 * @param variant: string - variant name. Default is 'default'
 *
 * @return any.
 *
 * TODO(theme/service): handle variations like `dark success`
 */
export function createFlatStyle(theme: ThemeType,
                                design: DesignType,
                                variant: string = 'default'): any {

  const defaultMapping = getComponentMapping(design, 'default');
  const variantMapping = getComponentMapping(design, variant);

  return {
    ...createStyleFromMapping(defaultMapping, theme),
    ...createStyleFromMapping(variantMapping, theme),
  };
}

function createStyleFromMapping(mapping: MappingType[], theme: ThemeType): any {
  const assignParameter = (style: any, prop: MappingType) => {
    style[prop.parameter] = theme.find(value => value.name === prop.token).value;
    return style;
  };
  return mapping.reduce(assignParameter, {});
}
