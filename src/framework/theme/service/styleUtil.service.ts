import {
  getAppearanceMappingSafe,
  getVariantMappingSafe,
  APPEARANCE_DEFAULT,
} from './mappingUtil.service';
import {
  ComponentMappingType,
  MappingType,
  StateType,
  ThemeType,
  StyleType,
} from '../component';

const SEPARATOR_STATE = '.';
const FALLBACK_MAPPING_APPEARANCE: MappingType = {};
const FALLBACK_MAPPING_VARIANT: MappingType = {};

/**
 * Creates style object for variant/list of variants and its state/list of states(optional)
 *
 * Examples
 *
 * 1. Default:
 *
 * <Component />
 *
 * - will return styles for `default` appearance
 *
 * 2. Custom appearance:
 *
 * <Component appearance='bold'/>
 *
 * - will return styles for `default` + `bold` appearances
 *
 * 3. With Variants:
 *
 * <Component status='success' size='tiny'>
 *
 * - will return styles for `default` appearance + (`success` + `tiny`) variants
 *
 * 4. With states:
 *
 * <Component status='success'> which is currently `active` and `checked`
 *
 * - will return styles for
 * `default` appearance + (`active` + `checked` + `active.checked`) states
 * + `success` variant + (`active` + `checked` + `active.checked`) variant states
 *
 * State merging is the same as variant merging
 * But state parameters override variant parameters
 *
 * @param theme: ThemeType - theme object
 * @param mapping: ComponentMappingType - component theme mapping configuration
 * @param appearance: string - appearance applied to component
 * @param variants: string[] - variants applied to component. Default is []
 * @param states: string[] - states in which component is. Default is []
 *
 * @return StyleType - compiled component styles declared in mappings, mapped to theme values
 *
 */
export function createStyle(theme: ThemeType,
                            mapping: ComponentMappingType,
                            appearance: string = APPEARANCE_DEFAULT,
                            variants: string[] = [],
                            states: string[] = []): StyleType {

  const appearanceMapping = createAppearanceMapping(
    mapping,
    normalizeAppearance(appearance),
    normalizeVariants(variants),
    normalizeStates(states),
  );
  return createStyleFromMapping(appearanceMapping, theme);
}

function createAppearanceMapping(mapping: ComponentMappingType,
                                 appearances: string[],
                                 variants: string[],
                                 states: string[]): any {

  return appearances.reduce((acc, current) => {
    const { state, ...appearanceMapping } = getAppearanceMappingSafe(mapping, current, FALLBACK_MAPPING_APPEARANCE);
    const stateMapping = state && createStateMapping(state, states);
    const variantMapping = createVariantMapping(mapping, current, variants, states);

    return { ...acc, ...appearanceMapping, ...stateMapping, ...variantMapping };
  }, {});
}

function createVariantMapping(mapping: ComponentMappingType,
                              appearance: string,
                              variants: string[],
                              states: string[]): any {

  return variants.reduce((acc, current) => {
    const { state, ...variantMapping } = getVariantMappingSafe(mapping, appearance, current, FALLBACK_MAPPING_VARIANT);
    const stateMapping = state && createStateMapping(state, states);

    return { ...acc, ...variantMapping, ...stateMapping };
  }, {});
}

function createStateMapping(state: StateType, states: string[]): any {
  return states.reduce((acc, current) => ({ ...acc, ...state[current] }), {});
}

function createStyleFromMapping(mapping: any, theme: ThemeType): StyleType {
  return Object.keys(mapping).reduce((acc, current) => {
    const key = mapping[current];
    acc[current] = theme[key] || key;
    return acc;
  }, {});
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
