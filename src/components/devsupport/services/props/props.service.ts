import { StyleType } from '../../../theme';

export const TextStyleProps: string[] = [

  // TextStyle

  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textAlign',
  'textDecorationLine',
  'textDecorationStyle',
  'textDecorationColor',
  'textShadowColor',
  'textShadowColor',
  'textShadowOffset',
  'textShadowRadius',

  // TextStyleIOS

  'textTransform',
  'writingDirection',

  // TextStyleAndroid

  'textAlignVertical',
  'includeFontPadding',
];

export const FlexStyleProps: string[] = [
  'alignContent',
  'alignItems',
  'alignSelf',
  'aspectRatio',
  'borderBottomWidth',
  'borderEndWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderStartWidth',
  'borderTopWidth',
  'borderWidth',
  'bottom',
  'display',
  'end',
  'flex',
  'flexBasis',
  'flexDirection',
  'flexGrow',
  'flexShrink',
  'flexWrap',
  'height',
  'justifyContent',
  'left',
  'margin',
  'marginBottom',
  'marginEnd',
  'marginHorizontal',
  'marginLeft',
  'marginRight',
  'marginStart',
  'marginTop',
  'marginVertical',
  'maxHeight',
  'maxWidth',
  'minHeight',
  'minWidth',
  'overflow',
  'padding',
  'paddingBottom',
  'paddingEnd',
  'paddingHorizontal',
  'paddingLeft',
  'paddingRight',
  'paddingStart',
  'paddingTop',
  'paddingVertical',
  'position',
  'right',
  'start',
  'top',
  'width',
  'zIndex',

  // ios

  'direction',
];

const FlexViewCrossStyleValues = [
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderWidth',
];

export const FlexViewCrossStyleProps: string[] = FlexStyleProps.filter((el) => !FlexViewCrossStyleValues.includes(el));

export interface Props {
  [key: string]: any;
}

export interface RestProps {
  rest?: Partial<Props>;
}

export type AllOfProps = Partial<Props>;
export type AllWithRestProps = Partial<Props> & RestProps;

class NativePropsService {
  /**
   * Retrieves all props included in `from` array
   *
   * @param source (Props) - source object
   * @param from (string[]) - array of keys needed to retrieve from `source`
   *
   * @return (Partial<Props>) - object with keys contained in `from` array
   */

  public all(source: Props | undefined, from: string[]): AllOfProps {
    if (!source) {
      return {};
    }

    return from.reduce((acc: Partial<AllOfProps>, prop: string): Partial<AllOfProps> => {
      return { ...acc, [prop]: source[prop] };
    }, {});
  }

  /**
   * Retrieves all props included in `from` array, rest props includes in under the `rest` key
   */
  public allWithRest(source: Props | undefined, from: string[]): AllWithRestProps {
    if (!source) {
      return { rest: {} };
    }

    return Object.keys(source).reduce((acc: Partial<AllWithRestProps>, prop: string): Partial<AllWithRestProps> => {
      const { rest, ...allOf } = acc;

      if (from.includes(prop)) {
        return { ...allOf, [prop]: source[prop], rest };
      }

      return { ...allOf, rest: { ...rest, [prop]: source[prop] } };
    }, {});
  }

  /**
   * Returns all styles with prefix
   *
   * @param {StyleType} source - Eva Styles
   * @param {string} key - prefix
   *
   * @return {StyleType} - all styles with prefix
   */
  public allWithPrefix(source: StyleType, key: string): StyleType {
    return Object.keys(source)
                 .filter((styleName: string) => styleName.includes(key))
                 .reduce((obj: StyleType, styleKey: string) => {
                   return {
                     ...obj,
                     [styleKey]: source[styleKey],
                   };
                 }, {});
  }
}

export const PropsService = new NativePropsService();
