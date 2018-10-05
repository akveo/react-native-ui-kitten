import React from 'react';
import { View } from 'react-native';
import {
  RkTabSet,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export class TabSetScreen extends React.Component {
  static navigationOptions = {
    title: 'Tab Set',
  };
  static propTypes = {};

  render() {
    return (
      <View style={styles.container}>
        <RkTabSet />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));
