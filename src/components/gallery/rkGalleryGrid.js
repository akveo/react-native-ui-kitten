import React from 'react';
import {
  FlatList,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkGalleryImage } from './rkGalleryImage';

export class RkGalleryGrid extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    onItemClick: PropTypes.func,
    spanCount: PropTypes.number,
    itemMargin: PropTypes.number,
  };
  static defaultProps = {
    spanCount: 3,
    itemMargin: 2,
    onItemClick: (() => null),
  };

  constructor(props) {
    super(props);
    const { width: screenWidth } = Dimensions.get('window');
    this.state = {
      layout: {
        spanCount: this.props.spanCount,
        item: {
          size: {
            width: (screenWidth / this.props.spanCount) - (this.props.itemMargin * 2),
            height: (screenWidth / this.props.spanCount) - (this.props.itemMargin * 2),
          },
          margin: this.props.itemMargin,
        },
      },
    };
  }

  extractItemKey = (item, index) => index.toString();

  onItemViewClick = (item, index) => {
    this.props.onItemClick(item, index);
  };


  renderItemView = ({ item, index }) => (
    <RkGalleryImage
      onClick={() => this.onItemViewClick(item, index)}
      source={item}
      style={{
        width: this.state.layout.item.size.width,
        height: this.state.layout.item.size.height,
        margin: this.props.itemMargin,
      }}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.items}
        numColumns={this.state.layout.spanCount}
        renderItem={this.renderItemView}
        keyExtractor={this.extractItemKey}
      />
    );
  }
}
