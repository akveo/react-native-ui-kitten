/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { isValidString } from '../support/services';

type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: ImageStyle) => IconElement;

interface ComponentProps {
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProp;
  status?: string;
  size?: string;
  children?: string;
}

export type ButtonProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;
export type ButtonElement = React.ReactElement<ButtonProps>;

/**
 * Styled Button component.
 *
 * @extends React.Component
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * Default is `false`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `primary`, `success`, `info`, `warning`, `danger` or `white`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `giant`, `large`, `medium`, `small`, or `tiny`.
 * Default is `medium`.
 *
 * @property {string} children - Determines text of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines icon of the component.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `filled` | `outline` | `ghost`.
 * Default is `filled`.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @overview-example Simple usage example
 *
 * ```
 * import React from 'react';
 * import {
 *   Button,
 *   ButtonProps,
 * } from 'react-native-ui-kitten';
 *
 * export const ButtonShowcase = (props?: ButtonProps): React.ReactElement<ButtonProps> => {
 *
 *   const onPress = () => {
 *     // Handle Button press
 *   };
 *
 *   return (
 *     <Button onPress={onPress}>
 *       BUTTON
 *     </Button>
 *   );
 * };
 * ```
 *
 * @overview-example Eva-related props using example
 *
 * ```
 * import React from 'react';
 * import {
 *   Button,
 *   ButtonProps,
 * } from 'react-native-ui-kitten';
 *
 * export const ButtonShowcase = (props?: ButtonProps): React.ReactElement<ButtonProps> => {
 *
 *   const onPress = () => {
 *     // Handle Button press
 *   };
 *
 *   return (
 *     <Button
 *       status='danger'
 *       size='large'
 *       onPress={onPress}>
 *       BUTTON
 *     </Button>
 *   );
 * };
 * ```
 *
 * @example Inline styling example
 *
 * ```
 * import React from 'react';
 * import {
 *   Button,
 *   ButtonProps,
 * } from 'react-native-ui-kitten';
 *
 * export const ButtonShowcase = (props?: ButtonProps): React.ReactElement<ButtonProps> => {
 *   return (
 *     <Button
 *       style={styles.button}
 *       textStyle={styles.buttonText}>
 *       BUTTON
 *     </Button>
 *   );
 * };
 * ```
 *
 * @example Button with Icon usage example
 *
 * ```
 * import React from 'react';
 * import {
 *   ImageStyle,
 *   Image,
 *   ImageProps,
 * } from 'react-native';
 * import {
 *   Button,
 *   ButtonProps,
 * } from 'react-native-ui-kitten';
 *
 * const ButtonIcon = (style: ImageStyle): React.ReactElement<ImageProps> => {
 *   return (
 *     <Image style={style} source={{ uri: 'path/to/image' }}/>
 *   );
 * };
 *
 * export const ButtonShowcase = (props?: ButtonProps): React.ReactElement<ButtonProps> => {
 *   return (
 *     <Button
 *       style={styles.button}
 *       icon={ButtonIcon}>
 *       BUTTON
 *     </Button>
 *   );
 * };
 * ```
 */

export class ButtonComponent extends React.Component<ButtonProps> {

  static styledComponentName: string = 'Button';

  private onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      textColor,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textMarginHorizontal,
      iconWidth,
      iconHeight,
      iconTintColor,
      iconMarginHorizontal,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      text: {
        color: textColor,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        marginHorizontal: textMarginHorizontal,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        tintColor: iconTintColor,
        marginHorizontal: iconMarginHorizontal,
      },
    };
  };

  private renderTextElement = (style: TextStyle): TextElement => {
    return (
      <Text
        key={1}
        style={[style, styles.text, this.props.textStyle]}>
        {this.props.children}
      </Text>
    );
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 2,
      style: [style, styles.icon, iconElement.props.style],
    });
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { icon, children } = this.props;

    return [
      icon && this.renderIconElement(style.icon),
      isValidString(children) && this.renderTextElement(style.text),
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, style, ...containerProps } = this.props;
    const { container, ...childStyles } = this.getComponentStyle(themedStyle);

    const [iconElement, textElement] = this.renderComponentChildren(childStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...containerProps}
        style={[container, styles.container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {iconElement}
        {textElement}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {},
  icon: {},
});

export const Button = styled<ButtonProps>(ButtonComponent);
