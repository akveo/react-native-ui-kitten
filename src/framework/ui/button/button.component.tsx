/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
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
  TextProps,
} from '../text/text.component';
import { isValidString } from '../support/services';

type TextElement = React.ReactElement<TextProps>;
type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: StyleType) => IconElement;

interface ComponentProps {
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProp;
  status?: string;
  size?: string;
  children?: string;
}

export type ButtonProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;

/**
 * The `Button` component is an analog of html button.
 *
 * @extends React.Component
 *
 * @property {boolean} disabled - Determines whether component is disabled. Default is false.
 *
 * @property {string} status - Determines the status of the component.
 * Can be 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'white'. Default is 'primary'.
 *
 * @property {string} size - Determines the size of the component.
 * Can be 'tiny' | 'small' | 'medium' | 'large' | 'giant'. Default is 'medium'.
 *
 * @property {string} children - Determines text of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines icon of the component.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be 'filled' | 'outline' | 'ghost'. Default is 'filled'.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```
 * import {
 *   Button,
 *   ButtonProps,
 * } from '@kitten/ui';
 *
 * <Button>Test Button</Button>
 * ```
 *
 * @example Button usage and API example
 *
 * ```
 * import {
 *   Button,
 *   ButtonProps,
 * } from '@kitten/ui';
 *
 * private onButtonPress = () => {
 *   console.log('Button press');
 * };
 *
 * public render(): React.ReactElement<ButtonProps> {
 *   return (
 *     <Button
 *       appearance='outline'
 *       style={styles.button}
 *       status='success'
 *       size='large'
 *       icon={(style: StyleType) => <Image source={{ uri: '...' }} style={style}/>}
 *       onPress={this.onButtonPress}>
 *       BUTTON
 *     </Button>
 *   );
 * }
 * ```
 *
 * @example Inline styling example
 *
 * ```
 * <Button
 *   style={styles.button}
 *   textStyle={styles.buttonText}
 *   icon={(style: StyleType) => <Image source={{ uri: '...' }} style={style}/>}
 *   onPress={this.onButtonPress}>
 *   BUTTON
 * </Button>
 * ```
 * */

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
    const { style, textStyle } = this.props;

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
      container: {
        ...containerParameters,
        ...styles.container,
        ...StyleSheet.flatten(style),
      },
      text: {
        color: textColor,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        marginHorizontal: textMarginHorizontal,
        ...styles.text,
        ...StyleSheet.flatten(textStyle),
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        tintColor: iconTintColor,
        marginHorizontal: iconMarginHorizontal,
        ...styles.icon,
      },
    };
  };

  private renderTextElement = (style: StyleType): TextElement => {
    return (
      <Text
        key={1}
        style={style}>
        {this.props.children}
      </Text>
    );
  };

  private renderIconElement = (style: StyleType): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 2,
      style: [style, iconElement.props.style],
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
    const { themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const [iconElement, textElement] = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...derivedProps}
        style={container}
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
