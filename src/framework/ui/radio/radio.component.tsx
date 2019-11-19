/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  Insets,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
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

interface ComponentProps {
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  checked?: boolean;
  status?: string;
  onChange?: (selected: boolean) => void;
}

export type RadioProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;
export type RadioElement = React.ReactElement<RadioProps>;

/**
 * Styled `Radio` component.
 *
 * @extends React.Component
 *
 * @property {boolean} checked - Determines whether component is checked.
 * Default is `false`.
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * Default is `false`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string} text - Determines text of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(selected: boolean) => void} onChange - Triggered on onChange value.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example RadioSimpleUsage
 *
 * @overview-example RadioStates
 *
 * @overview-example RadioStatus
 *
 * @example RadioInlineStyling
 */
export class RadioComponent extends React.Component<RadioProps> {

  static styledComponentName: string = 'Radio';

  private onPress = (): void => {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked);
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
      textMarginHorizontal,
      textFontFamily,
      textFontSize,
      textFontWeight,
      textLineHeight,
      textColor,
      iconWidth,
      iconHeight,
      iconBorderRadius,
      iconTintColor,
      outlineWidth,
      outlineHeight,
      outlineBorderRadius,
      outlineBackgroundColor,
      ...containerParameters
    } = source;

    return {
      container: {},
      highlightContainer: {},
      selectContainer: containerParameters,
      text: {
        marginHorizontal: textMarginHorizontal,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        borderRadius: iconBorderRadius,
        backgroundColor: iconTintColor,
      },
      highlight: {
        width: outlineWidth,
        height: outlineHeight,
        borderRadius: outlineBorderRadius,
        backgroundColor: outlineBackgroundColor,
      },
    };
  };

  private createHitSlopInsets = (style: StyleProp<ViewStyle>): Insets => {
    const flatStyle: ViewStyle = StyleSheet.flatten(style);

    // @ts-ignore `width` is restricted to be a number
    const value: number = 40 - flatStyle.width;

    return {
      left: value,
      top: value,
      right: value,
      bottom: value,
    };
  };

  private renderTextElement = (style: StyleType): TextElement => {
    const { text, textStyle } = this.props;

    return (
      <Text
        key={0}
        style={[style, styles.text, textStyle]}>
        {text}
      </Text>
    );
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { text } = this.props;

    return [
      isValidString(text) && this.renderTextElement(style.text),
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { style, themedStyle, disabled, ...derivedProps } = this.props;

    const {
      container,
      highlightContainer,
      selectContainer,
      icon,
      highlight,
      ...componentStyles
    } = this.getComponentStyle(themedStyle);

    const selectContainerStyle: StyleProp<ViewStyle> = [selectContainer, styles.selectContainer];
    const hitSlopInsets: Insets = this.createHitSlopInsets(selectContainerStyle);

    const [textElement] = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...derivedProps}
        style={[container, styles.container, style]}
        disabled={disabled}
        hitSlop={hitSlopInsets}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={[highlightContainer, styles.highlightContainer]}>
          <View style={[highlight, styles.highlight]}/>
          <View style={selectContainerStyle}>
            <View style={[icon, styles.icon]}/>
          </View>
        </View>
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
  highlightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  highlight: {
    position: 'absolute',
  },
  text: {},
});

export const Radio = styled<RadioProps>(RadioComponent);
