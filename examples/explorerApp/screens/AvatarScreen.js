import React, {Component}from 'react';
import {StyleSheet, ScrollView, TextInput, TouchableOpacity, View} from 'react-native'

import {Avatar} from '../components/avatar'

import{RkButton} from 'react-native-ui-kitten'

export class AvatarScreen extends Component {
  render() {
    return (
      <ScrollView style={[styles.container]}>
        {/*<Avatar rkType="round" name="John Doe"/>*/}
        <View>
          <View style={{backgroundColor: 'red', flex: 1, height: 200}}></View>
          <View style={{
            backgroundColor: '#00000055', flex: 1, height: 100,
            position: 'absolute',
            zIndex:9999,
            top:100,
            left: 0,
            right: 0,
          }}></View>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 45,
    paddingVertical: 10
  },

});