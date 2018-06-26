import React from 'react';
import { Modal } from 'react-native';
import { RkComponent } from '../rkComponent';
import { RkGalleryGrid } from './rkGalleryGrid';
import { RkGalleryViewer } from './rkGalleryViewer';

export class RkGallery extends RkComponent {
  static propTypes = {
    items: RkGalleryGrid.propTypes.items,
    spanCount: RkGalleryGrid.propTypes.spanCount,
    itemMargin: RkGalleryGrid.propTypes.itemMargin,
    onGridItemClick: RkGalleryGrid.propTypes.onItemClick,
  };
  static defaultProps = {
    spanCount: RkGalleryGrid.defaultProps.spanCount,
    itemMargin: RkGalleryGrid.defaultProps.itemMargin,
    onGridItemClick: RkGalleryGrid.defaultProps.onItemClick,
  };
  componentName = 'RkGallery';

  constructor(props) {
    super(props);
    this.state = {
      previewImageIndex: undefined,
    };
  }

  onViewerItemClick = (item, index) => {
    this.setState({
      previewImageIndex: undefined,
    });
  };

  onGridItemClick = (item, index) => {
    this.props.onGridItemClick(item, index);
    this.setState({
      previewImageIndex: index,
    });
  };


  renderViewer = () => (
    <Modal>
      <RkGalleryViewer
        items={this.props.items}
        initialIndex={this.state.previewImageIndex}
        onItemClick={this.onViewerItemClick}
      />
    </Modal>
  );

  renderGrid = () => (
    <RkGalleryGrid
      items={this.props.items}
      spanCount={this.props.spanCount}
      itemMargin={this.props.itemMargin}
      onItemClick={this.onGridItemClick}
    />
  );

  isPreview = () => this.state.previewImageIndex !== undefined;

  render() {
    return this.isPreview() ? this.renderViewer() : this.renderGrid();
  }
}
