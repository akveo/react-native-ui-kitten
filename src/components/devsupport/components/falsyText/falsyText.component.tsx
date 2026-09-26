import React from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextStyle,
} from 'react-native';
import {
  mergeElementStyle,
  RenderProp,
} from '../falsyFC/falsyFC.component';
import {
  Text,
  TextProps,
} from '../../../ui/text/text.component';

export interface FalsyTextProps extends Omit<TextProps, 'children'> {
  component?: RenderProp<TextProps> | string | number;
}

/**
 * Helper component for optional text properties.
 *
 * Accepts same props as Text component,
 * and `component` which may be a string, a function, null or undefined.
 *
 * If it is null or undefined, will render nothing.
 * If it is a function, will call it with props passed to this component.
 * Otherwise, will render a Text with props passed to this component.
 *
 * @example Will render nothing.
 * ```
 * <FalsyText />
 * ```
 *
 * @example Will render red title.
 * ```
 * const Title = () => (
 *   <FalsyText style={{ color: 'red' }} component='Title' />
 * );
 * ```
 *
 * @example Will render image and red title.
 * ```
 * const renderTitle = (props) => (
 *   <React.Fragment>
 *     <Image source={require('../asset.png')}/>
 *     <Text {...props}>Title</Text>
 *   </React.Fragment>
 * );
 *
 * const Title = () => (
 *   <FalsyText
 *     style={{ color: 'red' }}
 *     component={renderTitle}
 *   />
 * );
 * ```
 */
/**
 * The `Text` mapping contributes exactly these four properties (plus nothing for the default
 * appearance), so a style that sets all four with no appearance / category / status prop would
 * resolve to the same output through the styled `Text`.
 */
const hasCompleteTextStyle = (props: TextProps): boolean => {
  if (props.appearance || props.category || props.status) {
    return false;
  }
  const style: TextStyle = StyleSheet.flatten(props.style) || {};

  return style.color !== undefined
    && style.fontFamily !== undefined
    && style.fontSize !== undefined
    && style.fontWeight !== undefined;
};

export class FalsyText extends React.Component<FalsyTextProps> {

  public render(): React.ReactElement {
    const { component, ...textProps } = this.props;

    if (!component) {
      return null;
    }

    if (React.isValidElement(component)) {
      return React.cloneElement(component, mergeElementStyle(component, textProps as TextProps));
    }

    if (typeof component === 'function') {
      return React.createElement(component, textProps as TextProps);
    }

    if (hasCompleteTextStyle(textProps as TextProps)) {
      // The parent resolved the Eva text style already (Button, CheckBox, Toggle, ...); the styled
      // Text would only re-resolve the same four typography values. Skip that hook and fiber.
      return (
        <RNText {...(textProps as TextProps)}>
          {component}
        </RNText>
      );
    }

    return (
      <Text {...textProps}>
        {component}
      </Text>
    );
  }
}
