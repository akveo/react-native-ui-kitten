import { getAppearanceMapping } from './mappingUtil.service';
import {
  ComponentMappingType,
  ThemeType,
  StyleType,
} from '../component';

const SEPARATOR_VARIANT = ' ';
const SEPARATOR_STATE = '.';

interface MappingSupport {
  parameters: any;
  state: any;
}

export function createStyle(theme: ThemeType,
                            mapping: ComponentMappingType,
                            appearance: string,
                            variant: string[] = [],
                            state: string[] = []): StyleType {

  const appearanceMapping = getAppearanceMapping(mapping, appearance);
  const stateDescription = createStateDescription(['active', 'checked', 'disabled']);
}

/**
 * Creates state description array from incoming array recursively.
 *
 * Example:
 *
 * ['active'] => ['active']
 * ['active', 'checked'] => ['active', 'checked', 'active.checked']
 * ['active', 'checked', 'disabled'] => ['active', 'checked', 'active.checked', 'disabled', 'active.checked.disabled']
 * ...
 *
 * @param state - states to merge
 * @param result - resulting variable
 * @param separator - state separator. `.` in example
 *
 * @return string[] - array of merged states
 */
export function createStateDescription(state: string[],
                                       result: string[] = [],
                                       separator: string = SEPARATOR_STATE): string[] {
  if (state.length === 1) {
    const last = state[state.length - 1];
    return [last, ...result];
  } else {
    const concat = state.reduce((origin, upstream) => origin.concat(separator, upstream));
    const last = state.pop();

    result.unshift(last, concat);

    return createStateDescription(state, result, separator);
  }
}

// function splitMappingParameters(mapping: MappingType): MappingSupport {
//   const { state, ...parameters } = mapping;
//
//   return {
//     parameters: { ...parameters },
//     state: state,
//   };
// }

// /**
//  * Creates style object which can be used to create StyleSheet styles.
//  *
//  * @param theme: ThemeType - theme object
//  * @param mapping: ThemeMappingType - component theme mapping configuration
//  * @param variant: string | string[] - variant name.
//  * @param state: string - variant state. Default is `undefined`.
//  * Supported argument formats:
//  * - 'dark'
//  * - 'dark success'
//  * - ['dark', 'success']
//  *
//  * @return any.
//  */
// export function createStyle(theme: ThemeType,
//                             mapping: ComponentMappingType,
//                             variant: string[] | string = [VARIANT_DEFAULT],
//                             state: string[] | string = []): StyleType {
//
//   const variants: string[] = Array.isArray(variant) ? variant : variant.split(SEPARATOR_VARIANT);
//   const states: string[] = Array.isArray(state) ? state : state.split(SEPARATOR_STATE);
//
//   const mapVariant = (v: string) => {
//     return createStyleFromVariant(theme, mapping, v);
//   };
//   const mapVariantState = (v: string, s: string) => {
//     const isEmpty = s === undefined || s.length === 0;
//     return isEmpty ? undefined : createStyleFromVariant(theme, mapping, v, s);
//   };
//   const mapVariantStates = (v: string) => {
//     return states.map(s => mapVariantState(v, s)).reduce(mergeStyles, {});
//   };
//   const mergeStyles = (origin: StyleType, next: StyleType) => {
//     return { ...origin, ...next };
//   };
//
//   const defaultStyle = mapVariant(VARIANT_DEFAULT);
//   const defaultStateStyle = mapVariantStates(VARIANT_DEFAULT);
//   const variantStyle = variants.map(mapVariant).reduce(mergeStyles, defaultStyle);
//   const variantStateStyle = variants.map(mapVariantStates).reduce(mergeStyles, defaultStateStyle);
//
//   return mergeStyles(variantStyle, variantStateStyle);
// }

// export function createStyleFromVariant(theme: ThemeType,
//                                        mapping: ComponentMappingType,
//                                        variant: string,
//                                        state?: string): StyleType | undefined {
//
//   const componentVariant = getComponentVariant(variant, mapping, state);
//   if (componentVariant === undefined) {
//     return undefined;
//   }
//   const assignParameter = (style: StyleType, parameter: any) => {
//     style[parameter] = getThemeValue(componentVariant[parameter], theme);
//     return style;
//   };
//   return Object.keys(componentVariant).reduce(assignParameter, {});
// }
