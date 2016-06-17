import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import {RkButton, RkConfig, RkStyle} from 'react-native-ui-kit';

import {UtilStyles} from '../utils/styles'

export class ButtonScreen extends Component {

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Basic button</Text>
          <View style={UtilStyles.rowContainer}>
            <RkButton type='basic'>Default</RkButton>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Colored buttons</Text>
          <View style={UtilStyles.rowContainer}>
            <RkButton type='basic' style={RkStyle.blueBg} textStyle={RkStyle.whiteText}>Primary</RkButton>
            <RkButton type='basic' style={[UtilStyles.spaceAround, RkStyle.yellowBg]} textStyle={RkStyle.whiteText}>Warning</RkButton>
            <RkButton type='basic' style={RkStyle.redBg} textStyle={RkStyle.whiteText}>Danger</RkButton>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Outline buttons</Text>
          <View style={UtilStyles.rowContainer}>
            <RkButton type='outline'>Outline</RkButton>
            <RkButton type='outline' style={[RkStyle.greenBorder, UtilStyles.spaceAround]} textStyle={RkStyle.greenText}>Custom
              color</RkButton>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Clear button</Text>
          <View style={UtilStyles.rowContainer}>
            <RkButton type='clear'>Clear</RkButton>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Rounded button</Text>
          <View style={UtilStyles.rowContainer}>
            <RkButton type='rounded'>Rounded</RkButton>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Button sizes</Text>
          <View style={UtilStyles.section}>
            <View style={UtilStyles.rowContainer}>
              <RkButton type='basic' size='small'>Small</RkButton>
              <RkButton type='basic' size='small' type='outline' style={UtilStyles.spaceAround}>Small</RkButton>
              <RkButton type='basic' size='small' type='rounded' style={[RkStyle.yellowBg]} textStyle={RkStyle.whiteText}>Small</RkButton>
            </View>
          </View>
          <View style={UtilStyles.section}>
            <View style={UtilStyles.rowContainer}>
              <RkButton type='basic' size='medium'>Medium</RkButton>
              <RkButton type='basic' size='medium' type='outline' style={UtilStyles.spaceAround}>Medium</RkButton>
              <RkButton type='basic' size='medium' type='rounded' style={[RkStyle.yellowBg]}
                      textStyle={RkStyle.whiteText}>Medium</RkButton>
            </View>
          </View>
          <View style={UtilStyles.section}>
            <View style={UtilStyles.rowContainer}>
              <RkButton type='basic' size='large'>Large</RkButton>
              <RkButton size='large' type='outline' style={UtilStyles.spaceAround}>Large</RkButton>
              <RkButton size='large' type='rounded' style={[RkStyle.yellowBg]} textStyle={RkStyle.whiteText}>Large</RkButton>
            </View>
          </View>
          <View style={UtilStyles.section}>
            <Text style={UtilStyles.titleText}>With icons</Text>
            <View style={UtilStyles.rowContainer}>
              <RkButton type='basic' style={RkStyle.blueBg} textStyle={RkStyle.whiteText}
                        icon="diamond" iconStyle={RkStyle.whiteText}>Primary</RkButton>
              <RkButton type='outline' style={[RkStyle.greenBorder, UtilStyles.spaceAround]} textStyle={RkStyle.greenText}
                        icon="git" iconStyle={RkStyle.greenText}>Custom color</RkButton>
              <RkButton type='basic' size='small' type='outline' style={UtilStyles.spaceAround} iconStyle={RkStyle.blueText}
                        icon="facebook">Small</RkButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}
