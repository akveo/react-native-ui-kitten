import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import {
  RkButton,
  RkTheme,
  RkChoice,
  RkChoiceGroup,
  RkTextInput,
  RkText,
  RkCard,
  RkModalImg,
  RkTabView
} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons';


export class TestScreen extends Component {

  _renderHeader(options) {
    return (
      <View>
        <RkButton onPress={options.closeImage}>Custom Header</RkButton>
      </View>
    );
  }

  render() {


    let images = [require('../img/animal.jpeg'),
      require('../img/bird.jpeg')];

    RkTheme.setColor('test', 'red');


    RkTheme.setType('RkButton','different',{
      backgroundColor:{
        ios: 'blue',
        android: 'green'
      }
    });


    return (
      <ScrollView style={{margin: 20}}>
        <RkButton rkType='different'>LOL</RkButton>
      </ScrollView>)
  };
}
