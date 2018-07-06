import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';
import { DoubleTouchableWithoutFeedback } from './doubleTouchableWithoutFeedback';
import { PinchZoomResponder } from './pinchZoomResponder';

export class RkGalleryImage extends RkComponent {
  static propTypes = {
    source: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    scalable: PinchZoomResponder.propTypes.scalable,
    onScaleChange: PinchZoomResponder.propTypes.onScaleChange,
    onOffsetChange: PinchZoomResponder.propTypes.onOffsetChange,
  };
  static defaultProps = {
    scalable: PinchZoomResponder.defaultProps.scalable,
  };

  onImageSinglePress = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  onImageDoublePress = (event) => {
    // zoom image
  };

  onContainerLayout = (event) => {
    this.container.size = {
      width: event.nativeEvent.layout.widget,
      height: event.nativeEvent.layout.height,
    };
  };

  onContainerScroll = (event) => {
    this.container.scale = event.nativeEvent.zoomScale;
  };

  render() {
    const {
      scalable,
      onScaleChange,
      onOffsetChange,
      ...restProps
    } = this.props;
    return (
      <PinchZoomResponder
        scalable={scalable}
        onScaleChange={this.props.onScaleChange}
        onOffsetChange={this.props.onOffsetChange}
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
