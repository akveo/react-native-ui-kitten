/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { SvgProps } from 'react-native-svg';
import { GestureResponderEvent, NativeSyntheticEvent, StyleSheet, TargetedEvent, View } from 'react-native';
import { Overwrite } from 'utility-types';
import {
  EvaStatus,
  FalsyText,
  RenderProp,
  TouchableWeb,
  TouchableWebElement,
  TouchableWebProps,
} from '../../devsupport';
import { Interaction, styled, StyledComponentProps, StyleType } from '../../theme';
import { TextProps } from '../text/text.component';
import { CheckMark, CheckMarkProps } from '../shared/checkmark.component';
import { Minus, MinusProps } from '../shared/minus.component';

type CheckBoxStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

export interface CheckBoxProps extends TouchableWebProps, CheckBoxStyledProps {
  children?: RenderProp<TextProps> | React.ReactText;
  checked?: boolean;
  onChange?: (checked: boolean, indeterminate: boolean) => void;
  indeterminate?: boolean;
  status?: EvaStatus;
}

export type CheckBoxElement = React.ReactElement<CheckBoxProps>;

/**
 * Checkboxes allow the user to select one or more items from a set.
 *
 * @extends React.Component
 *
 * @property {boolean} checked - Whether component is checked.
 * Defaults to *false*.
 *
 * @property {(checked: boolean, indeterminate: boolean) => void} onChange - Called when checkbox
 * should switch it's value.
 * Called with *checked* and *indeterminate* values.
 * If *indeterminate* was provided, it should be changed to the value passed in this function.
 *
 * @property {boolean} indeterminate - Whether checked status is indeterminate.
 * Will set indeterminate to false when the checked property is changed.
 * Defaults to *false*.
 *
 * @property {ReactText | (TextProps) => ReactElement} children - String, number or a function component
 * to render near the checkbox.
 * If it is a function, expected to return a Text.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example CheckboxSimpleUsage
 *
 * @overview-example CheckboxStates
 *
 * @overview-example CheckboxIndeterminate
 *
 * @overview-example CheckboxStatus
 *
 * @example CheckboxStyling
 */
class CheckBoxComponent extends React.Component<CheckBoxProps> {

  static styledComponentName: string = 'CheckBox';

  private onMouseEnter = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
    this.props.onMouseEnter && this.props.onMouseEnter(e);
  };

  private onMouseLeave = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onMouseLeave && this.props.onMouseLeave(e);
  };

  private onFocus = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([Interaction.FOCUSED]);
    this.props.onFocus && this.props.onFocus(e);
  };

  private onBlur = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    this.props.eva.dispatch([]);
    this.props.onBlur && this.props.onBlur(e);
  };

  private onPress = (): void => {
    this.props.eva.dispatch([]);
    this.props.onChange && this.props.onChange(!this.props.checked, false);
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);
    this.props.onPressIn && this.props.onPressIn(event);
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);
    this.props.onPressOut && this.props.onPressOut(event);
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
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        color: textColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        fill: iconTintColor,
        stroke: iconTintColor,
        strokeWidth: 3,
      },
      highlight: {
        width: outlineWidth,
        height: outlineHeight,
        borderRadius: outlineBorderRadius,
        backgroundColor: outlineBackgroundColor,
      },
    };
  };

  private renderIconElement = (style: SvgProps): React.ReactElement<SvgProps> => {
    const Icon: React.ComponentType<MinusProps | CheckMarkProps> = this.props.indeterminate ? Minus : CheckMark;
    return (
      <Icon {...style} />
    );
  };

  public render(): TouchableWebElement {
    const { eva, style, disabled, children, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <TouchableWeb
        {...touchableProps}
        style={[styles.container, style]}
        disabled={disabled}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={styles.highlightContainer}>
          <View style={[evaStyle.highlight, styles.highlight]}/>
          <View style={[evaStyle.selectContainer, styles.selectContainer]}>
            {this.renderIconElement(evaStyle.icon)}
          </View>
        </View>
        <FalsyText
          style={evaStyle.text}
          component={children}
        />
      </TouchableWeb>
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

export const CheckBox = styled<CheckBoxProps>(CheckBoxComponent);
