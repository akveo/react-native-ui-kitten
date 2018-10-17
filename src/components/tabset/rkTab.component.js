import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { RkBadge } from '../badge/rkBadge.component';
import { RkComponent } from '../rkComponent';

export class RkTab extends RkComponent {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    badgeTitle: PropTypes.string,
    badgePosition: PropTypes.string,
    badgeStatus: PropTypes.string,
    isSelected: PropTypes.bool,
    isLazyLoad: PropTypes.bool,
  };
  static defaultProps = {
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
      <View style={[styles.container.base, styles.container.selected]}>
        <RkBadge
          style={[styles.badge.base, styles.badge.selected]}
          title={this.props.badgeTitle}
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
