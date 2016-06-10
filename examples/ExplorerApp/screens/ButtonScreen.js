import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import {RkButton, RkConfig} from 'react-native-ui-kit';

export class ButtonScreen extends Component {

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.titleText}>Simple button</Text>
          <View style={styles.buttonContainer}>
            <RkButton>Default</RkButton>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Colored buttons</Text>
          <View style={styles.buttonContainer}>
            <RkButton style={styles.primaryBg} textStyle={styles.whiteText}>Primary</RkButton>
            <RkButton style={[styles.spaceAround, styles.warningBg]} textStyle={styles.whiteText}>Warning</RkButton>
            <RkButton style={styles.dangerBg} textStyle={styles.whiteText}>Danger</RkButton>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Outline buttons</Text>
          <View style={styles.buttonContainer}>
            <RkButton type='outline'>Outline</RkButton>
            <RkButton type='outline' style={[styles.successBorder, styles.spaceAround]} textStyle={styles.successText}>Custom
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
              <RkButton size='small'>Small</RkButton>
              <RkButton size='small' type='outline' style={styles.spaceAround}>Small</RkButton>
              <RkButton size='small' type='rounded' style={[styles.warningBg]} textStyle={styles.whiteText}>Small</RkButton>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.buttonContainer}>
              <RkButton size='medium'>Medium</RkButton>
              <RkButton size='medium' type='outline' style={styles.spaceAround}>Medium</RkButton>
              <RkButton size='medium' type='rounded' style={[styles.warningBg]}
                      textStyle={styles.whiteText}>Medium</RkButton>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.buttonContainer}>
              <RkButton size='large'>Large</RkButton>
              <RkButton size='large' type='outline' style={styles.spaceAround}>Large</RkButton>
              <RkButton size='large' type='rounded' style={[styles.warningBg]} textStyle={styles.whiteText}>Large</RkButton>
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
    alignItems: 'center'
  },
  spaceAround: {
    marginHorizontal: 5
  },
  whiteText: {
    color: 'white'
  },
  primaryBg: {
    backgroundColor: RkConfig.colors.primary
  },
  dangerBg: {
    backgroundColor: RkConfig.colors.danger
  },
  warningBg: {
    backgroundColor: RkConfig.colors.warning
  },
  successBorder: {
    borderColor: RkConfig.colors.success
  },
  successText: {
    color: RkConfig.colors.success
  }
});
