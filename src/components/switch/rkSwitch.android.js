import React from 'react';
import {
  Animated,
  Easing,
  PanResponder, StyleSheet,
  View,
} from 'react-native';
import { RkComponent } from '../rkComponent';

const switchBorderWidth = 1.5;
const switchHeight = 32;
const switchWidth = 52;
const switchOffsetValue = 20;
const thumbSize = switchHeight - (switchBorderWidth * 2);

export class RkSwitch extends RkComponent {
  componentName = 'RkSwitch';
  typeMapping = {
    component: {
      onTintColor: 'onTintColor',
      thumbTintColor: 'thumbTintColor',
      tintColor: 'tintColor',
    },
  };

  constructor(props, context) {
    super(props, context);
    this.thumbAnimation = new Animated.Value(thumbSize);
    this.switchAnimation = new Animated.Value(0);
    this.ellipseAnimation = props.value ? new Animated.Value(0.01) : new Animated.Value(1);
    this.switchAnimationActive = false;
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onStartShouldSetPanResponderCapture: this.onStartShouldSetPanResponderCapture,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onMoveShouldSetPanResponderCapture: this.onMoveShouldSetPanResponderCapture,
      onPanResponderTerminationRequest: this.onPanResponderTerminationRequest,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
    });
  }

  // eslint-disable-next-line arrow-body-style
  onStartShouldSetPanResponder = () => {
    return true;
  };

  // eslint-disable-next-line arrow-body-style
  onStartShouldSetPanResponderCapture = () => {
    return true;
  };

  // eslint-disable-next-line arrow-body-style
  onMoveShouldSetPanResponder = () => {
    return true;
  };

  // eslint-disable-next-line arrow-body-style
  onMoveShouldSetPanResponderCapture = () => {
    return true;
  };

  // eslint-disable-next-line arrow-body-style
  onPanResponderTerminationRequest = () => {
    return true;
  };

  onPanResponderGrant = () => {
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

  // eslint-disable-next-line arrow-body-style
  onPanResponderMove = () => {
    return true;
  };

  onPanResponderRelease = (evt, gestureState) => {
    if (!this.props.disabled) {
      const propValue = this.props.value;
      if ((!propValue && gestureState.dx > -5) || (propValue && gestureState.dx < 5)) {
        if (this.props.onValueChange) {
          this.toggle(this.props.onValueChange);
        }
      } else {
        this.animateEllipse(propValue ? 0.01 : 1);
      }
    }
    this.animateThumb(thumbSize);
  };

  stopAnimations() {
    Animated.timing(this.switchAnimation).stop();
    Animated.timing(this.ellipseAnimation).stop();
    Animated.timing(this.thumbAnimation).stop();
    this.ellipseAnimation.setValue(this.props.value ? 0.01 : 1);
  }

  toggle = (callback = () => null) => {
    const toValue = !this.props.value;
    this.animateSwitch(toValue, () => {
      callback(toValue);
      this.switchAnimation.setValue(0);
    });
    this.animateThumb(thumbSize);
  };

  animateSwitch = (value, callback = () => null) => {
    this.switchAnimationActive = true;
    Animated.timing(
      this.switchAnimation,
      {
        toValue: value ? switchOffsetValue : -switchOffsetValue,
        duration: 200,
        easing: Easing.bezier(0.65, 0.12, 0.09, 1.26),
      },
    ).start(() => {
      this.switchAnimationActive = false;
      callback();
    });
  };

  animateThumb = (value, callback = () => null) => {
    Animated.timing(
      this.thumbAnimation,
      {
        toValue: value,
        duration: 150,
        easing: Easing.linear,
      },
    ).start(callback);
  };

  animateEllipse = (value) => {
    Animated.timing(
      this.ellipseAnimation,
      {
        toValue: value,
        duration: 200,
        easing: Easing.linear,
      },
    ).start();
  };

  getSwitchColor(onTintColor, propName, component, defaultColor) {
    return onTintColor || this.extractNonStyleValue(component, propName) || defaultColor;
  }

  render() {
    const {
      style,
      value,
      ...restProps
    } = this.props;
    let {
      onTintColor,
      thumbTintColor,
      tintColor,
    } = restProps;
    const { component } = this.defineStyles();

    onTintColor = this.getSwitchColor(onTintColor, 'onTintColor', component, '#53d669');
    thumbTintColor = this.getSwitchColor(thumbTintColor, 'thumbTintColor', component, '#ffffff');
    tintColor = this.getSwitchColor(tintColor, 'tintColor', component, '#e5e5e5');

    const interpolatedTintColor = this.switchAnimation.interpolate({
      inputRange: value ? [-switchOffsetValue, 0] : [0, switchOffsetValue],
      outputRange: [tintColor, onTintColor],
    });

    const returnScale = this.switchAnimation.interpolate({
      inputRange: [-switchOffsetValue, 0],
      outputRange: [1, 0.01],
    });

    return (
      <View style={[style, component]}>
        <Animated.View
          {...restProps}
          {...this.panResponder.panHandlers}
          style={[styles.container, {
            backgroundColor: interpolatedTintColor,
          }]}
        >
          <Animated.View style={[styles.ellipse, {
            backgroundColor: 'white',
            transform: [{ scale: value ? returnScale : this.ellipseAnimation }],
          }]}
          />
          <Animated.View style={[styles.thumb, {
            alignSelf: value ? 'flex-end' : 'flex-start',
            width: this.thumbAnimation,
            transform: [{ translateX: this.switchAnimation }],
            borderColor: interpolatedTintColor,
            backgroundColor: thumbTintColor,
            elevation: this.props.disabled ? 0 : 5,
          }]}
          />
          <Animated.View style={[styles.disableBox, {
            backgroundColor: '#ffffff80',
            height: this.props.disabled ? switchHeight : 0,
          }]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: switchWidth,
    height: switchHeight,
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: switchHeight / 2,
  },
  disableBox: {
    position: 'absolute',
    alignSelf: 'center',
    width: switchWidth,
    borderRadius: switchHeight / 2,
  },
  ellipse: {
    position: 'absolute',
    alignSelf: 'center',
    width: switchWidth - (switchBorderWidth * 2),
    height: switchHeight - (switchBorderWidth * 2),
    borderRadius: (switchHeight - (switchBorderWidth * 2)) / 2,
  },
  thumb: {
    height: thumbSize,
    width: thumbSize,
    borderWidth: 0,
    borderRadius: thumbSize / 2,
    marginHorizontal: 1.5,
  },
});
