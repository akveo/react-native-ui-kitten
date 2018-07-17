import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  StyleSheet,
  PanResponder,
} from 'react-native';

export class PinchZoomResponder extends Component {
  static propTypes = {
    maxScale: PropTypes.number,
    onScaleChange: PropTypes.func,
    onOffsetChange: PropTypes.func,

    style: PropTypes.node,
    children: PropTypes.node.isRequired,
  };
  static defaultProps = {
    maxScale: 2,
    onScaleChange: (() => null),
    onOffsetChange: (() => null),

    style: null,
  };
  state = {
    scale: new Animated.Value(1),
    offset: new Animated.ValueXY(),
  };
  prevState = {
    scale: 1,
    offset: {
      x: 0,
      y: 0,
    },
    isPinch: false,
    pinchDistance: 150,
  };

  componentWillMount() {
    this.gestureHandlers = PanResponder.create({
      onStartShouldSetPanResponder: this.onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderGrant: this.onPanResponderGrant,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminationRequest: this.onPanResponderTerminationRequest,
      onShouldBlockNativeResponder: this.onShouldBlockNativeResponder,
    });
  }

  zoomTo = (scale) => {
    // reset offset to { x: 0, y: 0 } if resetting scale
    const offset = scale === 1.0 ? { x: 0, y: 0 } : this.getOffsetValue();
    this.getZoomAnimation(scale, offset).start(this.onZoomAnimationCompleted);
  };

  // Pan Responder callbacks

  /**
   * Does this view want to become responder on the start of a touch?
   * @returns {@code false} to block single touches
   */
  onStartShouldSetPanResponder = () => this.getScaleValue() >= 1;

  /**
   * Called for every touch move on the View when it is not the responder
   * does this view want to "claim" touch responsiveness?
   * @returns {@code true} if pan or pinch gesture recognized.
   */
  onMoveShouldSetPanResponder = (event, state) => {
    if (this.isPanGesture(event, state)) {
      // start pan gesture handling predicate
      return this.getScaleValue() > 1.0;
    }
    if (this.isPinchGesture(event, state)) {
      // start pinch gesture handling predicate
      return true;
    }
    return false;
  };

  /**
   * The View is now responding for touch events.
   */
  onPanResponderGrant = (event, state) => {
    if (this.isPinchGesture(event, state)) {
      const distance = {
        dx: Math.abs(event.nativeEvent.touches[0].pageX - event.nativeEvent.touches[1].pageX),
        dy: Math.abs(event.nativeEvent.touches[0].pageY - event.nativeEvent.touches[1].pageY),
      };
      const powDistance = (distance.dx * distance.dx) + (distance.dy * distance.dy);
      this.prevState.pinchDistance = Math.sqrt(powDistance);
    }
  };

  /**
   * Finger movement
   */
  onPanResponderMove = (event, state) => {
    if (state.numberActiveTouches === 2) {
      this.onPanResponderPinch(event, state);
    } else if (state.numberActiveTouches === 1) {
      this.onPanResponderPan(event, state);
    }
  };

  /**
   * End of the touch
   */
  onPanResponderRelease = () => {
    this.prevState = {
      scale: this.getScaleValue(),
      offset: this.getOffsetValue(),
    };
  };

  /**
   * Something else wants to become responder. Should this view release the responder?
   * @returns {@code true} to allow release.
   */
  onPanResponderTerminationRequest = () => true;

  onShouldBlockNativeResponder = () => false;

  // Supporting functions

  isPanGesture = (event, state) => Math.abs(state.dx) > 2 || Math.abs(state.dy) > 2;

  isPinchGesture = (event, state) => state.numberActiveTouches === 2;

  onPanResponderPan = (event, state) => {
    const distance = {
      dx: this.prevState.isPinch ? 0 : state.dx,
      dy: this.prevState.isPinch ? 0 : state.dy,
    };
    const offset = {
      x: this.prevState.offset.x + (distance.dx / this.getScaleValue()),
      y: this.prevState.offset.y + (distance.dy / this.getScaleValue()),
    };
    const boundedOffsetValue = this.getBoundedOffsetValue(offset);
    this.setState({
      offset: new Animated.ValueXY(boundedOffsetValue),
    });
    this.onOffsetChanged();
  };

