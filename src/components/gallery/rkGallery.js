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
    itemStyle: RkGalleryGrid.propTypes.itemStyle,
    renderGalleryHeader: RkGalleryHeaderFooter.propTypes.onRenderComponent,
    renderGalleryFooter: RkGalleryHeaderFooter.propTypes.onRenderComponent,
    spanCount: RkGalleryGrid.propTypes.spanCount,
    galleryItemMaxScale: RkGalleryViewer.propTypes.itemMaxScale,
    onGridItemClick: RkGalleryGrid.propTypes.onItemClick,
    onGalleryItemClick: RkGalleryViewer.propTypes.onItemClick,
    onGalleryItemChange: RkGalleryViewer.propTypes.onItemChange,
    onGalleryItemScaleChange: RkGalleryViewer.propTypes.onItemScaleChange,
  };
  static defaultProps = {
    renderGalleryHeader: null,
    renderGalleryFooter: null,
    spanCount: RkGalleryGrid.defaultProps.spanCount,
    onGridItemClick: RkGalleryGrid.defaultProps.onItemClick,
    onGalleryItemClick: RkGalleryViewer.defaultProps.onItemClick,
    onGalleryItemChange: RkGalleryViewer.defaultProps.onItemChange,
    onGalleryItemScaleChange: RkGalleryViewer.defaultProps.onItemScaleChange,
  };
  componentName = 'RkGallery';
  typeMapping = {
    grid: {},
    gridItem: {},
    previewHeader: {},
    previewFooter: {},
  };

  state = {
    previewImageIndex: undefined,
    overlayOpacity: new Animated.Value(0),
  };

  defineStyles(rkType) {
    return super.defineStyles(rkType);
  }

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

  onViewerItemClick = (item, index) => {
    // eslint-disable-next-line no-underscore-dangle
    const opacityValue = this.state.overlayOpacity._value === 0 ? 1 : 0;
    this.getOverlayAnimation(opacityValue).start();
    this.props.onGalleryItemClick(item, index);
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
    this.props.onGridItemClick(item, index);
    this.props.onGalleryItemChange(change);
  };

  renderDefaultViewerHeader = (onRequestClose) => (
    <View>
      <RkButton
        rkType='clear'
        onPress={onRequestClose}
      > Close
      </RkButton>
    </View>
  );

  renderDefaultViewerFooter = () => (
    <View />
  );

  renderViewer = () => {
    const { previewHeader, previewFooter } = this.defineStyles(this.props.rkType);
    const header = {
      onRenderComponent: this.props.renderGalleryHeader || this.renderDefaultViewerHeader,
      definedStyle: this.props.renderGalleryHeader ? null : previewHeader,
      stateStyle: { opacity: this.state.overlayOpacity },
    };
    const footer = {
      onRenderComponent: this.props.renderGalleryFooter || this.renderDefaultViewerFooter,
      definedStyle: this.props.renderGalleryFooter ? null : previewFooter,
      stateStyle: { opacity: this.state.overlayOpacity },
    };
    return (
      <Modal onRequestClose={this.onModalRequestClose}>
        <View style={defaultComponentStyles.viewerContainer}>
          <RkGalleryViewer
            initialIndex={this.state.previewImageIndex}
            items={this.props.items}
            itemMaxScale={this.props.galleryItemMaxScale}
            onItemClick={this.onViewerItemClick}
            onItemChange={this.onViewerItemChange}
            onItemScaleChange={this.props.onGalleryItemScaleChange}
          />
          <RkGalleryHeaderFooter
            style={[header.definedStyle, defaultComponentStyles.viewerHeader, header.stateStyle]}
            onRenderComponent={() => header.onRenderComponent(this.onModalRequestClose)}
          />
          <RkGalleryHeaderFooter
            style={[footer.definedStyle, defaultComponentStyles.viewerFooter, footer.stateStyle]}
            onRenderComponent={footer.onRenderComponent}
          />
        </View>
      </Modal>
    );
  };

  renderGrid = () => {
    const { grid, gridItem } = this.defineStyles(this.props.rkType);
    return (
      <RkGalleryGrid
        style={[grid, this.props.style]}
        itemStyle={[gridItem, this.props.itemStyle]}
        items={this.props.items}
        spanCount={this.props.spanCount}
        onItemClick={this.onGridItemClick}
      />
    );
  };

  isPreview = () => this.state.previewImageIndex !== undefined;

  render() {
    return this.isPreview() ? this.renderViewer() : this.renderGrid();
  }
}

const defaultComponentStyles = StyleSheet.create({
  viewerContainer: {
    marginTop: 20,
  },
  viewerHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  viewerFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
