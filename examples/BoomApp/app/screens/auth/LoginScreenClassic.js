import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Image,
  Text
} from 'react-native';

import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import {RkButton, RkStyle, RkTextInput, RkSeparator, RkConfig} from 'react-native-ui-kit';
import ScreenService from '../../ScreenService';


export default class LoginScreenClassic extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{paddingHorizontal: 50, justifyContent: 'space-around', flex: 1}}>
          <View>
            <Text style={{fontSize: 42, color: RkConfig.colors.primary, textAlign: 'center'}}>
              SIGN IN
            </Text>
          </View>
          <View>
            <RkTextInput
              type='underlay topLabel'
              label='EMAIL ADDRESS'
              labelStyle={{paddingBottom: 25}}
              containerStyle={{borderBottomColor: RkConfig.colors.darkGray, }}
              style={[{fontSize: 20}]}
              placeholderTextColor={RkConfig.colors.lightGray}/>
            <RkTextInput
              type='underlay topLabel'
              label='PASSWORD'
              labelStyle={{paddingBottom: 25}}
              containerStyle={{borderBottomColor: RkConfig.colors.darkGray, marginTop: 40}}
              style={[{fontSize: 20}]}
              secureTextEntry={true}
              placeholderTextColor={RkConfig.colors.lightGray}/>
          </View>
          <View>
            <RkButton innerStyle={[{fontSize: 20}]} type='circle outline medium'
                      onPress={()=>this.props.navigator.push(
                      {
                        title: '',
                        component: ScreenService.getMainScreen(true),
                      })}>
              SIGN IN
            </RkButton>
          </View>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'stretch',
  }
});
