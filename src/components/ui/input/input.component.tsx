/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ImageProps,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { Overwrite } from 'utility-types';
import {
  EvaSize,
  EvaStatus,
  FalsyFC,
  FalsyText,
  FlexStyleProps,
  PropsService,
  RenderProp,
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

type InputStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

export interface InputProps extends TextInputProps, InputStyledProps {
  status?: EvaStatus;
  size?: EvaSize;
  disabled?: boolean;
  label?: RenderProp<TextProps> | React.ReactText;
  caption?: RenderProp<TextProps> | React.ReactText;
  captionIcon?: RenderProp<Partial<ImageProps>>;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  textStyle?: StyleProp<TextStyle>;
}

export type InputElement = React.ReactElement<InputProps>;

/**
 * Styled `Input` component.
 *
 * @extends React.Component
 *
 * @property {boolean} disabled - Determines whether input field is disabled.
 * This property overrides `editable` property of TextInput.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `small`, `medium` or `large`.
 * Default is `medium`.
 *
 * @property {string | (props: TextProps) => ReactElement} label - A string or a function component
 * to render to top of the input field.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryLeft - A function component
 * to render to start of the text.
 * Called with props provided by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryRight - A function component
 * to render to end of the text.
 * Called with props provided by Eva.
 *
 * @property {string | (props: TextProps) => ReactElement} caption - A string or a function component
 * to render to bottom of the input field.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} captionIcon - A function component
 * to render to start of the `caption`.
 * Called with props provided by Eva.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {TextInputProps} ...TextInputProps - Any props applied to TextInput component.
 *
 * @overview-example InputSimpleUsage
 *
 * @overview-example InputStates
 *
 * @overview-example InputStatus
 *
 * @overview-example InputSize
 *
 * @overview-example InputWithIcon
 *
 * @overview-example InputWithLabel
 *
 * @overview-example InputWithCaption
 *
 * @example InputInlineStyling
 *
 * @example InputWithExternalSourceIcon
 */
export class InputComponent extends React.Component<InputProps> implements WebEventResponderCallbacks {

  static styledComponentName: string = 'Input';

  private textInputRef: React.RefObject<TextInput> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public focus = (): void => {
    this.textInputRef.current.focus();
  };

  public blur = (): void => {
    this.textInputRef.current.blur();
  };

  public isFocused = (): boolean => {
    return this.textInputRef.current.isFocused();
  };

  public clear = (): void => {
    this.textInputRef.current.clear();
  };

  // WebEventResponderCallbacks

  public onMouseEnter = (): void => {
    this.props.eva.dispatch([Interaction.HOVER]);
  };

  public onMouseLeave = (): void => {
    this.props.eva.dispatch([]);
  };

  private onTextFieldFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    this.props.eva.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private onTextFieldBlur = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    this.props.eva.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private getComponentStyle = (source: StyleType) => {
    const flatStyles: ViewStyle = StyleSheet.flatten(this.props.style);
    const { rest: inputContainerStyle, ...containerStyle } = PropsService.allWithRest(flatStyles, FlexStyleProps);

    const {
      textMarginHorizontal,
      textFontFamily,
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
        fontFamily: textFontFamily,
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

  public render(): React.ReactElement<ViewProps> {
    const {
      eva,
      textStyle,
      label,
      caption,
      accessoryLeft,
      accessoryRight,
      captionIcon,
      ...textInputProps
    } = this.props;

    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <View style={evaStyle.container}>
        <FalsyText
          style={[evaStyle.label, styles.label]}
          component={label}
        />
        <View style={[evaStyle.inputContainer, styles.inputContainer]}>
          <FalsyFC
            style={evaStyle.icon}
            component={accessoryLeft}
          />
          <TextInput
            ref={this.textInputRef}
            placeholderTextColor={evaStyle.placeholder.color}
            {...textInputProps}
            {...this.webEventResponder.eventHandlers}
            style={[evaStyle.text, styles.text, platformStyles.text, textStyle]}
            editable={!textInputProps.disabled}
            onFocus={this.onTextFieldFocus}
            onBlur={this.onTextFieldBlur}
          />
          <FalsyFC
            style={evaStyle.icon}
            component={accessoryRight}
          />
        </View>
        <View style={[evaStyle.captionContainer, styles.captionContainer]}>
          <FalsyFC
            style={evaStyle.captionIcon}
            component={captionIcon}
          />
          <FalsyText
            style={[evaStyle.captionLabel, styles.captionLabel]}
            component={caption}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
  label: {
    textAlign: 'left',
  },
  captionLabel: {
    textAlign: 'left',
  },
});

const platformStyles = StyleSheet.create({
  text: Platform.select({
    default: null,
    android: {
      paddingVertical: 0,
    },
    web: {
      outlineWidth: 0,
    },
  }),
});

export const Input = styled<InputProps>(InputComponent);
