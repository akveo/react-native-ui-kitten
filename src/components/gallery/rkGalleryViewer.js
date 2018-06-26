import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Dimensions,
} from 'react-native';
import { RkGalleryImage } from './rkGalleryImage';

export class RkGalleryViewer extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    initialIndex: PropTypes.number,
    onItemClick: PropTypes.func,
  };
  static defaultProps = {
    initialIndex: 0,
    onItemClick: (() => null),
  };

  constructor(props) {
    super(props);
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    this.state = {
      itemSize: {
        width: screenWidth,
        height: screenHeight,
      },
    };
  }

  onItemViewClick = (item, index) => {
    this.props.onItemClick(item, index);
  };

  onItemKeyExtract = (item, index) => index.toString();

  renderItemLayout = (item, index) => ({
    length: this.state.itemSize.width,
    offset: this.state.itemSize.width * index,
    index,
  });

  renderItemView = ({ item, index }) => (
    <RkGalleryImage
      onClick={() => this.onItemViewClick(item, index)}
      source={item}
      style={{
        width: this.state.itemSize.width,
        height: this.state.itemSize.height,
      }}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.items}
        renderItem={this.renderItemView}
        getItemLayout={this.renderItemLayout}
        initialScrollIndex={this.props.initialIndex}
        horizontal
        pagingEnabled
        keyExtractor={this.onItemKeyExtract}
      />
    );
  }
}
