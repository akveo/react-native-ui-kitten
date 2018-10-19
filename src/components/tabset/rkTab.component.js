import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  ViewPropTypes,
} from 'react-native';
import { RkBadge } from '../badge/rkBadge.component';
import { RkComponent } from '../rkComponent';

/**
 * @extends React.Component
 *
 * @property {string} title - Tab title.
 * @property {React.ReactNode} icon - Tab icon.
 * @property {string} badgeTitle - Tab badge title.
 * @property {string} badgePosition - Tab badge position. Should be one of:
 * `top left`, `top right`, `bottom left`, `bottom right`.
 * Default is `top right`.
 * @property {boolean} isSelected - Defines if tab is selected.
 * @property {boolean} isLazyLoad - Defines if tab should use content lazy loading.
 * Default is `true`.
 */
export class RkTab extends RkComponent {
  static propTypes = {
    rkType: RkComponent.propTypes.rkType,
    title: PropTypes.string,
    icon: PropTypes.node,
    badgeTitle: PropTypes.string,
    badgePosition: PropTypes.string,
    badgeStatus: PropTypes.string,
    isSelected: PropTypes.bool,
    // used in RkTabView
    // eslint-disable-next-line react/no-unused-prop-types,
    isLazyLoad: PropTypes.bool,
    ...ViewPropTypes,
  };
  static defaultProps = {
    rkType: RkComponent.defaultProps.rkType,
    title: '',
    icon: undefined,
    badgeTitle: '',
    badgePosition: RkBadge.defaultProps.position,
    badgeStatus: RkBadge.defaultProps.rkType,
    isSelected: false,
    isLazyLoad: true,
  };
  componentName = 'RkTab';
  typeMapping = {
    container: {},
    title: {},
    icon: {},
  };

  state = {
    isSelected: RkTab.defaultProps.isSelected,
  };

  static getDerivedStateFromProps(props) {
    return {
      isSelected: props.isSelected,
    };
  }

  shouldComponentUpdate(nextProps) {
    return this.props.isSelected !== nextProps.isSelected;
  }

  defineStyles(additionalTypes) {
    const { container, title, icon } = super.defineStyles(additionalTypes);
    return {
      container: {
        base: this.extractNonStyleValue(container, 'base'),
        selected: this.state.isSelected ? this.extractNonStyleValue(container, 'selected') : null,
      },
      title: {
        base: this.extractNonStyleValue(title, 'base'),
        selected: this.state.isSelected ? this.extractNonStyleValue(title, 'selected') : null,
      },
      icon: {
        base: this.extractNonStyleValue(icon, 'base'),
        selected: this.state.isSelected ? this.extractNonStyleValue(icon, 'selected') : null,
      },
      badge: {
        base: { opacity: this.props.badgeTitle.length > 0 ? 1 : 0 },
        selected: {},
      },
    };
  }

  render() {
    const styles = this.defineStyles(this.props.rkType);
    return (
      <View style={[styles.container.base, styles.container.selected, this.props.style]}>
        <RkBadge
          rkType={this.props.badgeStatus}
          style={[styles.badge.base, styles.badge.selected]}
          title={this.props.badgeTitle}
          position={this.props.badgePosition}
        />
        <Image
          style={[styles.icon.base, styles.icon.selected]}
          source={this.props.icon}
        />
        <Text
          style={[styles.title.base, styles.title.selected]}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}
