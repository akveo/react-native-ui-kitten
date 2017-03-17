import React, {Component} from 'react';
import {ScrollView, Button, StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import {RkButton, RkTheme, RkChoice} from 'react-native-ui-kitten'
import {BlueTheme} from "../style/my-theme"
import {RedTheme} from "../style/my-theme"


export class ThemeScreen extends Component {

  render() {
    return (
      <ScrollView style={[styles.container]}>
        <RkButton style={styles.button}
        onPress={() => {
        RkTheme.setTheme(RedTheme);
        }} rkType=" circle medium danger">Red theme</RkButton>

        <RkButton style={styles.button}z
        onPress={() => {
        RkTheme.setTheme(BlueTheme);
        }} rkType=" circle medium info">Blue theme</RkButton>

        <RkButton style={styles.button}
        onPress={() => {
        RkTheme.setTheme();
        }} rkType=" circle medium success">Default theme</RkButton>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 45,
    paddingVertical: 10
  },
  button: {
    marginVertical: 5
  }
});