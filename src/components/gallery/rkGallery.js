import React from 'react';
import { FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';

export class RkGallery extends RkComponent {
  static propTypes = {
    items: PropTypes.array,
    spanCount: PropTypes.number,
    itemMargin: PropTypes.number,
    onItemClick: PropTypes.func,
  };
  static defaultProps = {
    items: [],
    spanCount: 3,
    itemMargin: 2,
  };
  componentName = 'RkGallery';

  constructor(props) {
    super(props);
    const { width: screenWidth } = Dimensions.get('window');
    this.state = {
      layout: {
        item: {
          size: {
            width: (screenWidth / this.props.spanCount) - (this.props.itemMargin * 2),
            height: (screenWidth / this.props.spanCount) - (this.props.itemMargin * 2),
          },
          margin: this.props.itemMargin,
        },
        spanCount: this.props.spanCount,
      },
      items: this.props.items,
    };
  }

  onItemViewClicked = (item, index) => {
    const callee = this.props.onItemClick ? this.props.onItemClick : RkGallery.onItemViewRkClick;
    callee(item, index);
  };

  onItemKeyExtract = (item, index) => index.toString();

  onRenderItemView = ({ item, index, separators }) => (
    <TouchableOpacity onPress={() => this.onItemViewClicked(item, index)}>
      <Image
        style={{
          width: this.state.layout.item.size.width,
          height: this.state.layout.item.size.height,
          margin: this.state.layout.item.margin,
        }}
        source={item}
      />
    </TouchableOpacity>
  );

  render() {
    return (
      <FlatList
        data={this.state.items}
        numColumns={this.state.layout.spanCount}
        renderItem={this.onRenderItemView}
        keyExtractor={this.onItemKeyExtract}
      />
    );
  }
}

RkGallery.onItemViewRkClick = (item, index) => {

};
