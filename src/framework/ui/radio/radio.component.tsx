/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  StyleProp,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
  Interaction,
} from '@kitten/theme';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';

interface RadioProps {
  textStyle?: StyleProp<TextStyle>;
  text?: string;
  checked?: boolean;
  status?: string;
  size?: string;
  onChange?: (selected: boolean) => void;
}

const Text = styled<TextProps>(TextComponent);

export type Props = RadioProps & StyledComponentProps & TouchableOpacityProps;

/**
 * The `Radio` component is an analog of html radio button.
 *
 * @extends React.Component
 *
 * @property {boolean} checked - Determines whether component is checked.
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * By default is false.
 *
 * @property {string} status - Determines the status of the component.
 * Can be 'primary' | 'success' | 'info' | 'warning' | 'danger'.
 * By default status='primary'.
 *
 * @property {string} size - Determines whether component is disabled.
 * Can be 'small' | 'medium' | 'large'.
 * By default size='medium'.
 *
 * @property {string} text - Determines text of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(selected: boolean) => void} onChange - Triggered on change value.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```tsx
 * import { Radio } from '@kitten/ui';
 * <Radio checked={true}/>
 * ```
 * @example Radio API example
 *
 * ```tsx
 * import { Radio } from '@kitten/ui';
 *
 * state: State = {
 *   checked: false,
 * };
 *
 * private onChange = (checked: boolean): void => {
 *   this.setState({ checked: value });
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <Radio
 *       checked={this.state.checked}
 *       size='small'
 *       status='warning'
 *       text='Place your text'
 *       textStyle={styles.radioText}
 *       onChange={this.onChange}/>
 *   )
 * }
 * ```
 * */

export class Radio extends React.Component<Props> {

  static styledComponentName: string = 'Radio';

  private onPress = () => {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked);
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

  private getComponentStyle = (style: StyleType): StyleType => {
    const { style: containerStyle, textStyle } = this.props;

    const {
      textMarginHorizontal,
      textFontSize,
      textFontWeight,
      textLineHeight,
      textColor,
      iconWidth,
      iconHeight,
      iconBorderRadius,
      iconTintColor,
      highlightWidth,
      highlightHeight,
      highlightBorderRadius,
      highlightBackgroundColor,
      ...containerParameters
    } = style;

    return {
      container: {
        ...StyleSheet.flatten(containerStyle),
        ...styles.container,
      },
      highlightContainer: styles.highlightContainer,
      selectContainer: {
        ...containerParameters,
        ...styles.iconContainer,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
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
        width: highlightWidth,
        height: highlightHeight,
        borderRadius: highlightBorderRadius,
        backgroundColor: highlightBackgroundColor,
        ...styles.highlight,
      },
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { text } = this.props;

    return (
      <Text style={style} key={0}>{text}</Text>
    );
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { text } = this.props;

    return [
      text ? this.renderTextElement(style.text) : undefined,
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

    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        style={container}
        activeOpacity={1.0}
        disabled={disabled}
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
            <View style={icon}/>
          </TouchableOpacity>
        </View>
        {componentChildren}
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
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  highlight: {
    position: 'absolute',
  },
  text: {},
});
