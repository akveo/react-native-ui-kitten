/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
  View,
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
import {
  allWithRest,
  isValidString,
} from '../support/services';
import {
  FlexStyleProps,
  InputFocusEvent,
} from '../support/typings';

type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: StyleType) => IconElement;

interface ComponentProps {
  status?: string;
  size?: string;
  disabled?: boolean;
  label?: string;
  caption?: string;
  captionIcon?: IconProp;
  icon?: IconProp;
  textStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  captionTextStyle?: StyleProp<TextStyle>;
  onIconPress?: (event: GestureResponderEvent) => void;
}

export type InputProps = StyledComponentProps & TextInputProps & ComponentProps;
export type InputElement = React.ReactElement<InputProps>;

/**
 * Styled Input component.
 *
 * @extends React.Component
 *
 * @method {() => void} focus - Requests focus for the given input or view. The exact behavior triggered
 * will depend on the platform and type of view.
 *
 * @method {() => void} blur - Removes focus from an input or view. This is the opposite of `focus()`.
 *
 * @method {() => boolean} isFocused - Returns if the input is currently focused.
 *
 * @method {() => void} clear - Removes all text from the input.
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * Default is `false`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `primary`, `success`, `info`, `warning` or `danger`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `giant`, `large`, `medium`, `small`, or `tiny`.
 * Default is `medium`.
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
 * import React from 'react';
 * import { Input } from 'react-native-ui-kitten';
 *
 * export class InputShowcase extends React.Component {
 *
 *   public state = {
 *     inputValue: '',
 *   };
 *
 *   private onInputValueChange = (inputValue: string) => {
 *     this.setState({ inputValue });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <Input
 *         value={this.state.inputValue}
 *         onChangeText={this.onInputValueChange}
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
 * import { Input, InputProps } from 'react-native-ui-kitten';
 *
 * export const InputShowcase = (props?: InputProps): React.ReactElement<InputProps> => {
 *   return (
 *     <Input
 *       style={styles.input}
 *       textStyle={styles.inputText}
 *       labelStyle={styles.inputLabel}
 *       captionStyle={styles.inputCaption}
 *       label='Label'
 *       caption='Caption'
 *       placeholder='Placeholder'
 *     />
 *   );
 * };
 * ```
 * */

export class InputComponent extends React.Component<InputProps> {

  static styledComponentName: string = 'Input';

  private textInputRef: React.RefObject<TextInput> = React.createRef();

  public focus = () => {
    this.textInputRef.current.focus();
  };

  public blur = () => {
    this.textInputRef.current.blur();
  };

  public isFocused = (): boolean => {
    return this.textInputRef.current.isFocused();
  };

  public clear = () => {
    this.textInputRef.current.clear();
  };

  private onFocus = (event: InputFocusEvent) => {
    this.props.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private onBlur = (event: InputFocusEvent) => {
    this.props.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private onIconPress = (event: GestureResponderEvent) => {
    if (this.props.onIconPress) {
      this.props.onIconPress(event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const flatStyles: ViewStyle = StyleSheet.flatten(this.props.style);
    const { rest: inputContainerStyle, ...containerStyle } = allWithRest(flatStyles, FlexStyleProps);

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
      container: containerStyle,
      inputContainer: {
        ...containerParameters,
        ...inputContainerStyle,
      },
      captionContainer: {
        marginTop: captionMarginTop,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: textFontSize,
        // FIXME: RN issue (https://github.com/facebook/react-native/issues/7823)
        // lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
      },
      placeholder: {
        color: placeholderColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
      label: {
        color: labelColor,
        fontSize: labelFontSize,
        lineHeight: labelLineHeight,
        marginBottom: labelMarginBottom,
        fontWeight: labelFontWeight,
      },
      captionIcon: {
        width: captionIconWidth,
        height: captionIconHeight,
        tintColor: captionIconTintColor,
        marginRight: captionIconMarginRight,
      },
      captionLabel: {
        fontSize: captionFontSize,
        fontWeight: captionFontWeight,
        lineHeight: captionLineHeight,
        color: captionColor,
      },
    };
  };

  private renderIconTouchableElement = (style: StyleType): React.ReactElement<TouchableWithoutFeedbackProps> => {
    const iconElement: IconElement = this.renderIconElement(style);

    return (
      <TouchableWithoutFeedback onPress={this.onIconPress}>
        {iconElement}
      </TouchableWithoutFeedback>
    );
  };

  private renderIconElement = (style: StyleType): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 0,
      style: [style, styles.icon, iconElement.props.style],
    });
  };

  private renderLabelElement = (style: TextStyle): TextElement => {
    return (
      <Text
        key={1}
        style={[style, styles.label, this.props.labelStyle]}>
        {this.props.label}
      </Text>
    );
  };

  private renderCaptionElement = (style: TextStyle): TextElement => {
    return (
      <Text
        key={2}
        style={[style, styles.captionLabel, this.props.captionTextStyle]}>
        {this.props.caption}
      </Text>
    );
  };

  private renderCaptionIconElement = (style: ImageStyle): IconElement => {
    const iconElement: IconElement = this.props.captionIcon(style);

    return React.cloneElement(iconElement, {
      key: 3,
      style: [style, styles.captionIcon, iconElement.props.style],
    });
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const { icon, label, captionIcon, caption } = this.props;

    return [
      icon && this.renderIconTouchableElement(style.icon),
      isValidString(label) && this.renderLabelElement(style.label),
      isValidString(caption) && this.renderCaptionElement(style.captionLabel),
      captionIcon && this.renderCaptionIconElement(style.captionIcon),
    ];
  };

  public render(): React.ReactElement<TextInputProps> {
    const { themedStyle, textStyle, disabled, ...restProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    const [
      iconElement,
      labelElement,
      captionElement,
      captionIconElement,
    ] = this.renderComponentChildren(componentStyle);

    return (
      <View style={[componentStyle.container, styles.container]}>
        {labelElement}
        <View style={[componentStyle.inputContainer, styles.inputContainer]}>
          <TextInput
            ref={this.textInputRef}
            {...restProps}
            style={[componentStyle.text, styles.text, textStyle]}
            placeholderTextColor={componentStyle.placeholder.color}
            editable={!disabled}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
          />
          {iconElement}
        </View>
        <View style={[componentStyle.captionContainer, styles.captionContainer]}>
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
  placeholder: {},
  icon: {},
  label: {
    textAlign: 'left',
  },
  captionIcon: {},
  captionLabel: {
    textAlign: 'left',
  },
});

export const Input = styled<InputProps>(InputComponent);
