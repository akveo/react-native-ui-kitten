/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { SvgProps } from 'react-native-svg';
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
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';
import {
  CheckMark,
  CheckMarkProps,
} from '../shared/checkmark.component';
import {
  Minus,
  MinusProps,
} from '../shared/minus.component';

type CheckBoxStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

export interface CheckBoxProps extends TouchableOpacityProps, CheckBoxStyledProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean, indeterminate: boolean) => void;
  text?: RenderProp<TextProps> | React.ReactText;
  status?: 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control' | string;
}

export type CheckBoxElement = React.ReactElement<CheckBoxProps>;

/**
 * Styled `CheckBox` component.
 *
 * @extends React.Component
 *
 * @property {boolean} checked - Determines whether component is checked.
 * Default is `false`.
 *
 * @property {boolean} indeterminate - Determines whether checked status is indeterminate.
 * Will set indeterminate to false when the checked property is changed.
 * Default is `false`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string | (props: TextProps) => ReactElement} text - A string or a function component
 * to render near the checkbox.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(checked: boolean, indeterminate: boolean) => void} onChange - Called on checkbox value change.
 * Called with `checked` and `indeterminate` values.
 * If `indeterminate` was provided in state, it should be changed to the value passed in this function.
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
 * @example CheckboxInlineStyling
 */
class CheckBoxComponent extends React.Component<CheckBoxProps> implements WebEventResponderCallbacks {

  static styledComponentName: string = 'CheckBox';

  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  // WebEventResponderCallbacks

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
    this.props.eva.dispatch([]);

    if (this.props.onChange) {
      this.props.onChange(!this.props.checked, false);
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

  private createHitSlopInsets = (style: StyleProp<ViewStyle>): Insets => {
    const { width } = StyleSheet.flatten(style);

    // @ts-ignore: `width` is restricted to be a number
    const value: number = 40 - width;

    return {
      left: value,
      top: value,
      right: value,
      bottom: value,
    };
  };

  private renderIconElement = (style: SvgProps): React.ReactElement<SvgProps> => {
    const Icon: React.ComponentType<MinusProps | CheckMarkProps> = this.props.indeterminate ? Minus : CheckMark;
    return (
      <Icon {...style} />
    );
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { eva, style, disabled, text, ...touchableProps } = this.props;

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
            {this.renderIconElement(evaStyle.icon)}
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

export const CheckBox = styled<CheckBoxProps>(CheckBoxComponent);
