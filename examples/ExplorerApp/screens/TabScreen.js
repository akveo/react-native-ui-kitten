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
        style={[UtilStyles.container, {backgroundColor: RkConfig.colors.grey300}]}>
        <View style={UtilStyles.section}>
          <Text style={UtilStyles.titleText}>Basic example</Text>
          <View style={UtilStyles.rowContainer}>
            <RkTabView>
              <RkTabView.Tab title={'Tab 1'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={UtilStyles.tabContent}>Tab 1 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 2'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={UtilStyles.tabContent}>Tab 2 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 3'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={UtilStyles.tabContent}>Tab 3 Content</Text>
                </View>
              </RkTabView.Tab>
            </RkTabView>
          </View>
        </View>
        <View style={[UtilStyles.section, {paddingHorizontal: 0, paddingTop: 0}]}>
          <Text
            style={[UtilStyles.titleText, {paddingHorizontal: 25, paddingVertical: 10, backgroundColor: RkConfig.colors.cyan500, color: 'white'}]}>
            Material theme example
          </Text>
          <View style={[UtilStyles.rowContainer, {marginTop: 0}]}>
            <RkTabView rkType='material' style={{backgroundColor: RkConfig.colors.cyan500}}>
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
                  <Text style={UtilStyles.tabContent}>Tab 1 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={(selected) => this._renderCustomTab(selected, 'ios-bowtie', 'Bowtie')}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={UtilStyles.tabContent}>Tab 2 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={(selected) => this._renderCustomTab(selected, 'ios-cloud', 'Cloud')}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={UtilStyles.tabContent}>Tab 3 Content</Text>
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
                  <Text style={UtilStyles.tabContent}>Tab 1 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 2'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={UtilStyles.tabContent}>Tab 2 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 3'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={UtilStyles.tabContent}>Tab 3 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 4'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={UtilStyles.tabContent}>Tab 4 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 5'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={UtilStyles.tabContent}>Tab 5 Content</Text>
                </View>
              </RkTabView.Tab>
              <RkTabView.Tab title={'Tab 6'}>
                <View style={{flex: 1, paddingVertical: 15}}>
                  <Text style={UtilStyles.tabContent}>Tab 6 Content</Text>
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
          borderBottomColor: RkConfig.colors.red500,
          backgroundColor : selected ?  RkConfig.colors.red500 : 'white'}}>
        <Text style={{textAlign: 'center', color: selected? 'white' : RkConfig.colors.red500, flexDirection: 'row'}}>
          <Icon style={{fontSize: 18}} name={tabIcon}/>
          <Text style={{fontSize: 18}}> {tabName}</Text>
        </Text>
      </View>
    )
  }

  _renderMaterialTab(tab) {
    return (
      <RkTabView.Tab
        style={{backgroundColor: RkConfig.colors.cyan500, borderBottomColor: RkConfig.colors.grey300}}
        styleSelected={{backgroundColor: RkConfig.colors.cyan500, borderBottomColor: RkConfig.colors.yellow500}}
        innerStyle={{color: 'white'}}
        innerStyleSelected={{color: RkConfig.colors.yellow500}}
        title={'Tab ' + tab}>
        <View style={{flex: 1, paddingVertical: 15, backgroundColor: 'white'}}>
          <Text style={UtilStyles.tabContent}>Tab {tab} Content</Text>
        </View>
      </RkTabView.Tab>
    )
  }


}