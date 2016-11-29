import React, {Component} from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import { RkConfig} from '../../util/config';

export class RkSeparator extends Component {

  static name = 'separator';

  constructor(props) {
    super(props);
  }

  render() {
    let styles = this._defineStyles();
    return (
      <View style={[defaultStyles.view, styles, this.props.style]}/>
    );
  }

  _defineStyles() {
    let types = this.props.rkType || (RkConfig.theme.separator ? RkConfig.theme.separator.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let styles = [];
    for (let type of types) {
      styles.push(RkConfig.themes.styles.separator[type]);
    }
    return styles;
  }

}

const defaultStyles = StyleSheet.create({
  view:{
    backgroundColor: RkConfig.colors.lightGray,
    height:1
  }
});


