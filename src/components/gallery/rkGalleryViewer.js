import React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Dimensions, PanResponder,
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
    const shouldEnableScroll = this.selectedItem.state.scale === 1.0 && !this.state.scrollEnabled;
    const shouldDisableScroll = this.selectedItem.state.scale > 1.0 && this.state.scrollEnabled;
    if (state.numberActiveTouches === 2 && (shouldEnableScroll || shouldDisableScroll)) {
      this.setState({
        scrollEnabled: shouldEnableScroll,
      });
    }
    return false;
  };

  onItemViewClick = (item, index) => {
    if (this.props.onItemClick) {
      this.props.onItemClick(item, index);
    }
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
  };

  onItemOffsetChange = (item, index, change) => {
    this.selectedItem.index = index;
    this.selectedItem.state.scale = change.current;
  };

  onContainerScroll = (event) => {
    const selectedIndex = Math.round(event.nativeEvent.contentOffset.x / this.state.itemSize.width);
    if (selectedIndex >= 0 && selectedIndex <= this.props.items.length && selectedIndex !== this.selectedItem.index) {
      this.onItemChange(selectedIndex);
    }
  };

  onItemChange = (index) => {
    this.selectedItem.index = index;
  };

  onItemKeyExtract = (item, index) => index.toString();

  renderItemLayout = (item, index) => ({
    length: this.state.itemSize.width,
    offset: this.state.itemSize.width * index,
    index,
  });

  renderItemView = ({ item, index }) => (
    <RkGalleryImage
      source={item}
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
        data={this.props.items}
        renderItem={this.renderItemView}
        getItemLayout={this.renderItemLayout}
        onScroll={this.onContainerScroll}
        initialScrollIndex={this.props.initialIndex}
        horizontal
        scrollEnabled={this.state.scrollEnabled}
        pagingEnabled
        keyExtractor={this.onItemKeyExtract}
        {...this.gestureHandlers.panHandlers}
      />
    );
  }
}
