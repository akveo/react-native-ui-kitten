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
  NativeSyntheticEvent,
  PanResponder,
  PanResponderCallbacks,
  PanResponderGestureState,
  PanResponderInstance,
  StyleSheet,
  TargetedEvent,
  View,
  ViewProps,
} from 'react-native';
import { Overwrite } from 'utility-types';
import {
  EvaStatus,
  FalsyText,
  RenderProp,
  RTLService,
  TouchableWeb,
  TouchableWebProps,
} from '../../devsupport';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { TextProps } from '../text/text.component';
import { CheckMark } from '../shared/checkmark.component';

type ToggleStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

export interface ToggleProps extends TouchableWebProps, ToggleStyledProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  text?: RenderProp<TextProps> | React.ReactText;
  status?: EvaStatus;
}

export type ToggleElement = React.ReactElement<ToggleProps>;

/**
 * Styled `Toggle` component.
 *
 * @extends React.Component
 *
 * @property {boolean} checked - Determines whether component is checked.
 * Default is `false`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string | (props: TextProps) => ReactElement} text - A string or a function component
 * to render near the toggle.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(checked: boolean) => void} onChange - Called on toggle value change.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example ToggleSimpleUsage
 *
 * @overview-example ToggleStates
 *
 * @overview-example ToggleStatus
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

    const { checked, eva } = props;

    this.thumbWidthAnimation = new Animated.Value(eva.style.thumbWidth);
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

  public onPanResponderGrant = (e: GestureResponderEvent): void => {
    const { checked, disabled, eva } = this.props;

    if (disabled) {
      return;
    }

    this.onPressIn(e);

    if (this.thumbTranslateAnimationActive) {
      this.thumbTranslateAnimationActive = false;
      this.stopAnimations();
      return;
    }

    this.animateThumbWidth(eva.style.thumbWidth * 1.2);
    this.animateEllipseScale(checked ? 1 : 0.01);
  };

  public onPanResponderMove: () => boolean = (): boolean => {
    return true;
  };

  public onPanResponderRelease = (e: GestureResponderEvent, gestureState: PanResponderGestureState): void => {
    const { checked, disabled, eva } = this.props;

    if (!disabled) {
      if ((!checked && gestureState.dx > -5) || (checked && gestureState.dx < 5)) {
        this.toggle(this.onPress);
      } else {
        this.animateEllipseScale(checked ? 0.01 : 1);
      }
    }

    this.animateThumbWidth(eva.style.thumbWidth);
    this.onPressOut(e);
  };

  private onMouseEnter = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    if (this.props.disabled) {
      return;
    }

    this.props.eva.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(e);
    }
  };

  public onMouseLeave = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    if (this.props.disabled) {
      return;
    }

    this.props.eva.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(e);
    }
  };

  private onFocus = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    if (this.props.disabled) {
      return;
    }

    this.props.eva.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  private onBlur = (e: NativeSyntheticEvent<TargetedEvent>): void => {
    if (this.props.disabled) {
      return;
    }

    this.props.eva.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  private onPressIn = (e: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(e);
    }
  };

  private onPressOut = (e: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(e);
    }
  };

  private onPress = (): void => {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked);
    }
  };

  private getComponentStyle = (source: StyleType) => {
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
      backgroundColor,
      borderColor,
      ...containerParameters
    } = source;

    return {
      ellipseContainer: {
        borderColor: borderColor,
        backgroundColor: backgroundColor,
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
        backgroundColor: backgroundColor,
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
        fill: iconTintColor,
        stroke: iconTintColor,
        strokeWidth: 3,
      },
    };
  };

  private animateThumbTranslate = (value: number, callback: () => void = () => null): void => {
    this.thumbTranslateAnimationActive = true;

    Animated.timing(this.thumbTranslateAnimation, {
      toValue: RTLService.select(value, -value),
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

  private stopAnimations = (): void => {
    const value: number = this.props.checked ? 0.01 : 1;

    this.thumbTranslateAnimation.stopAnimation();
    this.ellipseScaleAnimation.stopAnimation();
    this.thumbWidthAnimation.stopAnimation();

    this.ellipseScaleAnimation.setValue(value);
  };

  private toggle = (callback = (nextValue: boolean) => null): void => {
    const value: number = this.props.checked ? -20 : 20;

    this.animateThumbTranslate(value, () => {
      this.thumbTranslateAnimation.setValue(0);
      callback(!this.props.checked);
    });

    this.animateThumbWidth(this.props.eva.style.thumbWidth);
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, checked, text, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <View
        {...this.panResponder.panHandlers}
        style={[styles.container, style]}>
        <TouchableWeb
          {...touchableProps}
          style={styles.toggleContainer}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onFocus={this.onFocus}
          onBlur={this.onBlur}>
          <View style={[evaStyle.highlight, styles.highlight]}/>
          <Animated.View style={[evaStyle.ellipseContainer, styles.ellipseContainer]}>
            <Animated.View style={[evaStyle.ellipse, styles.ellipse]}/>
            <Animated.View style={[evaStyle.thumb, styles.thumb]}>
              <CheckMark {...evaStyle.icon} />
            </Animated.View>
          </Animated.View>
        </TouchableWeb>
        <FalsyText
          style={evaStyle.text}
          component={text}
        />
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
