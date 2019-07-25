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
  multiSelect?: boolean;
  size?: string;
}

export type DropdownItemProps = ComponentProps & StyledComponentProps & TouchableTypeReturningProps<DropdownItemType>;

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
    const { item, selected } = this.props;
    const selectedTextStyle: TextStyle = selected ? selectedStyle : {};

    return (
      <Text style={[style, styles.text, selectedTextStyle, item.textStyle]}>
        {item.text}
      </Text>
    );
  };

  private renderDefaultItem = (): React.ReactElement<TouchableOpacityProps> => {
    const { themedStyle, style, selected, ...restProps } = this.props;
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
        {...restProps}
        activeOpacity={1.0}
        style={[styles.container, container, selectedContainerStyle, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onLongPress={this.onLongPress}>
        {textElement}
      </TouchableOpacity>
    );
  };

  private renderMultiSelectItem = (): React.ReactElement<ViewProps> => {
    const { disabled, item, themedStyle, selected, style, ...restProps } = this.props;
    const {
      container,
      text,
      containerSelected,
      textSelected,
    } = this.getComponentStyle(themedStyle);
    const selectedTextStyle: TextStyle = selected ? textSelected : {};
    const selectedContainerStyle: StyleType = selected ? containerSelected : {};

    return (
      <View
        {...restProps}
        style={[styles.container, container, selectedContainerStyle, style]}>
        <CheckBox
          text={item.text}
          textStyle={[text, selectedTextStyle, item.textStyle]}
          disabled={disabled}
          checked={selected}
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
