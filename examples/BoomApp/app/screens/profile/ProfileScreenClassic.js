import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {RkConfig, RkText, RkButton, RkStyle, RkTabView} from 'react-native-ui-kit';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import api from '../../util/ApiMock';
import FriendList from '../../components/FriendList';
import PostList from '../../components/PostList';
import ContactList from '../../components/ContactList';
import ImageList from '../../components/ImageList';

export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);
    this._friends = api.getUserFriends(api.userId).concat(api.getUserFriends(api.userId));
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={{backgroundColor: 'white'}}
          automaticallyAdjustContentInsets={true}>
          <Image source={api.getUserInfo(api.userId).profileBg}
                 style={{ width: null, height: 220, justifyContent: 'flex-end', alignItems: 'stretch', }}>
            <View/>
            <Image source={api.getUserInfo(api.userId).avatar}
                   style={[RkStyle.card.avatarBigImg, {alignSelf: 'center'}]}/>
            <Text
              style={{backgroundColor: 'transparent', marginLeft: 20, marginVertical: 5, fontSize: 32, color: 'white'}}>
              {api.getUserInfo(api.userId).name.first} {api.getUserInfo(api.userId).name.last}
            </Text>
          </Image>
          <View
            style={{flex: 1}}>
            {this._renderTabs()}
          </View>
        </ScrollView>
      </View>
    );
  }

  _renderTab(selected, tab) {
    let styles = this._getStyles();
    return (
      <View style={[styles.statContainer, selected ? styles.statContainerSelected : {}]}>
        <Text style={[styles.statText, styles.titleStatText]}>{tab.value}</Text>
        <Text style={[styles.statText]}>{tab.name}</Text>
      </View>
    )
  }

  _getStyles(){
    return styles;
  }

  _renderTabs() {
    let styles = this._getStyles();
    return (
      <RkTabView tabsContainerStyle={styles.tabView}>
        <RkTabView.Tab title={(selected) => this._renderTab(selected, {name: 'Posts', value: '62'})}>
          <PostList style={styles.tabContent} posts={api.getUserPosts(api.userId)} iconStyle={styles.postIconsStyle}/>
        </RkTabView.Tab>
        <RkTabView.Tab title={(selected) => this._renderTab(selected, {name: 'Followers', value: '124'})}>
          <View style={styles.tabContent}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, paddingHorizontal: 10}}>
              <RkText style={{ fontSize: 14}}>
                {this._friends.length} friends
              </RkText>
            </View>
            <FriendList friends={this._friends}/>
          </View>
        </RkTabView.Tab>
        <RkTabView.Tab title={(selected) => this._renderTab(selected, {name: 'Photo', value: '48'})}>
          <View style={styles.tabContent}>
            <ImageList posts={api.getUserPosts(api.userId)}/>
          </View>
        </RkTabView.Tab>
      </RkTabView>
    );
  }

}

let styles = StyleSheet.create({
  tabView:{
    backgroundColor: 'white',
  },
  tabContent:{
    marginTop: 10,
    backgroundColor: 'white'
  },
  statContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: 'transparent'
  },
  statContainerSelected: {
    borderBottomColor: RkConfig.colors.primary
  },
  titleStatText: {
    fontSize: 16
  },
  statText: {
    textAlign: 'center',
    fontSize: 14,
    color: RkConfig.colors.primary
  },
  contactContainer: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  contactIcon: {
    fontSize: 24,
    alignSelf: 'center',
    color: RkConfig.colors.primary,
  },
  postIconsStyle:{
    color: RkConfig.colors.primary
  }
});
