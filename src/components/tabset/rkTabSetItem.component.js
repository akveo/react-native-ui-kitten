import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
} from 'react-native';
import { RkStyleSheet } from '../../styles/styleSheet';

export class RkTabSetItem extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string,
    isSelected: PropTypes.bool,
  };
  static defaultProps = {
    title: '',
    isSelected: false,
  };

  state = {
    isSelected: RkTabSetItem.defaultProps.isSelected,
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
  });

  render() {
    const { title } = this.getContentStyle(this.state);
    return (
      <View style={styles.container}>
        <Text style={[title.base, title.selected]}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    padding: 16,
  },
  title: {
    fontWeight: '500',
  },
  titleSelected: {
    fontWeight: '700',
  },
}));
