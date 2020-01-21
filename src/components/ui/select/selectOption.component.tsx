/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  Platform,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View, ViewProps,
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
import { CheckBox } from '../checkbox/checkbox.component';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export interface SelectOptionType {
  text: string;
  textStyle?: TextStyle;
  disabled?: boolean;
  items?: SelectOptionType[];
}

export interface SelectOptionProps extends StyledComponentProps, TouchableOpacityProps {
  item: SelectOptionType;
  selected: boolean;
  indeterminate?: boolean;
  multi?: boolean;
  onSelect: (item: SelectOptionType) => void;
}

export type SelectOptionElement = React.ReactElement<SelectOptionProps>;

class SelectOptionComponent extends React.Component<SelectOptionProps> implements WebEventResponderCallbacks {

  static styledComponentName: string = 'SelectOption';

  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  // WebEventResponderCallbacks

  public onMouseEnter = (): void => {
    this.props.dispatch([Interaction.HOVER]);
  };

  public onMouseLeave = (): void => {
    this.props.dispatch([]);
  };

  private onPress = (event: GestureResponderEvent): void => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.item);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.dispatch([Interaction.ACTIVE]);
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.dispatch([]);
  };

  private onMultiSelectItemPress = (value: boolean): void => {
    this.onPress(null);
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      textColor,
      textFontFamily,
      textFontSize,
      textFontWeight,
      textLineHeight,
      textMarginHorizontal,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      text: {
        color: textColor,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        marginHorizontal: textMarginHorizontal,
      },
    };
  };

  private renderTextElement = (style: TextStyle): TextElement => {
    return (
      <Text style={[style, styles.text, this.props.item.textStyle]}>
        {this.props.item.text}
      </Text>
    );
  };

  private renderSingleElement = (): React.ReactElement<TouchableOpacityProps> => {
    const { themedStyle, style, item, ...restProps } = this.props;
    const { container, text } = this.getComponentStyle(themedStyle);
    const textElement: TextElement = this.renderTextElement(text);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        style={[styles.container, container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {textElement}
      </TouchableOpacity>
    );
  };

  private renderMultiSelectElement = (): React.ReactElement<ViewProps> => {
    const { style, themedStyle, selected, disabled, indeterminate, item, ...restProps } = this.props;
    const { container, text } = this.getComponentStyle(themedStyle);

    return (
      <View
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        style={[styles.container, container, webStyles.container, style]}>
        <CheckBox
          text={item.text}
          textStyle={[text, item.textStyle, styles.multiSelectText]}
          disabled={disabled}
          checked={selected}
          indeterminate={indeterminate}
          onChange={this.onMultiSelectItemPress}
        />
      </View>
    );
  };

  public render(): React.ReactNode {
    return this.props.multi ? this.renderMultiSelectElement() : this.renderSingleElement();
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {},
  text: {},
  multiSelectText: {
    width: '100%',
  },
});

const webStyles = Platform.OS === 'web' && StyleSheet.create({
  container: {
    // @ts-ignore
    outlineWidth: 0,
  },
});

export const SelectOption = styled<SelectOptionProps>(SelectOptionComponent);