  onPanResponderPinch = (event) => {
    const touchDiff = {
      x: Math.abs(event.nativeEvent.touches[0].pageX - event.nativeEvent.touches[1].pageX),
      y: Math.abs(event.nativeEvent.touches[0].pageY - event.nativeEvent.touches[1].pageY),
    };
    const pinchDistance = Math.sqrt((touchDiff.x * touchDiff.x) + (touchDiff.y * touchDiff.y));
    const scale = (pinchDistance / this.prevState.pinchDistance) * this.prevState.scale;

    const isBackZoom = scale < this.prevState.scale;
    const offsetValue = this.getOffsetValue();
    const offset = {
      x: isBackZoom ? offsetValue.x * (scale / this.prevState.scale) : offsetValue.x,
      y: isBackZoom ? offsetValue.y * (scale / this.prevState.scale) : offsetValue.y,
    };
    const boundedValue = {
      scale: this.getBoundedScaleValue(scale),
      offset: this.getBoundedOffsetValue(offset),
    };
    this.setState({
      scale: new Animated.Value(boundedValue.scale),
      offset: new Animated.ValueXY(boundedValue.offset),
    });
    this.onScaleChanged();
  };

  getBoundedScaleValue = (value) => {
    let result = value < 1.0 ? 1.0 : value;
    result = value > this.props.maxScale ? this.props.maxScale : result;
    return result;
  };

  getBoundedOffsetValue = (value) => {
    const result = value;
    const size = {
      original: this.size,
      scaled: {
        width: this.size.width * this.getScaleValue(),
        height: this.size.height * this.getScaleValue(),
      },
    };
    const bounds = {
      x: (size.scaled.width - size.original.width) / this.getScaleValue(),
      y: (size.scaled.height - size.original.height) / this.getScaleValue(),
    };
    const offsetValue = this.getOffsetValue();
    result.x = Math.abs(result.x) > bounds.x / 2 ? offsetValue.x : result.x;
    result.y = Math.abs(result.y) > bounds.x / 2 ? offsetValue.y : result.y;
    return result;
  };

  // Supporting function to prevent multiple eslint dangle warnings
  // eslint-disable-next-line no-underscore-dangle
  getScaleValue = () => this.state.scale._value;

  // Supporting function to prevent multiple eslint dangle warnings
  getOffsetValue = () => ({
    x: this.state.offset.x._value, // eslint-disable-line no-underscore-dangle
    y: this.state.offset.y._value, // eslint-disable-line no-underscore-dangle
  });

  // eslint-disable-next-line arrow-body-style
  getZoomAnimation = (scaleValue, offsetValue) => {
    const scaleAnim = Animated.timing(this.state.scale, {
      toValue: scaleValue,
      duration: 300,
    });
    const offsetAnim = Animated.timing(this.state.offset, {
      toValue: offsetValue,
      duration: 300,
    });
    return Animated.parallel([scaleAnim, offsetAnim]);
  };

  onScaleChanged = () => {
    this.prevState.isPinch = true;
    const change = {
      previous: this.prevState.scale,
      current: this.getScaleValue(),
    };
    this.props.onScaleChange(change);
  };

  onOffsetChanged = () => {
    this.prevState.isPinch = false;
    const change = {
      previous: this.prevState.offset,
      current: this.getOffsetValue(),
    };
    this.props.onOffsetChange(change);
  };

  onZoomAnimationCompleted = () => {
    this.onScaleChanged();
    this.prevState.offset = this.getOffsetValue();
  };

  onContainerLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.size = { width, height };
  };

  render() {
    const transform = {
      transform: [
        { scaleX: this.state.scale },
        { scaleY: this.state.scale },
        { translateX: this.state.offset.x },
        { translateY: this.state.offset.y },
      ],
    };
    return (
      <Animated.View
        onLayout={this.onContainerLayout}
        style={[this.props.style, defaultComponentStyles.container, transform]}
        {...this.gestureHandlers.panHandlers}>
        {this.props.children}
      </Animated.View>
    );
  }
}

const defaultComponentStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
