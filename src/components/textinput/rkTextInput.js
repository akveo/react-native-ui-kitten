import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform
} from 'react-native';

import {RkComponent} from '../rkComponent.js';

export class RkTextInput extends RkComponent {

  componentName = 'RkTextInput';
  typeMapping = {
    container: {
      borderRadius: 'borderRadius',
      backgroundColor: 'backgroundColor',
      borderWidth: 'borderWidth',
      borderColor: 'borderColor',
      underlineWidth: 'borderBottomWidth',
      underlineColor: 'borderBottomColor',
      height: 'height',
      width: 'width'
    },
    input: {
      color: 'color',
      inputBackgroundColor: 'backgroundColor',
      placeholderTextColor: 'placeholderTextColor'
    },
    label: {
      labelColor: 'color',
      labelFontSize: 'fontSize'
    }
  };

  constructor(props) {
    super(props);
    this.focusInput = this._focusInput.bind(this);
  }

  _focusInput() {
    this.refs.input.focus();
  }

  _displayLabel(label, labelStyle) {
    if (typeof label === 'string') {
      return (
        <Text style={labelStyle} onPress={this.focusInput}>{label}</Text>
      )
    } else {
      return React.cloneElement(label, {
        onPress: (e) => {
          this.refs.input.focus();
          label.props.onPress && label.props.onPress(e)
        },
        style: [labelStyle, label.props.style]
      });
    }
  }

  render() {
    let {
      style,
      label,
      labelStyle,
      inputStyle,
      ...inputProps
    } = this.props;
    let {container:boxStyle, input:input, label:labelS} = this.defineStyles();
    let placeholderColor = this.extractNonStyleValue(input, 'placeholderTextColor');
    labelStyle = [labelS, labelStyle];
    inputProps.style = [input, inputStyle];
    inputProps.placeholderTextColor = placeholderColor;
    boxStyle.push(style);
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.focusInput} style={boxStyle}>
        {label && this._displayLabel(label, labelStyle)}
        <TextInput underlineColorAndroid='transparent' ref={'input'} {...inputProps}/>
      </TouchableOpacity>
    );
  }
}
