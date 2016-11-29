import React, {Component} from 'react';
import {
  TabBarIOS,
} from 'react-native';

import ScreenService from '../util/ScreenService';
import Icon from 'react-native-vector-icons/Ionicons';

export default class MainScreenBase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: 'profile'
    };
    this._screens = {
      profile: ScreenService.getProfileScreen(),
      news: ScreenService.getNewsScreen(),
      chat: ScreenService.getChatListScreen(),
      settings: ScreenService.getSettingsScreen(),
    }
  }

  render() {
    let Wrapper = ScreenService.getAppWrapperComponent();
    return (
      <Wrapper>
        {this.renderTabBar(Wrapper.tabProps)}
      </Wrapper>
    )
  }

  renderTabBar(tabBarProps) {
    return (
      <TabBarIOS {...tabBarProps}>
        <Icon.TabBarItemIOS
          title="Profile"
          iconName="ios-person"
          selected={this.state.selected === 'profile'}
          onPress={() => {
            this.setState({
              selected: 'profile',
            });
          }}>
          {<this._screens.profile navigator={this.props.navigator}/>}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="News"
          iconName="ios-paper-outline"
          selected={this.state.selected === 'news'}
          onPress={() => {
            this.setState({
              selected: 'news',
            });
          }}>
          {<this._screens.news navigator={this.props.navigator}/>}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Chats"
          iconName="ios-chatboxes"
          badge={1}
          selected={this.state.selected === 'chat'}
          onPress={() => {
            this.setState({
              selected: 'chat',
            });
          }}>
          {<this._screens.chat navigator={this.props.navigator}/>}
        </Icon.TabBarItemIOS>
        <Icon.TabBarItemIOS
          title="Settings"
          iconName="ios-settings-outline"
          selectedIconName="ios-settings"
          selected={this.state.selected === 'settings'}
          onPress={() => {
            this.setState({
              selected: 'settings',
            });
          }}>
          {<this._screens.settings navigator={this.props.navigator}/>}
        </Icon.TabBarItemIOS>
      </TabBarIOS>
    );
  }

}

