import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import { RkComponent } from '../rkComponent';

/**
 * @extends React.Component
 */
export class RkTabBar extends RkComponent {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    selectedIndex: PropTypes.number,
    isScrollable: PropTypes.bool,
    onSelect: PropTypes.func,

    componentWidth: PropTypes.number.isRequired,

    ...ViewPropTypes,
  };
  static defaultProps = {
    selectedIndex: 0,
    isScrollable: false,
    onSelect: (() => null),
  };
  componentName = 'RkTabBar';
  typeMapping = {
    container: {},
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
   * @param params - object: { offset: number, animated: boolean }
   */
  scrollToIndex = (params) => {
    const offset = (this.props.componentWidth / this.props.children.length) * params.index;
    this.scrollToOffset({ offset });
  };

  /**
   * @param params - object: { offset: number, animated: boolean }
   */
  scrollToOffset = (params) => {
    this.containerRef.scrollTo({ x: params.offset, ...params });
  };

  /**
   * @param params - object: { animated: boolean }
   */
  scrollToEnd = (params) => {
    this.containerRef.scrollToEnd(params);
  };

  setContainerRef = (ref) => {
    this.containerRef = ref;
  };

  defineStyles(additionalTypes) {
    const derivedStyles = super.defineStyles(additionalTypes);
    const containerStyleKey = this.props.isScrollable ? 'scrollable' : 'base';
    return {
      container: this.extractNonStyleValue(derivedStyles.container, containerStyleKey),
    };
  }

  renderItem = (item, index) => (
    <TouchableOpacity
      key={index.toString()}
      activeOpacity={0.5}
      onPress={() => this.onItemPress(index)}>
      {React.cloneElement(item, {
        style: {
          width: this.props.componentWidth / this.props.children.length,
        },
        isSelected: this.props.selectedIndex === index,
      })}
    </TouchableOpacity>
  );

  renderChildComponents = () => this.props.children.map(this.renderItem);

  render() {
    const styles = this.defineStyles(this.props.rkType);
    return (
      <View>
        <ScrollView
          contentContainerStyle={styles.container}
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
