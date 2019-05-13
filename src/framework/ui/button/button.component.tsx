/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
  StyleSheet,
  ImageProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
  Interaction,
  styled,
} from '@kitten/theme';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';
import {
  ButtonIconAlignment,
  ButtonIconAlignments,
} from './type';

interface ButtonProps {
  textStyle?: StyleProp<TextStyle>;
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  status?: string;
  size?: string;
  iconAlignment?: string | ButtonIconAlignment;
  children?: React.ReactText;
}

const Text = styled<TextProps>(TextComponent);

export type Props = ButtonProps & StyledComponentProps & TouchableOpacityProps;

const ALIGNMENT_DEFAULT: ButtonIconAlignment = ButtonIconAlignments.LEFT;

/**
 * The `Button` component is an analog of html button.
 *
 * @extends React.Component
 *
 * @property {boolean} disabled - Determines whether component is disabled. By default is false.
 *
 * @property {string} status - Determines the status of the component.
 * Can be 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'white'.
 * By default status is 'primary'.
 *
 * @property {string} size - Determines the size of the component.
 * Can be 'tiny' | 'small' | 'medium' | 'large' | 'giant'.
 * By default size is 'medium'.
 *
 * @property {React.ReactText} children - Determines text of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines icon of the component.
 *
 * @property {string | ButtonIconAlignment} iconAlignment - Determines icon alignment of the component.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be 'filled' | 'outline' | 'ghost'.
 * By default appearance is 'filled'.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```
 * import { Button } from '@kitten/ui';
 * <Button>Test Button</Button>
 * ```
 *
 * @example Button API example
 *
 * ```
 * import { Button } from '@kitten/ui';
 *
 * private onButtonPress = (event: GestureResponderEvent): void => {
 *   console.log('Button press);
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <Button
 *       appearance='outline'
 *       style={styles.button}
 *       status='success'
 *       size='large'
 *       iconAlignment='left'
 *       icon={(style: StyleType) => <Image source={{ uri: '...' }} style={style}/>}
 *       onPress={this.onButtonPress}>
 *       TEST BUTTON
 *     </Button>
 *   );
 * }
 * ```
 * */

export class Button extends React.Component<Props> {

  static styledComponentName: string = 'Button';

  static defaultProps: Partial<Props> = {
    iconAlignment: 'left',
  };

  private onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(event);
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
      textColor,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textMarginHorizontal,
      iconWidth,
      iconHeight,
      iconTintColor,
      iconMarginHorizontal,
      ...containerParameters
    } = style;

    const { iconAlignment } = this.props;

    const alignment: ButtonIconAlignment = ButtonIconAlignments.parse(iconAlignment, ALIGNMENT_DEFAULT);

    return {
      container: {
        ...containerParameters,
        ...StyleSheet.flatten(containerStyle),
        ...styles.container,
        flexDirection: alignment.flex(),
      },
      text: {
        color: textColor,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        marginHorizontal: textMarginHorizontal,
        ...StyleSheet.flatten(textStyle),
        ...styles.text,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        tintColor: iconTintColor,
        marginHorizontal: iconMarginHorizontal,
        ...styles.icon,
      },
    };
  };

  private renderTextElement = (style: StyleType): React.ReactElement<TextProps> => {
    const { children: text } = this.props;

    return (
      <Text
        style={style}
        key={1}>
        {text}
      </Text>
    );
  };

  private renderImageElement = (style: StyleType): React.ReactElement<ImageProps> | null => {
    const { icon } = this.props;
    return icon ? React.cloneElement(icon(style), { key: 2 }) : null;
  };

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { icon, children } = this.props;

    const hasIcon: boolean = icon !== undefined;
    const hasText: boolean = children !== undefined;

    return [
      hasIcon ? this.renderImageElement(style.icon) : undefined,
      hasText ? this.renderTextElement(style.text) : undefined,
    ];
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...derivedProps}
        style={container}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {componentChildren}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {},
  icon: {},
});
