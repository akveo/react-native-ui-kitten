import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
} from 'react-native';
import { RkBadge } from '../badge/rkBadge.component';

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
export class RkTab extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    badgeTitle: PropTypes.string,
    badgePosition: PropTypes.string,
    badgeStatus: PropTypes.string,
    isSelected: PropTypes.bool,
    // used in RkTabView
    // eslint-disable-next-line react/no-unused-prop-types,
    isLazyLoad: PropTypes.bool,

    style: PropTypes.shape({
      container: PropTypes.shape({
        base: View.propTypes.style,
        selected: View.propTypes.style,
      }),
      title: PropTypes.shape({
        base: Text.propTypes.style,
        selected: Text.propTypes.style,
      }),
      icon: PropTypes.shape({
        base: Image.propTypes.style,
        selected: Image.propTypes.style,
      }),
    }),
  };
  static defaultProps = {
    title: '',
    icon: undefined,
    badgeTitle: '',
    badgePosition: RkBadge.defaultProps.position,
    badgeStatus: RkBadge.defaultProps.rkType,
    isSelected: false,
    isLazyLoad: true,

    style: {
      container: {
        base: {},
        selected: {},
      },
      title: {
        base: {},
        selected: {},
      },
      icon: {
        base: {},
        selected: {},
      },
    },
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

  getContentStyle = (state, style) => ({
    container: {
      base: style.container.base,
      selected: state.isSelected ? style.container.selected : null,
    },
    title: {
      base: style.title.base,
      selected: state.isSelected ? style.title.selected : null,
    },
    icon: {
      base: style.icon.base,
      selected: this.state.isSelected ? style.icon.selected : null,
    },
    badge: {
      base: { opacity: this.props.badgeTitle.length > 0 ? 1 : 0 },
      selected: {},
    },
  });

  render() {
    const styles = this.getContentStyle(this.state, this.props.style);
    return (
      <View style={[styles.container.base, styles.container.selected]}>
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
