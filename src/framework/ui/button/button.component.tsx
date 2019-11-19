/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
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
import { IconElement } from '../icon/icon.component';
import { isValidString } from '../support/services';

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
 * Styled `Button` component.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `filled`, `outline` or `ghost`.
 * Default is `filled`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `primary`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Default is `medium`.
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * Default is `false`.
 *
 * @property {string} children - Determines text of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(style: ImageStyle) => ReactElement} icon - Determines icon of the component.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example ButtonSimpleUsage
 *
 * @overview-example ButtonStates
 *
 * @overview-example ButtonAppearances
 *
 * @overview-example ButtonStatus
 *
 * @overview-example ButtonSize
 *
 * @overview-example ButtonOutline
 *
 * @overview-example ButtonGhost
 *
 * @overview-example ButtonWithIcon
 */
export class ButtonComponent extends React.Component<ButtonProps> {

  static styledComponentName: string = 'Button';

  private onPress = (event: GestureResponderEvent): void => {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      textColor,
      textFontFamily,
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
        fontFamily: textFontFamily,
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
