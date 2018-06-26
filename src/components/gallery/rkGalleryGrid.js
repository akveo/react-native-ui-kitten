import React from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

export class RkGalleryGrid extends React.Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    layout: PropTypes.object.isRequired,
    onItemClick: PropTypes.func.isRequired,
  };

  onItemViewClicked = (item, index) => {
    this.props.onItemClick(item, index);
  };

  onItemKeyExtract = (item, index) => index.toString();

  onRenderItemView = ({ item, index, separators }) => (
    <TouchableOpacity onPress={() => this.onItemViewClicked(item, index)}>
      <Image
        style={{
          width: this.props.layout.item.size.width,
          height: this.props.layout.item.size.height,
          margin: this.props.layout.item.margin,
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
