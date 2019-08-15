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
  ViewProps,
  View,
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
import { CheckBox } from '../checkbox/checkbox.component';
import { TouchableTypeReturningProps } from '../support/typings';

type TextElement = React.ReactElement<TextProps>;
type DefaultItemElement = React.ReactElement<TouchableOpacityProps>;
type MultiSelectItemElement = React.ReactElement<ViewProps>;

export interface DropdownItemType {
  text: string;
  textStyle?: TextStyle;
  disabled?: boolean;
  items?: DropdownItemType[];
}

export interface ComponentProps {
  item: DropdownItemType;
  selected?: boolean;
  indeterminate?: boolean;
  multiSelect?: boolean;
}

export type DropdownItemProps = ComponentProps & StyledComponentProps & TouchableTypeReturningProps<DropdownItemType>;
export type DropdownItemElement = React.ReactElement<DropdownItemProps>;

class DropdownItemComponent extends React.Component<DropdownItemProps> {

  static styledComponentName: string = 'DropdownItem';

  private onPress = (event: GestureResponderEvent) => {
    const { item, onPress } = this.props;

    this.props.dispatch([]);
    onPress(item, event);
  };

  private onMultiSelectItemPress = (value: boolean): void => {
    this.onPress(null);
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(this.props.item, event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(this.props.item, event);
    }
  };

  private onLongPress = (event: GestureResponderEvent) => {
    if (this.props.onLongPress) {
      this.props.onLongPress(this.props.item, event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      textColor,
      textFontSize,
      textFontWeight,
      textLineHeight,
      textMarginHorizontal,
      multiSelectBackgroundColor,
      multiSelectTextColor,
      ...containerStyles
    } = source;

    return {
      container: containerStyles,
      multiSelectContainer: {
        ...containerStyles,
        backgroundColor: multiSelectBackgroundColor,
      },
      text: {
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        marginHorizontal: textMarginHorizontal,
      },
      multiSelectText: {
        color: multiSelectTextColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        marginHorizontal: textMarginHorizontal,
      },
    };
  };

  private renderTextElement = (style: TextStyle): TextElement => {
    const { item } = this.props;

    return (
      <Text style={[style, styles.text, item.textStyle]}>
        {item.text}
      </Text>
    );
  };

  private renderDefaultItem = (): DefaultItemElement => {
    const { themedStyle, style, item, ...restProps } = this.props;
    const { container, text } = this.getComponentStyle(themedStyle);
    const textElement: TextElement = this.renderTextElement(text);

    return (
      <TouchableOpacity
        {...restProps}
        activeOpacity={1.0}
        style={[styles.container, container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onLongPress={this.onLongPress}>
        {textElement}
      </TouchableOpacity>
    );
  };

  private renderMultiSelectItem = (): MultiSelectItemElement => {
    const {
      disabled,
      item,
      themedStyle,
      selected,
      style,
      indeterminate,
      ...restProps
    } = this.props;
    const { multiSelectContainer, multiSelectText } = this.getComponentStyle(themedStyle);

    return (
      <View
        {...restProps}
        style={[styles.container, multiSelectContainer, style]}>
        <CheckBox
          text={item.text}
          textStyle={[multiSelectText, item.textStyle]}
          disabled={disabled}
          checked={selected}
          indeterminate={indeterminate}
          onChange={this.onMultiSelectItemPress}
        />
      </View>
    );
  };

  public render(): React.ReactNode {
    const { multiSelect } = this.props;

    return multiSelect ? this.renderMultiSelectItem() : this.renderDefaultItem();
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
