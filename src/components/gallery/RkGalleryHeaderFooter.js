import React from 'react';
import { View, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

export class RkGalleryHeaderFooter extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    onRenderComponent: PropTypes.func,
  };
  static defaultProps = {
    style: {},
    onRenderComponent: (() => null),
  };

  render() {
    return (
      <View style={this.props.style}>
        {this.props.onRenderComponent()}
      </View>
    );
  }
}
