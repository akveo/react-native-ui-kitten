/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo, useRef, useImperativeHandle } from 'react';
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
  ViewStyle,
} from 'react-native';
import {
  accessibleInputName,
  buildAccessibilityProps,
  EvaSize,
  EvaStatus,
  FalsyFC,
  FalsyText,
  FlexViewCrossStyleProps,
  PropsService,
  RenderProp,
  WebEventResponder,
  WebEventResponderInstance,
  LiteralUnion,
  TouchableWithoutFeedback,
} from '../../devsupport';
import {
  Interaction,
  useStyled,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';

type TextInputPropsWithoutChildren = Omit<TextInputProps, 'children'>;

export interface InputProps extends TextInputPropsWithoutChildren {
  /**
   * Appearance of the component.
   * Defaults to *default*.
   */
  appearance?: LiteralUnion<'default'>;
  /**
   * Status of the component.
   * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
   * Defaults to *basic*.
   * Useful for giving user a hint on the input validity.
   */
  status?: EvaStatus;
  /**
   * Size of the component.
   * Can be `small`, `medium` or `large`.
   * Defaults to *medium*.
   */
  size?: EvaSize;
  /**
   * Whether input field is disabled.
   * This property overrides `editable` property of TextInput.
   */
  disabled?: boolean;
  /**
   * String, number or a function component to render above the input field.
   * If it is a function, expected to return a Text.
   */
  label?: RenderProp<TextProps> | string | number;
  /**
   * Function component to render below Input view.
   * Expected to return View.
   */
  caption?: RenderProp<TextProps> | string | number;
  /**
   * Function component to render to start of the text.
   * Expected to return an Image.
   */
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  /**
   * Function component to render to end of the text.
   * Expected to return an Image.
   */
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  /**
   * Customizes the style of the text field.
   */
  textStyle?: StyleProp<TextStyle>;
}

export type InputElement = React.ReactElement<InputProps>;

export interface InputRef {
  focus: () => void;
  blur: () => void;
  isFocused: () => boolean | undefined;
  clear: () => void;
}

/**
 * Inputs let users enter and edit text.
 *
 * @extends React.FC
 *
 * @property {string} value - A value displayed in input field.
 *
 * @property {(string) => void} onChangeText - Called when the value should be changed.
 *
 * @property {() => void} onFocus - Called when input field becomes focused.
 *
 * @property {() => void} onBlur - Called when input field looses focus.
 *
 * @property {string} placeholder - A string to be displayed when there is no value.
 *
 * @property {boolean} disabled - Whether input field is disabled.
 * This property overrides `editable` property of TextInput.
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} label - String, number or a function component
 * to render above the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} caption - Function component to render below
 * Input view.
 * Expected to return View.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Useful for giving user a hint on the input validity.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `small`, `medium` or `large`.
 * Defaults to *medium*.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes the style of the text field.
 *
 * @property {TextInputProps} ...TextInputProps - Any props applied to TextInput component.
 *
 * @overview-example InputSimpleUsage
 *
 * @overview-example InputStates
 * Input can be disabled with `disabled` property.
 *
 * @overview-example InputStatus
 * Or marked with `status` property, which is useful within forms validation.
 * An extra status is `control`, which is designed to be used on high-contrast backgrounds.
 *
 * @overview-example InputAccessories
 * Input may contain labels, captions and inner views by configuring `accessoryLeft` or `accessoryRight` properties.
 * Within Eva, Input accessories are expected to be images or [svg icons](guides/icon-packages).
 *
 * @overview-example InputSize
 * To resize Input, a `size` property may be used.
 *
 * @overview-example InputStyling
 * Input and it's inner views can be styled by passing them as function components.
 * ```
 * import { Input, Text } from '@ui-kitten/components';
 *
 * <Input
 *   textStyle={{ ... }}
 *   label={evaProps => <Text {...evaProps}>Label</Text>}
 *   caption={evaProps => <Text {...evaProps}>Caption</Text>}
 * />
 * ```
 *
 * @overview-example InputTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 */
export const Input = React.forwardRef<InputRef, InputProps>(
  (props, ref) => {
    const {
      appearance,
      status,
      size,
      disabled,
      style,
      textStyle,
      label,
      caption,
      accessoryLeft,
      accessoryRight,
      testID,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...textInputProps
    } = props;

    const textInputRef = useRef<TextInput>(null);
    const webEventResponderRef = useRef<WebEventResponderInstance | null>(null);

    const { style: evaStyle, dispatch } = useStyled('Input', {
      appearance,
      status,
      size,
      disabled,
    });

    // Expose ref methods
    useImperativeHandle(ref, () => ({
      focus: () => textInputRef.current?.focus(),
      blur: () => textInputRef.current?.blur(),
      isFocused: () => textInputRef.current?.isFocused(),
      clear: () => textInputRef.current?.clear(),
    }), []);

    // WebEventResponder callbacks for hover
    const onMouseEnter = useCallback(() => {
      dispatch([Interaction.HOVER]);
    }, [dispatch]);

    const onMouseLeave = useCallback(() => {
      dispatch([]);
    }, [dispatch]);

    // Initialize web event responder lazily
    const getWebEventResponder = useCallback(() => {
      if (!webEventResponderRef.current) {
        webEventResponderRef.current = WebEventResponder.create({
          onMouseEnter,
          onMouseLeave,
        });
      }
      return webEventResponderRef.current;
    }, [onMouseEnter, onMouseLeave]);

    // Event handlers
    const onTextFieldFocus = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      dispatch([Interaction.FOCUSED]);
      onFocusProp?.(event);
    }, [dispatch, onFocusProp]);

    const onTextFieldBlur = useCallback((event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      dispatch([]);
      onBlurProp?.(event);
    }, [dispatch, onBlurProp]);

    const focus = useCallback(() => {
      textInputRef.current?.focus();
    }, []);

    // Split eva style into component parts
    const componentStyle = useMemo(() => {
      const flatStyles: ViewStyle = StyleSheet.flatten(style);
      const { rest: inputContainerStyle, ...containerStyle } =
        PropsService.allWithRest(flatStyles, FlexViewCrossStyleProps);

      const {
        textMarginHorizontal,
        textFontFamily,
        textFontSize,
        textFontWeight,
        textColor,
        placeholderColor,
        iconWidth,
        iconHeight,
        iconMarginHorizontal,
        iconTintColor,
        labelColor,
        labelFontSize,
        labelMarginBottom,
        labelFontWeight,
        labelFontFamily,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        captionMarginTop,
        captionColor,
        captionFontSize,
        captionFontWeight,
        captionFontFamily,
        ...containerParameters
      } = evaStyle as StyleType;

      return {
        container: containerStyle,
        inputContainer: {
          ...containerParameters,
          ...inputContainerStyle,
        },
        text: {
          marginHorizontal: textMarginHorizontal,
          fontFamily: textFontFamily,
          fontSize: textFontSize,
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
          marginBottom: labelMarginBottom,
          fontWeight: labelFontWeight,
          fontFamily: labelFontFamily,
        },
        captionLabel: {
          fontSize: captionFontSize,
          fontWeight: captionFontWeight,
          fontFamily: captionFontFamily,
          color: captionColor,
        },
      };
    }, [evaStyle, style]);

    return (
      <TouchableWithoutFeedback
        testID={`@${testID}/container`}
        style={componentStyle.container}
        focusable={false}
        // The wrapper exists only to forward taps to the TextInput. Leaving it
        // accessible would put a second, unlabelled stop in the a11y tree.
        accessible={false}
        role='none'
        onPress={focus}
      >
        <FalsyText
          style={[componentStyle.label, styles.label]}
          component={label}
        />
        <View style={[componentStyle.inputContainer, styles.inputContainer]}>
          <FalsyFC
            style={componentStyle.icon}
            component={accessoryLeft}
          />
          <TextInput
            ref={textInputRef}
            placeholderTextColor={componentStyle.placeholder.color}
            {...textInputProps}
            {...buildAccessibilityProps({
              disabled: Boolean(disabled),
              // `label` and `caption` render as siblings of the TextInput, so
              // they are never picked up as its accessible name. Composed
              // here instead: cross-platform, unlike `aria-labelledby`, which
              // react-native only honours on Android.
              label: accessibleInputName(label, caption, status),
            }, props)}
            {...getWebEventResponder().eventHandlers}
            testID={`@${testID}/input`}
            style={[componentStyle.text, styles.text, platformStyles.text, textStyle]}
            editable={!disabled}
            onFocus={onTextFieldFocus}
            onBlur={onTextFieldBlur}
          />
          <FalsyFC
            style={componentStyle.icon}
            component={accessoryRight}
          />
        </View>
        <FalsyText
          style={[componentStyle.captionLabel, styles.captionLabel]}
          component={caption}
        />
      </TouchableWithoutFeedback>
    );
  },
);

Input.displayName = 'Input';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
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
      marginVertical: -2,
    },
    web: {
      outlineWidth: 0,
    },
  }),
});
