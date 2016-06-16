import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import {RkRadioButton, RkRadioGroup, RkConfig} from 'react-native-ui-kit';

import Icon from 'react-native-vector-icons/Ionicons';


export class RadioScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.titleText}>Classic radio</Text>
          <View style={styles.rowContainer}>
            <RkRadioGroup selectedIndex={0}>
              <View style={styles.rowRadio}>
                <RkRadioButton type={'classic'}/>
                <RkRadioButton type={'classic'} style={styles.spaceAround}/>
                <RkRadioButton type={'classic'}/>
              </View>
            </RkRadioGroup>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Customizable classic</Text>
          <View style={styles.rowContainer}>
            <RkRadioGroup selectedIndex={0}>
              <View style={styles.rowRadio}>
                <RkRadioButton type={'classic'} style={styles.dangerBorder} innerStyle={styles.dangerBg}
                               selectedStyle={styles.successBorder} innerSelectedStyle={styles.successBg}/>
                <RkRadioButton type={'classic'} style={[styles.dangerBorder, styles.spaceAround]}
                               innerStyle={styles.dangerBg}
                               selectedStyle={styles.successBorder} innerSelectedStyle={styles.successBg}/>
                <RkRadioButton type={'classic'} style={styles.dangerBorder} innerStyle={styles.dangerBg}
                               selectedStyle={styles.successBorder} innerSelectedStyle={styles.successBg}/>
              </View>
            </RkRadioGroup>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>With icons</Text>
          <View style={styles.rowContainer}>
            <RkRadioGroup selectedIndex={0}>
              <View style={styles.rowRadio}>
                <RkRadioButton icon={'md-checkmark'}
                               style={styles.exampleIcon}
                               innerSelectedStyle={{color: RkConfig.colors.primary, fontSize: 20}}/>
                <RkRadioButton icon={'md-checkmark'}
                               style={[styles.exampleIcon, styles.spaceAround]}
                               innerSelectedStyle={{color: RkConfig.colors.primary, fontSize: 20}}/>
                <RkRadioButton icon={'md-checkmark'}
                               style={styles.exampleIcon}
                               innerSelectedStyle={{color: RkConfig.colors.primary, fontSize: 20, }}/>
              </View>
            </RkRadioGroup>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Labels example</Text>
          <View style={styles.rowContainer}>
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
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{color: RkConfig.colors.danger}} iconUnchecked={'md-close'}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.success}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 2</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{color: RkConfig.colors.danger}} iconUnchecked={'md-close'}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.success}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 3</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{color: RkConfig.colors.danger}} iconUnchecked={'md-close'}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.success}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity radioTrigger={true}>
                  <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center", padding: 5}}>
                    <Text>Option 4</Text>
                    <RkRadioButton style={{marginLeft: 10}} innerStyle={{color: RkConfig.colors.danger}} iconUnchecked={'md-close'}
                                   innerSelectedStyle={{fontSize: 16, color: RkConfig.colors.success}}
                                   icon={'md-checkmark'}/>
                  </View>
                </TouchableOpacity>
              </RkRadioGroup>
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
  exampleIcon: {
    width: 25,
    height: 25,
    padding: 5,
    borderWidth: 1,
    borderColor: RkConfig.colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  }
});
