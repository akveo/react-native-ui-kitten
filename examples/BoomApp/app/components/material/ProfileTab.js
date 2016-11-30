import React, {Component} from 'react';
import {
  StyleSheet,
} from 'react-native';

import {RkConfig} from 'react-native-ui-kit';
import ProfileTabBase from "../common/ProfileTab";

export default class ProfileTab extends ProfileTabBase {

  getStyles(){
    return styles;
  }

  static getStyles = () => styles;

}

const styles = StyleSheet.create({
  statContainer: {
    alignItems: 'center',
    backgroundColor: RkConfig.colors.materialBg,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: RkConfig.colors.materialBg
  },
  statContainerSelected: {
    borderBottomColor: RkConfig.colors.materialWarning
  },
  titleStatText: {
    fontSize: 20
  },
  statTextSelected:{
    color: RkConfig.colors.materialWarning
  },
  statText: {
    textAlign: 'center',
    fontSize: 16,
    color: RkConfig.colors.white
  },
  tabView: {
    backgroundColor: RkConfig.colors.white,
  },
  tabContent: {
    paddingVertical: 15,
    backgroundColor: RkConfig.colors.materialGray
  },
  imageTab: {
    backgroundColor: RkConfig.colors.white,
  },
});