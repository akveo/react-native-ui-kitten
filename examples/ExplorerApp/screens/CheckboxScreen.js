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
            <RkCheckbox style={[styles.rounded, RkStyle.blueBorder]} iconStyle={RkStyle.blueText} checked={true}/>
            <RkCheckbox style={[RkStyle.blueBorder, styles.spaceAround]} checkedStyle={RkStyle.blueBg}
                        iconStyle={RkStyle.whiteText} checked={true}/>
            <RkCheckbox style={RkStyle.blueBorder} iconStyle={RkStyle.blueText} checkedStyle={RkStyle.yellowBg}
                        underlayColor={RkConfig.colors.red} checked={true}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Custom icons</Text>
          <View style={styles.rowContainer}>
            <RkCheckbox style={[styles.rounded, RkStyle.blueBorder, styles.bigOuter, styles.borderBolder]}
                        iconStyle={[RkStyle.blueText, styles.bigInner]} icon='diamond' checked={true}
                        checkedIcon="star" checkedIconStyle={RkStyle.redText}/>
            <RkCheckbox style={[styles.rounded, RkStyle.greenBorder, RkStyle.whiteBg, styles.bigOuter, styles.spaceAround, styles.borderBolder]}
                        iconStyle={[RkStyle.redText, styles.bigInner]} checkedStyle={RkStyle.yellowBg} icon='star'
                        checked={true}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Event example</Text>
          <View style={styles.rowContainer}>
            <RkCheckbox style={[styles.rounded, RkStyle.blueBorder]} iconStyle={RkStyle.blueText} checked={true}
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
