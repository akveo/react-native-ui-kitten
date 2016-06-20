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
      type,
      iconStyle,
      icon,
      ...inputProps
      } = this.props;
    type = type || 'default'
    inputProps.style = [styles.basicInput, styles[type + 'Input'], inputProps.style];
    containerStyle = [styles.basicContainer, styles[type + 'Container'], containerStyle];
    return (
      <View style={containerStyle}>
        {icon && <Icon name={icon} size={18} style={iconStyle}/>}
        <TextInput {...inputProps}/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  basicInput: {
    fontSize: 16,
    height: 16 * 1.42,
    paddingHorizontal: 5,
    flex: 1,
    alignSelf: 'flex-end'
  },
  basicContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    padding: 1,
  },
  defaultInput: {},
  defaultContainer: {
    borderBottomColor: RkConfig.colors.primary,
    borderBottomWidth: 2,
  },
  roundedInput: {},
  roundedContainer: {
    backgroundColor: RkConfig.colors.gray,
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  borderedInput: {},
  borderedContainer: {
    padding: 5,
    borderWidth: 0.5,
    borderColor: RkConfig.colors.gray,
    borderRadius: 3,
  }
});
