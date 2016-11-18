import React, { Component } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  ScrollView,
  Text,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {RkButton, RkStyle, RkTextInput, RkSeparator, RkConfig, RkCard} from 'react-native-ui-kit';
import ScreenService from '../../util/ScreenService';

//TODO refactor
export default class LoginScreenMaterial extends Component {

  constructor(props) {
    super(props)
    let {width} = Dimensions.get('window');
    this._width = width;
    this.state={
      login: ''
    }
  }

  render() {
    return (
      <ScrollView
        ref='scrollView'
        contentContainerStyle={{flex: 1}}
        style={{backgroundColor: RkConfig.colors.gray}}
        pagingEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        bounces={false}
        horizontal
        scrollEnabled={false}>
        <View style={{flex:1, width: this._width, justifyContent: 'center'}}>
          <RkCard type='material' style={{marginHorizontal: 20, borderColor: 'transparent'}}>
            <View rkCardHeader style={{backgroundColor: RkConfig.colors.primary, paddingHorizontal: 20}}>
              <Text style={{color: 'white', fontSize: 20, marginTop: 100}}>Sign in into your account</Text>
            </View>
            <View rkCardContent style={{paddingHorizontal: 20, paddingTop: 15}}>
              <RkTextInput
                type='underline topLabel'
                label='Enter your email'
                value={this.state.login}
                onChangeText={(text)=>this.setState({login: text})}
                labelStyle={{paddingBottom: 25}}
                containerStyle={{borderBottomColor: this.state.error ? RkConfig.colors.danger : RkConfig.colors.primary, borderBottomWidth: 1.5}}
                style={[{fontSize: 20}]}
                placeholderTextColor={RkConfig.colors.lightGray}/>
            </View>
            <View rkCardFooter style={{alignItems: 'flex-end', paddingHorizontal: 20}}>
              <RkButton
                onPress={()=> {this.state.login ? this.refs.scrollView.scrollTo({x: this._width}) : this.setState({error: true})}}
                style={[RkStyle.primaryBg, {marginTop: 20}]}
                innerStyle={RkStyle.whiteText}
                type='material'>
                NEXT
              </RkButton>
              <Text style={{marginTop: 100, color: RkConfig.colors.gray, alignSelf: 'center'}}>or create new
                account</Text>
            </View>
          </RkCard>
        </View>
        <View style={{flex:1, width: this._width, justifyContent: 'center'}}>
          <RkCard type='material' style={{marginHorizontal: 20, borderColor: 'transparent'}}>
            <View rkCardHeader style={{backgroundColor: RkConfig.colors.primary}}>
              <RkButton
                type='clear'
                onPress={()=>this.refs.scrollView.scrollTo({x: 0})}
                style={{alignSelf: 'flex-start', paddingHorizontal: 8}}
                innerStyle={{color: 'white'}}>
                <Icon name='md-arrow-back'/>
              </RkButton>
              <Text style={{color: 'white', fontSize: 20, marginTop: 64, paddingHorizontal: 10}}>
                Welcome {this.state.login}
              </Text>
            </View>
            <View rkCardContent style={{paddingHorizontal: 20, paddingTop: 15}}>
              <RkTextInput
                type='underline topLabel'
                label='Enter your password'
                secureTextEntry={true}
                labelStyle={{paddingBottom: 25}}
                containerStyle={{borderBottomColor: RkConfig.colors.primary, borderBottomWidth: 1.5}}
                style={[{fontSize: 20}]}
                placeholderTextColor={RkConfig.colors.lightGray}/>
            </View>
            <View rkCardFooter style={{alignItems: 'flex-end', paddingHorizontal: 20}}>
              <RkButton style={[RkStyle.primaryBg, {marginTop: 20}]}
                        innerStyle={RkStyle.whiteText}
                        onPress={()=>super._renderMainScreen()}
                        type='material'>
                NEXT
              </RkButton>
              <Text style={{marginTop: 100, color: RkConfig.colors.gray, alignSelf: 'center'}}>or create new
                account</Text>
            </View>
          </RkCard>
        </View>
      </ScrollView>
    );
  }

}

let styles = StyleSheet.create({});
