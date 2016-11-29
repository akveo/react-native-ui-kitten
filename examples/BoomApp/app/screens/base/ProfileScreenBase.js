import React, {Component} from 'react';
import {
  View,
  ScrollView
} from 'react-native';

import {RkStyle, RkTabView} from 'react-native-ui-kit';
import api from '../../util/ApiMock';
import FriendList from '../../components/FriendList';
import PostList from '../../components/PostList';
import ImageList from '../../components/ImageList';
import ScreenService from "../../util/ScreenService";


export default class ProfileScreenBase extends Component {

  constructor(props) {
    super(props);
    this._friends = api.getUserFriends(api.userId).concat(api.getUserFriends(api.userId));
  }


  render() {
    let ProfileComponent = ScreenService.getProfileComponent();
    return (
      <View style={RkStyle.flex1}>
        <ScrollView
          automaticallyAdjustContentInsets={true}>
          <ProfileComponent user={api.getUserInfo(api.userId)}/>
          <View
            style={RkStyle.flex1}>
            {this._renderTabs()}
          </View>
        </ScrollView>
      </View>
    );
  }

  _renderTabs() {
    let ProfileTab = ScreenService.getProfileTabComponent();
    let styles = ProfileTab.getStyles();
    return (
      <RkTabView tabsContainerStyle={styles.tabView}>
        <RkTabView.Tab title={(selected) => <ProfileTab selected={selected} name='Posts' value='62'/>}>
          <PostList style={styles.tabContent}
                    posts={api.getUserPosts(api.userId)}
                    iconStyle={styles.postIconsStyle}/>
        </RkTabView.Tab>
        <RkTabView.Tab title={(selected) => <ProfileTab selected={selected} name='Followers' value='124'/>}>
          <View style={styles.tabContent}>
            <FriendList friends={this._friends}/>
          </View>
        </RkTabView.Tab>
        <RkTabView.Tab title={(selected) => <ProfileTab selected={selected} name='Photo' value='48'/>}>
          <View style={[styles.tabContent, styles.imageTab]}>
            <ImageList posts={api.getUserPosts(api.userId)}/>
          </View>
        </RkTabView.Tab>
      </RkTabView>
    );
  }

}

