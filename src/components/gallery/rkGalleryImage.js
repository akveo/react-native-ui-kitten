import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';
import { DoubleTouchableWithoutFeedback } from './doubleTouchableWithoutFeedback';
import { PinchZoomResponder } from './pinchZoomResponder';

/**
 * `RkGalleryImage` is a component which displays an image with pinch-zoom and double click support.
 *
 * @extends React.Component
 *
 * @example Simple usage example:
 *
 * ```
 * <RkGalleryImage source={require('path/to/my-awesome-pic.jpg')}/>
 * ```
 *
 * @example Handling component events
 *
 * ```
 * <RkGalleryImage
 *  source={require('path/to/awesome-pic.jpg')}
 *  onClick={this.onImageClick}
 *  onScaleChange={this.onImageScaleChange}
 *  onOffsetChange={this.onImageOffsetChange}
 * />
 *
 * // Click:
 * // Do some work you need to be done on item click.
 * //
 * // @param event - default react-native click event object.
 *
 * onImageClick = (item, index) => {
 *  // whatever
 * };
 *
 * // Scale change:
 * // Called when:
 * // - pinch gesture is performed,
 * // - double click is performed
 * //
 * // @param change - object containing previous and current image scale args:
 * //
 * // Double click:
 * //
 * // {
 * //  previous: 1.0,
 * //  current: 2.0
 * // }
 *
 * onImageScaleChange = (change) => {
 *  // whatever
 * };
 *
 * // Item offset change:
 * // Called when panning scaled image.
 * //
 * // @param change - object containing previous and current image offset args:
 * //
 * // Double click:
 * //
 * // {
 * //  previous: {
 * //    x: 0.0,
 * //    y: 0.0,
 * //  },
 * //  current: {
 * //    x: 32.0,
 * //    y: 64.0,
 * //  }
 * // }
 *
 * onImageOffsetChange = (change) => {
 *  // whatever
 * };
 * ```
 *
 * @property {style} style - Style for container in grid mode,
 * @property {number} maxScale - maximum scale of an item applied via pinch gesture
 * or double click,
 * @property {function} onClick - item click callback,
 * @property {function} onScaleChange - item scale change callback,
 * @property {function} onOffsetChange - item offset change callback.
 */
export class RkGalleryImage extends RkComponent {
  static propTypes = {
    source: PropTypes.node.isRequired,
    maxScale: PinchZoomResponder.propTypes.maxScale,
    onClick: PropTypes.func,
    onScaleChange: PinchZoomResponder.propTypes.onScaleChange,
    onOffsetChange: PinchZoomResponder.propTypes.onOffsetChange,
  };
  static defaultProps = {
    maxScale: PinchZoomResponder.defaultProps.maxScale,
    onClick: (() => null),
    onScaleChange: PinchZoomResponder.defaultProps.onScaleChange,
    onOffsetChange: PinchZoomResponder.defaultProps.onOffsetChange,
  };
  componentName = 'RkGalleryImage';

  imageState = {
    scale: 1.0,
  };

  pinchResponderRef = undefined;

  onImageScaleChange = (change) => {
    this.imageState.scale = change.current;
    this.props.onScaleChange(change);
  };

  onImageOffsetChange = (change) => {
    this.props.onOffsetChange(change);
  };

  onImageSinglePress = (event) => {
    this.props.onClick(event);
  };

  onImageDoublePress = () => {
    const scale = this.imageState.scale === 1.0 ? this.props.maxScale : 1.0;
    this.pinchResponderRef.zoomTo(scale);
  };

  // Supporting functions

  setPinchResponderRef = (ref) => {
    this.pinchResponderRef = ref;
  };

  render() {
    return (
      <PinchZoomResponder
        ref={this.setPinchResponderRef}
        onScaleChange={this.onImageScaleChange}
        onOffsetChange={this.onImageOffsetChange}>
        <DoubleTouchableWithoutFeedback
          onSinglePress={this.onImageSinglePress}
          onDoublePress={this.onImageDoublePress}>
          <Image{...this.props} />
        </DoubleTouchableWithoutFeedback>
      </PinchZoomResponder>
    );
  }
}
