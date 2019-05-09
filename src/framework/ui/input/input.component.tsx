/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ImageProps,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import {
  allWithRest,
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  InputFocusEvent,
  InputEndEditEvent,
} from '../common/type';
import {
  Text as TextComponent,
  Props as TextProps,
} from '../text/text.component';
import { FlexStyleProps } from '../common/props';

type IconElement = React.ReactElement<ImageProps>;
type TextElement = React.ReactElement<TextProps>;
type IconProp = (style: StyleType) => React.ReactElement<ImageProps>;

interface InputProps {
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

export type Props = InputProps & StyledComponentProps & TextInputProps;

const Text = styled<TextProps>(TextComponent);

/**
 * The `Input` component is an analog of html input.
 *
 * @extends React.Component
 *
 * @property {boolean} disabled - Determines whether component is disabled. By default is false.
 *
 * @property {string} status - Determines the status of the component.
 * Can be 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'white'.
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
 * <Input/>
 * ```
 *
 * @example Input API example
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
 * */

export class Input extends React.Component<Props> {

  static styledComponentName: string = 'Input';

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

  private getComponentStyle = (style: StyleType): StyleType => {
    const {
      style: derivedContainerStyle,
      textStyle,
      labelStyle,
      captionTextStyle,
    } = this.props;

    const {
      rest: inputContainerStyle,
      ...containerStyle
    } = allWithRest(StyleSheet.flatten(derivedContainerStyle), FlexStyleProps);

    const {
      textMarginHorizontal,
      textFontSize,
      textLineHeight,
      textColor,
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
      captionTextColor,
      captionTextFontSize,
      captionTextLineHeight,
      captionTextFontWeight,
      captionIconWidth,
      captionIconHeight,
      captionIconMarginRight,
      captionIconTintColor,
      ...containerParameters
    } = style;

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
        lineHeight: textLineHeight,
        color: textColor,
        ...StyleSheet.flatten(textStyle),
        ...styles.text,
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
        ...StyleSheet.flatten(labelStyle),
        ...styles.label,
      },
      captionIcon: {
        width: captionIconWidth,
        height: captionIconHeight,
        tintColor: captionIconTintColor,
        marginRight: captionIconMarginRight,
        ...styles.captionIcon,
      },
      captionLabel: {
        fontSize: captionTextFontSize,
        fontWeight: captionTextFontWeight,
        lineHeight: captionTextLineHeight,
        color: captionTextColor,
        ...StyleSheet.flatten(captionTextStyle),
        ...styles.captionLabel,
      },
    };
  };

  private renderIconElement = (style: StyleType, icon: IconProp): IconElement => {
    return icon(style);
  };

  private renderTextElement = (style: StyleType, text: string): TextElement => {
    return (
      <Text style={style}>{text}</Text>
    );
  };

  public render(): React.ReactElement<TextInputProps> {
    const { themedStyle, disabled, label, icon, caption, captionIcon, ...restProps } = this.props;
    const style: StyleType = this.getComponentStyle(themedStyle);

    const iconElement: IconElement = icon ? this.renderIconElement(style.icon, icon) : null;
    const labelElement: TextElement = label ? this.renderTextElement(style.label, label) : null;
    const captionIconElement: IconElement = captionIcon ? this.renderIconElement(style.captionIcon, captionIcon) : null;
    const captionLabelElement: TextElement = caption ? this.renderTextElement(style.captionLabel, caption) : null;

    return (
      <View style={style.container}>
        {labelElement}
        <View style={style.inputContainer}>
          <TextInput
            {...restProps}
            style={style.text}
            editable={!disabled}
            onFocus={this.onFocus}
            onEndEditing={this.onEndEditing}
          />
          {iconElement}
        </View>
        <View style={style.captionContainer}>
          {captionIconElement}
          {captionLabelElement}
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
