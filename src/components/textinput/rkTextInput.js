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
      paddingHorizontal: 'paddingHorizontal',
      paddingVertical: 'paddingVertical',
      backgroundColor: 'backgroundColor',
      borderWidth: 'borderWidth',
      borderColor: 'borderColor',
      underlineWidth: 'borderBottomWidth',
      underlineColor: 'borderBottomColor'
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
      containerStyle,
      label,
      labelStyle,
      ...inputProps
    } = this.props;
    let {container:boxStyle, input:inputStyle, label:labelS} = this.defineStyles();
    let placeholderColor = this.extractNonStyleValue(inputStyle, 'placeholderTextColor');
    labelStyle = [labelS, labelStyle];
    inputProps.style = [inputStyle, inputProps.style];
    inputProps.placeholderTextColor = placeholderColor;
    boxStyle.push(containerStyle);
    let borderFix = Platform.OS === 'android' ? {underlineColorAndroid: 'transparent'} : {};
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.focusInput} style={boxStyle}>
        {label && this._displayLabel(label, labelStyle)}
        <TextInput underlineColorAndroid='transparent' ref={'input'} {...inputProps}/>
      </TouchableOpacity>
    );
  }
}
