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
import {
  EvaStatus,
  FalsyText,
  RenderProp,
  RTLService,
  TouchableWeb,
  TouchableWebProps,
  Overwrite,
  LiteralUnion,
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
  appearance?: LiteralUnion<'default'>;
}>;

export interface ToggleProps extends TouchableWebProps, ToggleStyledProps {
  children?: RenderProp<TextProps> | React.ReactText;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  status?: EvaStatus;
}

export type ToggleElement = React.ReactElement<ToggleProps>;

/**
 * Switches toggle the state of a single setting on or off.
 *
 * @extends React.Component
 *
 * @property {boolean} checked - Whether component is checked.
 * Defaults to *false*.
 *
 * @property {(boolean) => void} onChange - Called when toggle
 * should switch it's value.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} children - String, number or a function component
 * to render near the toggle.
 * If it is a function, expected to return a Text.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example ToggleSimpleUsage
 *
 * @overview-example ToggleStates
 * Toggle can be checked or disabled.
 *
 * @overview-example ToggleStatus
 * Toggle may marked with `status` property, which is useful within forms validation.
 * An extra status is `control`, which is designed to be used on high-contrast backgrounds.
 *
 * @overview-example ToggleStyling
 * Toggle and it's inner views can be styled by passing them as function components.
 * ```
 * import { Toggle, Text } from '@ui-kitten/components';
 *
 * <Toggle>
 *   {evaProps => <Text {...evaProps}>Place your Text</Text>}
 * </Toggle>
 * ```
 *
 * @overview-example ToggleTheming
 * In most cases this is redundant, if [custom theme is configured](docs/guides/branding).
 */
@styled('Toggle')
export class Toggle extends React.Component<ToggleProps> implements PanResponderCallbacks {

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

  public onPanResponderGrant = (event: GestureResponderEvent): void => {
    const { checked, disabled, eva } = this.props;

    if (disabled) {
      return;
    }

    this.onPressIn(event);

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

  public onPanResponderRelease = (event: GestureResponderEvent, gestureState: PanResponderGestureState): void => {
    const { checked, disabled, eva } = this.props;

    if (!disabled) {
      if ((!checked && gestureState.dx > -5) || (checked && gestureState.dx < 5)) {
        this.toggle(this.onPress);
      } else {
        this.animateEllipseScale(checked ? 0.01 : 1);
      }
    }

    this.animateThumbWidth(eva.style.thumbWidth);
    this.onPressOut(event);
  };

  public onMouseLeave = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    if (this.props.disabled) {
      return;
    }

    this.props.eva.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }
  };

  private onMouseEnter = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    if (this.props.disabled) {
      return;
    }

    this.props.eva.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }
  };

  private onFocus = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    if (this.props.disabled) {
      return;
    }

    this.props.eva.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  private onBlur = (event: NativeSyntheticEvent<TargetedEvent>): void => {
    if (this.props.disabled) {
      return;
    }

    this.props.eva.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  private onPressIn = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent): void => {
    this.props.eva.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
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
      useNativeDriver: false,
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
      useNativeDriver: false,
    }).start(callback);
  };

  private animateEllipseScale = (value: number, callback: () => void = () => null): void => {
    Animated.timing(this.ellipseScaleAnimation, {
      toValue: value,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
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
    const { eva, style, checked, children, testID, ...touchableProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <View
        testID={testID}
        {...this.panResponder.panHandlers}
        style={[styles.container, style]}>
        <TouchableWeb
          {...touchableProps}
          style={styles.toggleContainer}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onFocus={this.onFocus}
          onBlur={this.onBlur}>
          <View style={[evaStyle.highlight, styles.highlight]} />
          <Animated.View style={[evaStyle.ellipseContainer, styles.ellipseContainer]}>
            <Animated.View style={[evaStyle.ellipse, styles.ellipse]} />
            <Animated.View style={[evaStyle.thumb, styles.thumb]}>
              <CheckMark {...evaStyle.icon} />
            </Animated.View>
          </Animated.View>
        </TouchableWeb>
        <FalsyText
          style={evaStyle.text}
          component={children}
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
