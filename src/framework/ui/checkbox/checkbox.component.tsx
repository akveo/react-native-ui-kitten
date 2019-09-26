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
  ViewProps,
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
import { CheckMark } from '../support/components';
import { isValidString } from '../support/services';

type IconElement = React.ReactElement<ViewProps>;

interface ComponentProps {
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  checked?: boolean;
  indeterminate?: boolean;
  status?: string;
  onChange?: (checked: boolean, indeterminate: boolean) => void;
}

export type CheckBoxProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;
export type CheckBoxElement = React.ReactElement<CheckBoxProps>;

/**
 * Styled `CheckBox` component.
 *
 * @extends React.Component
 *
 * @property {boolean} checked - Determines whether component is checked.`
 * Default is `false`.
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * Default is `false.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `primary`, `success`, `info`, `warning`, `danger`, `basic` or `control`.
 * Default is `basic`.
 *
 * @property {string} text - Determines text of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(checked: boolean) => void} onChange - Fires on checkbox value change.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { CheckBox } from 'react-native-ui-kitten';
 *
 * export class CheckBoxShowcase extends React.Component {
 *
 *   state = {
 *     checked: false,
 *   };
 *
 *   onChange = (checked) => {
 *     this.setState({ checked });
 *   };
 *
 *   render() {
 *     return (
 *       <CheckBox
 *         checked={this.state.checked}
 *         onChange={this.onChange}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example With Text
 *
 * ```
 * import React from 'react';
 * import { CheckBox } from 'react-native-ui-kitten';
 *
 * export class RememberPasswordCheckBox extends React.Component {
 *
 *   state = {
 *     checked: false,
 *   };
 *
 *   onChange = (checked) => {
 *     this.setState({ checked });
 *   };
 *
 *   render() {
 *     return (
 *       <CheckBox
 *         text='Remember Password'
 *         checked={this.state.checked}
 *         onChange={this.onChange}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example Eva Styling
 *
 * ```
 * import React from 'react';
 * import { CheckBox } from 'react-native-ui-kitten';
 *
 * export class CheckBoxShowcase extends React.Component {
 *
 *   state = {
 *     checked: false,
 *   };
 *
 *   onChange = (checked) => {
 *     this.setState({ checked });
 *   };
 *
 *   render() {
 *     return (
 *       <CheckBox
 *         checked={this.state.checked}
 *         status='success'
 *         onChange={this.onChange}
 *       />
 *     );
 *   }
 * }
 * ```
 *
 * @example Indeterminate State
 *
 * ```
 * import React from 'react';
 * import { View, StyleSheet } from 'react-native';
 * import { CheckBox } from 'react-native-ui-kitten';
 *
 * export class CheckBoxContainer extends React.Component {
 *
 *   state = {
 *     mainCheckboxChecked: false,
 *     mainCheckboxIndeterminate: false,
 *     checkbox1Checked: false,
 *     checkbox2Checked: false,
 *     checkbox3Checked: false,
 *   };
 *
 *   onMainCheckboxChange = (checked) => {
 *     if (checked) {
 *       this.setState({
 *         checkbox1Checked: true,
 *         checkbox2Checked: true,
 *         checkbox3Checked: true,
 *       });
 *     } else {
 *       this.setState({
 *         checkbox1Checked: false,
 *         checkbox2Checked: false,
 *         checkbox3Checked: false,
 *       });
 *     }
 *     this.setState({ mainCheckboxChecked: checked });
 *   };
 *
 *   onCheckbox1Change = (checked) => {
 *     this.setState({ checkbox1Checked: checked }, this.setMainCheckboxDependingState);
 *   };
 *
 *   onCheckbox2Change = (checked) => {
 *     this.setState({ checkbox2Checked: checked }, this.setMainCheckboxDependingState);
 *   };
 *
 *   onCheckbox3Change = (checked) => {
 *     this.setState({ checkbox3Checked: checked }, this.setMainCheckboxDependingState);
 *   };
 *
 *   setMainCheckboxDependingState = () => {
 *     const { checkbox1Checked, checkbox2Checked, checkbox3Checked } = this.state;
 *     const states = [checkbox1Checked, checkbox2Checked, checkbox3Checked];
 *     const someChecked = states.some((item) => item === true);
 *     const everyChecked = states.every((item) => item === true);
 *
 *     if (someChecked && !everyChecked) {
 *       this.setState({
 *         mainCheckboxChecked: true,
 *         mainCheckboxIndeterminate: true,
 *       });
 *     } else if (!someChecked && !everyChecked) {
 *       this.setState({
 *         mainCheckboxChecked: false,
 *         mainCheckboxIndeterminate: false,
 *       });
 *     } else if (everyChecked) {
 *       this.setState({
 *         mainCheckboxChecked: true,
 *         mainCheckboxIndeterminate: false,
 *       });
 *     }
 *   };
 *
 *   render() {
 *     const {
 *       mainCheckboxChecked,
 *       mainCheckboxIndeterminate,
 *       checkbox1Checked,
 *       checkbox2Checked,
 *       checkbox3Checked,
 *     } = this.state;
 *
 *    return (
 *      <View style={{ flex: 1 }}>
 *        <CheckBox
 *          style={{ marginBottom: 12 }}
 *          text='Main'
 *          checked={mainCheckboxChecked}
 *          indeterminate={mainCheckboxIndeterminate}
 *          onChange={this.onMainCheckboxChange}
 *        />
 *        <CheckBox
 *          text='Checkbox 1'
 *          style={{ marginLeft: 12, marginBottom: 12 }}
 *          checked={checkbox1Checked}
 *          onChange={this.onCheckbox1Change}
 *        />
 *        <CheckBox
 *          text='Checkbox 2'
 *          style={{ marginLeft: 12, marginBottom: 12 }}
 *          checked={checkbox2Checked}
 *          onChange={this.onCheckbox2Change}
 *        />
 *        <CheckBox
 *          text='Checkbox 3'
 *          style={{ marginLeft: 12 }}
 *          checked={checkbox3Checked}
 *          onChange={this.onCheckbox3Change}
 *        />
 *      </View>
 *    );
 *   }
 * }
 * ```
 *
 * @example Inline Styling
 *
 * ```
 * import React from 'react';
 * import { StyleSheet } from 'react-native';
 * import { CheckBox } from 'react-native-ui-kitten';
 *
 * export const CheckBoxShowcase = (props) => (
 *   <CheckBox
 *     style={styles.checkbox}
 *     textStyle={styles.checkboxText}
 *   />
 * );
 *
 * const styles = StyleSheet.create({
 *   checkbox: { borderRadius: 8 },
 *   checkboxText: { color: 'black' },
 * });
 * ```
 */
