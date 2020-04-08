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
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
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
import { CheckMark } from '../support/components/checkmark.component';
import {
  I18nLayoutService,
  WebEventResponder,
  WebEventResponderInstance,
} from '../support/services';

export interface ToggleProps extends StyledComponentProps, TouchableOpacityProps {
  checked?: boolean;
  disabled?: boolean;
  status?: string;
  size?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  onChange?: (checked: boolean) => void;
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
 * @property {boolean} disabled - Determines whether component is disabled.
 * Default is `false.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string} text - Determines text of the component.
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(checked: boolean) => void} onChange - Fires when selection state is changed.
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
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  constructor(props: ToggleProps) {
    super(props);

    const { checked, themedStyle } = props;

    this.thumbWidthAnimation = new Animated.Value(themedStyle.thumbWidth);
    this.thumbTranslateAnimation = new Animated.Value(0);
    this.ellipseScaleAnimation = new Animated.Value(checked ? 0.01 : 1.0);
    this.thumbTranslateAnimationActive = false;

    this.panResponder = PanResponder.create(this);
  }

  public onMouseEnter = (): void => {
    if (!this.props.disabled) {
      this.props.dispatch([Interaction.HOVER]);
    }
  };

  public onMouseLeave = (): void => {
    if (!this.props.disabled) {
      this.props.dispatch([]);
    }
  };

  public onFocus = (): void => {
    if (!this.props.disabled) {
      this.props.dispatch([Interaction.FOCUSED]);
    }
  };

  public onBlur = (): void => {
    if (!this.props.disabled) {
      this.props.dispatch([]);
    }
  };

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
      backgroundColor,
      borderColor,
      ...containerParameters
    } = source;

    return {
      toggleContainer: {},
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
      toValue: I18nLayoutService.select(value, -value),
      duration: 150,
      easing: Easing.linear,
      useNativeDriver: true,
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
      useNativeDriver: true,
    }).start(callback);
  };

  private animateEllipseScale = (value: number, callback: () => void = () => null): void => {
    Animated.timing(this.ellipseScaleAnimation, {
      toValue: value,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
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

    this.animateThumbWidth(this.props.themedStyle.thumbWidth);
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
          {...this.webEventResponder.eventHandlers}
          style={[componentStyle.toggleContainer, webStyles.toggleContainer, styles.toggleContainer]}>
          <View style={[componentStyle.highlight, styles.highlight]}/>
          <Animated.View style={[componentStyle.ellipseContainer, styles.ellipseContainer]}>
            <Animated.View style={[componentStyle.ellipse, styles.ellipse]}/>
            <Animated.View style={[componentStyle.thumb, styles.thumb]}>
              <CheckMark {...componentStyle.icon} />
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

const webStyles = Platform.OS === 'web' && StyleSheet.create({
  toggleContainer: {
    // @ts-ignore
    outlineWidth: 0,
  },
});

export const Toggle = styled<ToggleProps>(ToggleComponent);
