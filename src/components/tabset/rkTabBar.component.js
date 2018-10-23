import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { RkTab } from './rkTab.component';

/**
 * `RkTabBar` is a component that manages `RkTab`s.
 *
 * @extends React.Component
 *
 * @property {React.ReactNode} children - `RkTab` components with it's contents.
 * @property {number} selectedIndex - Selected RkTab index.
 * @property {bool} isScrollable - Defines if container should be scrollable.
 * For cases with lots of tabs.
 * @property {function} onSelect - Fires when `RkTab` is selected.
 * @property {number} componentWidth - width of `RkTabBar`.
 * Needed for `RkTab` equal distribution.
 */
export class RkTabBar extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    selectedIndex: PropTypes.number,
    isScrollable: PropTypes.bool,
    onSelect: PropTypes.func,
    componentWidth: PropTypes.number.isRequired,

    style: PropTypes.shape({
      container: PropTypes.shape({
        base: ScrollView.propTypes.contentContainerStyle,
        scrollable: ScrollView.propTypes.contentContainerStyle,
      }),
      tab: RkTab.propTypes.style,
    }),
  };
  static defaultProps = {
    selectedIndex: 0,
    isScrollable: false,
    onSelect: (() => null),

    style: {
      container: {
        base: {},
        scrollable: {},
      },
      tab: RkTab.defaultProps.style,
    },
  };

  containerRef = undefined;

  shouldComponentUpdate(nextProps) {
    const isWidthChanged = this.props.componentWidth !== nextProps.componentWidth;
    const isSelectionChanged = this.props.selectedIndex !== nextProps.selectedIndex;
    return isWidthChanged || isSelectionChanged;
  }

  onItemPress = (index) => {
    this.props.onSelect(index);
  };

  /**
   * scrolls container to passed index
   *
   * @param params - object: { index: number, animated: boolean }
   */
  scrollToIndex(params) {
    const offset = (this.props.componentWidth / this.props.children.length) * params.index;
    this.scrollToOffset({ offset });
  }

  /**
   * scrolls container to passed offset
   *
   * @param params - object: { offset: number, animated: boolean }
   */
  scrollToOffset(params) {
    this.containerRef.scrollTo({ x: params.offset, ...params });
  }

  /**
   * scrolls container to end
   *
   * @param params - object: { animated: boolean }
   */
  scrollToEnd(params) {
    this.containerRef.scrollToEnd(params);
  }

  setContainerRef = (ref) => {
    this.containerRef = ref;
  };

  renderItem = (item, index) => (
    <TouchableOpacity
      style={{ width: this.props.componentWidth / this.props.children.length }}
      key={index.toString()}
      activeOpacity={0.5}
      onPress={() => this.onItemPress(index)}>
      {React.cloneElement(item, {
        isSelected: this.props.selectedIndex === index,
        style: this.props.style.tab,
      })}
    </TouchableOpacity>
  );

  renderChildComponents = () => this.props.children.map(this.renderItem);

  render() {
    const { container } = this.props.style;
    return (
      <View>
        <ScrollView
          contentContainerStyle={this.props.isScrollable ? container.base : container.scrollable}
          ref={this.setContainerRef}
          horizontal={true}
          bounces={false}
          scrollEnabled={this.props.isScrollable}
          showsHorizontalScrollIndicator={false}>
          {this.renderChildComponents()}
        </ScrollView>
      </View>
    );
  }
}