class CheckBoxComponent extends React.Component<CheckBoxProps> {

  static styledComponentName: string = 'CheckBox';

  private onPress = () => {
    this.props.dispatch([]);

    if (this.props.onChange) {
      this.props.onChange(!this.props.checked, false);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
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
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
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

  private renderTextElement = (style: TextStyle): TextElement => {
    const { text, textStyle } = this.props;

    return (
      <Text style={[style, styles.text, textStyle]}>{text}</Text>
    );
  };

  private renderSelectIconElement = (style: ViewStyle): IconElement => {
    return (
      <CheckMark style={[style, styles.icon]}/>
    );
  };

  private renderIndeterminateIconElement = (style: ViewStyle): IconElement => {
    return (
      <View style={[style, styles.icon]}/>
    );
  };

  private renderIconElement = (style: ViewStyle): IconElement => {
    if (this.props.indeterminate) {
      return this.renderIndeterminateIconElement(style);
    } else {
      return this.renderSelectIconElement(style);
    }
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { text } = this.props;

    return [
      this.renderIconElement(style.icon),
      isValidString(text) && this.renderTextElement(style.text),
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, style, disabled, text, ...derivedProps } = this.props;

    const {
      container,
      highlightContainer,
      highlight,
      selectContainer,
      ...componentStyle
    } = this.getComponentStyle(themedStyle);

    const selectContainerStyle: StyleProp<ViewStyle> = [selectContainer, styles.selectContainer];
    const hitSlopInsets: Insets = this.createHitSlopInsets(selectContainerStyle);

    const [iconElement, textElement] = this.renderComponentChildren(componentStyle);

    return (
      <TouchableOpacity
        style={[container, styles.container, style]}
        activeOpacity={1.0}
        disabled={disabled}
        hitSlop={hitSlopInsets}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={[highlightContainer, styles.highlightContainer]}>
          <View style={[highlight, styles.highlight]}/>
          <TouchableOpacity
            activeOpacity={1.0}
            {...derivedProps}
            disabled={disabled}
            style={selectContainerStyle}
            onPress={this.onPress}
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}>
            {iconElement}
          </TouchableOpacity>
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
  highlight: {
    position: 'absolute',
  },
  icon: {},
  text: {},
});

export const CheckBox = styled<CheckBoxProps>(CheckBoxComponent);
