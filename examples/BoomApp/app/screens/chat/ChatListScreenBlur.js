import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  ListView,
  TouchableOpacity
} from 'react-native';

import {RkConfig, RkSeparator, RkStyle, RkButton} from 'react-native-ui-kit';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';

import ScreenService from '../../util/ScreenService';
import api from '../../util/ApiMock';

export default class ChatListScreenBlur extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    let data = api.getUserMsgList(api.userId);
    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <Image blurRadius={30} source={require('../../../img/bg/lamp.jpg')} style={styles.backgroundImage}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>
                Chats
              </Text>
            </View>
          </View>
          <ListView
            automaticallyAdjustContentInsets={false}
            dataSource={this.state.dataSource}
            renderRow={(row) => this._renderRow(row)}
          />
        </Image>
      </View>
    );
  }

  _renderRow(msg) {
    let user = api.getUserInfo(msg.from);
    return (
      <TouchableOpacity onPress={()=>{this._openChat(user)}}>
        <View style={styles.itemContainer}>
          <Image source={user.avatar} style={styles.avatar}/>
          <View style={styles.avatarSide}/>
          <View style={styles.textContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{user.name.first} {user.name.last}</Text>
              <Text style={styles.subTitle}>{msg.text}</Text>
            </View>
            <View style={styles.aside}>
              <Text style={styles.subTitle}>{msg.time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _openChat(user) {
    this.props.navigator.push({
      screen: ScreenService.getChatScreen(true),
      passProps: {
        userId: user.id
      }
    });
  }
}

let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  textContent: {
    flexDirection: 'row',
    flex: 1,
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  avatar: {
    width: 76,
    height: 76,
    opacity: 0.8
  },
  title: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    backgroundColor: 'transparent',
  },
  subTitle: {
    marginTop: 10,
    color: RkConfig.colors.gray,
    backgroundColor: 'transparent',
    fontSize: 14
  },
  aside: {
    marginTop: -10,
    flex: 1,
    alignItems: 'flex-end'
  },
  chatSeparator: {
    marginLeft: 67
  },
  header: {
    height: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  headerText: {
    color: 'rgba(255,255,255,0.7)',
    backgroundColor: 'transparent',
    fontSize: 18,
    paddingHorizontal: 8,
  },
  avatarSide: {
    width: 10,
    backgroundColor: 'rgba(0,0,0,0.3 )',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(255,255,255,0.1)'
  }
});
