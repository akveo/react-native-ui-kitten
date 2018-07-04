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
    onScaleChange: PropTypes.func,
    onOffsetChange: PropTypes.func,
  };
  static defaultProps = {
    scalable: true,
  };

  lastState = {
    scale: 1,
    offset: {
      x: 0,
      y: 0,
    },
    isPinch: false,
  };
  distance = 150;

  constructor(props) {
    super(props);
    this.state = {
      scale: 1,
      offset: {
        x: 0,
        y: 0,
      },
    };
  }

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

  onStartShouldSetPanResponder = () => false;

  onMoveShouldSetPanResponder = (event, state) => {
    const isScaled = Math.abs(state.dx) > 2 || Math.abs(state.dy) > 2;
    return this.props.scalable && (isScaled || state.numberActiveTouches === 2);
  };

  onPanResponderGrant = (event, state) => {
    if (state.numberActiveTouches === 2) {
      const distance = {
        dx: Math.abs(event.nativeEvent.touches[0].pageX - event.nativeEvent.touches[1].pageX),
        dy: Math.abs(event.nativeEvent.touches[0].pageY - event.nativeEvent.touches[1].pageY),
      };
      this.distance = Math.sqrt((distance.dx * distance.dx) + (distance.dy * distance.dy));
    }
  };

  onPanResponderRelease = () => {
    this.lastState = {
      scale: this.state.scale,
      offset: this.state.offset,
    };
  };

  onPanResponderMove = (event, state) => {
    if (state.numberActiveTouches === 2) {
      const distance = {
        dx: Math.abs(event.nativeEvent.touches[0].pageX - event.nativeEvent.touches[1].pageX),
        dy: Math.abs(event.nativeEvent.touches[0].pageY - event.nativeEvent.touches[1].pageY),
      };
      const diagonal = Math.sqrt((distance.dx * distance.dx) + (distance.dy * distance.dy));
      const scale = (diagonal / this.distance) * this.lastState.scale;
      this.setState({ scale: this.getBoundedScale(scale) }, this.onScaleChanged);
    } else if (state.numberActiveTouches === 1) {
      const distance = {
        dx: this.lastState.isPinch ? 0 : state.dx,
        dy: this.lastState.isPinch ? 0 : state.dy,
      };
      const offset = {
        x: this.lastState.offset.x + (distance.dx / this.state.scale),
        y: this.lastState.offset.y + (distance.dy / this.state.scale),
      };
      this.setState({ offset: this.getBoundedOffset(offset) }, this.onOffsetChanged);
    }
  };

  onPanResponderTerminationRequest = () => true;

  onShouldBlockNativeResponder = () => false;

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

  getBoundedScale = (scale, bounds = { min: 1.0, max: 5.0 }) => {
    let result = scale < bounds.min ? bounds.min : scale;
    result = scale > bounds.max ? bounds.max : result;
    return result;
  };

  getBoundedOffset = (offset) => {
    if (this.state.scale === 1) {
      return { x: 0, y: 0 };
    }
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
    result.y = Math.abs(result.y) > bounds.y / 2 ? this.state.offset.y : result.y;
    return result;
  };

  setState = (state, callback) => {
    super.setState(state);
    callback(state);
  };

  onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    this.size = { width, height };
  };

  render() {
    return (
      <View
        onLayout={this.onLayout}
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
