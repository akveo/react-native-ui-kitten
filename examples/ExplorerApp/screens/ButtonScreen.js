import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import {RkButton, RkConfig, RkStyle} from 'react-native-ui-kit';

export class ButtonScreen extends Component {

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.titleText}>Basic button</Text>
          <View style={styles.buttonContainer}>
            <RkButton type='basic'>Default</RkButton>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Colored buttons</Text>
          <View style={styles.buttonContainer}>
            <RkButton type='basic' style={RkStyle.blueBg} textStyle={RkStyle.whiteText}>Primary</RkButton>
            <RkButton type='basic' style={[styles.spaceAround, RkStyle.yellowBg]} textStyle={RkStyle.whiteText}>Warning</RkButton>
            <RkButton type='basic' style={RkStyle.redBg} textStyle={RkStyle.whiteText}>Danger</RkButton>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Outline buttons</Text>
          <View style={styles.buttonContainer}>
            <RkButton type='outline'>Outline</RkButton>
            <RkButton type='outline' style={[RkStyle.greenBorder, styles.spaceAround]} textStyle={RkStyle.greenText}>Custom
              color</RkButton>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Clear button</Text>
          <View style={styles.buttonContainer}>
            <RkButton type='clear'>Clear</RkButton>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Rounded button</Text>
          <View style={styles.buttonContainer}>
            <RkButton type='rounded'>Rounded</RkButton>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Button sizes</Text>
          <View style={styles.section}>
            <View style={styles.buttonContainer}>
              <RkButton type='basic' size='small'>Small</RkButton>
              <RkButton type='basic' size='small' type='outline' style={styles.spaceAround}>Small</RkButton>
              <RkButton type='basic' size='small' type='rounded' style={[RkStyle.yellowBg]} textStyle={RkStyle.whiteText}>Small</RkButton>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.buttonContainer}>
              <RkButton type='basic' size='medium'>Medium</RkButton>
              <RkButton type='basic' size='medium' type='outline' style={styles.spaceAround}>Medium</RkButton>
              <RkButton type='basic' size='medium' type='rounded' style={[RkStyle.yellowBg]}
                      textStyle={RkStyle.whiteText}>Medium</RkButton>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.buttonContainer}>
              <RkButton type='basic' size='large'>Large</RkButton>
              <RkButton size='large' type='outline' style={styles.spaceAround}>Large</RkButton>
              <RkButton size='large' type='rounded' style={[RkStyle.yellowBg]} textStyle={RkStyle.whiteText}>Large</RkButton>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.titleText}>With icons</Text>
            <View style={styles.buttonContainer}>
              <RkButton type='basic' style={RkStyle.blueBg} textStyle={RkStyle.whiteText}
                        icon="diamond" iconStyle={RkStyle.whiteText}>Primary</RkButton>
              <RkButton type='outline' style={[RkStyle.greenBorder, styles.spaceAround]} textStyle={RkStyle.greenText}
                        icon="git" iconStyle={RkStyle.greenText}>Custom color</RkButton>
              <RkButton type='basic' size='small' type='outline' style={styles.spaceAround} iconStyle={RkStyle.blueText}
                        icon="facebook">Small</RkButton>
              <RkButton type='basic' size='large' type='rounded' style={[RkStyle.yellowBg]} textStyle={RkStyle.whiteText}
                        icon="twitter" iconStyle={RkStyle.whiteText}>Large</RkButton>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    paddingLeft: 15,
    flex: 1
  },
  titleText: {
    fontSize: 20
  },
  section: {
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  spaceAround: {
    marginHorizontal: 5
  }
});
