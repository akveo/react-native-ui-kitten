import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  PanResponder,
} from 'react-native';

export class PinchZoomResponder extends Component {
  static propTypes = {
    scalable: PropTypes.bool,
    maxScale: PropTypes.number,
    onScaleChange: PropTypes.func,
    onOffsetChange: PropTypes.func,
  };
  static defaultProps = {
    scalable: true,
    maxScale: 4.0,
  };

  state = {
    scale: 1,
    offset: {
      x: 0,
      y: 0,
    },
  };
  lastState = {
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

  // Pan Responder callbacks

  /**
   * Does this view want to become responder on the start of a touch?
   * @returns {@code false} to block single touches
   */
  onStartShouldSetPanResponder = (event, state) => this.state.scale >= 1;

  /**
   * Called for every touch move on the View when it is not the responder
   * does this view want to "claim" touch responsiveness?
   * @returns {@code true} if pan or pinch gesture recognized.
   */
  onMoveShouldSetPanResponder = (event, state) => {
    const commonGestureStartPredicate = this.props.scalable;
    if (this.isPanGesture(event, state)) {
      // start pan gesture handling predicate
      return commonGestureStartPredicate && this.state.scale > 1.0;
    }
    if (this.isPinchGesture(event, state)) {
      // start pinch gesture handling predicate
      return commonGestureStartPredicate;
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
      this.lastState.pinchDistance = Math.sqrt((distance.dx * distance.dx) + (distance.dy * distance.dy));
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
    this.lastState = {
      scale: this.state.scale,
      offset: this.state.offset,
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
      dx: this.lastState.isPinch ? 0 : state.dx,
      dy: this.lastState.isPinch ? 0 : state.dy,
    };
    const offset = {
      x: this.lastState.offset.x + (distance.dx / this.state.scale),
      y: this.lastState.offset.y + (distance.dy / this.state.scale),
    };
    this.setState({ offset: this.getBoundedOffset(offset) }, this.onOffsetChanged);
  };

  onPanResponderPinch = (event, state) => {
    const touchDiff = {
      x: Math.abs(event.nativeEvent.touches[0].pageX - event.nativeEvent.touches[1].pageX),
      y: Math.abs(event.nativeEvent.touches[0].pageY - event.nativeEvent.touches[1].pageY),
    };
    const pinchDistance = Math.sqrt((touchDiff.x * touchDiff.x) + (touchDiff.y * touchDiff.y));
    const scale = (pinchDistance / this.lastState.pinchDistance) * this.lastState.scale;

    const isBackZoom = scale < this.lastState.scale;
    const offset = {
      x: isBackZoom ? this.state.offset.x * (scale / this.lastState.scale) : this.state.offset.x,
      y: isBackZoom ? this.state.offset.y * (scale / this.lastState.scale) : this.state.offset.y,
    };
    this.setState({
      scale: this.getBoundedScale(scale),
      offset: this.getBoundedOffset(offset),
    }, this.onScaleChanged);
  };

  setState = (state, callback) => {
    super.setState(state);
    callback(state);
  };

  getBoundedScale = (scale) => {
    let result = scale < 1.0 ? 1.0 : scale;
    result = scale > this.props.maxScale ? this.props.maxScale : result;
    return result;
  };

  getBoundedOffset = (offset) => {
    const result = offset;
    const size = {
      original: this.size,
      scaled: {
        width: this.size.width * this.state.scale,
        height: this.size.height * this.state.scale,
      },
    };
    const bounds = {
      x: (size.scaled.width - size.original.width) / this.state.scale,
      y: (size.scaled.height - size.original.height) / this.state.scale,
    };
    result.x = Math.abs(result.x) > bounds.x / 2 ? this.state.offset.x : result.x;
    result.y = Math.abs(result.y) > bounds.x / 2 ? this.state.offset.y : result.y;
    return result;
  };

  onScaleChanged = () => {
    this.lastState.isPinch = true;
    if (this.props.onScaleChange) {
      const change = {
        previous: this.lastState.scale,
        current: this.state.scale,
      };
      this.props.onScaleChange(change);
    }
  };

  onOffsetChanged = () => {
    this.lastState.isPinch = false;
    if (this.props.onOffsetChange) {
      const change = {
        previous: this.lastState.offset,
        current: this.state.offset,
      };
      this.props.onOffsetChange(change);
    }
  };

  onContainerLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.size = { width, height };
  };

  render() {
    return (
      <View
        onLayout={this.onContainerLayout}
        style={[styles.container, this.props.style, {
          transform: [
            { scaleX: this.state.scale },
            { scaleY: this.state.scale },
            { translateX: this.state.offset.x },
            { translateY: this.state.offset.y },
          ],
        }]}
        {...this.gestureHandlers.panHandlers}
      >
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
