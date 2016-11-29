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
    backgroundColor: 'transparent',
    borderRadius: 35,
    padding: 10,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  statContainerSelected: {
    borderColor: RkConfig.colors.blurPrimary,
    backgroundColor: RkConfig.colors.blurBg,
  },
  titleStatText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  statText: {
    textAlign: 'center',
    fontSize: 14,
    color: RkConfig.colors.white
  },
  tabView: {
    backgroundColor: RkConfig.colors.blurBg,
    margin: 10,
    borderRadius: 35,
  },
  tabContent: {
    marginTop: 10,
    backgroundColor: RkConfig.colors.blurBg
  },
});