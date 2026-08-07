/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo } from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  NativeSyntheticEvent,
  StyleSheet,
  TargetedEvent,
} from 'react-native';
import {
  EvaSize,
  EvaStatus,
  FalsyFC,
  FalsyText,
  RenderProp,
  TouchableWeb,
  TouchableWebProps,
  LiteralUnion,
} from '../../devsupport';
import {
  Interaction,
  useStyled,
  StyleType,
} from '../../theme';
import {TextElement, TextProps} from '../text/text.component';

type TouchableWebPropsWithoutChildren = Omit<TouchableWebProps, 'children'>;

export interface ButtonProps extends TouchableWebPropsWithoutChildren {
  children?: RenderProp<TextProps> | TextElement | string | number;
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
   * Appearance of the component.
   * Can be `filled`, `outline` or `ghost`.
   * Defaults to *filled*.
   */
  appearance?: LiteralUnion<'filled' | 'outline' | 'ghost'>;
  /**
   * Status of the component.
   * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
   * Defaults to *primary*.
   * Use *control* status when needed to display within a contrast container.
   */
  status?: EvaStatus;
  /**
   * Size of the component.
   * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
   * Defaults to *medium*.
   */
  size?: EvaSize;
}

export type ButtonElement = React.ReactElement<ButtonProps>;

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 *
 * @extends React.FC
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} children - String, number or a function component
 * to render within the button.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `filled`, `outline` or `ghost`.
 * Defaults to *filled*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example ButtonSimpleUsage
 * Default button size is `medium` and status color is `primary`.
 *
 * @overview-example ButtonStates
 * Button can be disabled with `disabled` property.
 *
 * @overview-example ButtonAppearances
 * Within Eva Design System, it can be `filled`, `outline` or `ghost`.
 *
 * @overview-example ButtonAccessories
 * Also, it may contain inner views configured with `accessoryLeft` and `accessoryRight` properties.
 * Within Eva it is expected to be an image or [svg icon](guides/icon-packages).
 *
 * @overview-example ButtonSize
 * Buttons can be resized by using `size` property.
 *
 * @overview-example ButtonStatus
 * Or marked with `status` property.
 * An extra status is `control`, which is designed to be used on high-contrast backgrounds.
 *
 * @overview-example ButtonOutline
 * Status can be combined with `outline` appearance.
 *
 * @overview-example ButtonGhost
 * As well as for `ghost`.
 *
 * @overview-example ButtonStyling
 * Button and it's inner views can be styled by passing them as function components.
 * ```
 * import { Button, Text } from '@ui-kitten/components';
 *
 * <Button style={...}>
 *   {evaProps => <Text {...evaProps}>BUTTON</Text>}
 * </Button>
 * ```
 *
 * @overview-example ButtonTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 */
export const Button = React.forwardRef<TouchableWeb, ButtonProps>(
  (props, ref) => {
    const {
      appearance,
      status,
      size,
      style,
      children,
      accessoryLeft,
      accessoryRight,
      disabled,
      onMouseEnter: onMouseEnterProp,
      onMouseLeave: onMouseLeaveProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      onPressIn: onPressInProp,
      onPressOut: onPressOutProp,
      ...touchableProps
    } = props;

    const { style: evaStyle, dispatch } = useStyled('Button', {
      appearance,
      status,
      size,
      disabled,
    });

    // Split eva style into component parts
    const componentStyle = useMemo(() => {
      const {
        textColor,
        textFontFamily,
        textFontSize,
        textFontWeight,
        textMarginHorizontal,
        iconWidth,
        iconHeight,
        iconTintColor,
        iconMarginHorizontal,
        ...containerParameters
      } = evaStyle as StyleType;

      return {
        container: containerParameters,
        text: {
          color: textColor,
          fontFamily: textFontFamily,
          fontSize: textFontSize,
          fontWeight: textFontWeight,
          marginHorizontal: textMarginHorizontal,
        },
        icon: {
          width: iconWidth,
          height: iconHeight,
          tintColor: iconTintColor,
          marginHorizontal: iconMarginHorizontal,
        },
      };
    }, [evaStyle]);

    // Event handlers with dispatch
    const onMouseEnter = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
      dispatch([Interaction.HOVER]);
      onMouseEnterProp?.(event);
    }, [dispatch, onMouseEnterProp]);

    const onMouseLeave = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
      dispatch([]);
      onMouseLeaveProp?.(event);
    }, [dispatch, onMouseLeaveProp]);

    const onFocus = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
      dispatch([Interaction.FOCUSED]);
      onFocusProp?.(event);
    }, [dispatch, onFocusProp]);

    const onBlur = useCallback((event: NativeSyntheticEvent<TargetedEvent>) => {
      dispatch([]);
      onBlurProp?.(event);
    }, [dispatch, onBlurProp]);

    const onPressIn = useCallback((event: GestureResponderEvent) => {
      dispatch([Interaction.ACTIVE]);
      onPressInProp?.(event);
    }, [dispatch, onPressInProp]);

    const onPressOut = useCallback((event: GestureResponderEvent) => {
      dispatch([]);
      onPressOutProp?.(event);
    }, [dispatch, onPressOutProp]);

    return (
      <TouchableWeb
        ref={ref}
        {...touchableProps}
        disabled={disabled}
        style={[componentStyle.container, styles.container, style]}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <FalsyFC
          style={componentStyle.icon}
          component={accessoryLeft}
        />
        <FalsyText
          style={componentStyle.text}
          component={children}
        />
        <FalsyFC
          style={componentStyle.icon}
          component={accessoryRight}
        />
      </TouchableWeb>
    );
  },
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
