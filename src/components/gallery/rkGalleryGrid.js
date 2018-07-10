import React from 'react';
import {
  FlatList,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

export class RkGalleryGrid extends React.Component {
  static propTypes = {
    items: PropTypes.node.isRequired,
    spanCount: PropTypes.number,
    itemMargin: PropTypes.number,
    onItemClick: PropTypes.func,
  };
  static defaultProps = {
    spanCount: 3,
    itemMargin: 2,
    onItemClick: (() => null),
  };
  static screenSize = Dimensions.get('window');

  extractItemKey = (item, index) => index.toString();

  onItemViewClick = (item, index) => {
    this.props.onItemClick(item, index);
  };

  renderItemView = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => this.onItemViewClick(item, index)}>
      <Image
        source={item}
        style={{
          width: this.itemSize.width,
          height: this.itemSize.height,
          margin: this.props.itemMargin,
        }}
      />
    </TouchableWithoutFeedback>
  );

  render() {
    this.itemSize = {
      width: (RkGalleryGrid.screenSize.width / this.props.spanCount) - (this.props.itemMargin * 2),
      height: (RkGalleryGrid.screenSize.width / this.props.spanCount) - (this.props.itemMargin * 2),
    };
    return (
      <FlatList
        data={this.props.items}
        numColumns={this.props.spanCount}
        renderItem={this.renderItemView}
        keyExtractor={this.extractItemKey}
      />
    );
  }
}
