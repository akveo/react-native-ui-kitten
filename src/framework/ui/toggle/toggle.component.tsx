/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  PanResponder,
  PanResponderCallbacks,
  PanResponderGestureState,
  PanResponderInstance,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
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
  TextElement,
} from '../text/text.component';
import { CheckMark } from '../support/components';
import { I18nLayoutService } from '../support/services';

interface ComponentProps {
  checked?: boolean;
  disabled?: boolean;
  status?: string;
  size?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  onChange?: (checked: boolean) => void;
}

export type ToggleProps = StyledComponentProps & ViewProps & ComponentProps;
export type ToggleElement = React.ReactElement<ToggleProps>;

/**
 * Styled `Toggle` component.
 *
 * @extends React.Component
 *
 * @property {boolean} checked - Determines whether component is checked.
 * Default is `false`.
 *
 * @property {boolean} disabled - Determines whether component is disabled.
 * Default is `false`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `primary`, `success`, `info`, `warning`, `danger`, `basic` or `control`.
 * Default is `basic`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `giant`, `large`, `medium`, `small`, or `tiny`.
 * Default is `medium`.
 *
 * @property {string} text - Determines text of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(checked: boolean) => void} onChange - Fires when selection state is changed.
 *
 * @property TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @property StyledComponentProps - Any props applied to `styled` component.
 *
 * @overview-example ToggleSimpleUsage
 *
 * @overview-example ToggleStatus
 *
 * @overview-example ToggleSize
 *
 * @overview-example ToggleWithText
 *
 * @example ToggleInlineStyling
 */
export class ToggleComponent extends React.Component<ToggleProps> implements PanResponderCallbacks {

  static styledComponentName: string = 'Toggle';

  private panResponder: PanResponderInstance;
  private thumbWidthAnimation: Animated.Value;
  private thumbTranslateAnimation: Animated.Value;
  private ellipseScaleAnimation: Animated.Value;
  private thumbTranslateAnimationActive: boolean;

  constructor(props: ToggleProps) {
    super(props);

    const { checked, themedStyle } = props;

    this.thumbWidthAnimation = new Animated.Value(themedStyle.thumbWidth);
    this.thumbTranslateAnimation = new Animated.Value(0);
    this.ellipseScaleAnimation = new Animated.Value(checked ? 0.01 : 1.0);
    this.thumbTranslateAnimationActive = false;

    this.panResponder = PanResponder.create(this);
  }

  // PanResponderCallbacks

  public onStartShouldSetPanResponder = (): boolean => {
    return true;
  };

  public onStartShouldSetPanResponderCapture = (): boolean => {
    return true;
  };

  public onMoveShouldSetPanResponder = (): boolean => {
    return true;
  };

  public onMoveShouldSetPanResponderCapture = (): boolean => {
    return true;
  };

  public onPanResponderTerminationRequest = (): boolean => {
    return false;
  };

  public onPanResponderGrant = (): void => {
    const { checked, disabled, themedStyle } = this.props;

    if (disabled) {
      return;
    }

    this.onPressIn();

    if (this.thumbTranslateAnimationActive) {
      this.thumbTranslateAnimationActive = false;
      this.stopAnimations();
      return;
    }

    this.animateThumbWidth(themedStyle.thumbWidth * 1.2);
    this.animateEllipseScale(checked ? 1 : 0.01);
  };

  public onPanResponderMove: () => boolean = (): boolean => {
    return true;
  };

  public onPanResponderRelease = (e: GestureResponderEvent, gestureState: PanResponderGestureState): void => {
    const { checked, disabled, themedStyle } = this.props;

    if (!disabled) {
      if ((!checked && gestureState.dx > -5) || (checked && gestureState.dx < 5)) {
        this.toggle(this.onPress);
      } else {
        this.animateEllipseScale(checked ? 0.01 : 1);
      }
    }

    this.animateThumbWidth(themedStyle.thumbWidth);
    this.onPressOut();
  };

  private onPressIn = (): void => {
    this.props.dispatch([Interaction.ACTIVE]);
  };

  private onPressOut = (): void => {
    this.props.dispatch([]);
  };

