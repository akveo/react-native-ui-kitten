import React, {Component}from 'react';
import {StyleSheet, ScrollView, TextInput, TouchableOpacity, View, Image} from 'react-native'

import {Avatar} from '../components/avatar'

import{RkButton} from 'react-native-ui-kitten'

export class AvatarScreen extends Component {
  render() {
    return (
      <ScrollView style={[styles.container]}>
        {/*<Avatar rkType="round" name="John Doe"/>*/}
        {/*<View style={{height:100, width:100, backgroundColor:'lime', alignItems:'center', justifyContent:'center'}}>*/}
          {/*<Image source={require('../img/icons/heart.png')}/>*/}
        {/*</View>*/}
        <View style={{flexDirection:'row', backgroundColor:'lime'}}>
          <View style={{height:50, width:50,flex:1, backgroundColor:'red'}}></View>
          <View style={{height:50, width:50,flex:1, backgroundColor:'blue'}}></View>
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