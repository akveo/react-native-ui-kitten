import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { RkTab } from './rkTab.component';

export class RkTabBar extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.instanceOf(RkTab)).isRequired,
    selectedIndex: PropTypes.number,
    onSelect: PropTypes.func,
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
    <TouchableOpacity key={index.toString()} onPress={() => this.onChildPress(index)}>
      { React.cloneElement(item, { isSelected: this.props.selectedIndex === index }) }
    </TouchableOpacity>
  );

  renderChildComponents = () => this.props.children.map(this.renderChild);

  render = () => (
    <View style={styles.container}>{this.renderChildComponents()}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
