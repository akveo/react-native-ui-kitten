import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight
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
          <View style={UtilStyles.rowContainer}>
            <View style={[styles.rowRadio, {flex: 1,justifyContent: 'space-around', marginTop: 5}]}>
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
                  <RkChoice innerStyle={{textAlign: 'center'}} type='posNeg'/>
                </View>
                <Text style={styles.typeText}>pos/neg</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Labels Example</Text>
          <View style={UtilStyles.rowContainer}>
            <View style={styles.rowRadio}>
              <RkChoiceGroup>
                <TouchableOpacity radioTrigger>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Label</Text>
                    <RkChoice type='posNeg' selected={true}/>
                  </View>
                </TouchableOpacity>
              </RkChoiceGroup>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }


  render2() {
    return (
      <ScrollView
        style={[UtilStyles.container, {backgroundColor: RkConfig.colors.lightGray}]}
        automaticallyAdjustContentInsets={true}>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Classic radio</Text>
          <View style={UtilStyles.rowContainer}>
            <RkRadioGroup selectedIndex={0}>
              <View style={styles.rowRadio}>
                <RkRadioButton type={'classic'}/>
                <RkRadioButton type={'classic'} style={styles.spaceAround}/>
                <RkRadioButton type={'classic'}/>
              </View>
            </RkRadioGroup>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Customizable classic</Text>
          <View style={UtilStyles.rowContainer}>
            <RkRadioGroup selectedIndex={0}>
              <View style={styles.rowRadio}>
                <RkRadioButton type={'classic'} style={RkStyle.dangerBorder} innerStyle={RkStyle.dangerBg}
                               selectedStyle={RkStyle.successBorder} innerSelectedStyle={RkStyle.successBg}/>
                <RkRadioButton type={'classic'} style={[RkStyle.dangerBorder, styles.spaceAround]}
                               innerStyle={RkStyle.dangerBg}
                               selectedStyle={RkStyle.successBorder} innerSelectedStyle={RkStyle.successBg}/>
                <RkRadioButton type={'classic'} style={RkStyle.dangerBorder} innerStyle={RkStyle.dangerBg}
                               selectedStyle={RkStyle.successBorder} innerSelectedStyle={RkStyle.successBg}/>
              </View>
            </RkRadioGroup>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>With icons</Text>
          <View style={UtilStyles.rowContainer}>
            <RkRadioGroup selectedIndex={0}>
              <View style={styles.rowRadio}>
                <RkRadioButton icon={'md-checkmark'}
                               style={[RkStyle.rounded, styles.exampleIcon]}
                               innerSelectedStyle={{color: RkConfig.colors.primary, fontSize: 20}}/>
                <RkRadioButton icon={'md-checkmark'}
                               style={[styles.exampleIcon, styles.spaceAround, RkStyle.rounded]}
                               innerSelectedStyle={{color: RkConfig.colors.primary, fontSize: 20}}/>
                <RkRadioButton icon={'md-checkmark'}
                               style={[RkStyle.rounded, styles.exampleIcon]}
                               innerSelectedStyle={{color: RkConfig.colors.primary, fontSize: 20, }}/>
              </View>
            </RkRadioGroup>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Labels example</Text>
          <View style={UtilStyles.rowContainer}>
            <View>
              <RkRadioGroup selectedIndex={0}>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 1</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{width: 10}}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.primary}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 2</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{width: 10}}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.primary}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 3</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{width: 10}}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.primary}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 4</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{width: 10}}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.primary}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
              </RkRadioGroup>
            </View>
            <View style={{marginLeft: 20}}>
              <RkRadioGroup selectedIndex={0}>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 1</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{color: RkConfig.colors.danger}}
                                   iconUnchecked={'md-close'}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.success}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 2</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{color: RkConfig.colors.danger}}
                                   iconUnchecked={'md-close'}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.success}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 3</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{color: RkConfig.colors.danger}}
                                   iconUnchecked={'md-close'}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.success}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 4</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{color: RkConfig.colors.danger}}
                                   iconUnchecked={'md-close'}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.success}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
              </RkRadioGroup>
            </View>
          </View>
        </View>
        <View style={[UtilStyles.section, {paddingVertical: 7}]}>
          <TouchableOpacity onPress={()=>this.showSettingsScreen()}>
            <View style={styles.componentRow}>
              <Text style={{fontSize: 16}}>Settings</Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{marginRight: 7, color: RkConfig.colors.gray, alignSelf: 'center'}}>{this.state.settingsOption.name}</Text>
                <AIcon name={'angle-right'} size={20} style={RkStyle.grayText}/></View>
            </View>
          </TouchableOpacity>
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
    return (
      <ScrollView
        style={[UtilStyles.container, {backgroundColor: RkConfig.colors.lightGray}]}
        automaticallyAdjustContentInsets={true}>
        <View style={[UtilStyles.section, {paddingVertical: 0, paddingHorizontal: 0}]}>
          <RkRadioGroup selectedIndex={this.props.option.index} onChange={(index)=>this._change(index)}>
            <TouchableHighlight underlayColor={RkConfig.colors.lightGray} radioTrigger={true}>
              <View style={styles.settingsOption}>
                <Text style={{fontSize: 16}}>{this.state.options[0].name}</Text>
                <RkRadioButton
                  innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.primary}}
                  icon={'md-checkmark'}/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={RkConfig.colors.lightGray} radioTrigger={true}>
              <View style={styles.settingsOption}>
                <Text style={{fontSize: 16}}>{this.state.options[1].name}</Text>
                <RkRadioButton
                  innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.primary}}
                  icon={'md-checkmark'}/>
              </View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={RkConfig.colors.lightGray} radioTrigger={true}>
              <View style={[styles.settingsOption, {borderBottomWidth: 0}]}>
                <Text style={{fontSize: 16}}>{this.state.options[2].name}</Text>
                <RkRadioButton
                  innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.primary}}
                  icon={'md-checkmark'}/>
              </View>
            </TouchableHighlight>
          </RkRadioGroup>
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
    paddingVertical: 7,
    marginLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: RkConfig.colors.lightGray,

  },
  rowRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  spaceAround: {
    marginHorizontal: 5
  },
  exampleIcon: {
    width: 25,
    height: 25,
    padding: 5,
    borderWidth: 1,
    borderColor: RkConfig.colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  typeText: {
    color: RkConfig.colors.gray,
    textAlign: 'center'
  }
});
