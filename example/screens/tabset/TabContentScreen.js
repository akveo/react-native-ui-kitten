import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ViewPropTypes,
} from 'react-native';
import { RkStyleSheet } from 'react-native-ui-kitten';

export class TabContentScreen extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    ...ViewPropTypes,
  };
  static defaultProps = {
    message: 'I <3 React Native UI Kitten',
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.text}>{this.props.message}</Text>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.colors.text.inverse,
    fontSize: 18,
    fontWeight: '700',
  },
}));
