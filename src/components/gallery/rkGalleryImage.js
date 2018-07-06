import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';
import { DoubleTouchableWithoutFeedback } from './doubleTouchableWithoutFeedback';
import { PinchZoomResponder } from './pinchZoomResponder';

export class RkGalleryImage extends RkComponent {
  static propTypes = {
    source: PropTypes.object.isRequired,
    maxScale: PinchZoomResponder.propTypes.maxScale,
    onClick: PropTypes.func,
    onScaleChange: PinchZoomResponder.propTypes.onScaleChange,
    onOffsetChange: PinchZoomResponder.propTypes.onOffsetChange,
  };
  static defaultProps = {
    maxScale: PinchZoomResponder.defaultProps.maxScale,
  };
  componentName = 'RkGalleryImage';

  imageState = {
    scale: 1.0,
  };

  pinchResponderRef = undefined;

  onImageScaleChange = (change) => {
    this.imageState.scale = change.current;
    if (this.props.onScaleChange) {
      this.props.onScaleChange(change);
    }
  };

  onImageOffsetChange = (change) => {
    if (this.props.onOffsetChange) {
      this.props.onOffsetChange(change);
    }
  };

  onImageSinglePress = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  onImageDoublePress = (event) => {
    const scale = this.imageState.scale === 1.0 ? this.props.maxScale : 1.0;
    this.pinchResponderRef.zoomTo(scale);
  };

  // Supporting functions

  setPinchResponderRef = (ref) => {
    this.pinchResponderRef = ref;
  };

  render() {
    const { scalable, ...restProps } = this.props;
    return (
      <PinchZoomResponder
        ref={this.setPinchResponderRef}
        scalable={scalable}
        onScaleChange={this.onImageScaleChange}
        onOffsetChange={this.onImageOffsetChange}
      >
        <DoubleTouchableWithoutFeedback
          onSinglePress={this.onImageSinglePress}
          onDoublePress={this.onImageDoublePress}
        >
          <Image
            {...restProps}
          />
        </DoubleTouchableWithoutFeedback>
      </PinchZoomResponder>
    );
  }
}
