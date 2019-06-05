/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  ImageProps,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
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
import {
  allWithRest,
  isValidString,
} from '../support/services';
import {
  FlexStyleProps,
  InputEndEditEvent,
  InputFocusEvent,
} from '../support/typings';

type TextElement = React.ReactElement<TextProps>;
type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: StyleType) => IconElement;

interface ComponentProps {
  status?: string;
  disabled?: boolean;
  label?: string;
  caption?: string;
  captionIcon?: IconProp;
  icon?: IconProp;
  textStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  captionTextStyle?: StyleProp<TextStyle>;
}

export type InputProps = StyledComponentProps & TextInputProps & ComponentProps;

/**
 * The `Input` component is an analog of html input.
 *
 * @extends React.Component
 *
 * @property {boolean} disabled - Determines whether component is disabled. By default is false.
 *
 * @property {string} status - Determines the status of the component.
 * Can be 'primary' | 'success' | 'info' | 'warning' | 'danger'.
 * By default status is 'primary'.
 *
 * @property {string} label - Determines label of the component.
 *
 * @property {StyleProp<TextStyle>} labelStyle - Customizes label style.
 *
 * @property {string} caption - Determines caption of the component.
 *
 * @property {StyleProp<TextStyle>} captionStyle - Customizes caption style.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines icon of the component.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} captionIcon - Determines caption icon.
 *
 * @property TextInputProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```
 * import { Input } from '@kitten/ui';
 *
 * <Input/>
 * ```
 *
 * @example Input usage and API example
 *
 * ```
 * import { Input } from '@kitten/ui';
 *
 * public state: State = {
 *   input: '',
 * };
 *
 * private onInputChange = (input: string) => {
 *   this.setState({ input });
 * };
 *
 * private renderIcon = (style: StyleType): React.ReactElement<ImageProps> => {
 *   return (
 *     <Image
 *       style={style}
 *       source={ICON}
 *     />
 *   );
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <Input
 *       style={styles.input}
 *       onChangeText={this.onInputChange}
 *       value={this.state.input}
 *       icon={this.renderIcon}
 *       status='warning'
 *       placeholder='Placeholder'
 *       label='Label'
 *       caption='Caption'
 *       captionIcon={this.renderIcon}
 *     />
 *   );
 * }
 * ```
 *
 * @example Inline styling example
 *
 * ```
 * <Input
 *   style={styles.input}
 *   placeholder='Placeholder'
 *   label='Label'
 *   caption='Caption'
 *   textStyle={styles.inputText}
 *   labelStyle={styles.inputLabel}
 *   captionStyle={styles.inputCaption}
 * />
 * ```
 * */

export class InputComponent extends React.Component<InputProps> {

  static styledComponentName: string = 'Input';

  static Icon: React.ComponentClass<ImageProps> = Image;

  private onFocus = (event: InputFocusEvent) => {
    this.props.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private onEndEditing = (event: InputEndEditEvent) => {
    this.props.dispatch([]);

    if (this.props.onEndEditing) {
      this.props.onEndEditing(event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      style,
      textStyle,
      labelStyle,
      captionTextStyle,
    } = this.props;

    const { rest: inputContainerStyle, ...containerStyle } = allWithRest(StyleSheet.flatten(style), FlexStyleProps);

    const {
      textMarginHorizontal,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      placeholderColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      labelColor,
      labelFontSize,
      labelLineHeight,
      labelMarginBottom,
      labelFontWeight,
      captionMarginTop,
      captionColor,
      captionFontSize,
      captionLineHeight,
      captionFontWeight,
      captionIconWidth,
      captionIconHeight,
      captionIconMarginRight,
      captionIconTintColor,
      ...containerParameters
    } = source;

    return {
      container: {
        ...styles.container,
        ...containerStyle,
      },
      inputContainer: {
        ...containerParameters,
        ...styles.inputContainer,
        ...inputContainerStyle,
      },
      captionContainer: {
        marginTop: captionMarginTop,
        ...styles.captionContainer,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: textFontSize,
        // FIXME: RN issue (https://github.com/facebook/react-native/issues/7823)
        // lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
        ...styles.text,
        ...StyleSheet.flatten(textStyle),
      },
      placeholder: {
        color: placeholderColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
        ...styles.icon,
      },
      label: {
        color: labelColor,
        fontSize: labelFontSize,
        lineHeight: labelLineHeight,
        marginBottom: labelMarginBottom,
        fontWeight: labelFontWeight,
        ...styles.label,
        ...StyleSheet.flatten(labelStyle),
      },
      captionIcon: {
        width: captionIconWidth,
        height: captionIconHeight,
        tintColor: captionIconTintColor,
        marginRight: captionIconMarginRight,
        ...styles.captionIcon,
      },
      captionLabel: {
        fontSize: captionFontSize,
        fontWeight: captionFontWeight,
        lineHeight: captionLineHeight,
        color: captionColor,
        ...styles.captionLabel,
        ...StyleSheet.flatten(captionTextStyle),
      },
    };
  };

  private renderIconElement = (style: StyleType): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 0,
      style: [style, iconElement.props.style],
    });
  };

  private renderLabelElement = (style: StyleType): TextElement => {
    return (
      <Text
        key={1}
        style={style}>
        {this.props.label}
      </Text>
    );
  };

  private renderCaptionElement = (style: StyleType): TextElement => {
    return (
      <Text
        key={2}
        style={style}>
        {this.props.caption}
      </Text>
    );
  };

  private renderCaptionIconElement = (style: StyleType): IconElement => {
    const iconElement: IconElement = this.props.captionIcon(style);

    return React.cloneElement(iconElement, {
      key: 3,
      style: [style, iconElement.props.style],
    });
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { icon, label, captionIcon, caption } = this.props;

    return [
      icon && this.renderIconElement(style.icon),
      isValidString(label) && this.renderLabelElement(style.label),
      isValidString(caption) && this.renderCaptionElement(style.captionLabel),
      captionIcon && this.renderCaptionIconElement(style.captionIcon),
    ];
  };

  public render(): React.ReactElement<TextInputProps> {
    const { themedStyle, disabled, ...restProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    const [
      iconElement,
      labelElement,
      captionElement,
      captionIconElement,
    ] = this.renderComponentChildren(componentStyle);

    return (
      <View style={componentStyle.container}>
        {labelElement}
        <View style={componentStyle.inputContainer}>
          <TextInput
            {...restProps}
            style={componentStyle.text}
            placeholderTextColor={componentStyle.placeholder.color}
            editable={!disabled}
            onFocus={this.onFocus}
            onEndEditing={this.onEndEditing}
          />
          {iconElement}
        </View>
        <View style={componentStyle.captionContainer}>
          {captionIconElement}
          {captionElement}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 'auto',
  },
  icon: {},
  label: {},
  captionIcon: {},
  captionLabel: {},
});

export const Input = styled<InputProps>(InputComponent);
