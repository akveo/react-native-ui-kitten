import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ViewPropTypes,
} from 'react-native';
import { RkComponent } from '../rkComponent';


/**
 * `RkBadge` is a component which you to keep user notified on content updates.
 *
 * @extends React.Component
 *
 * @example Simple usage example:
 *
 * ```
 * <RkBadge title='new' />
 * ```
 *
 * @example Badge position example:
 *
 * ```
 * <RkBadge
 *  title='new'
 *  position='top left'
 * />
 * ```
 *
 * @property {string} rkType - Type of badge.
 * Should be one of `primary`, `info`, `success`, `warning`, `danger`.
 * Default is `danger`.
 * @property {string} title - Badge title. Required.
 * @property {string} position - Badge position.
 * Should be one of `top left`, `top right`, `bottom left`, `bottom right`.
 * Default is `top right`.
 * */
export class RkBadge extends RkComponent {
  static propTypes = {
    rkType: PropTypes.oneOf(['', 'primary', 'info', 'success', 'warning', 'danger']),
    title: PropTypes.string.isRequired,
    position: PropTypes.string,
    ...ViewPropTypes,
  };
  static defaultProps = {
    rkType: 'danger',
    position: 'top right',
  };
  componentName = 'RkBadge';
  typeMapping = {
    container: {},
    title: {},
  };

  defineStyles(additionalTypes) {
    const derivedStyles = super.defineStyles(additionalTypes);
    const positionStyles = this.getLayoutPosition(this.props.position);
    return {
      layout: { position: 'absolute', ...positionStyles },
      ...derivedStyles,
    };
  }

  getLayoutPosition(rawPosition) {
    const result = {};
    const split = rawPosition.split(' ');
    result[split[0]] = 0;
    result[split[1]] = 0;
    return result;
  }

  render() {
    const styles = this.defineStyles(this.props.rkType);

    return (
      <View style={[styles.container, styles.layout, this.props.style]}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}
