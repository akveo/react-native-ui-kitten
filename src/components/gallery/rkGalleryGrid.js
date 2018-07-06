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
    items: PropTypes.array.isRequired,
    spanCount: PropTypes.number,
    itemMargin: PropTypes.number,
    onItemClick: PropTypes.func,
  };
  static defaultProps = {
    spanCount: 3,
    itemMargin: 2,
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
    if (this.props.onItemClick) {
      this.props.onItemClick(item, index);
    }
  };

  renderItemView = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => this.onItemViewClick(item, index)}>
      <Image
        source={item}
        style={{
          width: this.state.layout.item.size.width,
          height: this.state.layout.item.size.height,
          margin: this.props.itemMargin,
        }}
      />
    </TouchableWithoutFeedback>
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
