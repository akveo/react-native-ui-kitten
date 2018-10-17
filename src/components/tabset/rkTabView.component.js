import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions,
} from 'react-native';
import { RkTab } from './rkTab.component';
import { RkTabBar } from './rkTabBar.component';
import { RkTabPager } from './rkTabPager.component';

/**
 * @extends React.Component
 *
 * @property {function} onItemChange - tab content change callback
 */
export class RkTabView extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(RkTab)).isRequired,
    onItemChange: PropTypes.func,
    isScrollableHeader: PropTypes.bool,
  };
  static defaultProps = {
    onItemChange: (() => null),
    isScrollableHeader: RkTabBar.defaultProps.isScrollable,
  };

  state = {
    selectedIndex: 0,
    estimatedTabWidth: 0,
  };

  tabViews = [];
  tabContentViews = [];

  tabBarRef = undefined;
  tabPagerRef = undefined;

  static getDerivedStateFromProps(props) {
    const screenSize = Dimensions.get('window');
    return {
      estimatedTabWidth: screenSize.width / props.children.length,
    };
  }

  constructor(props) {
    super(props);
    this.tabViews = props.children;
    this.tabContentViews = React.Children.map(this.tabViews, child => child.props.children);
    this.state.selectedIndex = this.tabViews.findIndex(child => child.props.isSelected);
  }

  componentDidMount() {
    this.props.onItemChange({
      previous: null,
      current: this.state.selectedIndex,
    });
  }

  onTabSelect = (index) => {
    this.scrollContentToIndex({ index });
  };

  onTabContentSelect = (index) => {
    this.props.onItemChange({
      previous: this.state.selectedIndex,
      current: index,
    });
    if (this.props.isScrollableHeader) {
      this.scrollTabBarToIndex({ index });
    }
    this.setState({
      selectedIndex: index,
    });
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
  scrollTabBarToIndex = (params) => {
    const estimatedBarContentOffset = (this.state.estimatedTabWidth * params.index) / 3;
    if (params.index === this.props.children.length - 1) {
      this.tabBarRef.scrollToEnd(params);
    } else {
      this.tabBarRef.scrollToOffset({ offset: estimatedBarContentOffset });
    }
  };

  /**
   * @param params - object: { index: number, animated: boolean }
   */
  scrollContentToIndex = (params) => {
    this.tabPagerRef.scrollToIndex(params);
  };

  /**
   * @param params - object: { index: number, animated: boolean }
   */
  scrollToIndex = (params) => {
    this.scrollTabBarToIndex(params);
    this.scrollContentToIndex(params);
  };

  render = () => (
    <View style={{ flex: 1 }}>
      <RkTabBar
        ref={this.setTabBarRef}
        isScrollable={this.props.isScrollableHeader}
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
