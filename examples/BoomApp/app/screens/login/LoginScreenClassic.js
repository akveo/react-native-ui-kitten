import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Image,
  Text
} from 'react-native';

import {RkButton, RkTextInput, RkConfig, RkText} from 'react-native-ui-kit';
import LoginScreenBase from "../LoginScreenBase";


export default class LoginScreenClassic extends LoginScreenBase {

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <View>
            <RkText style={styles.title}>
              SIGN IN
            </RkText>
          </View>
          <View style={{minHeight: 185}}>
            <RkTextInput
             rkType='underline topLabel'
              label='EMAIL ADDRESS'
              labelStyle={styles.inputLabel}
              containerStyle={styles.inputContainer}
              style={styles.input}/>
            <RkTextInput
             rkType='underline topLabel'
              label='PASSWORD'
              labelStyle={styles.inputLabel}
              containerStyle={styles.inputContainer}
              style={styles.input}
              secureTextEntry={true}/>
          </View>
          <View>
            <RkButton innerStyle={[{fontSize: 20}]}
                     rkType='circle outline medium'
                      onPress={() => this._renderMainScreen()}>
              SIGN IN
            </RkButton>
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container:{
    paddingHorizontal: 50,
    justifyContent: 'space-around',
    flex: 1
  },
  title:{
    fontSize: 42,
    textAlign: 'center'
  },
  inputLabel:{
    paddingBottom: 15
  },
  inputContainer:{
    borderBottomColor: RkConfig.colors.darkGray,
    marginTop: 40
  },
  input:{
    fontSize: 20,
    color: RkConfig.colors.primary
  }
});
