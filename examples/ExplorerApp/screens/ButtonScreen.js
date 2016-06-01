import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {Button} from 'react-native-ui-kit';

export class ButtonScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Button>Default</Button>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    flex: 1,
    alignItems: 'center'
  }
});
