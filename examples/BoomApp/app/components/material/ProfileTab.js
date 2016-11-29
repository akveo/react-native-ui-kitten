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

}

const styles = StyleSheet.create({
  statContainer: {
    alignItems: 'center',
    backgroundColor: RkConfig.colors.cyan,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: RkConfig.colors.cyan
  },
  statContainerSelected: {
    borderBottomColor: RkConfig.colors.warning
  },
  titleStatText: {
    fontSize: 20
  },
  statText: {
    textAlign: 'center',
    fontSize: 16,
    color: RkConfig.colors.warning
  },
});