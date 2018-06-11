import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {UtilStyles} from '../style/styles';
import {
  RkText,
  RkChoiceGroup,
  RkChoice, RkTheme,
} from 'react-native-ui-kitten';

export class ChoiceCustomizationScreen extends Component {
  static navigationOptions = {
    title: 'Customization examples'
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>

        <RkChoiceGroup rkType='stretch' style={UtilStyles.spaceTop}>
          <TouchableOpacity choiceTrigger>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 1</RkText>
              <RkChoice selected rkType='posNeg magentaCyan'/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity choiceTrigger>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 2</RkText>
              <RkChoice rkType='posNegClearCheck'/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity choiceTrigger>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 3</RkText>
              <RkChoice selected rkType='clear' style={{borderWidth:1, borderRadius: 20, borderColor: '#da7b00'}} contentStyle={{tintColor: '#ff9102'}}/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity choiceTrigger>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 4</RkText>
              <RkChoice selected rkType='whiteGreenCheck' selected/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity choiceTrigger>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 5</RkText>
              <RkChoice selected rkType='star' />
            </View>
          </TouchableOpacity>

          <TouchableOpacity choiceTrigger>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 6</RkText>
              <RkChoice selected rkType='rainbowCat'/>
            </View>
          </TouchableOpacity>

          <TouchableOpacity choiceTrigger>
            <View style={styles.checkRow}>
              <RkText rkType='bold'>Example 7</RkText>
              <RkChoice selected style={{backgroundColor: 'transparent', borderWidth:0}} renderContentFunction={(args) => this._renderCustomContent(args)}/>
            </View>
          </TouchableOpacity>
        </RkChoiceGroup>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Radio components 1</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup radio selectedIndex={0}>
              <TouchableOpacity choiceTrigger>
                <View style={[styles.radioRow, styles.spaceBottom]}>
                  <RkChoice rkType='radio' contentStyle={{tintColor: 'magenta'}}/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 1</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={[styles.radioRow, styles.spaceBottom]}>
                  <RkChoice rkType='radio' contentStyle={{tintColor: 'magenta'}}/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 2</RkText>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Radio components 2</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup radio selectedIndex={0}>
              <TouchableOpacity choiceTrigger>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio squadRadio' />
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 1</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio squadRadio' />
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 2</RkText>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Radio components 3</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup radio selectedIndex={0}>
              <TouchableOpacity choiceTrigger>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio kitten'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 1</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio kitten'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 2</RkText>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Radio components 4</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup radio selectedIndex={0}>
              <TouchableOpacity choiceTrigger>
                <View style={[styles.radioRow, styles.spaceBottom]}>
                  <RkChoice rkType='radio smileColor'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 1</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio smileColor'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 2</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio smileColor'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 3</RkText>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>
      </ScrollView>
    );
  }

  _renderCustomContent(args) {
    if (args.isSelected) {
      return <View style={{flexDirection: 'row'}}><ActivityIndicator/><RkText style={{marginLeft: 4}}>Hello custom content!</RkText></View>;
    } else {
      <View/>
    }
  }
}

const styles = StyleSheet.create({
  checkRow: {
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
    paddingLeft: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: RkTheme.current.colors.border.base,
    alignItems: 'center'
  },
  radioRow: {
    flexDirection: 'row',
    marginVertical: 11,
    alignItems: 'center'
  },
});