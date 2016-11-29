import React, { Component } from 'react';
import {
  StyleSheet,
} from 'react-native';

import {RkConfig, RkButton} from 'react-native-ui-kit';
import Toolbar from '../common/Toolbar';

export default class ToolbarMaterial extends Component {

  static height = 64;

  render(){
    return (
      <Toolbar
        style={styles.bar}
        leftIcon={this.props.leftIcon}
        title={this.props.title}
        onLeftClick={this.props.onLeftClick}
      />
    )
  }


}

var styles = StyleSheet.create({
  bar: {
    backgroundColor: RkConfig.colors.materialBg,
  },

});