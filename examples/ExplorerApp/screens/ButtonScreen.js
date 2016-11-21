import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import {RkButton, RkConfig, RkStyle} from 'react-native-ui-kit';

import {UtilStyles} from '../utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';

export class ButtonScreen extends Component {

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={[UtilStyles.container, {backgroundColor: RkConfig.colors.lightGray}]}>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Basic button</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={UtilStyles.exampleView}>
              <RkButton rkType='basic medium'>Button</RkButton>
            </View>
            <View style={UtilStyles.description}>
              <Text>Just create button element with text inside:</Text>
              <View style={[UtilStyles.tab, {marginVertical: 3}]}>
                <Text style={UtilStyles.codeText}>{"<RkButton>"}</Text>
                <Text style={UtilStyles.tab}>Button</Text>
                <Text style={UtilStyles.codeText}>{"</RkButton>"}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Colored buttons</Text>
          <View style={[UtilStyles.rowContainer]}>
            <View style={UtilStyles.exampleView}>
              <RkButton rkType='basic medium' style={RkStyle.primaryBg}
                        innerStyle={RkStyle.whiteText}>Primary</RkButton>
              <RkButton rkType='basic medium' style={[UtilStyles.spaceV, RkStyle.darkWarningBg]}
                        innerStyle={RkStyle.whiteText}>Warning</RkButton>
              <RkButton rkType='basic medium' style={RkStyle.dangerBg} innerStyle={RkStyle.whiteText}>Danger</RkButton>
            </View>
            <View style={[UtilStyles.description]}>
              <Text>Easy to customize colors using
                <Text style={RkStyle.deepWarningText}> style </Text>
                props for button container styles such as
                <Text style={RkStyle.deepWarningText}> backgroundColor </Text>
                and
                <Text style={RkStyle.deepWarningText}> innerStyle </Text>
                props for inner text</Text>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Button type props</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={UtilStyles.exampleView}>
              <RkButton rkType='basic medium'>Basic</RkButton>
              <RkButton style={{marginTop: 10}}rkType='clear'>Clear</RkButton>
              <RkButton style={{marginTop: 10}}rkType='outline'>Outline</RkButton>
              <RkButton style={{marginTop: 10, backgroundColor: RkConfig.colors.primary}} innerStyle={RkStyle.whiteText} rkType='material'>Material</RkButton>
            </View>
            <View style={[UtilStyles.description]}>
              <Text>With button props
                <Text style={RkStyle.deepWarningText}> type </Text>
                you can ease create already customized buttons.
              </Text>
              <View style={[{alignItems: 'flex-start'}]}>
                <Text style={{marginVertical: 5}}>Available values:</Text>
                <Text style={[UtilStyles.codeText, UtilStyles.tab]}>basic</Text>
                <Text style={[UtilStyles.codeText, UtilStyles.tab, UtilStyles.spaceV]}>clear</Text>
                <Text style={[UtilStyles.codeText, UtilStyles.tab]}>outline</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Button sizes</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={[UtilStyles.row, {alignItems: 'center'}]}>
              <RkButton rkType='small outline'>Small</RkButton>
              <RkButton rkType='medium outline' style={UtilStyles.spaceAround}>Medium</RkButton>
              <RkButton rkType='outline large'>Large</RkButton>
            </View>
          </View>
          <View style={UtilStyles.row}>
            <View style={[UtilStyles.description , {paddingLeft: 0, marginTop: 10}]}>
              <Text>
                <Text style={RkStyle.deepWarningText}>type </Text>
                props also allow you to define the mass of button.
              </Text>
              <View style={[{alignItems: 'flex-start'}]}>
                <Text style={{marginVertical: 5}}>Available values:</Text>
                <Text style={[UtilStyles.codeText, UtilStyles.tab]}>small</Text>
                <Text style={[UtilStyles.codeText, UtilStyles.tab, UtilStyles.spaceV]}>medium</Text>
                <Text style={[UtilStyles.codeText, UtilStyles.tab]}>large</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>With icons</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={[UtilStyles.exampleView, {alignItems: 'flex-start'}]}>
              <RkButton rkType='small outline' style={[ RkStyle.deepWarningBorder]} innerStyle={RkStyle.deepWarningText}>
                <Icon style={{marginRight: 5, fontSize: 18}} name={'logo-github'}/>Star
              </RkButton>
              <RkButton rkType='small' style={[UtilStyles.spaceV, RkStyle.primaryBg]} innerStyle={RkStyle.whiteText}>
                <Icon style={{marginRight: 5, fontSize: 18}} name={'logo-twitter'}/>Follow
              </RkButton>
              <RkButton rkType='small outline' style={{paddingTop: 1, paddingLeft: 3}}>
                <Icon name={'md-add'} style={{fontSize: 10,alignSelf: 'flex-start'}}/><Text>Add</Text>
              </RkButton>
            </View>
            <View style={[UtilStyles.description]}>
              <Text>For icons used react-native-vector-icons. Add
                <Text style={RkStyle.deepWarningText}> {" <Icon/> "} </Text>
                and text inside
                <Text style={RkStyle.deepWarningText}>{" <RkButton> "}</Text>
                element.</Text>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Icons only</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={[UtilStyles.row, {alignItems: 'center'}]}>
              <RkButton rkType='basic' style={[ RkStyle.deepWarningBg]} innerStyle={RkStyle.whiteText}>
                <Icon name={'md-share'}/>
              </RkButton>
              <RkButton rkType='basic circle'
                        style={[UtilStyles.spaceH,  RkStyle.dangerBg, {paddingVertical: 5, paddingHorizontal: 10}]}
                        innerStyle={[RkStyle.whiteText, {fontSize: 22}]}>
                <Icon name={'md-add'}/>
              </RkButton>
              <RkButton rkType='outline circle small' style={{paddingVertical: 2}}>
                <Icon style={{fontSize: 20}} name={'md-add'}/>
              </RkButton>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Events</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={UtilStyles.exampleView}>
              <RkButton rkType='basic medium' onPress={() => {Alert.alert('click')}} style={RkStyle.dangerBg}
                        innerStyle={RkStyle.whiteText}>Push me!</RkButton>
            </View>
            <View style={UtilStyles.description}>
              <View style={[{alignItems: 'flex-start'}]}>
                <Text style={{marginBottom: 5}}>Supported event props:</Text>
                <Text style={[UtilStyles.codeText, UtilStyles.tab]}>onPress</Text>
                <Text style={[UtilStyles.codeText, UtilStyles.tab, UtilStyles.spaceV]}>onLongPress</Text>
                <Text style={[UtilStyles.codeText, UtilStyles.tab]}>onPressIn</Text>
                <Text style={[UtilStyles.codeText, UtilStyles.tab, UtilStyles.spaceV]}>onPressOut</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}
