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

import {RkConfig, RkSeparator, RkButton, RkStyle, RkTabView} from 'react-native-ui-kit';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import api from '../../api';
import FriendList from '../../components/FriendList';
import ContactList from '../../components/ContactList';
import ImageList from '../../components/ImageList';

export default class ProfileScreen extends Component {

  constructor(props) {
    super(props);
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
            style={{flex: 1, backgroundColor: RkConfig.colors.white}}>
            {this._renderTabs()}
            <View style={{marginHorizontal: 30, marginTop: 20, alignSelf: 'stretch', backgroundColor: RkConfig.colors.white, borderTopWidth: 0.5, borderTopColor: RkConfig.colors.primary}}>
              <RkButton type='clear' innerStyle={{fontSize: 14, color: RkConfig.colors.gray}}>Edit my info</RkButton>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

  _showMoreFriends() {
    this.props.navigator.push({
      title: 'Friends',
      component: FriendList,
      navigationBarHidden: false,
      passProps: {
        style: {marginTop: 10},
        friends: api.getUserFriends(api.userId).concat(api.getUserFriends(api.userId))
      }
    })
  }

  _renderTab(selected, tab) {
    return (
      <View style={[styles.statContainer, selected ? styles.statContainerSelected : {}]}>
        <Text style={[styles.statText, styles.titleStatText]}>{tab.value}</Text>
        <Text style={[styles.statText]}>{tab.name}</Text>
      </View>
    )
  }

  _renderTabs() {
    return (
      <RkTabView style={{backgroundColor: RkConfig.colors.lightGray}}>
        <RkTabView.Tab title={(selected) => this._renderTab(selected, {name: 'FRIENDS', value: '11'})}>
          <View style={[{backgroundColor: 'white', marginTop: 10, height: 225}]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5, paddingHorizontal: 10}}>
              <Text style={{ fontSize: 14,  color: RkConfig.colors.gray}}>
                {api.getUserFriends(api.userId).length * 2} friends
              </Text>
              <RkButton type='small clear' innerStyle={{color: RkConfig.colors.gray}}
                        onPress={() => this._showMoreFriends()}>
                see all
                <Icon style={{alignSelf: 'flex-end', marginLeft: 3, marginTop: 3}} name='ios-arrow-forward'/>
              </RkButton>
            </View>
            <FriendList friends={api.getUserFriends(api.userId)}/>
          </View>
        </RkTabView.Tab>
        <RkTabView.Tab title={(selected) => this._renderTab(selected, {name: 'POSTS', value: '87'})}>
          <View style={[{backgroundColor: 'white', marginTop: 10, height: 225}]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5}}>
              <Text style={{fontSize: 14,  color: RkConfig.colors.gray}}>
                {api.getUserPosts(api.userId).length} photos
              </Text>
            </View>
            <ImageList posts={api.getUserPosts(api.userId)}/>
          </View>
        </RkTabView.Tab>
        <RkTabView.Tab title={(selected) => this._renderTab(selected, {name: 'CONTACTS', value: '3'})}>
          <View style={[{backgroundColor: 'white', marginTop: 10, height: 225}]}>
            <ContactList contacts={[
              {
                label: 'email',
                value: api.getUserInfo(api.userId).email
              },
              {
                label: 'address',
                value: api.getUserInfo(api.userId).address
              },
              {
                label: 'phone',
                value: api.getUserInfo(api.userId).phone
              },
              ]}/>
          </View>
        </RkTabView.Tab>
      </RkTabView>
    );
  }

}

let styles = StyleSheet.create({

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
  }


});
