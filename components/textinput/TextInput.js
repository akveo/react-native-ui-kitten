import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import { RkConfig} from '../../config/config';
import Icon from 'react-native-vector-icons/Ionicons';


export class RkTextInput extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    let {
      containerStyle,
      iconStyle,
      icon,
      label,
      type,
      labelStyle,
      ...inputProps
      } = this.props;
    let {boxStyle, inputStyle, labelS, iconS} = this._defineStyles();
    labelStyle = [labelS, labelStyle];
    inputProps.style = [inputStyle, inputProps.style];
    iconStyle = [iconS, iconStyle];
    boxStyle.push(containerStyle);
    return (
      <View style={boxStyle}>
        {label && <Text onPress={() => this.refs.input.focus()} style={labelStyle}>{label}</Text>}
        {icon && <Icon onPress={() => this.refs.input.focus()} name={icon} size={18} style={iconStyle}/>}
        <TextInput ref={'input'} {...inputProps}/>
      </View>
    );
  }

  _defineStyles() {
    let types = this.props.type || (RkConfig.theme.input ? RkConfig.theme.input.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let boxStyle = [RkConfig.themes.styles.input._container];
    let inputStyle = [RkConfig.themes.styles.input._input];
    let labelS = [RkConfig.themes.styles.input._label];
    let iconS = [RkConfig.themes.styles.input._icon];
    for (type of types) {
      if (RkConfig.themes.styles.input[type]) {
        boxStyle.push(RkConfig.themes.styles.input[type].container);
        inputStyle.push(RkConfig.themes.styles.input[type].input);
        labelS.push(RkConfig.themes.styles.input[type].label);
      }
    }
    return {boxStyle, inputStyle, labelS, iconS}
  }

}
