import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { RkTabSetItem } from './rkTabSetItem.component';
import { RkStyleSheet } from '../../styles/styleSheet';
import { RkTabSetIndicator } from './rkTabSetIndicator.component';

/**
 * @extends React.Component
 *
 * @property {function} onGalleryItemChange - Gallery (modal) item change callback
 */
export class RkTabSet extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(RkTabSetItem)).isRequired,
    onItemChange: PropTypes.func,
  };
  static defaultProps = {
    onItemChange: (() => null),
  };

  state = {
    selectedIndex: 0,
    contentWidth: -1,
  };

  contentContainerRef = undefined;
  contentIndicatorRef = undefined;

  constructor(props) {
    super(props);
    const isChildSelected = (child) => child.props.isSelected;
    const derivedSelectedIndex = props.children.findIndex(isChildSelected);
    this.state.selectedIndex = derivedSelectedIndex < 0 ? 0 : derivedSelectedIndex;
  }

  onTabPress = (index) => {
    this.scrollToIndex({ index });
  };

  onLayout = (event) => {
    this.setState({
      contentWidth: event.nativeEvent.layout.width,
    });
  };

  onContentContainerScroll = (event) => {
    const selectedIndex = Math.round(event.nativeEvent.contentOffset.x / this.state.contentWidth);
    const isIndexInBounds = selectedIndex >= 0 && selectedIndex <= this.props.children.length;

    // TODO: scroll indicator on container gesture scroll
    //
    // const contentIndicatorOffset = event.nativeEvent.contentOffset.x / this.props.children.length;
    // this.contentIndicatorRef.scrollToOffset({ offset: contentIndicatorOffset });

    if (isIndexInBounds && selectedIndex !== this.state.selectedIndex) {
      this.onItemChange(selectedIndex);
    }
  };

  onItemChange = (index) => {
    const change = {
      previous: this.state.selectedIndex,
      current: index,
    };
    this.setState({
      selectedIndex: change.current,
    });
    this.props.onItemChange(change);
  };

  /**
   * @param params - object: { index: number, animated: boolean }
   * @param onComplete - function: scroll completion callback
   */
  scrollToIndex = (params, onComplete = (() => null)) => {
    this.contentContainerRef.scrollToIndex(params);
    this.contentIndicatorRef.scrollToIndex(params);
  };

  /**
   * @param params - object: { offset: number, animated: boolean }
   * @param onComplete - function: scroll completion callback
   */
  scrollToOffset = (params, onComplete = (() => null)) => {
    this.contentContainerRef.scrollToIndex(params);
    this.contentIndicatorRef.scrollToIndex(params);
  };

  getItemKey = (item, index) => index.toString();

  getTabContentViews = () => {
    const mapChildToChildContentView = (child) => child.props.children;
    return React.Children.map(this.props.children, mapChildToChildContentView);
  };

  getItemLayout = (item, index) => ({
    length: this.state.contentWidth,
    offset: this.state.contentWidth * index,
    index,
  });

  setContentIndicatorRef = (ref) => {
    this.contentIndicatorRef = ref;
  };

  setContentContainerRef = (ref) => {
    this.contentContainerRef = ref;
  };

  renderTabContent = ({ item }) => {
    const itemStyle = [{ width: this.state.contentWidth }, item.props.style];
    return React.cloneElement(item, { style: itemStyle });
  };

  renderTab = (item, index) => (
    <TouchableOpacity key={index.toString()} onPress={() => this.onTabPress(index)}>
      {React.cloneElement(item, { isSelected: this.state.selectedIndex === index })}
    </TouchableOpacity>
  );

  renderTabs = () => this.props.children.map(this.renderTab);

  renderPlaceholder = () => (
    <View onLayout={this.onLayout} />
  );

  renderView = () => (
    <View style={{ flex: 1 }}>
      <View style={styles.tabContainer}>{this.renderTabs()}</View>
      <RkTabSetIndicator
        ref={this.setContentIndicatorRef}
        contentWidth={this.state.contentWidth}
        itemCount={this.props.children.length}
      />
      <FlatList
        ref={this.setContentContainerRef}
        horizontal={true}
        pagingEnabled={true}
        initialScrollIndex={this.state.selectedIndex}
        data={this.getTabContentViews()}
        onScroll={this.onContentContainerScroll}
        renderItem={this.renderTabContent}
        getItemLayout={this.getItemLayout}
        keyExtractor={this.getItemKey}
      />
    </View>
  );

  render() {
    return this.state.contentWidth < 0 ? this.renderPlaceholder() : this.renderView();
  }
}

const styles = RkStyleSheet.create(theme => ({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
