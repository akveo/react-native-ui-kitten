import React from 'react';
import {
  Animated,
  ViewPropTypes,
} from 'react-native';
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
      <Animated.View style={this.props.style}>
        {this.props.onRenderComponent()}
      </Animated.View>
    );
  }
}
