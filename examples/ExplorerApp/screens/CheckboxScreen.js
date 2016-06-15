import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import {RkCheckbox, RkConfig} from 'react-native-ui-kit';

import Icon from 'react-native-vector-icons/Ionicons';


export class CheckboxScreen extends Component {

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
          <Text style={styles.titleText}>Basic checkbox</Text>
          <View style={styles.rowContainer}>
            <RkCheckbox checked={true}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Rounded</Text>
          <View style={styles.rowContainer}>
            <RkCheckbox style={styles.rounded} checked={true}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Colored</Text>
          <View style={styles.rowContainer}>
            <RkCheckbox style={[styles.rounded, styles.primaryBorder]} iconStyle={styles.primaryColor} checked={true}/>
            <RkCheckbox style={[styles.primaryBorder, styles.spaceAround]} checkedStyle={styles.primaryBg}
                        iconStyle={styles.whiteColor} checked={true}/>
            <RkCheckbox style={styles.primaryBorder} iconStyle={styles.primaryColor} checkedStyle={styles.warningBg}
                        underlayColor={RkConfig.colors.danger} checked={true}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Custom icons</Text>
          <View style={styles.rowContainer}>
            <RkCheckbox style={[styles.rounded, styles.primaryBorder, styles.bigOuter, styles.borderBolder]}
                        iconStyle={[styles.primaryColor, styles.bigInner]} icon='diamond' checked={true}
                        checkedIcon="star" checkedIconStyle={styles.dangerColor}/>
            <RkCheckbox style={[styles.rounded, styles.successBorder, styles.whiteBg, styles.bigOuter, styles.spaceAround, styles.borderBolder]}
                        iconStyle={[styles.dangerColor, styles.bigInner]} checkedStyle={styles.warningBg} icon='star'
                        checked={true}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Event example</Text>
          <View style={styles.rowContainer}>
            <RkCheckbox style={[styles.rounded, styles.primaryBorder]} iconStyle={styles.primaryColor} checked={true}
                        onChange={(checked) => {Alert.alert(checked ? "Checked" : "Unchecked")}}/>
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
  rowContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  spaceAround: {
    marginHorizontal: 5
  },
  rounded: {
    borderRadius: 20
  },
  primaryColor: {
    color: RkConfig.colors.primary
  },
  warningBg: {
    backgroundColor: RkConfig.colors.warning
  },
  whiteColor: {
    color: 'white'
  },
  dangerColor: {
    color: RkConfig.colors.danger
  },
  primaryBg: {
    backgroundColor: RkConfig.colors.primary
  },
  whiteBg: {
    backgroundColor: 'white'
  },
  primaryBorder: {
    borderColor: RkConfig.colors.primary
  },
  warningBorder: {
    borderColor: RkConfig.colors.warning
  },
  successBorder: {
    borderColor: RkConfig.colors.success
  },
  borderBolder: {
    borderWidth: 2,
  },
  bigOuter: {
    width: 40,
    height: 40,
  },
  bigInner: {
    fontSize: 26
  },
});
