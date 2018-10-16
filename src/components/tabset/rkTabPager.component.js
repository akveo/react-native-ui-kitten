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

    // TODO: scroll indicator on container gesture scroll
    //
    // const contentIndicatorOffset = event.nativeEvent.contentOffset.x / this.props.children.length;
    // this.contentIndicatorRef.scrollToOffset({ offset: contentIndicatorOffset });

    if (isIndexInBounds && selectedIndex !== this.props.selectedIndex) {
      this.onItemChange(selectedIndex);
    }
  };

  onItemChange = (index) => {
    this.props.onSelect(index);
  };

  /**
   * @param params - object: { index: number, animated: boolean }
   */
  scrollToIndex = (params) => {
    this.containerRef.scrollToIndex(params);
  };

  /**
   * @param params - object: { offset: number, animated: boolean }
   */
  scrollToOffset = (params) => {
    this.containerRef.scrollToOffset(params);
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
