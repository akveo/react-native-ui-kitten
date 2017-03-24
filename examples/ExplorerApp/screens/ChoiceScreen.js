import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  Image
} from 'react-native';

import {RkRadioButton, RkChoiceGroup, RkChoice, RkTheme, RkCard} from 'react-native-ui-kitten';
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
        style={[UtilStyles.container, {backgroundColor: RkTheme.colors.primary}]}
        automaticallyAdjustContentInsets={true}>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Classic selectable components</Text>
          <View style={[UtilStyles.rowContainer, {flex: 1, justifyContent: 'space-around', marginTop: 5}]}>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice/>
              </View>
              <Text style={styles.typeText}>default</Text>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice rkType='material' rkSelectedType='materialSelected' selected={true}/>
              </View>
              <Text style={styles.typeText}>material</Text>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice rkType='radio'/>
              </View>
              <Text style={styles.typeText}>radio</Text>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice rkType='posNeg'/>
              </View>
              <Text style={styles.typeText}>pos/neg</Text>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice selected rkType='clear'/>
              </View>
              <Text style={styles.typeText}>clear</Text>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Labels Example</Text>
          <View style={{marginTop: 5, alignItems: 'flex-start'}}>
            <View>
              <RkChoiceGroup>
                <TouchableOpacity choiceTrigger
                                  style={[{
                                    marginLeft: 5,
                                    borderWidth: 0.5,
                                    borderColor: RkTheme.current.colors.grey500,
                                    borderRadius: 2
                                  }]}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 5
                    }}>
                    <Text>Label</Text>
                    <RkChoice style={UtilStyles.spaceH} rkType='posNeg'/>
                  </View>
                </TouchableOpacity>
              </RkChoiceGroup>
            </View>
          </View>
          <View style={{marginVertical: 20}}>
            <RkChoiceGroup>
              <TouchableOpacity choiceTrigger>
                <RkCard rkType="material">
                  <View rkCardHeader>
                    <View>
                      <Text rkCardTitle>Hello</Text>
                      <Text rkCardSubTitle>Click me!</Text>
                    </View>
                    <RkChoice style={{alignSelf: 'flex-start'}} rkType='material'/>
                  </View>
                </RkCard>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <RkChoiceGroup rkType='clear'>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkTheme.current.colors.grey500}]}>
                <View
                  style={{
                    "flexDirection": "row",
                    justifyContent: "space-between",
                    "alignItems": "flex-end",
                    paddingVertical: 5
                  }}>
                  <Text>Label 1</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkTheme.current.colors.grey500}]}>
                <View
                  style={{
                    "flexDirection": "row",
                    justifyContent: "space-between",
                    "alignItems": "flex-end",
                    paddingVertical: 5
                  }}>
                  <Text>Label 2</Text>
                  <RkChoice selected style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkTheme.current.colors.grey500}]}>
                <View
                  style={{
                    "flexDirection": "row",
                    justifyContent: "space-between",
                    "alignItems": "flex-end",
                    paddingVertical: 5
                  }}>
                  <Text>Label 3</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View
                  style={{
                    "flexDirection": "row",
                    justifyContent: "space-between",
                    "alignItems": "flex-end",
                    paddingVertical: 5
                  }}>
                  <Text>Label 4</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Radio example</Text>
          <View style={{alignItems: 'flex-start'}}>
            <RkChoiceGroup rkType='radio' radio>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkTheme.current.colors.grey500}]}>
                <View
                  style={{
                    "flexDirection": "row",
                    justifyContent: "space-between",
                    "alignItems": "flex-end",
                    paddingVertical: 5
                  }}>
                  <Text>Option 1</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkTheme.current.colors.grey500}]}>
                <View
                  style={{
                    "flexDirection": "row",
                    justifyContent: "space-between",
                    "alignItems": "flex-end",
                    paddingVertical: 5
                  }}>
                  <Text>Option 2</Text>
                  <RkChoice selected style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkTheme.current.colors.grey500}]}>
                <View
                  style={{
                    "flexDirection": "row",
                    justifyContent: "space-between",
                    "alignItems": "flex-end",
                    paddingVertical: 5
                  }}>
                  <Text>Option 3</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View
                  style={{
                    "flexDirection": "row",
                    justifyContent: "space-between",
                    "alignItems": "flex-end",
                    paddingVertical: 5
                  }}>
                  <Text>Option 4</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Custom content</Text>
          <View style={[UtilStyles.rowContainer, {flex: 1, justifyContent: 'space-around', marginTop: 5}]}>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice
                  style={{
                    borderWidth: 0
                  }}
                  innerStyle={{
                    width: 90,
                    height: 25,
                    textAlign: 'center'
                  }}
                  innerStyleDisabled={{
                    color: RkTheme.colors.grey300
                  }}
                  contentSelected={<Text>CHECKED</Text>}
                  contentSelectedDisabled={<Text>CHECKED</Text>}
                  content={<Text>UNCHECKED</Text>}
                  contentDisabled={<Text>UNCHECKED</Text>}
                />
              </View>
              <Text style={styles.typeText}>text content</Text>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice
                  selected
                  style={{
                    borderWidth: 0
                  }}
                  innerStyle={{
                    color: RkTheme.colors.orange500,
                    fontSize: 22,
                    height: 25,
                    width: 25,
                    textAlign: 'center'
                  }}
                  innerStyleDisabled={{
                    color: RkTheme.colors.grey300
                  }}
                  contentSelected={<Icon name={'star'}/>}
                  content={<Text/>}
                  contentSelectedDisabled={<Icon name={'star'}/>}
                  contentDisabled={<Text/>}
                />
              </View>
              <Text style={styles.typeText}>icon content</Text>
            </View>
          </View>
        </View>
        <View style={[UtilStyles.section, {paddingVertical: 7}]}>
          <TouchableOpacity onPress={() => this.showSettingsScreen()}>
            <View style={styles.componentRow}>
              <Text style={{fontSize: 16}}>Settings example</Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginRight: 7,
                    color: RkTheme.current.colors.grey500,
                    alignSelf: 'center'
                  }}>{this.state.settingsOption.name}</Text>
                <Icon name={'angle-right'} size={20} style={RkTheme.styles.grayText}/></View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Disabled components</Text>
          <RkChoiceGroup disabled>
            <View style={[UtilStyles.rowContainer, {flex: 1, justifyContent: 'space-around', marginTop: 5}]}>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice/>
                </View>
                <Text style={styles.typeText}>default</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice rkType='material'/>
                </View>
                <Text style={styles.typeText}>material</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice rkType='radio'/>
                </View>
                <Text style={styles.typeText}>radio</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice rkType='posNeg'/>
                </View>
                <Text style={styles.typeText}>pos/neg</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice rkType='clear'/>
                </View>
                <Text style={styles.typeText}>clear</Text>
              </View>
            </View>
          </RkChoiceGroup>
          <Text style={[UtilStyles.titleText, {marginTop: 10}]}>Selected & Disabled components</Text>
          <RkChoiceGroup disabled>
            <View style={[UtilStyles.rowContainer, {flex: 1, justifyContent: 'space-around', marginTop: 5}]}>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice selected/>
                </View>
                <Text style={styles.typeText}>default</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice selected rkType='material'/>
                </View>
                <Text style={styles.typeText}>material</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice selected rkType='radio'/>
                </View>
                <Text style={styles.typeText}>radio</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice selected rkType='posNeg'/>
                </View>
                <Text style={styles.typeText}>pos/neg</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice selected rkType='clear'/>
                </View>
                <Text style={styles.typeText}>clear</Text>
              </View>
            </View>
          </RkChoiceGroup>
        </View>
      </ScrollView>
    );
  }


  showSettingsScreen() {
    this.props.navigator.push({
      title: 'Settings',
      component: SettingsScreen,
      passProps: {
        option: this.state.settingsOption,
        onChange: (option) => {
          this.setState({
            settingsOption: option
          })
        }
      }
    });
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
    this.props.onChange(this.state.options[index]);
  }

  render() {

    let renderOption = (option, i) => (
      <TouchableOpacity key={i} underlayColor={RkTheme.current.colors.grey300} choiceTrigger>
        <View style={[styles.settingsOption, i === this.state.options.length - 1 ? {borderBottomWidth: 0} : {}]}>
          <Text style={{fontSize: 14}}>{option.name}</Text>
          <RkChoice/>
        </View>
      </TouchableOpacity>);

    return (
      <ScrollView
        style={[UtilStyles.container, {backgroundColor: RkTheme.current.colors.grey300}]}
        automaticallyAdjustContentInsets={true}>
        <View style={[UtilStyles.section, {paddingVertical: 0, paddingHorizontal: 0}]}>
          <RkChoiceGroup selectedIndex={this.props.option.index} radio rkType='clear'
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
    justifyContent: 'space-between',
    alignItems: 'center'
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
