import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import {RkRadioButton, RkRadioGroup, RkConfig} from 'react-native-ui-kit';

import Icon from 'react-native-vector-icons/Ionicons';


export class RadioScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.titleText}>Basic radio</Text>
          <View style={styles.rowContainer}>
            <RkRadioGroup>
              <View style={styles.rowRadio}>
                <RkRadioButton/>
                <RkRadioButton style={styles.spaceAround}/>
                <RkRadioButton/>
              </View>
            </RkRadioGroup>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Customizable</Text>
          <View style={styles.rowContainer}>
            <RkRadioGroup>
              <View style={styles.rowRadio}>
                <RkRadioButton style={styles.primaryBorder} innerSelectedStyle={styles.primaryBg}/>
                <RkRadioButton style={styles.spaceAround} innerStyle={styles.big}/>
                <RkRadioButton style={styles.dangerBorder} innerStyle={styles.dangerBg}
                               selectedStyle={styles.successBorder} innerSelectedStyle={styles.successBg}/>
              </View>
            </RkRadioGroup>
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
  rowRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rowContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  spaceAround: {
    marginHorizontal: 5
  },
  dangerBg: {
    backgroundColor: RkConfig.colors.danger
  },
  primaryBg: {
    backgroundColor: RkConfig.colors.primary
  },
  primaryBorder: {
    borderColor: RkConfig.colors.primary
  },
  dangerBorder: {
    borderColor: RkConfig.colors.danger
  },
  successBg: {
    backgroundColor: RkConfig.colors.success
  },
  successBorder: {
    borderColor: RkConfig.colors.success
  },
  big: {
    width: 20,
    height: 20,
  },
});
