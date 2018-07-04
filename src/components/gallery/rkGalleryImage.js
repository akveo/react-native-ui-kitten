import React from 'react';
import { Image, StyleSheet } from 'react-native';
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

  isZoomed = () => this.container.scale !== 1;

  zoomTo = (rect, animated = true) => {
    const responderZoom = { ...rect, animated };
    this.container.scrollResponder.scrollResponderZoomTo(responderZoom);
  };

  setScrollResponderRef = (ref) => {
    if (ref) {
      this.container.scrollResponder = ref.getScrollResponder();
    }
  };

  onImageSinglePress = (event) => {
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  onImageDoublePress = (event) => {
    const zoomRect = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
      width: this.isZoomed() ? this.container.size.width : 0,
      height: this.isZoomed() ? this.container.size.height : 0,
    };
    this.zoomTo(zoomRect);
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
        onScaleChange={onScaleChange}
        onOffsetChange={onOffsetChange}
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
