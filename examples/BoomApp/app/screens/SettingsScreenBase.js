import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import {RkConfig, RkCard, RkButton, RkChoiceGroup, RkChoice, RkText} from 'react-native-ui-kit';

import ThemeService from '../util/ThemeService';

export default class SettingsScreenBase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      themeIndex: ThemeService.getCurrentThemeIndex()
    }
  }


  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}>
        <RkText style={styles.settingsTitle}>THEMES</RkText>
        <RkCard style={styles.settingsSection}>
          <RkChoiceGroup
            radio
            rkType='clear'
            selectedIndex={this.state.themeIndex}
            onChange={(index)=> this._changeTheme(index)}>
            <TouchableOpacity choiceTrigger>
              <View style={styles.setting}>
                <RkText style={styles.settingLabel}>Classic</RkText>
                <RkChoice/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity choiceTrigger>
              <View style={styles.setting}>
                <RkText style={styles.settingLabel}>Material</RkText>
                <RkChoice/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity choiceTrigger>
              <View style={[styles.setting, styles.noBottomBorder]}>
                <RkText style={styles.settingLabel}>Blur</RkText>
                <RkChoice/>
              </View>
            </TouchableOpacity>
          </RkChoiceGroup>
        </RkCard>
        <RkCard style={[styles.settingsSection, styles.settingsSectionSymmetric]}>
            <RkButton onPress={()=>this._logOut()}>CHANGE THEME</RkButton>
        </RkCard>
      </ScrollView>
    );
  }

  _changeTheme(index) {
    this.setState({
      themeIndex: index
    });
  }


  _logOut() {
    ThemeService.setCurrentThemeIndex(this.state.themeIndex);
    this.props.navigator.replace({
      screen: ThemeService.getLoginScreen(),
    });
  }

}

let styles = StyleSheet.create({

  settingsSection: {
    marginBottom: 30,
    paddingLeft: 15,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: RkConfig.colors.blurBg,
  },
  settingsSectionSymmetric: {
    paddingLeft: 0
  },
  settingsTitle: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 13,
    color: RkConfig.colors.blurBgStrong
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: RkConfig.colors.blurBg,
  },
  settingLabel: {
    fontSize: 18,
  },
  noBottomBorder: {
    borderBottomWidth: 0
  }
});
