import {
  APPEARANCE_DEFAULT,
  getStatelessAppearanceMapping,
  getStatelessVariantMapping,
  getStateAppearanceMapping,
  getStateVariantMapping,
} from '../mapping/mapping.service';
import {
  ComponentMappingType,
  ThemeType,
  StyleType,
} from '../../component';

const SEPARATOR_STATE = '.';

/**
 * Creates style object for variant/list of variants(optional) and its state/list of states(optional)
 *
 * Example
 *
 * appearance = 'outline';
 * variants = ['success', 'large'];
 * state = ['active', 'checked'];
 *
 * a = `default` + `outline`                    - acc appearance (apce) mapping
 *
 * v1 = `success` of `default`                  - `success` variant mapping of `default` apce
 * v2 = `success` of `outline`                  - `success` variant mapping of `outline` apce
 * v3 = `large` of `default`                    - `large` variant mapping of `default` apce
 * v4 = `large` of `outline`                    - `large` variant mapping of `outline` apce
 *
 * s1 = `active` of `default`                   - `active` state mapping of `default` apce
 * s2 = `active` of `outline`                   - `active` state mapping of `outline` apce
 * s3 = `active` of `default success`           - `active` state mapping of `success` variant of `default` apce
 * s4 = `active` of `outline success`           - `active` state mapping of `success` variant of `outline` apce
 * s5 = `active` of `default large`             - `active` state mapping of `large` variant of `default` apce
 * s6 = `active` of `outline large`             - `active` state mapping of `large` variant of `outline` apce
 *
 * s7 = `checked` of `default`                  - `checked` state mapping of `default` apce
 * s8 = `checked` of `outline`                  - `checked` state mapping of `outline` apce
 * s9 = `checked` of `default success`          - `checked` state mapping of `success` variant of `default` apce
 * s10 = `checked` of `outline success`         - `checked` state mapping of `success` variant of `outline` apce
 * s11 = `checked` of `default large`           - `checked` state mapping of `large` variant of `default` apce
 * s12 = `checked` of `outline large`           - `checked` state mapping of `large` variant of `outline` apce
 *
 * s13 = `active.checked` of `default`          - `active.checked` state mapping of `default` apce
 * s14 = `active.checked` of `outline`          - `active.checked` state mapping of `outline` apce
 * s15 = `active.checked` of `default success`  - `active.checked` state mapping of `success` variant of `default` apce
 * s16 = `active.checked` of `outline success`  - `active.checked` state mapping of `success` variant of `outline` apce
 * s17 = `active.checked` of `default large`    - `active.checked` state mapping of `large` variant of `default` apce
 * s18 = `active.checked` of `outline large`    - `active.checked` state mapping of `large` variant of `outline` apce
 *
 * res = a + (v1 + v2 + ... + vn) + (s1 + s2 + ... + sn)
 *
 * @param theme: ThemeType - theme object
 * @param mapping: ComponentMappingType - component theme mapping configuration
 * @param appearance: string - appearance applied to component
 * @param variants: string[] - variants applied to component. Default is []
 * @param states: string[] - states in which component is. Default is []
 *
 * @return StyleType - compiled component styles declared in mappings, mapped to theme values
 */
export function createStyle(theme: ThemeType,
                            mapping: ComponentMappingType,
                            appearance: string = APPEARANCE_DEFAULT,
                            variants: string[] = [],
                            states: string[] = []): StyleType {

  const normalizedAppearance = normalizeAppearance(appearance);
  const normalizedVariants = normalizeVariants(variants);
  const normalizedStates = normalizeStates(states);

  const appearanceMapping = reduce(normalizedAppearance, apce => {
    return getStatelessAppearanceMapping(mapping, apce);
  });

  const variantMapping = reduce(normalizedVariants, variant => {
    return reduce(normalizedAppearance, apce => {
      return getStatelessVariantMapping(mapping, apce, variant);
    });
  });

  const stateMapping = reduce(normalizedStates, state => {
    const appearanceStateMapping = reduce(normalizedAppearance, apce => {
      return getStateAppearanceMapping(mapping, apce, state);
    });

    const variantStateMapping = reduce(normalizedVariants, variant => {
      return reduce(normalizedAppearance, apce => {
        return getStateVariantMapping(mapping, apce, variant, state);
      });
    });

    return {...appearanceStateMapping, ...variantStateMapping};
  });

  return createStyleFromMapping({ ...appearanceMapping, ...variantMapping, ...stateMapping }, theme);
}

function createStyleFromMapping(mapping: any, theme: ThemeType): StyleType {
  return Object.keys(mapping).reduce((acc, current) => {
    const key = mapping[current];
    acc[current] = theme[key] || key;
    return acc;
  }, {});
}

function reduce(items: string[], next: (item: string) => any): any {
  return items.reduce((acc, current) => ({ ...acc, ...next(current) }), {});
}

/**
 * Creates normalized to design system array of component appearances
 *
 * Example:
 *
 * '' => ['default']
 * 'bold' => ['default', 'bold']
 * 'default' => ['default']
 * ...
 *
 * @param appearance: string - appearance applied to component
 *
 * @return string[] - array of merged appearances
 */
export function normalizeAppearance(appearance: string): string[] {
  return normalize([APPEARANCE_DEFAULT, appearance]);
}

/**
 * Creates normalized to design system array of component variants
 *
 * Example:
 *
 * [''] => []
 * ['success'] => ['success']
 * ['success', 'tiny'] => ['success', 'tiny']
 * ...
 *
 * @param variants: string[] - variants applied to component
 *
 * @return string[] - array of merged variants
 */
export function normalizeVariants(variants: string[]): string[] {
  return normalize(variants);
}

/**
 * Creates normalized to design system array of component states
 *
 * Example:
 *
 * [''] => []
 * ['active'] => ['active']
 * ['active', 'checked'] => ['active', 'checked', 'active.checked']
 * ['active', 'checked', 'disabled'] => ['active', 'checked', 'active.checked', 'disabled', 'active.checked.disabled']
 * ...
 *
 * @param states: string[] - states in which component is
 * @param separator - state separator. `.` in example
 *
 * @return string[] - array of merged states
 */
export function normalizeStates(states: string[], separator = SEPARATOR_STATE): string[] {
  const preprocess = normalize(states);
  if (preprocess.length === 0) {
    return preprocess;
  } else {
    return createStateDescription(preprocess, separator, []);
  }
}

function createStateDescription(state: string[], separator: string, result: string[]): string[] {
  if (state.length === 1) {
    const last = state[state.length - 1];
    return [last, ...result];
  } else {
    const concat = state.reduce((acc, current) => acc.concat(separator, current));
    const last = state.pop();

    result.unshift(last, concat);

    return createStateDescription(state, separator, result);
  }
}

function normalize(params: string[]): string[] {
  return noNulls(noDuplicates(params));
}

function noDuplicates(params: string[]): string[] {
  return [...new Set(params)];
}

function noNulls(params: string[]): string[] {
  return params.filter(Boolean);
}
