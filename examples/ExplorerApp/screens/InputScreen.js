import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';

import { RkConfig, RkTextInput, RkSeparator} from 'react-native-ui-kit';
import {UtilStyles} from '../utils/styles';

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
        style={[UtilStyles.container, {backgroundColor: RkConfig.colors.lightGray}]}>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Default input</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput placeholder={'Login'} clearButtonMode={'always'}/>
              <RkSeparator style={{marginVertical: 5, marginRight: 20}} />
              <RkTextInput secureTextEntry={true} placeholder={'Password'} clearButtonMode={'always'}/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Rounded input</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput type={'rounded'} placeholder={'Login'}/>
              <RkTextInput secureTextEntry={true} containerStyle={{marginTop: 5}} type={'rounded'} placeholder={'Password'}/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Bordered input</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput type={'bordered'} placeholder={'Login'}/>
              <RkTextInput secureTextEntry={true} containerStyle={{marginTop: 5}} type={'bordered'} placeholder={'Password'}/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Underlay input</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={{flex: 1}}>
              <RkTextInput type={'underlay'} placeholder={'Login'}/>
              <RkTextInput secureTextEntry={true} containerStyle={{marginTop: 10}} type={'underlay'} placeholder={'Password'}/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>With icon</Text>
          <View style={[UtilStyles.rowContainer]}>
            <View style={{flex: 1}}>
              <RkTextInput icon={'ios-log-in'} placeholder={'Login'}/>
              <RkSeparator style={{marginVertical: 5, marginRight: 20}}/>
              <RkTextInput secureTextEntry={true} icon={'ios-key-outline'} placeholder={'Password'}/>

              <RkTextInput type={'rounded'} icon={'ios-search-outline'} containerStyle={{marginTop: 20}}
                           placeholder={'Search'}/>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Labels</Text>
          <View style={[UtilStyles.rowContainer]}>
            <View style={{flex: 1}}>
              <RkTextInput label={'Login:'} type="underlay"/>
              <RkTextInput type="underlay" secureTextEntry={true} containerStyle={{marginTop: 10}} label={'Password:'}/>
            </View>
          </View>
          <Text style={[UtilStyles.titleText, {marginTop: 15}]}>Top Labels</Text>
          <View style={[UtilStyles.rowContainer]}>
            <View style={{flex: 1}}>
              <RkTextInput type="topLabel underlay" label={'Login:'}/>
              <RkTextInput secureTextEntry={true} type="topLabel underlay" containerStyle={{marginTop: 15}} label={'Password:'}/>
            </View>
          </View>
        </View>
      </ScrollView>

    );
  }


}
