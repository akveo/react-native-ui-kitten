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
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent'
  },
  statContainerSelected: {
    borderBottomColor: RkConfig.colors.primary
  },
  titleStatText: {
    fontSize: 20
  },
  statText: {
    textAlign: 'center',
    fontSize: 14,
    color: RkConfig.colors.primary
  },
  tabView: {
    backgroundColor: RkConfig.colors.white,
  },
  tabContent: {
    paddingVertical: 15,
    backgroundColor: RkConfig.colors.lightGray
  },
  imageTab: {
    backgroundColor: RkConfig.colors.white,
    marginTop: 15,
    paddingVertical: 0,
  },
});