/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  Insets,
  Platform,
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import { Overwrite } from 'utility-types';
import {
  FalsyText,
  RenderProp,
  TouchableWithoutFeedback,
  WebEventResponder,
  WebEventResponderInstance,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type RadioStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

export interface RadioProps extends TouchableOpacityProps, RadioStyledProps {
  checked?: boolean;
  onChange?: (selected: boolean) => void;
  text?: RenderProp<TextProps> | React.ReactText;
  status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control' | string;
}

export type RadioElement = React.ReactElement<RadioProps>;

/**
 * Styled `Radio` component.
 *
 * @extends React.Component
 *
 * @property {boolean} checked - Determines whether component is checked.
 * Default is `false`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string | (props: TextProps) => ReactElement} text - A string or a function component
 * to render near the radio.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(checked: boolean) => void} onChange - Called on radio value change.
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

  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
  };

  public onMouseLeave = (): void => {
    this.props.eva.dispatch([]);
  };

  public onFocus = (): void => {
    this.props.eva.dispatch([Interaction.FOCUSED]);
  };

  public onBlur = (): void => {
    this.props.eva.dispatch([]);
  };

  private onPress = (): void => {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private getComponentStyle = (source: StyleType) => {
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

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { eva, style, text, disabled, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    const selectContainerStyle: StyleProp<ViewStyle> = [evaStyle.selectContainer, styles.selectContainer];
    const hitSlopInsets: Insets = this.createHitSlopInsets(selectContainerStyle);

    return (
      <TouchableWithoutFeedback
        {...touchableProps}
        {...this.webEventResponder.eventHandlers}
        style={[styles.container, webStyles.container, style]}
        disabled={disabled}
        hitSlop={hitSlopInsets}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={styles.highlightContainer}>
          <View style={[evaStyle.highlight, styles.highlight]}/>
          <View style={selectContainerStyle}>
            <View style={evaStyle.icon}/>
          </View>
        </View>
        <FalsyText
          style={evaStyle.text}
          component={text}
        />
      </TouchableWithoutFeedback>
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
  highlight: {
    position: 'absolute',
  },
});

const webStyles = Platform.OS === 'web' && StyleSheet.create({
  container: {
    // @ts-ignore
    outlineWidth: 0,
  },
});


export const Radio = styled<RadioProps>(RadioComponent);
