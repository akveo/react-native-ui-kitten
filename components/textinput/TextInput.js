import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {RkConfig} from '../../util/config';
import Icon from 'react-native-vector-icons/Ionicons';


export class RkTextInput extends Component {

  static name = 'textInput';

  constructor(props) {
    super(props);
  }

  render() {
    let {
      containerStyle,
      label,
      type,
      labelStyle,
      ...inputProps
    } = this.props;
    let {boxStyle, inputStyle, labelS} = this._defineStyles();
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
        <Text style={labelStyle} onPress={() => this.refs.input.focus()}>{label}</Text>
      )
    } else {
      return React.cloneElement(label, {
        onPress: (e) => {this.refs.input.focus(); label.props.onPress && label.props.onPress(e)},
        style: [labelStyle, label.props.style]
      });
    }
  }

  _defineStyles() {
    let types = this.props.rkType || (RkConfig.theme.input ? RkConfig.theme.input.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let boxStyle = [RkConfig.themes.styles.input._container];
    let inputStyle = [RkConfig.themes.styles.input._input];
    let labelS = [RkConfig.themes.styles.input._label];
    for (let type of types) {
      if (RkConfig.themes.styles.input[type]) {
        boxStyle.push(RkConfig.themes.styles.input[type].container);
        inputStyle.push(RkConfig.themes.styles.input[type].input);
        labelS.push(RkConfig.themes.styles.input[type].label);
      }
    }
    return {boxStyle, inputStyle, labelS}
  }

}
