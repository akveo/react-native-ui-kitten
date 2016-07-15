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

import {RkRadioButton, RkChoiceGroup, RkChoice, RkStyle, RkConfig, RkSeparator} from 'react-native-ui-kit';
import {UtilStyles} from '../utils/styles';

import Icon from 'react-native-vector-icons/Ionicons';
import AIcon from 'react-native-vector-icons/FontAwesome';


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
        style={[UtilStyles.container, {backgroundColor: RkConfig.colors.lightGray}]}
        automaticallyAdjustContentInsets={true}>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Classic selectable components</Text>
          <View style={[UtilStyles.rowContainer, {flex: 1,justifyContent: 'space-around', marginTop: 5}]}>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice/>
              </View>
              <Text style={styles.typeText}>default</Text>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice type='material' selected={true}/>
              </View>
              <Text style={styles.typeText}>material</Text>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice type='radio'/>
              </View>
              <Text style={styles.typeText}>radio</Text>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice type='posNeg'/>
              </View>
              <Text style={styles.typeText}>pos/neg</Text>
            </View>
            <View>
              <View style={{alignItems: 'center'}}>
                <RkChoice selected type='clear'/>
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
                                  style={[{borderWidth: 0.5, borderColor: RkConfig.colors.gray, borderRadius: 2}]}>
                  <View
                    style={{"flex": 1, "flexDirection": "row", "alignItems": "flex-end", paddingLeft: 5, paddingBottom: 3}}>
                    <Text>Label</Text>
                    <RkChoice style={UtilStyles.spaceH} type='posNeg'/>
                  </View>
                </TouchableOpacity>
              </RkChoiceGroup>
            </View>
          </View>
          <View style={{marginVertical: 20}}>
            <RkChoiceGroup>
              <TouchableOpacity choiceTrigger
                                style={[RkStyle.card.card, {borderWidth: 0.5, borderColor: RkConfig.colors.gray, borderRadius: 2}]}>
                <View style={RkStyle.card.header}>
                  <Image source={require('../img/animal.jpeg')} style={RkStyle.card.avatarSmallImg}/>
                  <View style={RkStyle.card.titleContainer}>
                    <Text style={RkStyle.card.title}>Sample User</Text>
                    <Text style={RkStyle.card.subTitle}>Hello, could you please...</Text>
                  </View>
                  <View style={RkStyle.card.headerControls}>
                    <RkChoice style={UtilStyles.spaceH} type='material'/>
                  </View>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <RkChoiceGroup type='clear'>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkConfig.colors.gray}]}>
                <View
                  style={{"flexDirection": "row", justifyContent: "space-between",  "alignItems": "flex-end", paddingVertical: 5}}>
                  <Text>Label 1</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkConfig.colors.gray}]}>
                <View
                  style={{"flexDirection": "row", justifyContent: "space-between",  "alignItems": "flex-end", paddingVertical: 5}}>
                  <Text>Label 2</Text>
                  <RkChoice selected style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkConfig.colors.gray}]}>
                <View
                  style={{"flexDirection": "row", justifyContent: "space-between",  "alignItems": "flex-end", paddingVertical: 5}}>
                  <Text>Label 3</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View
                  style={{"flexDirection": "row", justifyContent: "space-between",  "alignItems": "flex-end", paddingVertical: 5}}>
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
            <RkChoiceGroup type='radio' radio>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkConfig.colors.gray}]}>
                <View
                  style={{"flexDirection": "row", justifyContent: "space-between",  "alignItems": "flex-end", paddingVertical: 5}}>
                  <Text>Option 1</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkConfig.colors.gray}]}>
                <View
                  style={{"flexDirection": "row", justifyContent: "space-between",  "alignItems": "flex-end", paddingVertical: 5}}>
                  <Text>Option 2</Text>
                  <RkChoice selected style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger
                                style={[{borderBottomWidth: 0.5, borderBottomColor: RkConfig.colors.gray}]}>
                <View
                  style={{"flexDirection": "row", justifyContent: "space-between",  "alignItems": "flex-end", paddingVertical: 5}}>
                  <Text>Option 3</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity choiceTrigger>
                <View
                  style={{"flexDirection": "row", justifyContent: "space-between",  "alignItems": "flex-end", paddingVertical: 5}}>
                  <Text>Option 4</Text>
                  <RkChoice style={UtilStyles.spaceAround}/>
                </View>
              </TouchableOpacity>
            </RkChoiceGroup>
          </View>
        </View>
        <View style={[UtilStyles.section, {paddingVertical: 7}]}>
          <TouchableOpacity onPress={()=>this.showSettingsScreen()}>
            <View style={styles.componentRow}>
              <Text style={{fontSize: 16}}>Settings example</Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{marginRight: 7, color: RkConfig.colors.gray, alignSelf: 'center'}}>{this.state.settingsOption.name}</Text>
                <AIcon name={'angle-right'} size={20} style={RkStyle.grayText}/></View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Disabled components</Text>
          <RkChoiceGroup disabled>
            <View style={[UtilStyles.rowContainer, {flex: 1,justifyContent: 'space-around', marginTop: 5}]}>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice/>
                </View>
                <Text style={styles.typeText}>default</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice type='material'/>
                </View>
                <Text style={styles.typeText}>material</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice type='radio'/>
                </View>
                <Text style={styles.typeText}>radio</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice type='posNeg'/>
                </View>
                <Text style={styles.typeText}>pos/neg</Text>
              </View>
              <View>
                <View style={{alignItems: 'center'}}>
                  <RkChoice selected type='clear'/>
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
      <TouchableOpacity key={i} underlayColor={RkConfig.colors.lightGray} choiceTrigger>
        <View style={[styles.settingsOption, i === this.state.options.length - 1 ? {borderBottomWidth: 0} : {}]}>
          <Text style={{fontSize: 14}}>{option.name}</Text>
          <RkChoice/>
        </View>
      </TouchableOpacity>);

    return (
      <ScrollView
        style={[UtilStyles.container, {backgroundColor: RkConfig.colors.lightGray}]}
        automaticallyAdjustContentInsets={true}>
        <View style={[UtilStyles.section, {paddingVertical: 0, paddingHorizontal: 0}]}>
          <RkChoiceGroup selectedIndex={this.props.option.index} radio type='clear'
                         onChange={(index)=>this._change(index)}>
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
    borderBottomColor: RkConfig.colors.lightGray,

  },
  typeText: {
    color: RkConfig.colors.gray,
    textAlign: 'center'
  }
});
