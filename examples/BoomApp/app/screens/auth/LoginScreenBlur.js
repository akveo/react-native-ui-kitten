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


export default class LoginScreenBlur extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
          />
        <Image blurRadius={30}  source={require('../../../img/bg/lamp.jpg')} style={styles.backgroundImage}>
          <View style={{paddingHorizontal: 50, justifyContent: 'space-between', flex: 1}}>
            <View><Text
              style={{marginTop: 150, fontSize: 42, color: 'white', backgroundColor: 'transparent', textAlign: 'center', fontWeight: '100'}}>BOOM</Text></View>
            <View>
              <RkTextInput
                type='underlay'
                containerStyle={{borderBottomColor: 'rgba(255,255,255,0.5)', marginTop: 30}}
                iconStyle={[{color: 'white', fontSize: 32, fontWeight: '300'}]}
                style={[{color: 'rgba(255,255,255,0.7)', fontWeight: '300', fontSize: 20, textAlign: 'center', marginRight: 35}]}
                icon={'ios-person-outline'}
                placeholder={'Login'}
                placeholderTextColor={RkConfig.colors.lightGray}/>
              <RkTextInput type='underlay'
                           containerStyle={{borderBottomColor: 'rgba(255,255,255,0.5)', marginTop: 30}}
                           iconStyle={[{color: 'white', fontSize: 32, fontWeight: '300'}]}
                           style={[{color: 'rgba(255,255,255,0.7)', fontWeight: '300', fontSize: 20, textAlign: 'center', marginRight: 35}]}
                           secureTextEntry={true}
                           icon={'ios-key-outline'}
                           placeholder={'Password'}
                           placeholderTextColor={RkConfig.colors.lightGray}/>
              <RkButton innerStyle={{fontSize: 22, fontWeight: '300', color: 'rgba(255,255,255,0.7)'}}
                        style={{backgroundColor: 'rgba(0,0,0,0.1)', marginTop: 40, borderRadius: 0}}
                        type='basic'
                        onPress={()=>this.props.navigator.push(
                      {
                        title: '',
                        component: ScreenService.getMainScreen(true),
                      })}>
                Sing in
              </RkButton>
            </View>
            <Text style={{marginBottom: 30, alignSelf: 'center', fontWeight: '300', color: 'rgba(255,255,255,0.7)', backgroundColor: 'transparent'}}>
              Don't have account? Sign up here.
            </Text>
          </View>
        </Image>
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
