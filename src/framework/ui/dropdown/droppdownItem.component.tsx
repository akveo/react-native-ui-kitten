
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
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

export interface ComponentProps {
  text: string;
  selected?: boolean;
  disabled?: boolean;
  size?: string;
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
      textColor,
      textFontSize,
      textFontWeight,
      textLineHeight,
      textMarginHorizontal,
      selectedBackgroundColor,
      selectedTextColor,
      ...containerStyles
    } = source;

    return {
      container: containerStyles,
      text: {
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        marginHorizontal: textMarginHorizontal,
      },
      containerSelected: {
        backgroundColor: selectedBackgroundColor,
      },
      textSelected: {
        color: selectedTextColor,
      },
    };
  };

  private renderTextElement = (style: TextStyle, selectedStyle: TextStyle): TextElement => {
    const { text, selected } = this.props;
    const selectedTextStyle: TextStyle = selected ? selectedStyle : {};

    return (
      <Text style={[style, styles.text, selectedTextStyle, this.props.textStyle]}>
        {text}
      </Text>
    );
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, style, disabled, selected } = this.props;
    const {
      container,
      text,
      containerSelected,
      textSelected,
    } = this.getComponentStyle(themedStyle);
    const textElement: TextElement = this.renderTextElement(text, textSelected);
    const selectedContainerStyle: StyleType = selected ? containerSelected : {};

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={[styles.container, container, selectedContainerStyle, style]}
        disabled={disabled}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {textElement}
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
