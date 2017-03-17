import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
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
      borderRadius: 'borderRadius',
      //TODO: bottom border complex
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
  }

  render() {
    let {
      containerStyle,
      label,
      labelStyle,
      ...inputProps
    } = this.props;
    let {container:boxStyle, input:inputStyle, label:labelS} = this.defineStyles();
    labelStyle = [labelS, labelStyle];
    inputProps.style = [inputStyle, inputProps.style];
    boxStyle.push(containerStyle);
    return (
      <View style={boxStyle}>
        {label && this._displayLabel(label, labelStyle)}
        <TextInput ref={'input'} {...inputProps}/>
      </View>
    );
  }

  _displayLabel(label, labelStyle) {
    if (typeof label === 'string') {
      return (
        <Text style={labelStyle} onPr ess={() => this.refs.input.focus()}>{label}</Text>
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
}
