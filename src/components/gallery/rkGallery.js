import React from 'react';
import { Modal } from 'react-native';
import { RkComponent } from '../rkComponent';
import { RkGalleryGrid } from './rkGalleryGrid';
import { RkGalleryViewer } from './rkGalleryViewer';

export class RkGallery extends RkComponent {
  static propTypes = {
    items: RkGalleryGrid.propTypes.items,
    gridSpanCount: RkGalleryGrid.propTypes.spanCount,
    gridItemMargin: RkGalleryGrid.propTypes.itemMargin,
    galleryItemMaxScale: RkGalleryViewer.propTypes.itemMaxScale,
    onGridItemClick: RkGalleryGrid.propTypes.onItemClick,
    onGalleryItemClick: RkGalleryGrid.propTypes.onItemClick,
    onGalleryItemChange: RkGalleryViewer.propTypes.onItemChange,
    onGalleryItemScaleChange: RkGalleryViewer.propTypes.onItemScaleChange,
  };
  static defaultProps = {
    spanCount: RkGalleryGrid.defaultProps.spanCount,
    itemMargin: RkGalleryGrid.defaultProps.itemMargin,
  };
  componentName = 'RkGallery';

  state = {
    viewerImageIndex: undefined,
  };

  onModalRequestClose = () => {
    this.setState({
      viewerImageIndex: undefined,
    });
  };

  onGridItemClick = (item, index) => {
    this.setState({
      viewerImageIndex: index,
    });
    if (this.props.onGridItemClick) {
      this.props.onGridItemClick(item, index);
    }
  };


  renderViewer = () => (
    <Modal onRequestClose={this.onModalRequestClose}>
      <RkGalleryViewer
        initialIndex={this.state.viewerImageIndex}
        items={this.props.items}
        itemMaxScale={this.props.galleryItemMaxScale}
        onItemClick={this.props.onGalleryItemClick}
        onItemChange={this.props.onGalleryItemChange}
        onItemScaleChange={this.props.onGalleryItemScaleChange}
      />
    </Modal>
  );

  renderGrid = () => (
    <RkGalleryGrid
      items={this.props.items}
      spanCount={this.props.gridSpanCount}
      itemMargin={this.props.gridItemMargin}
      onItemClick={this.onGridItemClick}
    />
  );

  isPreview = () => this.state.viewerImageIndex !== undefined;

  render() {
    return this.isPreview() ? this.renderViewer() : this.renderGrid();
  }
}
