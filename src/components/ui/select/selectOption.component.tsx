/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewProps,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import {
  TouchableWithoutFeedback,
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../../devsupport';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { CheckBox } from '../checkbox/checkbox.component';

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
    this.props.eva.dispatch([Interaction.HOVER]);
  };

  public onMouseLeave = (): void => {
    this.props.eva.dispatch([]);
  };

  private onPress = (event: GestureResponderEvent): void => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.item);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);
  };

  private onMultiSelectItemPress = (value: boolean): void => {
    this.onPress(null);
  };

  private getComponentStyle = (source: StyleType) => {
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

  private renderTextElement = (style: StyleProp<TextStyle>): TextElement => {
    // style={[evaStyle.text, this.props.item.textStyle]}>
    return (
      <Text style={style}>
        {this.props.item.text}
      </Text>
    );
  };

  private renderSingleElement = (): React.ReactElement<TouchableOpacityProps> => {
    const { eva, style, item, ...restProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWithoutFeedback
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        style={[styles.container, evaStyle.container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <Text style={[evaStyle.text, item.textStyle]}>
          {item.text}
        </Text>
      </TouchableWithoutFeedback>
    );
  };

  private renderMultiSelectElement = (): React.ReactElement<ViewProps> => {
    const { style, eva, selected, disabled, indeterminate, item, ...restProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <View
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        style={[styles.container, evaStyle.container, webStyles.container, style]}>
        <CheckBox
          text={props => <Text {...props} style={[
            props.style,
            evaStyle.text,
            item.textStyle,
            styles.multiSelectText,
          ]}>{item.text}</Text>}
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
