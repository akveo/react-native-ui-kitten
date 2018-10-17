import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
} from 'react-native';

export class RkTabPager extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.node).isRequired,
    selectedIndex: PropTypes.number,
    onSelect: PropTypes.func,
    shouldUseLazyLoad: PropTypes.func,
  };
  static defaultProps = {
    selectedIndex: 0,
    onSelect: (() => null),
    shouldUseLazyLoad: (() => true),
  };

  state = {
    items: [],
    componentWidth: -1,
  };

  /**
   * Support property to avoid sending 'onSelect' events in case like:
   *
   * selectedIndex === 0
   * scrollToIndex === 2
   *
   * this helps avoid sending onSelect for index === 1
   */
  scrollRequestIndex = undefined;

  containerRef = undefined;
  lazyLoadItemMap = new Map();

  static getDerivedStateFromProps(props) {
    return {
      items: props.children,
    };
  }

  constructor(props) {
    super(props);
    props.children.forEach((item, index) => {
      const isDerivedSelection = props.selectedIndex === index;
      const isShouldUseLazyLoad = isDerivedSelection ? false : props.shouldUseLazyLoad(index);
      this.setShouldUseLazyLoad(index, isShouldUseLazyLoad);
    });
  }

  onLayout = (event) => {
    this.setState({
      componentWidth: event.nativeEvent.layout.width,
    });
  };

  onContainerScroll = (event) => {
    const selectedIndex = Math.round(event.nativeEvent.contentOffset.x / this.state.componentWidth);
    const isIndexInBounds = selectedIndex >= 0 && selectedIndex <= this.props.children.length;
    if (isIndexInBounds && selectedIndex !== this.props.selectedIndex) {
      this.onItemChange(selectedIndex);
    }
  };

  onItemChange = (index) => {
    if (this.scrollRequestIndex === undefined) {
      this.props.onSelect(index);
    } else if (index === this.scrollRequestIndex) {
      this.props.onSelect(index);
      this.scrollRequestIndex = undefined;
    }
  };

  /**
   * @param params - object: { index: number, animated: boolean, skipInnerItems: boolean }
   */
  scrollToIndex = (params) => {
    this.scrollRequestIndex = params.index;
    this.containerRef.scrollToIndex(params);
  };

  setContainerRef = (ref) => {
    this.containerRef = ref;
  };

  getItemKey = (item, index) => index.toString();

  getItemLayout = (item, index) => ({
    length: this.state.componentWidth,
    offset: this.state.componentWidth * index,
    index,
  });

  isShouldUseLazyLoad(index) {
    return this.lazyLoadItemMap.get(index);
  }

  setShouldUseLazyLoad(index, value) {
    this.lazyLoadItemMap.set(index, value);
  }

  renderItem = ({ item, index }) => {
    const isItemSelected = index === this.props.selectedIndex;
    const isShouldUseLazyLoad = this.isShouldUseLazyLoad(index);
    const isShouldLoadContentView = isItemSelected || !isShouldUseLazyLoad;
    const contentView = isShouldLoadContentView ? item : null;

    this.setShouldUseLazyLoad(index, !isShouldLoadContentView);

    return (
      <View style={{ width: this.state.componentWidth }}>{contentView}</View>
    );
  };

  renderPlaceholder = () => (
    <View onLayout={this.onLayout} />
  );

  renderView = () => (
    <FlatList
      ref={this.setContainerRef}
      horizontal={true}
      pagingEnabled={true}
      removeClippedSubviews={true}
      initialScrollIndex={this.props.selectedIndex}
      data={this.state.items}
      onScroll={this.onContainerScroll}
      renderItem={this.renderItem}
      getItemLayout={this.getItemLayout}
      keyExtractor={this.getItemKey}
    />
  );

  render() {
    return this.state.componentWidth < 0 ? this.renderPlaceholder() : this.renderView();
  }
}
