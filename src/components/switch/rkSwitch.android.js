
import React from 'react'
import {
  Animated,
  Easing,
  PanResponder, StyleSheet,
  View
} from 'react-native';
import {RkComponent, RkStyleSheet} from 'react-native-ui-kitten'

const switchBorderWidth = 1.5;
const switchHeight = 32;
const switchWidth = 52;
const switchOffsetValue = 20;
const thumbSize = switchHeight - switchBorderWidth * 2;
const scaleMaxValue = 1;
const scaleMinValue = 0.01;
const thumbElevationValue = 5;
const thumbTransformValue = 1.2;
const gestureOffsetTresshold = 5;

export class RkSwitch extends RkComponent {
  componentName = 'RkSwitch';
  typeMapping = {
    component: {
      onTintColor: 'onTintColor',
      thumbTintColor: 'thumbTintColor',
      tintColor: 'tintColor'
    }
  };

  constructor(props, context) {
    super(props, context);
    this.thumbAnimation = new Animated.Value(thumbSize);
    this.switchAnimation = new Animated.Value(0);
    this.ellipseAnimation = props.value ? new Animated.Value(scaleMinValue) : new Animated.Value(scaleMaxValue);
    this.switchAnimationActive = false;
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderGrant: this._onPanResponderGrant,
      onPanResponderMove: (evt, gestureState) => true,
      onPanResponderRelease: this._onPanResponderRelease
    });
  }

  _onPanResponderGrant = (evt, gestureState) => {
    if (this.props.disabled)
      return;
    if (this.switchAnimationActive) {
      this.switchAnimationActive = false;
      this._stopAnimations();
      return;
    }
    this._animateThumb(thumbSize * thumbTransformValue);
    this._animateEllipse(this.props.value ? scaleMaxValue : scaleMinValue);
  };

  _onPanResponderRelease = (evt, gestureState) => {
    let {disabled, onValueChange} = this.props;

    if (!disabled) {
      if ((!this.props.value && gestureState.dx > -gestureOffsetTresshold) || (this.props.value && gestureState.dx < gestureOffsetTresshold)) {
        if (onValueChange) {
          this._toggleSwitch(onValueChange);
        }
      } else {
        this._animateEllipse(this.props.value ? scaleMinValue : scaleMaxValue);
      }
    }

    this._animateThumb(thumbSize);
  };

  _stopAnimations() {
    Animated.timing(this.switchAnimation).stop();
    Animated.timing(this.ellipseAnimation).stop();
    Animated.timing(this.thumbAnimation).stop();
    this.ellipseAnimation.setValue(this.props.value ? scaleMinValue : scaleMaxValue);
  }

  _toggleSwitch = (callback = () => null) => {
    let toValue = !this.props.value;
    this._animateSwitch(toValue, () => {
      callback(toValue);
      this.switchAnimation.setValue(0);
    });
    this._animateThumb(thumbSize);
  };

  _animateSwitch = (value, callback = () => null) => {
    this.switchAnimationActive = true;
    Animated.timing(this.switchAnimation,
      {
        toValue: value ? switchOffsetValue : -switchOffsetValue,
        duration: 200,
        easing: Easing.bezier(.65,.12,.09,1.26)
      }
    ).start(() => {
      this.switchAnimationActive = false;
      callback();
    })
  };

  _animateThumb = (value, callback = () => null) => {
    Animated.timing(this.thumbAnimation,
      {
        toValue: value,
        duration: 150,
        easing: Easing.linear
      }
    ).start(callback)
  };

  _animateEllipse = (value) => {
    Animated.timing(this.ellipseAnimation,
      {
        toValue: value,
        duration: 200,
        easing: Easing.linear
      }
    ).start()
  };

  _getSwitchColor(onTintColor, propName, component) {
    let componentColor = this.extractNonStyleValue(component, propName);
    return onTintColor || componentColor;
  }

  render() {
    let value = this.props.value;
    let {style, onTintColor, thumbTintColor, tintColor, ...restProps} = this.props;
    let {component} = this.defineStyles();

    onTintColor = this._getSwitchColor(onTintColor, 'onTintColor', component);
    thumbTintColor = this._getSwitchColor(thumbTintColor, 'thumbTintColor', component);
    tintColor = this._getSwitchColor(tintColor, 'tintColor', component);

    let interpolatedTintColor = this.switchAnimation.interpolate({
      inputRange: value ? [-switchOffsetValue, 0] : [0, switchOffsetValue],
      outputRange: [tintColor, onTintColor]
    });

    let returnScale = this.switchAnimation.interpolate({
      inputRange: [-switchOffsetValue, 0],
      outputRange: [scaleMaxValue, scaleMinValue]
    });

    return (
      <View style={[style, component]}>
        <Animated.View
          {...restProps}
          {...this._panResponder.panHandlers}
          style={[styles.container, {
            backgroundColor: interpolatedTintColor
          }]}>
          <Animated.View style={[styles.ellipse, {
            backgroundColor: 'white',
            transform: [{scale: value ? returnScale : this.ellipseAnimation}]}]} />
          <Animated.View style={[styles.thumb, {
            alignSelf: value ? 'flex-end' : 'flex-start',
            width: this.thumbAnimation,
            transform: [{translateX: this.switchAnimation}],
            borderColor: interpolatedTintColor,
            backgroundColor: thumbTintColor,
            elevation: this.props.disabled ? 0 : thumbElevationValue
          }]}/>
          <Animated.View style={[styles.disableBox, {
            backgroundColor: '#ffffff80',
            height: this.props.disabled ? switchHeight : 0}]} />
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: switchWidth,
    height: switchHeight,
    overflow: 'hidden',
    justifyContent: 'center',
    borderRadius: switchHeight/2
  },
  disableBox: {
    position: 'absolute',
    alignSelf: 'center',
    width: switchWidth,
    borderRadius: switchHeight/2,
  },
  ellipse: {
    position: 'absolute',
    alignSelf: 'center',
    width: switchWidth - switchBorderWidth * 2,
    height: switchHeight - switchBorderWidth * 2,
    borderRadius: (switchHeight - switchBorderWidth * 2)/2,
  },
  thumb: {
    height: thumbSize,
    width: thumbSize,
    borderWidth: 0,
    borderRadius: thumbSize/2,
    marginHorizontal: switchBorderWidth
  }
});