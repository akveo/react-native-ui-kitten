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
      ...inputProps
      } = this.props;
    let {boxStyle, inputStyle} = this._defineStyles();
    inputProps.style = [inputStyle, inputProps.style];
    boxStyle.push(containerStyle);
    return (
      <View style={boxStyle}>
        {icon && <Icon name={icon} size={18} style={iconStyle}/>}
        <TextInput {...inputProps}/>
      </View>
    );
  }

  _defineStyles() {
    let types = this.props.type || (RkConfig.theme.input ? RkConfig.theme.input.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let boxStyle = [RkConfig.themes.styles.input._container];
    let inputStyle = [RkConfig.themes.styles.input._input];
    for (type of types) {
      if(RkConfig.themes.styles.input[type]) {
        boxStyle.push(RkConfig.themes.styles.input[type].container);
        inputStyle.push(RkConfig.themes.styles.input[type].input);
      }
    }
    return {boxStyle, inputStyle}
  }

}

const styles = StyleSheet.create({

});
