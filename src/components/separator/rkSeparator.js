import React, {Component} from 'react';

import {
  View,
  StyleSheet
} from 'react-native';

import {RkComponent} from '../rkComponent';

export class RkSeparator extends RkComponent {

  componentName = 'RkSeparator';
  typeMapping = {
    view: {
      backgroundColor: 'backgroundColor',
      height: 'height',
      width: 'width'
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {view:styles} = this.defineStyles();
    return (
      <View style={[styles, this.props.style]}/>
    );
  }
}



