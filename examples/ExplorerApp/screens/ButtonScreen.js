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
              <RkButton type='basic' size='medium'>Button</RkButton>
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
              <RkButton type='basic' size='medium' style={RkStyle.primaryBg}
                        textStyle={RkStyle.whiteText}>Primary</RkButton>
              <RkButton type='basic' size='medium' style={[UtilStyles.spaceV, RkStyle.darkWarningBg]}
                        textStyle={RkStyle.whiteText}>Warning</RkButton>
              <RkButton type='basic' size='medium' style={RkStyle.dangerBg} textStyle={RkStyle.whiteText}>Danger</RkButton>
            </View>
            <View style={[UtilStyles.description]}>
              <Text>Easy to customize colors using
                <Text style={RkStyle.deepWarningText}> style </Text>
                props for button container styles such as
                <Text style={RkStyle.deepWarningText}> backgroundColor </Text>
                and
                <Text style={RkStyle.deepWarningText}> textStyle </Text>
                props for inner text</Text>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Button type props</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={UtilStyles.exampleView}>
              <RkButton size='medium' type='basic'>Basic</RkButton>
              <RkButton size='medium' type='clear'>Clear</RkButton>
              <RkButton size='medium' type='outline'>Outline</RkButton>
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
              <RkButton type='basic' size='small' type='outline'>Small</RkButton>
              <RkButton type='basic' size='medium' type='outline' style={UtilStyles.spaceAround}>Medium</RkButton>
              <RkButton type='outline' size='large'>Large</RkButton>
            </View>
          </View>
          <View style={[UtilStyles.description, UtilStyles.row, {paddingLeft: 0, marginTop: 10}]}>
            <Text>
              <Text style={RkStyle.deepWarningText}>size </Text>
              props allow you to define the mass of button
            </Text>
            <View style={[{alignItems: 'flex-start'}]}>
              <Text style={{marginVertical: 5}}>Available values:</Text>
              <Text style={[UtilStyles.codeText, UtilStyles.tab]}>small</Text>
              <Text style={[UtilStyles.codeText, UtilStyles.tab, UtilStyles.spaceV]}>medium</Text>
              <Text style={[UtilStyles.codeText, UtilStyles.tab]}>large</Text>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>With icons</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={[UtilStyles.exampleView, {alignItems: 'flex-start'}]}>
              <RkButton type='basic' size='medium' style={RkStyle.primaryBg} textStyle={RkStyle.whiteText}
                        icon="diamond" iconStyle={RkStyle.whiteText}>shine</RkButton>
              <RkButton type='outline' size='medium' style={[RkStyle.deepWarningBorder, UtilStyles.spaceV]}
                        textStyle={RkStyle.deepWarningText}
                        icon="git" iconStyle={RkStyle.deepWarningText}>smart</RkButton>
              <RkButton type='basic' size='small' type='outline'
                        iconStyle={[RkStyle.primaryText, {fontWeight: '100', fontSize: 10, alignSelf: 'flex-start', marginRight:2}]}
                        icon="plus">Add</RkButton>
            </View>
            <View style={[UtilStyles.description]}>
              <Text>For icons used react-native-vector-icons. Add
                <Text style={RkStyle.deepWarningText}> icon </Text>
                props with icon name.
                Style icon with
                <Text style={RkStyle.deepWarningText}> iconStyle </Text>
                props.
                Chose icon family with
                <Text style={RkStyle.deepWarningText}> iconFamily </Text>
                props.</Text>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Icons only</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={[UtilStyles.row, {alignItems: 'center'}]}>
              <RkButton type='basic' size='medium' style={RkStyle.primaryBg} textStyle={RkStyle.whiteText}
                        icon="diamond" iconStyle={RkStyle.whiteText}/>
              <RkButton type='outline' size='medium' style={[RkStyle.deepWarningBorder, UtilStyles.spaceH]}
                        textStyle={RkStyle.deepWarningText}
                        icon="git" iconStyle={RkStyle.deepWarningText}/>
              <RkButton type='basic' style={{borderRadius: 25, paddingVertical: 5, paddingHorizontal: 7}} size='small'
                        type='outline' iconStyle={[RkStyle.primaryText, {fontWeight: '100', fontSize: 14}]}
                        icon="plus"/>
            </View>
          </View>
          <View style={[UtilStyles.description, UtilStyles.row, {paddingLeft: 0, marginTop: 10}]}>
            <Text>
              <Text style={RkStyle.deepWarningText}>size </Text>
              props allow you to define the mass of button
            </Text>
            <View style={[{alignItems: 'flex-start'}]}>
              <Text style={{marginVertical: 5}}>Available values:</Text>
              <Text style={[UtilStyles.codeText, UtilStyles.tab]}>small</Text>
              <Text style={[UtilStyles.codeText, UtilStyles.tab, UtilStyles.spaceV]}>medium</Text>
              <Text style={[UtilStyles.codeText, UtilStyles.tab]}>large</Text>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Events</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={UtilStyles.exampleView}>
              <RkButton type='basic' size='medium' onPress={() => {Alert.alert('click')}} style={RkStyle.dangerBg} textStyle={RkStyle.whiteText}>Push me!</RkButton>
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
