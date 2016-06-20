import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';

import {RkCheckbox, RkStyle, RkConfig} from 'react-native-ui-kit';

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
            <RkCheckbox style={[styles.rounded, RkStyle.primaryBorder]} iconStyle={RkStyle.primaryText} checked={true}/>
            <RkCheckbox style={[RkStyle.primaryBorder, styles.spaceAround]} checkedStyle={RkStyle.primaryBg}
                        iconStyle={RkStyle.whiteText} checked={true}/>
            <RkCheckbox style={RkStyle.primaryBorder} iconStyle={RkStyle.primaryText} checkedStyle={RkStyle.darkWarningBg}
                        underlayColor={RkConfig.colors.danger} checked={true}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Custom icons</Text>
          <View style={styles.rowContainer}>
            <RkCheckbox style={[styles.rounded, RkStyle.primaryBorder, styles.bigOuter, styles.borderBolder]}
                        iconStyle={[RkStyle.primaryText, styles.bigInner]} icon='diamond' checked={true}
                        checkedIcon="star" checkedIconStyle={RkStyle.dangerText}/>
            <RkCheckbox style={[styles.rounded, RkStyle.successBorder, RkStyle.whiteBg, styles.bigOuter, styles.spaceAround, styles.borderBolder]}
                        iconStyle={[RkStyle.dangerText, styles.bigInner]} checkedStyle={RkStyle.darkWarningBg} icon='star'
                        checked={true}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Event example</Text>
          <View style={styles.rowContainer}>
            <RkCheckbox style={[styles.rounded, RkStyle.primaryBorder]} iconStyle={RkStyle.primaryText} checked={true}
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
