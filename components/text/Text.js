import React, {Component} from 'react';

import {
  Text,
} from 'react-native';

import { RkConfig} from '../../util/config';

export class RkText extends Component {

  static name = 'text';

  constructor(props) {
    super(props);
  }

  render() {
    let styles = this._defineStyles();
    let {
      type,
      style,
      children,
      ...textProps
    } = this.props;
    return (
      <Text style={[styles, style]} {...textProps}>{children}</Text>
    );
  }

  _defineStyles() {
    let types = this.props.rkType || (RkConfig.theme.text ? RkConfig.theme.text.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let styles = [];
    for (let type of types) {
      styles.push(RkConfig.themes.styles.text[type]);
    }
    return styles;
  }


}
