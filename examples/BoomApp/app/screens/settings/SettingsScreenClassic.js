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
    this.state = {
      authIndex: ScreenService.getCurrentLoginScreenIndex()
    }
  }


  render() {
    return (
      <ScrollView
        style={[RkStyle.lightGrayBg, {paddingTop: 20}]}
        automaticallyAdjustContentInsets={true}>
        <Text style={styles.settingsTitle}>LOGIN/REGISTER SCREENS</Text>
        <View style={styles.settingsSection}>
          <RkChoiceGroup
            radio
            type='clear'
            selectedIndex={this.state.authIndex}
            onChange={(index)=> this._changeScreen(index, 'authIndex', 'setLoginScreen')}>
            <TouchableOpacity choiceTrigger>
              <View style={styles.setting}>
                <Text style={styles.settingLabel}>Classic</Text>
                <RkChoice/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity choiceTrigger>
              <View style={styles.setting}>
                <Text style={styles.settingLabel}>Material</Text>
                <RkChoice/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity choiceTrigger>
              <View style={[styles.setting, styles.noBottomBorder]}>
                <Text style={styles.settingLabel}>Blur</Text>
                <RkChoice/>
              </View>
            </TouchableOpacity>
          </RkChoiceGroup>
        </View>
        <View style={[styles.settingsSection, styles.settingsSectionSymmetric]}>
            <RkButton type='clear' onPress={()=>this._logOut()}>LOG OUT</RkButton>
        </View>
      </ScrollView>
    );
  }

  _changeScreen(index, stateName, screenName) {
    let newState = {};
    newState[stateName] = index;
    this.setState(newState);
    ScreenService[screenName](index);
  }


  _logOut() {
    this.props.navigator.push({
      component: ScreenService.getLoginScreen(true),
    });
  }

}

let styles = StyleSheet.create({

  settingsSection: {
    marginBottom: 30,
    backgroundColor: 'white',
    paddingLeft: 15,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: RkConfig.colors.gray,
    borderBottomColor: RkConfig.colors.gray,
  },

  settingsSectionSymmetric: {
    paddingLeft: 0
  },

  settingsTitle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 13,
    color: RkConfig.colors.darkGray
  },

  setting: {
    "flexDirection": "row",
    justifyContent: "space-between",
    "alignItems": "center",
    paddingVertical: 10,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: RkConfig.colors.gray,
  },

  settingLabel: {
    fontSize: 18
  },

  noBottomBorder: {
    borderBottomWidth: 0
  }


});