  private onPress = (): void => {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { checked, disabled } = this.props;

    const {
      outlineWidth,
      outlineHeight,
      outlineBorderRadius,
      outlineBackgroundColor,
      thumbWidth,
      thumbHeight,
      thumbBorderRadius,
      thumbBackgroundColor,
      textMarginHorizontal,
      textFontSize,
      textFontWeight,
      textLineHeight,
      textFontFamily,
      textColor,
      iconWidth,
      iconHeight,
      iconTintColor,
      offsetValue,
      backgroundColor,
      borderColor,
      ...containerParameters
    } = source;

    const interpolatedBackgroundColor: Animated.AnimatedDiffClamp = this.getInterpolatedColor(
      backgroundColor,
      borderColor,
    );

    const thumbScale: Animated.AnimatedDiffClamp = this.animateThumbScale(offsetValue);

    return {
      toggleContainer: {},
      ellipseContainer: {
        borderColor: borderColor,
        backgroundColor: interpolatedBackgroundColor,
        ...containerParameters,
      },
      highlight: {
        width: outlineWidth,
        height: outlineHeight,
        borderRadius: outlineBorderRadius,
        backgroundColor: outlineBackgroundColor,
      },
      ellipse: {
        width: containerParameters.width - (containerParameters.borderWidth * 2),
        height: containerParameters.height - (containerParameters.borderWidth * 2),
        borderRadius: (source.height - (source.borderWidth * 2)) / 2,
        backgroundColor: interpolatedBackgroundColor,
        transform: [{ scale: checked ? thumbScale : this.ellipseScaleAnimation }],
      },
      thumb: {
        alignSelf: checked ? 'flex-end' : 'flex-start',
        width: this.thumbWidthAnimation,
        height: thumbHeight,
        borderRadius: thumbBorderRadius,
        backgroundColor: thumbBackgroundColor,
        elevation: disabled ? 0 : 5,
        transform: [{ translateX: this.thumbTranslateAnimation }],
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        fontFamily: textFontFamily,
        color: textColor,
      },
      icon: {
        width: source.iconWidth,
        height: source.iconHeight,
        backgroundColor: iconTintColor,
      },
    };
  };

  private animateThumbTranslate = (value: number, callback: () => void = () => null): void => {
    this.thumbTranslateAnimationActive = true;

    Animated.timing(this.thumbTranslateAnimation, {
      toValue: I18nLayoutService.select(value, -value),
      duration: 150,
      easing: Easing.linear,
    }).start(() => {
      this.thumbTranslateAnimationActive = false;
      callback();
    });
  };

  private animateThumbWidth = (value: number, callback: () => void = () => null): void => {
    Animated.timing(this.thumbWidthAnimation, {
      toValue: value,
      duration: 150,
      easing: Easing.linear,
    }).start(callback);
  };

  private animateEllipseScale = (value: number, callback: () => void = () => null): void => {
    Animated.timing(this.ellipseScaleAnimation, {
      toValue: value,
      duration: 200,
      easing: Easing.linear,
    }).start(callback);
  };

  private animateThumbScale = (value: number): Animated.AnimatedDiffClamp => {
    return this.thumbTranslateAnimation.interpolate({
      inputRange: [-value, 0],
      outputRange: [1, 0.01],
    });
  };

  private stopAnimations = (): void => {
    const value: number = this.props.checked ? 0.01 : 1;

    this.thumbTranslateAnimation.stopAnimation();
    this.ellipseScaleAnimation.stopAnimation();
    this.thumbWidthAnimation.stopAnimation();

    this.ellipseScaleAnimation.setValue(value);
  };

  private toggle = (callback = (nextValue: boolean) => null): void => {
    const { checked, themedStyle } = this.props;

    const value: number = checked ? -themedStyle.offsetValue : themedStyle.offsetValue;

    this.animateThumbTranslate(value, () => {
      this.thumbTranslateAnimation.setValue(0);
      callback(!checked);
    });

    this.animateThumbWidth(this.props.themedStyle.thumbWidth);
  };

  private getInterpolatedColor = (startColor: string, endColor: string): Animated.AnimatedDiffClamp => {
    const { checked, themedStyle } = this.props;

    return this.thumbTranslateAnimation.interpolate({
      inputRange: checked ? [-themedStyle.offsetValue, 0] : [0, themedStyle.offsetValue],
      outputRange: [startColor, endColor],
    });
  };

  private renderTextElement = (style: StyleType): TextElement => {
    return (
      <Text style={[style, this.props.textStyle]}>
        {this.props.text}
      </Text>
    );
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    return [
      this.props.text && this.renderTextElement(style.text),
    ];
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style, checked, ...restProps } = this.props;

    const componentStyle: StyleType = this.getComponentStyle(themedStyle);
    const [textElement] = this.renderComponentChildren(componentStyle);

    return (
      <View
        {...this.panResponder.panHandlers}
        style={[styles.container, style]}>
        <TouchableOpacity
          activeOpacity={1.0}
          {...restProps}
          style={[componentStyle.toggleContainer, styles.toggleContainer]}>
          <View style={[componentStyle.highlight, styles.highlight]}/>
          <Animated.View style={[componentStyle.ellipseContainer, styles.ellipseContainer]}>
            <Animated.View style={[componentStyle.ellipse, styles.ellipse]}/>
            <Animated.View style={[componentStyle.thumb, styles.thumb]}>
              <CheckMark style={componentStyle.icon} isAnimated={true}/>
            </Animated.View>
          </Animated.View>
        </TouchableOpacity>
        {textElement}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipseContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  ellipse: {
    alignSelf: 'center',
    position: 'absolute',
  },
  highlight: {
    alignSelf: 'center',
    position: 'absolute',
  },
  thumb: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Toggle = styled<ToggleProps>(ToggleComponent);
