import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TabBarIOS,
  StatusBar
} from 'react-native';

import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import ScreenService from '../../ScreenService';
import {RkConfig, RkBarBg, RkTabView} from 'react-native-ui-kit';

export default class MainScreen extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'newsTab',
      notifyCount: 0,
      presses: 0,
    };
  }

  _renderContent(pageText, num) {
    return (
      <View style={[styles.tabContent]}>
        <Text style={styles.tabText}>{pageText}</Text>
        <Text style={styles.tabText}>{num} re-renders of the {pageText}</Text>
      </View>
    );
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle="light-content"
          />
        <TabBarIOS>
          <Icon.TabBarItemIOS
            title="Profile"
            iconName="ios-person"
            selected={this.state.selectedTab === 'profileTab'}
            onPress={() => {
            this.setState({
              selectedTab: 'profileTab',
            });
          }}>
            {ScreenService.getProfileScreen(false, {navigator: this.props.navigator})}
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            title="News"
            iconName="ios-paper-outline"
            selected={this.state.selectedTab === 'newsTab'}
            onPress={() => {
            this.setState({
              selectedTab: 'newsTab',
            });
          }}>
            {ScreenService.getNewsScreen(false, {navigator: this.props.navigator})}
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            title="Chat"
            iconName="ios-chatboxes"
            badge={this.state.notifyCount > 0 ? this.state.notifyCount : undefined}
            selected={this.state.selectedTab === 'chatTab'}
            onPress={() => {
            this.setState({
              selectedTab: 'chatTab',
              notifyCount: this.state.notifyCount + 1,
            });
          }}>
            {ScreenService.getChatListScreen(false, {navigator: this.props.navigator})}
          </Icon.TabBarItemIOS>
          <Icon.TabBarItemIOS
            title="Settings"
            iconName="ios-settings-outline"
            selectedIconName="ios-settings"
            selected={this.state.selectedTab === 'settingsTab'}
            onPress={() => {
            this.setState({
              selectedTab: 'settingsTab',
              presses: this.state.presses + 1
            });
          }}>
            {ScreenService.getSettingsScreen(false, {navigator: this.props.navigator})}
          </Icon.TabBarItemIOS>
        </TabBarIOS>
        <RkBarBg/>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
  },
  tabText: {
    margin: 50,
  },
});


