import React from 'react';
import {
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';
import { DoubleTouchableWithoutFeedback } from './doubleTouchableWithoutFeedback';

export class RkGalleryImage extends RkComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.container = {
      size: {
        width: 0,
        height: 0,
      },
      scale: 1,
      scrollResponder: undefined,
    };
  }

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

  onImageSinglePress = (event) => this.props.onClick(event);

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
    const { onClick, ...imageProps } = this.props;
    return (
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        centerContent
        maximumZoomScale={2}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onLayout={this.onContainerLayout}
        onScroll={this.onContainerScroll}
        ref={this.container.scrollResponder ? () => {} : this.setScrollResponderRef}
        style={styles.container}
      >
        <DoubleTouchableWithoutFeedback
          onSinglePress={this.onImageSinglePress}
          onDoublePress={this.onImageDoublePress}
        >
          <Image{...imageProps} />
        </DoubleTouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  scrollContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
