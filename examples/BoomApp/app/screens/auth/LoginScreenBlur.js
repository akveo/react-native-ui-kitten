import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Image,
  Text
} from 'react-native';

import LoginScreenClassic from './LoginScreenClassic';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import {RkButton, RkStyle, RkTextInput, RkSeparator, RkConfig} from 'react-native-ui-kit';
import ScreenService from '../../util/ScreenService';


export default class LoginScreenBlur extends LoginScreenClassic {

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
        />
        <Image blurRadius={30} source={require('../../../img/bg/lamp.jpg')} style={styles.backgroundImage}>
          <View style={styles.container}>
            <View><Text
              style={styles.title}>BOOM</Text></View>
            <View>
              <RkTextInput
                type='underlay'
                containerStyle={styles.inputContainer}
                iconStyle={styles.inputIcon}
                style={styles.input}
                icon={'ios-person-outline'}
                placeholder={'Login'}
                placeholderTextColor={RkConfig.colors.lightGray}/>
              <RkTextInput type='underlay'
                           containerStyle={styles.inputContainer}
                           iconStyle={styles.inputIcon}
                           style={styles.input}
                           secureTextEntry={true}
                           icon={'ios-key-outline'}
                           placeholder={'Password'}
                           placeholderTextColor={RkConfig.colors.lightGray}/>
              <RkButton innerStyle={styles.buttonInner}
                        style={styles.buttonContainer}
                        type='basic'
                        onPress={()=>super._renderMainScreen()}>
                Sing in
              </RkButton>
            </View>
            <Text style={styles.footText}>
              Don't have account? Sign up here.
            </Text>
          </View>
        </Image>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    justifyContent: 'space-between',
    flex: 1
  },
  title: {
    marginTop: 150,
    fontSize: 42,
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontWeight: '100'
  },
  inputContainer: {
    borderBottomColor: RkConfig.colors.blurTextStrong,
    marginTop: 30
  },
  inputIcon: {
    color: 'white',
    fontSize: 32,
    fontWeight: '300'
  },
  input: {
    color: RkConfig.colors.blurTextStrong,
    fontWeight: '300',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 35
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  footText: {
    marginBottom: 30,
    alignSelf: 'center',
    fontWeight: '300',
    color: RkConfig.colors.blurTextStrong,
    backgroundColor: 'transparent'
  },
  buttonContainer: {
    backgroundColor: RkConfig.colors.blurBg,
    marginTop: 40,
    borderRadius: 0
  },
  buttonInner: {
    fontSize: 22,
    fontWeight: '300',
    color: RkConfig.colors.blurTextStrong
  }
});
