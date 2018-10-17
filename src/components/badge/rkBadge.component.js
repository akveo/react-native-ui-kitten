import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ViewPropTypes,
} from 'react-native';
import { RkComponent } from '../rkComponent';


/**
 * @extends React.Component
 */
export class RkBadge extends RkComponent {
  static propTypes = {
    rkType: RkComponent.propTypes.rkType,
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
