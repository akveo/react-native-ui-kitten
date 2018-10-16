import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { RkTab } from './rkTab.component';
import { RkTabBar } from './rkTabBar.component';
import { RkTabPager } from './rkTabPager.component';

/**
 * @extends React.Component
 *
 * @property {function} onGalleryItemChange - Gallery (modal) item change callback
 */
export class RkTabView extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(RkTab)).isRequired,
    onItemChange: PropTypes.func,
  };
  static defaultProps = {
    onItemChange: (() => null),
  };

  state = {
    selectedIndex: 0,
  };

  tabViews = [];
  tabContentViews = [];

  tabBarRef = undefined;
  tabPagerRef = undefined;

  constructor(props) {
    super(props);
    this.tabViews = props.children;
    this.tabContentViews = React.Children.map(this.tabViews, child => child.props.children);
    this.state.selectedIndex = this.tabViews.findIndex(child => child.props.isSelected);
  }

  onTabSelect = (index) => {
    this.tabPagerRef.scrollToIndex({ index });
  };

  onTabContentSelect = (index) => {
    this.setState({
      selectedIndex: index,
    });
    this.props.onItemChange(index);
  };

  setTabBarRef = (ref) => {
    this.tabBarRef = ref;
  };

  setTabPagerRef = (ref) => {
    this.tabPagerRef = ref;
  };

  isShouldUseLazyLoad = (index) => this.tabViews[index].props.isLazyLoad;

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
    this.containerRef.scrollToIndex(params);
  };

  render = () => (
    <View style={{ flex: 1 }}>
      <RkTabBar
        ref={this.setTabBarRef}
        selectedIndex={this.state.selectedIndex}
        onSelect={this.onTabSelect}>
        {this.tabViews}
      </RkTabBar>
      <RkTabPager
        ref={this.setTabPagerRef}
        selectedIndex={this.state.selectedIndex}
        shouldUseLazyLoad={this.isShouldUseLazyLoad}
        onSelect={this.onTabContentSelect}>
        {this.tabContentViews}
      </RkTabPager>
    </View>
  );
}
