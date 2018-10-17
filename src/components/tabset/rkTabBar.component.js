import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import { RkTab } from './rkTab.component';

export class RkTabBar extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(RkTab)).isRequired,
    selectedIndex: PropTypes.number,
    onSelect: PropTypes.func,
    ...ViewPropTypes,
  };
  static defaultProps = {
    selectedIndex: 0,
    onSelect: (() => null),
  };

  shouldComponentUpdate(nextProps) {
    return this.props.selectedIndex !== nextProps.selectedIndex;
  }

  onChildPress = (index) => {
    this.props.onSelect(index);
  };

  renderChild = (item, index) => (
    <TouchableOpacity
      key={index.toString()}
      activeOpacity={0.5}
      onPress={() => this.onChildPress(index)}>
      { React.cloneElement(item, { isSelected: this.props.selectedIndex === index }) }
    </TouchableOpacity>
  );

  renderChildComponents = () => this.props.children.map(this.renderChild);

  render = () => (
    <View style={[this.props.style, styles.container]}>{this.renderChildComponents()}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
