import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';

export class RkGalleryHeaderFooter extends React.Component {
  static propTypes = {
    onRenderComponent: PropTypes.func,
  };
  static defaultProps = {
    onRenderComponent: (() => null),
  };

  render() {
    const { onRenderComponent, ...restProps } = this.props;
    return (
      <Animated.View {...restProps}>
        {onRenderComponent()}
      </Animated.View>
    );
  }
}
