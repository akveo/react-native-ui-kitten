import React, {Component} from 'react';

import {
  Text,
} from 'react-native';

import {RkComponent} from '../rkComponent.js';

export class RkText extends RkComponent {
  componentName = 'RkText';
  typeMapping = {
    text: {
      color: 'color',
      backgroundColor: 'backgroundColor',
      fontSize:'fontSize'
    }
  };

  render() {
    let {
      rkType,
      style,
      children,
      ...textProps
    } = this.props;
    let styles = this.defineStyles(rkType);
    return (
      <Text style={[styles.text, style]} {...textProps}>{children}</Text>
    );
  }
}
