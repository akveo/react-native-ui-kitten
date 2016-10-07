import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  ListView,
  TouchableOpacity
} from 'react-native';

import {RkConfig, RkSeparator, RkStyle, RkButton, RkChoiceGroup, RkChoice} from 'react-native-ui-kit';
import Icon from 'react-native-vector-icons/Ionicons';

import ScreenService from '../../ScreenService';

export default class SettingsScreenClassic extends Component {

  constructor(props) {
    super(props);
    this.state={
      authIndex: ScreenService.getCurrentLoginScreenIndex()
    }
  }


  render() {
    return (
      <ScrollView
        style={[RkStyle.lightGrayBg, {paddingTop: 20}]}
        automaticallyAdjustContentInsets={true}>
        <Text style={styles.settingsTitle}>LOGIN/REGISTER SCREENS</Text>
        <View style={styles.settingSection}>
          <RkChoiceGroup
            radio
            type='clear'
            selectedIndex={this.state.authIndex}
            onChange={(index)=> this._changeScreen(index, 'authIndex', 'setLoginScreen')}>
            <TouchableOpacity choiceTrigger>
              <View style={styles.screenContainer}>
                <Text>Classic</Text>
                <RkChoice innerStyle={{fontSize: 14, marginTop: 5}}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity choiceTrigger>
              <View style={styles.screenContainer}>
                <Text>Material</Text>
                <RkChoice innerStyle={{fontSize: 14, marginTop: 10}}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity choiceTrigger>
              <View style={[styles.screenContainer, {borderBottomWidth: 0}]}>
                <Text>Blur</Text>
                <RkChoice innerStyle={{fontSize: 14, marginTop: 10}}/>
              </View>
            </TouchableOpacity>
          </RkChoiceGroup>
        </View>
        <View style={styles.settingSection}>
          <RkButton type='clear small' onPress={()=>this._logOut()}>LOG OUT</RkButton>
        </View>
      </ScrollView>
    );
  }

  _changeScreen(index, stateName, screenName){
    let newState = {};
    newState[stateName] = index;
    this.setState(newState);
    ScreenService[screenName](index);
  }


  _logOut(){
    this.props.navigator.push({
      component: ScreenService.getLoginScreen(true),
    });
  }

}

let styles = StyleSheet.create({

  settingSection: {
    marginBottom: 20,
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingVertical: 5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: RkConfig.colors.gray,
    borderBottomColor: RkConfig.colors.gray,
  },

  settingsTitle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 12,
    color: RkConfig.colors.darkGray
  },

  screenContainer: {
    "flexDirection": "row",
    justifyContent: "space-between",
    "alignItems": "center",
    paddingVertical: 5,
    paddingRight: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: RkConfig.colors.gray,
  }

});
