import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

import { RkTheme, RkTextInput, RkSeparator} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons';
import {UtilStyles} from '../style/styles';

export class InputScreen extends Component {

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
        style={[UtilStyles.container, {backgroundColor: RkTheme.current.colors.grey300}]}>

        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Default input</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput placeholder='Login' clearButtonMode='always'/>
              <RkSeparator style={{marginVertical: 5, marginRight: 20}} />
              <RkTextInput secureTextEntry={true} placeholder='Password' clearButtonMode='always'/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Rounded input</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput rkType='rounded' placeholder='Login'/>
              <RkTextInput secureTextEntry={true} containerStyle={{marginTop: 5}} rkType='rounded' placeholder='Password'/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Bordered input</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput rkType='bordered' placeholder='Login'/>
              <RkTextInput secureTextEntry={true} containerStyle={{marginTop: 5}} rkType='bordered' placeholder='Password'/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Underline input</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput rkType='underline' placeholder='Login'/>
              <RkTextInput secureTextEntry={true} containerStyle={{marginTop: 10}} rkType='underline' placeholder='Password'/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>With icon</Text>
          <View style={[UtilStyles.rowContainer]}>
            <View style={{flex: 1}}>
              <RkTextInput label={<Icon name='ios-person-outline'/>} placeholder='Login' iconStyle={{fontSize: 22}}/>
              <RkSeparator style={{marginVertical: 5, marginRight: 20}}/>
              <RkTextInput secureTextEntry={true} label={<Icon name='ios-key-outline'/>} placeholder='Password'/>

              <RkTextInput rkType='rounded-bg' label={<Icon name='ios-search-outline'/>} containerStyle={{marginTop: 20}}
                           placeholder='Search'/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Labels</Text>
          <View style={[UtilStyles.rowContainer]}>
            <View style={{flex: 1}}>
              <RkTextInput label='Login:' rkType="underline form"/>
              <RkTextInput rkType="underline form" secureTextEntry={true} containerStyle={{marginTop: 10}} label='Password:'/>
            </View>
          </View>
          <Text style={[UtilStyles.titleText, {marginTop: 15}]}>Top Labels</Text>
          <View style={[UtilStyles.rowContainer]}>
            <View style={{flex: 1}}>
              <RkTextInput rkType="topLabel underline" label={'Login:'}/>
              <RkTextInput secureTextEntry={true} rkType="topLabel underline" containerStyle={{marginTop: 15}} label='Password:'/>
            </View>
          </View>
        </View>
      </ScrollView>

    );
  }
}
