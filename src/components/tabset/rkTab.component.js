import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
} from 'react-native';
import { RkText } from '../text/rkText';
import { RkStyleSheet } from '../../styles/styleSheet';

export class RkTab extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    icon: PropTypes.node,
    isSelected: PropTypes.bool,
    isLazyLoad: PropTypes.bool,
  };
  static defaultProps = {
    title: '',
    icon: undefined,
    isSelected: false,
    isLazyLoad: true,
  };

  state = {
    isSelected: RkTab.defaultProps.isSelected,
  };

  static getDerivedStateFromProps(props) {
    return {
      isSelected: props.isSelected,
    };
  }

  getContentStyle = (state) => ({
    title: {
      base: styles.title,
      selected: state.isSelected ? styles.titleSelected : null,
    },
    icon: {
      base: styles.icon,
      selected: state.isSelected ? styles.iconSelected : null,
    },
  });

  render() {
    const { title, icon } = this.getContentStyle(this.state);
    return (
      <View style={styles.container}>
        <Image style={[icon.base, icon.selected]} source={this.props.icon} />
        <RkText rkType='large' style={[title.base, title.selected]}>{this.props.title}</RkText>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: theme.colors.overlay,
  },
  titleSelected: {
    color: theme.colors.foreground,
  },
  icon: {
    marginHorizontal: 8,
    tintColor: theme.colors.overlay,
  },
  iconSelected: {
    tintColor: theme.colors.foreground,
  },
}));
