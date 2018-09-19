import React from 'react';
import {
  Animated,
  Easing,
  PanResponder, StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';

const switchBorderWidth = 1.5;
const switchHeight = 32;
const switchWidth = 52;
const switchOffsetValue = 20;
const thumbSize = switchHeight - (switchBorderWidth * 2);

export class RkSwitch extends RkComponent {
  componentName = 'RkSwitch';
  typeMapping = {
    component: {},
  };
  static propTypes = {
    disabled: PropTypes.bool,
    onTintColor: PropTypes.string,
    onValueChange: PropTypes.func,
    thumbTintColor: PropTypes.string,
    tintColor: PropTypes.string,
    value: PropTypes.bool,
  };
  static defaultProps = {
    disabled: false,
    onTintColor: '#53d669',
    thumbTintColor: '#ffffff',
    tintColor: '#e5e5e5',
    value: false,
  };

  constructor(props, context) {
    super(props, context);
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
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
    });
  }

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
    Animated.timing(this.switchAnimation).stop();
    Animated.timing(this.ellipseAnimation).stop();
    Animated.timing(this.thumbAnimation).stop();
    this.ellipseAnimation.setValue(this.props.value ? 0.01 : 1);
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
        this.toggle(this.onValueChange);
      } else {
        this.animateEllipse(propValue ? 0.01 : 1);
      }
    }
    this.animateThumb(thumbSize);
  };

  toggle = (callback = () => null) => {
    const toValue = !this.props.value;
    this.animateSwitch(toValue, () => {
      this.switchAnimation.setValue(0);
      callback(toValue);
    });
    this.animateThumb(thumbSize);
  };

  onValueChange = () => {
    if (this.props.onValueChange) {
      this.props.onValueChange();
    }
  };

  defineStyles(additionalTypes) {
    const { component } = super.defineStyles(additionalTypes);
    const switchStyles = {
      onTintColor: this.extractNonStyleValue(component, 'onTintColor'),
      thumbTintColor: this.extractNonStyleValue(component, 'thumbTintColor'),
      tintColor: this.extractNonStyleValue(component, 'tintColor'),
    };
    return { componentStyles: component, switchStyles };
  }

  render() {
    const {
      disabled,
      onTintColor,
      thumbTintColor,
      tintColor,
      value,
      rkType,
      style,
    } = this.props;
    const { componentStyles, switchStyles } = this.defineStyles(rkType);
    const interpolatedTintColor = this.switchAnimation.interpolate({
      inputRange: value ? [-switchOffsetValue, 0] : [0, switchOffsetValue],
      outputRange: [
        switchStyles.tintColor || tintColor,
        switchStyles.onTintColor || onTintColor,
      ],
    });
    const returnScale = this.switchAnimation.interpolate({
      inputRange: [-switchOffsetValue, 0],
      outputRange: [1, 0.01],
    });
    return (
      <View style={[componentStyles, style]}>
        <Animated.View
          style={[styles.container, { backgroundColor: interpolatedTintColor }]}
          {...this.panResponder.panHandlers}>
          <Animated.View style={[
            styles.ellipse,
            { transform: [{ scale: value ? returnScale : this.ellipseAnimation }] },
          ]}
          />
          <Animated.View style={[
            styles.thumb,
            {
              width: this.thumbAnimation,
              alignSelf: value ? 'flex-end' : 'flex-start',
              transform: [{ translateX: this.switchAnimation }],
              borderColor: interpolatedTintColor,
              backgroundColor: switchStyles.thumbTintColor || thumbTintColor,
              elevation: disabled ? 0 : 5,
            },
          ]}
          />
          <Animated.View style={[styles.disableBox, { height: disabled ? switchHeight : 0 }]} />
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
    backgroundColor: '#ffffff80',
    width: switchWidth,
    borderRadius: switchHeight / 2,
  },
  ellipse: {
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'white',
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
