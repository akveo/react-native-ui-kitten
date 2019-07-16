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
import { TouchableIndexedProps } from '../support/typings';

type TextElement = React.ReactElement<TextProps>;
type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: ImageStyle) => IconElement;

export interface ComponentProps {
  text: string;
  style?: TextStyle;
  icon?: IconProp;
  textStyle?: TextStyle;
  index?: number;
}

export type DropdownItemProps = StyledComponentProps & TouchableIndexedProps & ComponentProps;

class DropdownItemComponent extends React.Component<DropdownItemProps> {

  static styledComponentName: string = 'DropdownItem';

  private onPress = (event: GestureResponderEvent) => {
    const { index, onPress } = this.props;

    this.props.dispatch([]);
    onPress(index, event);
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      iconHeight,
      iconWidth,
      iconMarginHorizontal,
      iconTintColor,
      textColor,
      textFontSize,
      textFontWeight,
      textLineHeight,
      textMarginHorizontal,
      ...containerStyles
    } = source;

    return {
      container: containerStyles,
      icon: {
        height: iconHeight,
        width: iconWidth,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
      text: {
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        marginHorizontal: textMarginHorizontal,
      },
    };
  };

  private renderIconElement = (style: ImageStyle): IconElement | null => {
    if (this.props.icon) {
      const iconElement: IconElement = this.props.icon(style);

      return React.cloneElement(iconElement, {
        style: [style, styles.icon, iconElement.props.style],
      });
    } else {
      return null;
    }
  };

  private renderTextElement = (style: TextStyle): TextElement => {
    const { text } = this.props;

    return (
      <Text style={[style, styles.text, this.props.textStyle]}>
        {text}
      </Text>
    );
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, text, index, style } = this.props;
    const { container, icon: iconStyle, text: textStyle } = this.getComponentStyle(themedStyle);
    const iconElement: IconElement | null = this.renderIconElement(iconStyle);
    const textElement: TextElement = this.renderTextElement(textStyle);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={[styles.container, container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {textElement}
        {iconElement}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {},
  text: {},
});

export const DropdownItem = styled<DropdownItemProps>(DropdownItemComponent);
