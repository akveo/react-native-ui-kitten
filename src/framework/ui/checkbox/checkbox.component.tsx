/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewProps,
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
 * import { Checkbox } from 'react-native-ui-kitten';
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
 *       <Checkbox
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
 *     <Checkbox
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
    const { style, textStyle } = this.props;

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

    const hitSlop: number = 40 - containerParameters.width;

    return {
      container: {
        ...StyleSheet.flatten(style),
        ...styles.container,
      },
      highlightContainer: styles.highlightContainer,
      selectContainer: {
        ...containerParameters,
        ...styles.selectContainer,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        ...styles.text,
        ...StyleSheet.flatten(textStyle),
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
        ...styles.highlight,
      },
      hitSlop: {
        top: hitSlop,
        left: hitSlop,
        bottom: hitSlop,
        right: hitSlop,
      },
    };
  };

  private renderTextElement = (style: StyleType): TextElement => {
    const { text } = this.props;

    return (
      <Text style={style}>{text}</Text>
    );
  };

  private renderSelectIconElement = (style: StyleType): IconElement => {
    return (
      <CheckMark style={[style, styles.selectIcon]}/>
    );
  };

  private renderIndeterminateIconElement = (style: StyleType): IconElement => {
    return (
      <View style={[style, styles.indeterminateIcon]}/>
    );
  };

  private renderIconElement = (style: StyleType): IconElement => {
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
    const { style, themedStyle, disabled, text, ...derivedProps } = this.props;

    const {
      container,
      highlightContainer,
      highlight,
      selectContainer,
      hitSlop,
      ...componentStyle
    }: StyleType = this.getComponentStyle(themedStyle);

    const [iconElement, textElement] = this.renderComponentChildren(componentStyle);

    return (
      <TouchableOpacity
        style={container}
        activeOpacity={1.0}
        disabled={disabled}
        hitSlop={hitSlop}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={highlightContainer}>
          <View style={highlight}/>
          <TouchableOpacity
            activeOpacity={1.0}
            {...derivedProps}
            disabled={disabled}
            style={selectContainer}
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
  selectIcon: {},
  indeterminateIcon: {
    borderRadius: 6,
  },
  highlight: {
    position: 'absolute',
  },
  text: {},
});

export const CheckBox = styled<CheckBoxProps>(CheckBoxComponent);
