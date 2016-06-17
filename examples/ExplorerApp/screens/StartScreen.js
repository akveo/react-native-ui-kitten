import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    Text,
    TouchableOpacity,
    View,
    DrawerLayoutAndroid,
    Dimensions
} from 'react-native';


export class StartScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.phrases}>
          Hi! You ran example app of react-native-ui-kit
        </Text>
        <Text style={styles.phrases}>
          Use drawer in the left to see all components
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  phrases: {
      fontFamily: 'System',
      fontSize: 26
  }
});