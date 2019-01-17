import React from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  StyleSheet,
  View,
  ViewProps,
  PanResponderInstance,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
  Interaction,
} from '@kitten/theme';

interface ToggleComponentProps {
  disabled?: boolean;
  onValueChange?: (value: boolean) => void;
  value?: boolean;
  appearance?: string | 'default';
  status?: string | 'error';
  size?: string | 'big' | 'small';
}

export type ToggleProps = ToggleComponentProps & StyledComponentProps & ViewProps;

export class Toggle extends React.Component<ToggleProps> {

  static defaultProps = {
    disabled: false,
    value: false,
  };

  thumbAnimation: Animated.Value;
  switchAnimation: Animated.Value;
  ellipseAnimation: Animated.Value;
  switchAnimationActive: boolean;
  panResponder: PanResponderInstance;

  constructor(props) {
    super(props);
    const thumbSize: number = props.themedStyle.height - (props.themedStyle.borderWidth * 2);
    this.thumbAnimation = new Animated.Value(thumbSize);
    this.switchAnimation = new Animated.Value(0);
    this.ellipseAnimation = new Animated.Value(props.value ? 0.01 : 1.0);
    this.switchAnimationActive = false;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: this.onStartShouldSetPanResponderCapture,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
      onPanResponderTerminationRequest: this.onPanResponderTerminationRequest,
      onPanResponderGrant: () => this.onPanResponderGrant(thumbSize),
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) =>
        this.onPanResponderRelease(evt, gestureState, thumbSize),
    });
  }

  animateSwitch = (value: boolean, callback: () => void = () => null, thumbSize: number) => {
    this.switchAnimationActive = true;
    Animated.timing(
      this.switchAnimation,
      {
        toValue: value ? thumbSize : -thumbSize,
        duration: 200,
        easing: Easing.bezier(0.65, 0.12, 0.09, 1.26),
      },
    ).start(() => {
      this.switchAnimationActive = false;
      callback();
    });
  };

  animateThumb = (value, callback: () => void = () => null) => {
    Animated.timing(this.thumbAnimation, {
      toValue: value,
      duration: 150,
      easing: Easing.linear,
    }).start(callback);
  };

  animateEllipse = (value) => {
    Animated.timing(this.ellipseAnimation, {
      toValue: value,
      duration: 200,
      easing: Easing.linear,
    }).start();
  };

  stopAnimations() {
    const value: number = this.props.value ? 0.01 : 1;
    Animated.timing(this.switchAnimation, { toValue: value }).stop();
    Animated.timing(this.ellipseAnimation, { toValue: value }).stop();
    Animated.timing(this.thumbAnimation, { toValue: value }).stop();
    this.ellipseAnimation.setValue(value);
  }

  onStartShouldSetPanResponder = () => {
    return true;
  };

  onStartShouldSetPanResponderCapture = () => {
    return true;
  };

  onMoveShouldSetPanResponder = () => {
    return true;
  };

  onMoveShouldSetPanResponderCapture = () => {
    return true;
  };

  onPanResponderTerminationRequest = () => {
    return false;
  };

  onPanResponderGrant = (thumbSize: number) => {
    if (this.props.disabled) {
      return;
    }
    if (this.switchAnimationActive) {
      this.switchAnimationActive = false;
      this.stopAnimations();
      return;
    }
    this.animateThumb(thumbSize * 1.2);
    this.animateEllipse(this.props.value ? 1 : 0.01);
  };

  onPanResponderMove = () => {
    return true;
  };

  onPanResponderRelease = (evt: GestureResponderEvent,
                           gestureState: PanResponderGestureState,
                           thumbSize: number) => {

    if (!this.props.disabled) {
      const propValue = this.props.value;
      if ((!propValue && gestureState.dx > -5) || (propValue && gestureState.dx < 5)) {
        this.toggle(this.onValueChange, thumbSize);
      } else {
        this.animateEllipse(propValue ? 0.01 : 1);
      }
    }
    this.animateThumb(thumbSize);
  };

  toggle = (callback = (value: boolean) => null, thumbSize: number) => {
    // this.onToggleIn();
    const toValue = !this.props.value;
    this.animateSwitch(toValue, () => {
      this.switchAnimation.setValue(0);
      callback(toValue);
    }, thumbSize);
    this.animateThumb(thumbSize);
    // this.onToggleOut();
  };

  // onToggleIn = () => {
  //   this.props.dispatch([Interaction.ACTIVE]);
  // };
  //
  // onToggleOut = () => {
  //   this.props.dispatch([]);
  // };

  onValueChange = (value: boolean) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(value);
    }
  };

  getComponentStyle = (style: StyleType): StyleType => {
    const thumbComponentSize: number = style.height - (style.borderWidth * 2);
    return {
      componentContainer: {
        width: style.width,
        height: style.height,
        borderRadius: style.height / 2,
        borderColor: style.onTintColor,
      },
      componentDisabledBox: {
        backgroundColor: style.tintColor,
        width: style.width,
        borderRadius: style.width / 2,
        height: this.props.disabled ? style.height : 0
      },
      componentEllipse: {
        backgroundColor: style.thumbColor,
        width: style.width - (style.borderWidth * 2),
        height: style.height - (style.borderWidth * 2),
        borderRadius: (style.height - (style.borderWidth * 2)) / 2,
      },
      componentThumb: {
        height: thumbComponentSize,
        width: thumbComponentSize,
        borderWidth: style.borderWidth,
        borderRadius: thumbComponentSize / 2,
        marginHorizontal: 1.5,
      },
      switchOffsetValue: style.offsetValue,
      colors: {
        onTint: style.onTintColor,
        thumb: style.thumbColor,
        tint: style.tintColor,
      },
    }
  };

  render() {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);
    const {
      disabled,
      value,
      style,
    } = this.props;
    const interpolatedTintColor = this.switchAnimation.interpolate({
      inputRange: value ?
        [-componentStyle.switchOffsetValue, 0] :[0, componentStyle.switchOffsetValue],
      outputRange: [
        componentStyle.colors.tint,
        componentStyle.colors.onTint,
      ],
    });
    const returnScale = this.switchAnimation.interpolate({
      inputRange: [-componentStyle.switchOffsetValue, 0],
      outputRange: [1, 0.01],
    });
    return (
      <View style={style}>
        <Animated.View
          style={[
            styles.container,
            componentStyle.componentContainer,
            { backgroundColor: interpolatedTintColor },
          ]}
          {...this.panResponder.panHandlers}>
          <Animated.View style={[
            styles.ellipse,
            componentStyle.componentEllipse,
            { transform: [{ scale: value ? returnScale : this.ellipseAnimation }] },
          ]}
          />
          <Animated.View style={[
            componentStyle.componentThumb,
            {
              width: this.thumbAnimation,
              alignSelf: value ? 'flex-end' : 'flex-start',
              transform: [{ translateX: this.switchAnimation }],
              borderColor: interpolatedTintColor,
              backgroundColor: componentStyle.colors.thumb,
              elevation: disabled ? 0 : 5,
            },
          ]}
          />
          <Animated.View style={[
            styles.disableBox,
            componentStyle.componentDisabledBox,
          ]}/>
        </Animated.View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
  },
  disableBox: {
    position: 'absolute',
    alignSelf: 'center',
  },
  ellipse: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
