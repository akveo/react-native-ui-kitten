import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  PanResponder,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { RkGalleryImage } from './rkGalleryImage';

export class RkGalleryViewer extends React.Component {
  static propTypes = {
    items: PropTypes.node.isRequired,
    initialIndex: PropTypes.number,
    onItemClick: PropTypes.func,
    onItemChange: PropTypes.func,
    onItemScaleChange: PropTypes.func,

    itemMaxScale: RkGalleryImage.propTypes.maxScale,
  };
  static defaultProps = {
    initialIndex: 0,
    onItemClick: (() => null),
    onItemChange: (() => null),
    onItemScaleChange: (() => null),

    itemMaxScale: RkGalleryImage.defaultProps.maxScale,
  };

  state = {
    itemSize: {
      width: 0,
      height: 0,
    },
    scrollEnabled: true,
  };
  selectedItem = {
    index: 0,
    state: {
      scale: 0,
      offset: 0,
    },
  };

  constructor(props) {
    super(props);
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    this.state.itemSize = {
      width: screenWidth,
      height: screenHeight,
    };
  }

  componentWillMount() {
    this.gestureHandlers = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
    });
  }

  onMoveShouldSetPanResponder = (event, state) => {
    const shouldEnableScroll = !this.state.scrollEnabled && this.selectedItem.state.scale === 1.0;
    const shouldDisableScroll = this.state.scrollEnabled && this.selectedItem.state.scale > 1.0;
    if (state.numberActiveTouches === 2 && (shouldEnableScroll || shouldDisableScroll)) {
      this.setState({
        scrollEnabled: shouldEnableScroll,
      });
    }
    return false;
  };

  onItemViewClick = (item, index) => {
    this.props.onItemClick(item, index);
  };

  onItemScaleChange = (item, index, change) => {
    this.selectedItem.index = index;
    this.selectedItem.state.scale = change.current;

    const shouldEnableScroll = change.current === 1.0 && !this.state.scrollEnabled;
    const shouldDisableScroll = change.current > 1.0 && this.state.scrollEnabled;
    if (shouldEnableScroll || shouldDisableScroll) {
      this.setState({
        scrollEnabled: shouldEnableScroll,
      });
    }
    this.props.onItemScaleChange(item, index, change);
  };

  onItemOffsetChange = (item, index, change) => {
    this.selectedItem.index = index;
    this.selectedItem.state.scale = change.current;
  };

  onContainerScroll = (event) => {
    const selectedIndex = Math.round(event.nativeEvent.contentOffset.x / this.state.itemSize.width);
    const isIndexInBounds = selectedIndex >= 0 && selectedIndex <= this.props.items.length;
    if (isIndexInBounds && selectedIndex !== this.selectedItem.index) {
      this.onItemChange(selectedIndex);
    }
  };

  onItemChange = (index) => {
    const change = {
      previous: this.selectedItem.index,
      current: index,
    };
    this.selectedItem.index = index;
    this.props.onItemChange(change);
  };

  extractItemKey = (item, index) => index.toString();

  renderItemLayout = (item, index) => ({
    length: this.state.itemSize.width,
    offset: this.state.itemSize.width * index,
    index,
  });

  renderItemView = ({ item, index }) => (
    <RkGalleryImage
      source={item}
      maxScale={this.props.itemMaxScale}
      onClick={() => this.onItemViewClick(item, index)}
      onScaleChange={(change) => this.onItemScaleChange(item, index, change)}
      onOffsetChange={(change) => this.onItemOffsetChange(item, index, change)}
      style={{
        width: this.state.itemSize.width,
        height: this.state.itemSize.height,
      }}
    />
  );

  render() {
    return (
      <FlatList
        style={defaultComponentStyles.container}
        data={this.props.items}
        renderItem={this.renderItemView}
        getItemLayout={this.renderItemLayout}
        onScroll={this.onContainerScroll}
        initialScrollIndex={this.props.initialIndex}
        horizontal={true}
        scrollEnabled={this.state.scrollEnabled}
        pagingEnabled={true}
        keyExtractor={this.extractItemKey}
        {...this.gestureHandlers.panHandlers}
      />
    );
  }
}

const defaultComponentStyles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
});
