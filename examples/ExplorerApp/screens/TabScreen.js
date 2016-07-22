import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  Dimensions,
  StatusBar
} from 'react-native';

import {RkButton, RkConfig, RkStyle, RkTabView} from 'react-native-ui-kit';

import {UtilStyles} from '../utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';

export class TabScreen extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={[UtilStyles.container, {backgroundColor: RkConfig.colors.lightGray}]}>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Basic example</Text>
          <View style={UtilStyles.rowContainer}>
            <RkTabView>
              <RkTabView.Tab title={'Tab 1'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 1 Content</Text>
                  <Text style={{textAlign: 'center'}}>Tab 1 Content</Text>
                  <Text style={{textAlign: 'center'}}>Tab 1 Content</Text>
                  <Text style={{textAlign: 'center'}}>Tab 1 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 2'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 2 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 3'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 3 Content</Text>
                </View>
              </RkTabView.Tab>
            </RkTabView>
          </View>
        </View>
        <View style={[UtilStyles.section, {paddingHorizontal: 0, paddingTop: 0}]}>
          <Text
            style={[UtilStyles.titleText, {paddingHorizontal: 25, paddingVertical: 10, backgroundColor: RkConfig.colors.cyan, color: 'white'}]}>
            Material theme example
          </Text>
          <View style={[UtilStyles.rowContainer, {marginTop: 0}]}>
            <RkTabView type='material' style={{backgroundColor: RkConfig.colors.cyan}}>
              {this._renderMaterialTab('1')}
              {this._renderMaterialTab('2')}
              {this._renderMaterialTab('3')}
            </RkTabView>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Custom tab title</Text>
          <View style={UtilStyles.rowContainer}>
            <RkTabView>
              <RkTabView.Tab title={(selected) => this._renderCustomTab(selected, 'ios-apps', 'Apps')}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 1 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={(selected) => this._renderCustomTab(selected, 'ios-bowtie', 'Bowtie')}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 2 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={(selected) => this._renderCustomTab(selected, 'ios-cloud', 'Cloud')}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 3 Content</Text>
                </View>
              </RkTabView.Tab>
            </RkTabView>
          </View>
        </View>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Scrollable Header</Text>
          <View style={UtilStyles.rowContainer}>
            <RkTabView maxVisibleTabs={3}>
              <RkTabView.Tab title={'Tab 1'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 1 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 2'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 2 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 3'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 3 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 4'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 4 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 5'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 5 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 6'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={{textAlign: 'center'}}>Tab 6 Content</Text>
                </View>
              </RkTabView.Tab>
            </RkTabView>
          </View>
        </View>
      </ScrollView>
    )
  }

  _renderCustomTab(selected, tabIcon, tabName) {
    return (
      <View
        style={{
          alignItems: 'center',
          padding: 5,
          borderBottomWidth: 2,
          borderBottomColor: RkConfig.colors.danger,
          backgroundColor : selected ?  RkConfig.colors.danger : 'white'}}>
        <Text style={{textAlign: 'center', color: selected? 'white' : RkConfig.colors.danger, flexDirection: 'row'}}>
          <Icon style={{fontSize: 18}} name={tabIcon}/>
          <Text style={{fontSize: 18}}> {tabName}</Text>
        </Text>
      </View>
    )
  }

  _renderMaterialTab(tab) {
    return (
      <RkTabView.Tab
        style={{backgroundColor: RkConfig.colors.cyan, borderBottomColor: RkConfig.colors.lightGray}}
        styleSelected={{backgroundColor: RkConfig.colors.cyan, borderBottomColor: RkConfig.colors.warning}}
        innerStyle={{color: 'white'}}
        innerStyleSelected={{color: RkConfig.colors.warning}}
        title={'Tab ' + tab}>
        <View style={{flex: 1, paddingVertical: 15, backgroundColor: 'white'}}>
          <Text style={{textAlign: 'center'}}>Tab {tab} Content</Text>
        </View>
      </RkTabView.Tab>
    )
  }


}