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
  TextProps,
} from '../text/text.component';
import { CheckMark } from '../support/components';
import { isValidString } from '../support/services';

type IconElement = React.ReactElement<ViewProps>;
type TextElement = React.ReactElement<TextProps>;

interface ComponentProps {
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  checked?: boolean;
  indeterminate?: boolean;
  status?: string;
  onChange?: (checked: boolean, indeterminate: boolean) => void;
}

export type CheckBoxProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;

/**
 * Styled CheckBox component.
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
 * Can be `primary`, `success`, `info`, `warning` or `danger`.
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
 * @example Simple usage example
 *
 * ```
 * import React from 'react';
 * import { CheckBox } from 'react-native-ui-kitten';
 *
 * export class CheckBoxShowcase extends React.Component {
 *
 *   public state = {
 *     checked: false,
 *   };
 *
 *   private onChange = (checked: boolean) => {
 *     this.setState({ checked });
 *   };
 *
 *   public render(): React.ReactNode {
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
 * @example Inline styling example
 *
 * ```
 * import React from 'react';
 * import { CheckBox, CheckBoxProps } from 'react-native-ui-kitten';
 *
 * export const CheckBoxShowcase = (props?: CheckBoxProps): React.ReactElement<CheckBoxProps> => {
 *   return (
 *     <CheckBox
 *       style={styles.checkbox}
 *       textStyle={styles.checkboxText}
 *       text='Place your text'
 *       checked={this.state.checked}
 *     />
 *   );
 * };
 * ```
 * */

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
      textColor,
      textFontSize,
      textFontWeight,
      textLineHeight,
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
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
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
