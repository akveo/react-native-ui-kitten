import React from 'react';
import {
  Modal,
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import { RkComponent } from '../rkComponent';
import { RkGalleryGrid } from './rkGalleryGrid';
import { RkGalleryViewer } from './rkGalleryViewer';
import { RkGalleryHeaderFooter } from './RkGalleryHeaderFooter';
import { RkButton } from '../button/rkButton';

export class RkGallery extends RkComponent {
  static propTypes = {
    items: RkGalleryGrid.propTypes.items,
    renderGalleryHeader: RkGalleryHeaderFooter.propTypes.onRenderComponent,
    renderGalleryFooter: RkGalleryHeaderFooter.propTypes.onRenderComponent,
    gridSpanCount: RkGalleryGrid.propTypes.spanCount,
    gridItemMargin: RkGalleryGrid.propTypes.itemMargin,
    galleryItemMaxScale: RkGalleryViewer.propTypes.itemMaxScale,
    onGridItemClick: RkGalleryGrid.propTypes.onItemClick,
    onGalleryItemClick: RkGalleryViewer.propTypes.onItemClick,
    onGalleryItemChange: RkGalleryViewer.propTypes.onItemChange,
    onGalleryItemScaleChange: RkGalleryViewer.propTypes.onItemScaleChange,
  };
  static defaultProps = {
    renderGalleryHeader: null,
    renderGalleryFooter: (() => null),
    gridSpanCount: RkGalleryGrid.defaultProps.spanCount,
    gridItemMargin: RkGalleryGrid.defaultProps.itemMargin,
    onGridItemClick: RkGalleryGrid.defaultProps.onItemClick,
    onGalleryItemClick: RkGalleryViewer.defaultProps.onItemClick,
    onGalleryItemChange: RkGalleryViewer.defaultProps.onItemChange,
    onGalleryItemScaleChange: RkGalleryViewer.defaultProps.onItemScaleChange,
  };
  componentName = 'RkGallery';

  state = {
    previewImageIndex: undefined,
    overlayOpacity: new Animated.Value(0),
  };

  // eslint-disable-next-line arrow-body-style
  getOverlayAnimation = (endValue) => {
    return Animated.timing(this.state.overlayOpacity, { toValue: endValue, duration: 300 });
  };

  onModalRequestClose = () => {
    const change = {
      previous: this.state.previewImageIndex,
      current: undefined,
    };
    this.setState({
      previewImageIndex: change.current,
    });
    this.props.onGalleryItemChange(change);
  };

  onViewerItemClick = () => {
    // eslint-disable-next-line no-underscore-dangle
    const opacityValue = this.state.overlayOpacity._value === 0 ? 1 : 0;
    this.getOverlayAnimation(opacityValue).start();
  };

  onViewerItemChange = (change) => {
    this.setState({
      previewImageIndex: change.current,
    });
    this.props.onGalleryItemChange(change);
  };

  onGridItemClick = (item, index) => {
    const change = {
      previous: this.state.previewImageIndex,
      current: index,
    };
    this.setState({
      previewImageIndex: change.current,
      overlayOpacity: new Animated.Value(1),
    });
    this.props.onGalleryItemChange(change);
    this.props.onGridItemClick(item, index);
  };

  renderDefaultViewerHeader = (onRequestClose) => (
    <View style={defaultComponentStyles.viewerHeader}>
      <RkButton
        rkType='clear'
        onPress={onRequestClose}
      > Close
      </RkButton>
    </View>
  );

  renderViewer = () => {
    const onRenderHeader = this.props.renderGalleryHeader || this.renderDefaultViewerHeader;
    const headerFooterStateStyle = { opacity: this.state.overlayOpacity };
    return (
      <Modal onRequestClose={this.onModalRequestClose}>
        <View style={styles.containerViewer}>
          <RkGalleryViewer
            style={this.props.style}
            initialIndex={this.state.previewImageIndex}
            items={this.props.items}
            itemMaxScale={this.props.galleryItemMaxScale}
            onItemClick={this.onViewerItemClick}
            onItemChange={this.onViewerItemChange}
            onItemScaleChange={this.props.onGalleryItemScaleChange}
          />
          <RkGalleryHeaderFooter
            style={[styles.viewerHeaderFooter, styles.viewerHeader, headerFooterStateStyle]}
            onRenderComponent={() => onRenderHeader(this.onModalRequestClose)}
          />
          <RkGalleryHeaderFooter
            style={[styles.viewerHeaderFooter, styles.viewerFooter, headerFooterStateStyle]}
            onRenderComponent={this.props.renderGalleryFooter}
          />
        </View>
      </Modal>
    );
  };

  renderGrid = () => (
    <RkGalleryGrid
      style={this.props.style}
      items={this.props.items}
      spanCount={this.props.gridSpanCount}
      itemMargin={this.props.gridItemMargin}
      onItemClick={this.onGridItemClick}
    />
  );

  isPreview = () => this.state.previewImageIndex !== undefined;

  render() {
    return this.isPreview() ? this.renderViewer() : this.renderGrid();
  }
}

const styles = StyleSheet.create({
  containerViewer: {
    marginTop: 20,
  },
  viewerHeaderFooter: {
    left: 0,
    right: 0,
    position: 'absolute',
  },
  viewerHeader: {
  },
  viewerFooter: {
    bottom: 0,
  },
});
const defaultComponentStyles = StyleSheet.create({
  viewerHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
});
