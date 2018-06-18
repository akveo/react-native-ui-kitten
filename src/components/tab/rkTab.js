import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

export class RkTab extends React.Component {
  static propTypes = {
    children: PropTypes.element,
  };
  static defaultProps = {
    children: undefined,
  };

  render() {
    return (
      <View style={{ flex: 1 }}>{this.props.children}</View>
    );
  }
}
