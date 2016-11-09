import React, {Component} from 'react';

import {
  Text,
} from 'react-native';

import { RkConfig} from '../../config/config';

export class RkText extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    let styles = this._defineStyles();
    return (
      <Text style={[styles, this.props.style]}>{this.props.children}</Text>
    );
  }

  _defineStyles() {
    let types = this.props.type || (RkConfig.theme.text ? RkConfig.theme.text.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let styles = [];
    for (let type of types) {
      styles.push(RkConfig.themes.styles.text[type]);
    }
    return styles;
  }


}
