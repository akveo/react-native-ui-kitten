import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  Dimensions,
  StatusBar,
  Image
} from 'react-native';

import {RkText, RkTheme, RkTabView} from 'react-native-ui-kitten';

import {UtilStyles} from '../style/styles';
import {ImageIcon} from '../components/imageIcon'
import Icon from 'react-native-vector-icons/FontAwesome';

export class TabScreen extends Component {
  static navigationOptions = {
    title: 'Tabs'
  };

  constructor(props) {
    super(props);
    this.state={text:'Tab 1 Selected'}
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>
        <View style={[UtilStyles.section, UtilStyles.bordered, styles.tabContainer]}>
          <RkText rkType='header' style={styles.header}>Basic example</RkText>
          <View style={UtilStyles.rowContainer}>
            <RkTabView>
              <RkTabView.Tab title={'Tab 1'}/>
              <RkTabView.Tab title={'Tab 2'}/>
              <RkTabView.Tab title={'Tab 3'}/>
            </RkTabView>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered, styles.tabContainer]}>
          <RkText rkType='header' style={styles.header}>Material Theme Example</RkText>
          <View style={UtilStyles.rowContainer}>
            <RkTabView rkType="material" tabsUnderContent index='1'>
              <RkTabView.Tab title={'TAB 1'}>
                <Image source={require('../img/river.jpeg')}/>
              </RkTabView.Tab>
              <RkTabView.Tab title={'TAB 2'}>
                <Image source={require('../img/sea.jpg')}/>
              </RkTabView.Tab>
              <RkTabView.Tab title={'TAB 3'}>
                <Image source={require('../img/sun.jpg')}/>
              </RkTabView.Tab>
            </RkTabView>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered, styles.tabContainer]}>
          <View >
            <RkTabView rkType="material">
              <RkTabView.Tab title={(selected) => {
                return this._renderMaterialTab(selected, 'TAB 1', (<ImageIcon name='phone'/>))}}/>
              <RkTabView.Tab title={(selected) => {
                return this._renderMaterialTab(selected, 'TAB 2', (<ImageIcon name='heart'/>))
              }}/>
              <RkTabView.Tab title={(selected) => {
                return this._renderMaterialTab(selected, 'TAB 3', (<ImageIcon name='user'/>))
              }}/>
            </RkTabView>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered, styles.tabContainer]}>
          <RkText rkType='header' style={styles.header}>{this.state.text}</RkText>
          <View style={UtilStyles.rowContainer}>
            <RkTabView onTabChanged={(id) => this.setState({text:'Tab ' + (id + 1) + ' Selected'})}>
              <RkTabView.Tab title={(selected) => {
                return this._renderCustomTab(selected, 'Tab 1', 'paw')
              }}/>
              <RkTabView.Tab title={(selected) => {
                return this._renderCustomTab(selected, 'Tab 2', 'leaf')
              }}/>
              <RkTabView.Tab title={(selected) => {
                return this._renderCustomTab(selected, 'Tab 3', 'rocket')
              }}/>
            </RkTabView>
          </View>
        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered, styles.tabContainer]}>
          <RkText rkType='header' style={styles.header}>Scrollable Header</RkText>
          <View style={UtilStyles.rowContainer}>
            <RkTabView rkType='noBorders' maxVisibleTabs={3}>
              <RkTabView.Tab title={(selected) => {
                return this._renderScrollableTab(selected, 'Tab 1', 'first')
              }}/>
              <RkTabView.Tab title={(selected) => {
                return this._renderScrollableTab(selected, 'Tab 2')
              }}/>
              <RkTabView.Tab title={(selected) => {
                return this._renderScrollableTab(selected, 'Tab 3')
              }}/>
              <RkTabView.Tab title={(selected) => {
                return this._renderScrollableTab(selected, 'Tab 4', 'last')
              }}/>
            </RkTabView>
          </View>
        </View>
      </ScrollView>
    )
  }

  _renderMaterialTab(selected, text, icon) {
    let opacity = selected ? 1 : 0.7;
    return (
      <View style={{alignItems: 'center', opacity}}>
        {icon}
        <RkText style={{color: 'white', marginTop: 10}}>{text}</RkText>
      </View>);
  }

  _renderCustomTab(selected, text, iconName) {
    let backgroundColor = selected ? RkTheme.current.colors.primary : 'white';
    let color = (!selected) ? RkTheme.current.colors.primary : 'white';
    return (
      <View
        style={{
          backgroundColor,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 17
        }}>
        <Icon name={iconName} style={{color, fontSize: 16}}/>
        <RkText style={{color, marginLeft: 11}}>{text}</RkText>
      </View>
    )
  }

  _renderScrollableTab(selected, text) {
    let backgroundColor = selected ? RkTheme.current.colors.primary : 'white';
    let color = (!selected) ? RkTheme.current.colors.primary : 'white';
    return (

      <View
        style={{
          backgroundColor,
          justifyContent: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 17,
        }}>
        <RkText style={{color}}>{text}</RkText>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  tabContainer: {
    paddingHorizontal: 0
  },
  header: {
    paddingHorizontal: 24,
  }
});