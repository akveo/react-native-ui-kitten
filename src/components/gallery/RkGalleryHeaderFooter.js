import React from 'react';
import PropTypes from 'prop-types';

export class RkGalleryHeaderFooter extends React.Component {
  static propTypes = {
    onRenderComponent: PropTypes.func,
  };
  static defaultProps = {
    onRenderComponent: (() => null),
  };

  render() {
    return this.props.onRenderComponent();
  }
}
