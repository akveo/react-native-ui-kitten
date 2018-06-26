import React from 'react';
import {
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';

export class RkGalleryImage extends RkComponent {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  onContainerClick = (source) => {
    this.props.onContainerClick(source);
  };

  render() {
    const { onClick, ...restProps } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => onClick(restProps.source)}>
        <Image {...restProps} />
      </TouchableWithoutFeedback>
    );
  }
}
