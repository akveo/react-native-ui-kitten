import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Dimensions,
} from 'react-native';
import { RkTabBar } from './rkTabBar.component';
import { RkTabBarIndicator } from './rkTabBarIndicator.component';
import { RkTabPager } from './rkTabPager.component';
import { RkComponent } from '../rkComponent';

/**
 * `RkTabSet` is a component which allows you to split your content into sub-contents.
 *
 * @extends React.Component
 *
 * @example Simple usage example:
 *
 * You simply can use one of following contents in tab: title or icon. Or both of them.
 *
 * ```
 * <RkTabSet>
 *  <RkTab title='Awesome'>
 *    <AwesomeContentComponent />
 *  </RkTab>
 *  <RkTab title='Pretty Cool'>
 *    <PrettyCoolComponent />
 *  </RkTab>
 * </RkTabSet>
 * ```
 *
 * @example Badged tabs example:
 *
 * You can use badges on tabs if you want notify user on something happens.
 * You also can specify badge status and position using `badgeStatus` and `badgePosition` props.
 *
 * ```
 * <RkTabSet>
 *  <RkTab
 *    title='Awesome'
 *    badgeTitle='NEW'>
 *    <AwesomeContentComponent />
 *  </RkTab>
 *  <RkTab title='Pretty Cool'>
 *    <PrettyCoolComponent />
 *  </RkTab>
 * </RkTabSet>
 * ```
 *
 * @example Lazy load content example:
 *
 * Lazy load is enabled by default. But if you don't want use it, you can do it.
 * Even for specified tab.
 *
 * ```
 * <RkTabSet>
 *  <RkTab title='Awesome'>
 *    <AwesomeContentComponent />
 *  </RkTab>
 *  <RkTab
 *    title='Pretty Cool'
 *    isLazyLoad={false}>
 *    <PrettyCoolComponent />
 *  </RkTab>
 * </RkTabSet>
 * ```
 *
 * @example Handling component events:
 *
 * Tab change:
 *
 * ```
 * <RkTabSet onItemChange={this.onTabChange}>
 *  <RkTab title='Awesome'>
 *    <AwesomeContentComponent />
 *  </RkTab>
 *  <RkTab title='Pretty Cool'>
 *    <PrettyCoolComponent />
 *  </RkTab>
 * </RkTabSet>
 *
 * // @param change - object, defining tab change:
 * // {
 * //   previous: number,
 * //   current: number,
 * // }
 * onTabChange = (change) => {
 *   // whatever
 * };
 * ```
 *
 * @property {React.ReactNode} children - RkTab components with it's contents.
 * @property {function} onItemChange - Fired when visible tab is changed.
 * */
export class RkTabSet extends RkComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    onItemChange: PropTypes.func,

    // TODO: Scrollable header is temporary disabled
    // isScrollableHeader: PropTypes.bool,
  };
  static defaultProps = {
    onItemChange: (() => null),
    // isScrollableHeader: RkTabBar.defaultProps.isScrollable,
  };

  componentName = 'RkTabSet';
  typeMapping = {
    tabBar: {},
    indicator: {},
    pager: {},
  };

  state = {
    selectedIndex: 0,
    componentWidth: -1,
    estimatedTabWidth: 0,
  };

  tabViews = [];
  tabContentViews = [];

  tabBarRef = undefined;
  indicatorRef = undefined;
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
    const derivedSelectedIndex = this.tabViews.findIndex(child => child.props.isSelected);
    this.state.selectedIndex = derivedSelectedIndex < 0 ? 0 : derivedSelectedIndex;
  }

  componentDidMount() {
    this.props.onItemChange({
      previous: null,
      current: this.state.selectedIndex,
    });
  }

  /**
   * Override point.
   * Makes typeMapping keys be returned as objects instead of arrays
   */
  getElementStyle(styles, element, key, value) {
    const style = styles[element] || {};
    const styleKey = super.getElementStyleKey(element, style, key);
    style[styleKey.name] = super.getStyleValue(value);
    return style;
  }

  onTabSelect = (index) => {
    this.scrollContentToIndex({ index });
    this.indicatorRef.scrollToIndex({ index });
  };

  onTabContentSelect = (index) => {
    this.props.onItemChange({
      previous: this.state.selectedIndex,
      current: index,
    });
    // TODO: Scrollable header is temporary disabled
    // if (this.props.isScrollableHeader) {
    //   this.scrollTabBarToIndex({ index });
    // }
    this.scrollIndicatorToIndex({ index });
    this.setState({
      selectedIndex: index,
    });
  };

  onLayout = (event) => {
    this.setState({
      componentWidth: event.nativeEvent.layout.width,
    }, this.onLayoutCompleted);
  };

  onLayoutCompleted = () => {
    this.scrollIndicatorToIndex({ index: this.state.selectedIndex, animated: false });
  };

  /**
   * Scrolls tab container to passed index.
   *
   * @param params - object: { index: number, animated: boolean }
   */
  scrollTabBarToIndex(params) {
    const estimatedBarContentOffset = (this.state.estimatedTabWidth * params.index) / 3;
    if (params.index === this.props.children.length - 1) {
      this.tabBarRef.scrollToEnd(params);
    } else {
      this.tabBarRef.scrollToOffset({ offset: estimatedBarContentOffset });
    }
  }

  /**
   * Scrolls tab indicator to passed index.
   *
   * @param params - object: { index: number, animated: boolean }
   */
  scrollIndicatorToIndex(params) {
    this.indicatorRef.scrollToIndex(params);
  }

  /**
   * Scrolls content to passed index.
   *
   * @param params - object: { index: number, animated: boolean }
   */
  scrollContentToIndex(params) {
    this.tabPagerRef.scrollToIndex(params);
  }

  /**
   * Scrolls both tab container and content to passed index.
   *
   * @param params - object: { index: number, animated: boolean }
   */
  scrollToIndex(params) {
    this.scrollTabBarToIndex(params);
    this.scrollIndicatorToIndex(params);
    this.scrollContentToIndex(params);
  }

  setTabBarRef = (ref) => {
    this.tabBarRef = ref;
  };

  setIndicatorRef = (ref) => {
    this.indicatorRef = ref;
  };

  setTabPagerRef = (ref) => {
    this.tabPagerRef = ref;
  };

  shouldUseLazyLoad = (index) => {
    const tabComponent = this.tabViews[index];
    return tabComponent.props.isLazyLoad;
  };

  renderPlaceholder = () => (
    <View onLayout={this.onLayout} />
  );

  renderView = () => {
    const styles = super.defineStyles();
    return (
      <View style={{ flex: 1 }}>
        <RkTabBar
          style={styles.tabBar}
          ref={this.setTabBarRef}
          componentWidth={this.state.componentWidth}
          isScrollable={false}
          // isScrollable={this.props.isScrollableHeader}
          selectedIndex={this.state.selectedIndex}
          onSelect={this.onTabSelect}>
          {this.tabViews}
        </RkTabBar>
        <RkTabBarIndicator
          style={styles.indicator}
          ref={this.setIndicatorRef}
          itemCount={this.props.children.length}
          componentWidth={this.state.componentWidth}
        />
        <RkTabPager
          style={styles.pager}
          ref={this.setTabPagerRef}
          componentWidth={this.state.componentWidth}
          selectedIndex={this.state.selectedIndex}
          shouldUseLazyLoad={this.shouldUseLazyLoad}
          onSelect={this.onTabContentSelect}>
          {this.tabContentViews}
        </RkTabPager>
      </View>
    );
  };

  render() {
    return this.state.componentWidth < 0 ? this.renderPlaceholder() : this.renderView();
  }
}
