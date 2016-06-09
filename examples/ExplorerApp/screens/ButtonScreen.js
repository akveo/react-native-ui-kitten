import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import {Button, Config} from 'react-native-ui-kit';

export class ButtonScreen extends Component {

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.titleText}>Simple button</Text>
          <View style={styles.buttonContainer}>
            <Button>Default</Button>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Colored buttons</Text>
          <View style={styles.buttonContainer}>
            <Button style={styles.primaryBg} textStyle={styles.whiteText}>Primary</Button>
            <Button style={[styles.spaceAround, styles.warningBg]} textStyle={styles.whiteText}>Warning</Button>
            <Button style={styles.dangerBg} textStyle={styles.whiteText}>Danger</Button>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Outline buttons</Text>
          <View style={styles.buttonContainer}>
            <Button type='outline'>Outline</Button>
            <Button type='outline' style={[styles.successBorder, styles.spaceAround]} textStyle={styles.successText}>Custom
              color</Button>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Clear button</Text>
          <View style={styles.buttonContainer}>
            <Button type='clear'>Clear</Button>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Rounded button</Text>
          <View style={styles.buttonContainer}>
            <Button type='rounded'>Rounded</Button>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Button sizes</Text>
          <View style={styles.section}>
            <View style={styles.buttonContainer}>
              <Button size='small'>Small</Button>
              <Button size='small' type='outline' style={styles.spaceAround}>Small</Button>
              <Button size='small' type='rounded' style={[styles.warningBg]} textStyle={styles.whiteText}>Small</Button>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.buttonContainer}>
              <Button size='medium'>Medium</Button>
              <Button size='medium' type='outline' style={styles.spaceAround}>Medium</Button>
              <Button size='medium' type='rounded' style={[styles.warningBg]}
                      textStyle={styles.whiteText}>Medium</Button>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.buttonContainer}>
              <Button size='large'>Large</Button>
              <Button size='large' type='outline' style={styles.spaceAround}>Large</Button>
              <Button size='large' type='rounded' style={[styles.warningBg]} textStyle={styles.whiteText}>Large</Button>
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
    backgroundColor: Config.colors.primary
  },
  dangerBg: {
    backgroundColor: Config.colors.danger
  },
  warningBg: {
    backgroundColor: Config.colors.warning
  },
  successBorder: {
    borderColor: Config.colors.success
  },
  successText: {
    color: Config.colors.success
  }
});
