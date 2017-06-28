import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

import {RkText, RkTextInput, RkTheme} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import {UtilStyles} from '../style/styles';

export class InputScreen extends Component {
  static navigationOptions = {
    title: 'Inputs'
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }

  render() {
    return (
      <ScrollView
        ref={'scrollView'}
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>

        <View style={UtilStyles.section}>
          <RkText rkType='header'>Default input</RkText>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput autoCorrect={false}
                           autoCapitalize={'none'} placeholder='Login' clearButtonMode='always'/>
              <RkTextInput secureTextEntry={true} placeholder='Password' clearButtonMode='always'/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>Rounded input</RkText>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput rkType='rounded' placeholder='Login'/>
              <RkTextInput secureTextEntry={true} rkType='rounded'
                           placeholder='Password'/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>Bordered input</RkText>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput rkType='bordered' placeholder='Login'/>
              <RkTextInput secureTextEntry={true} rkType='bordered'
                           placeholder='Password'/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>With icon</RkText>
          <View style={[UtilStyles.rowContainer]}>
            <View style={{flex: 1}}>
              <RkTextInput label={<Icon style={styles.inputIcon} name='user'/>} placeholder='Login'/>
              <RkTextInput secureTextEntry={true} label={<Icon style={styles.inputIcon} name='lock'/>}
                           placeholder='Password'/>
              <RkTextInput rkType='rounded' label={<Icon style={[styles.inputIcon, styles.searchIcon]} name='search'/>}
                           placeholder='Search' style={{marginLeft: 11}}/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>Labels</RkText>
          <View style={[UtilStyles.columnContainer]}>
            <RkTextInput label='Login' rkType='form'/>
            <RkTextInput rkType="form" secureTextEntry={true} label='Password'/>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>Top Labels</RkText>
          <View style={[UtilStyles.rowContainer]}>
            <View style={{flex: 1}}>
              <RkTextInput rkType="topLabel" label='Login'/>
              <RkTextInput secureTextEntry={true} rkType="topLabel" containerStyle={{marginTop: 15}}
                           label='Password'/>
            </View>
          </View>
        </View>
      </ScrollView>

    );
  }
}

let styles = StyleSheet.create({
  inputIcon: {
    fontSize: 15,
    color: '#0000003a',
    marginLeft: 4,
  },
  searchIcon: {
    marginLeft: 16,
  }
});