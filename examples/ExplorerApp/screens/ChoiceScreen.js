import React, {Component} from 'react';

import {
  Platform,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';

import {RkText, RkChoiceGroup, RkChoice, RkTheme, RkSeparator} from 'react-native-ui-kitten';
import {UtilStyles} from '../style/styles';

import Icon from 'react-native-vector-icons/FontAwesome';


export class ChoiceScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      settingsOption: {
        index: 0,
        name: 'Option 1'
      }
    };
  }

  render() {
    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>
        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Classic selectable components</RkText>
          <View style={UtilStyles.columnContainer}>
            <View style={styles.componentRow}>
              <RkChoice/>
              <RkText rkType='bold' style={styles.caption}>Default</RkText>
            </View>
            <View style={styles.componentRow}>
              <RkChoice rkType='radio'/>
              <RkText rkType='bold' style={styles.caption}>Radio</RkText>
            </View>
            <View style={styles.componentRow}>
              <RkChoice rkType='clear' selected/>
              <RkText rkType='bold' style={styles.caption}>Clear</RkText>
            </View>
            <View style={styles.componentRow}>
              <RkChoice rkType='posNeg'/>
              <RkText rkType='bold' style={styles.caption}>Positive / Negative</RkText>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>Labels Example</RkText>
          <View style={[UtilStyles.columnContainer]}>
            <RkChoiceGroup rkType='bordered'>
              <TouchableOpacity choiceTrigger>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <RkText rkType='bold'>Label</RkText>
                  <RkChoice style={{marginLeft: 17}} rkType='posNeg'/>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>

          </View>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup rkType='bordered stretch' style={UtilStyles.spaceTop}>
              <TouchableOpacity choiceTrigger>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>
                  <View>
                    <RkText rkType='bold'>Hello</RkText>
                    <RkText>Click me!</RkText>
                  </View>
                  <RkChoice style={{alignSelf: 'center'}}/>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>

          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup rkType='stretch' style={UtilStyles.spaceTop}>
              <TouchableOpacity choiceTrigger>
                <View style={styles.checkRow}>
                  <RkText rkType='bold'>Label 1</RkText>
                  <RkChoice rkType='clear'/>
                </View>
              </TouchableOpacity>
              <RkSeparator/>
              <TouchableOpacity choiceTrigger>
                <View style={styles.checkRow}>
                  <RkText rkType='bold'>Label 2</RkText>
                  <RkChoice rkType='clear' selected/>
                </View>
              </TouchableOpacity>
              <RkSeparator/>
              <TouchableOpacity choiceTrigger>
                <View style={styles.checkRow}>
                  <RkText rkType='bold'>Label 3</RkText>
                  <RkChoice rkType='clear'/>
                </View>
              </TouchableOpacity>
              <RkSeparator/>
              <TouchableOpacity choiceTrigger>
                <View style={styles.checkRow}>
                  <RkText rkType='bold'>Label 4</RkText>
                  <RkChoice rkType='clear'/>
                </View>
              </TouchableOpacity>
              <RkSeparator/>
            </RkChoiceGroup>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>Radio components</RkText>
          <View style={UtilStyles.columnContainer}>
            <RkChoiceGroup radio>
              <TouchableOpacity choiceTrigger>
                <View style={[styles.radioRow, styles.spaceBottom]}>
                  <RkChoice rkType='radio'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 1</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 2</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={styles.radioRow}>
                  <RkChoice rkType='radio'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 3</RkText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View style={[styles.radioRow, styles.spaceTop]}>
                  <RkChoice rkType='radio'/>
                  <RkText rkType='bold' style={{marginLeft: 16.5}}>Option 4</RkText>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>
        <View>
          <RkSeparator/>
          <TouchableOpacity style={{padding: 23}} onPress={() => this.showSettingsScreen()}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <RkText>Setting Example</RkText>
              <View style={{flexDirection: 'row'}}>
                <RkText rkType='bold'>{this.state.settingsOption.name}</RkText>
                <Icon name={'angle-right'} size={20} style={{marginLeft: 16, opacity: 0.3}}/>
              </View>
            </View>
          </TouchableOpacity>
          <RkSeparator/>
        </View>
        <View style={UtilStyles.section}>
          <RkText rkType='header'>Disabled components</RkText>
          <View style={[UtilStyles.rowContainer]}>
            <View style={[UtilStyles.columnContainer, {flex: 1}]}>
              <View style={styles.componentRow}>
                <RkChoice disabled/>
                <RkText rkType='bold' style={styles.caption}>Default</RkText>
              </View>
              <View style={styles.componentRow}>
                <RkChoice rkType='radio' disabled/>
                <RkText rkType='bold' style={styles.caption}>Radio</RkText>
              </View>
              <View style={styles.componentRow}>
                <RkChoice rkType='posNeg' disabled/>
                <RkText rkType='bold' style={styles.caption}>Clear</RkText>
              </View>
            </View>
            <View style={[UtilStyles.columnContainer, {flex: 1}]}>
              <View style={styles.componentRow}>
                <RkChoice disabled selected/>
                <RkText rkType='bold' style={styles.caption}>Default</RkText>
              </View>
              <View style={styles.componentRow}>
                <RkChoice rkType='radio' disabled selected/>
                <RkText rkType='bold' style={styles.caption}>Radio</RkText>
              </View>
              <View style={styles.componentRow}>
                <RkChoice rkType='clear' disabled selected/>
                <RkText rkType='bold' style={styles.caption}>Clear</RkText>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  showSettingsScreen() {
    let param = {
      title: 'Settings',
      component: SettingsScreen,
    };

    let data = {
      option: this.state.settingsOption,
      onChange: (option) => {
        this.setState({
          settingsOption: option
        })
      }
    };

    if (Platform.OS === 'ios') {
      param.passProps = {};
      param.passProps.data = data;
    }
    else {
      param.data = data;
    }
    this.props.navigator.push(param);
  }
}

class SettingsScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          index: 0,
          name: "Option 1"
        },
        {
          index: 1,
          name: "Option 2"
        },
        {
          index: 2,
          name: "Option 3"
        }
      ]
    }
  }

  _change(index) {
    this.props.data.onChange(this.state.options[index]);
  }

  render() {

    let renderOption = (option, i) => (
      <View key={i}>
        <TouchableOpacity choiceTrigger >
          <View style={styles.checkRow}>
            <RkText rkType='bold'>{option.name}</RkText>
            <RkChoice rkType='clear'/>
          </View>
        </TouchableOpacity>
        <RkSeparator/>
      </View>);

    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>

        <View style={[UtilStyles.section,]}>
          <RkChoiceGroup selectedIndex={this.props.data.option.index} radio rkType='stretch'
                         onChange={(index) => this._change(index)}>
            {this.state.options.map(renderOption)}
          </RkChoiceGroup>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  componentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  caption: {
    marginLeft: 16
  },
  checkRow: {
    marginVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
    marginLeft: 16
  },
  radioRow: {
    flexDirection: 'row',
    marginVertical: 11,
    alignItems: 'center'
  },
  spaceBottom: {
    marginTop: 0,
    marginBottom: 11,
  },
  spaceTop: {
    marginTop: 11,
    marginBottom: 0,
  },
  settingsOption: {
    paddingVertical: 5,
    marginLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: RkTheme.current.colors.grey300,

  },
  typeText: {
    color: RkTheme.current.colors.grey500,
    textAlign: 'center'
  }
});
