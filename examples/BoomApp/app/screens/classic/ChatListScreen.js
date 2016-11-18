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
import _ from "lodash";

import {RkConfig, RkSeparator, RkStyle, RkButton} from 'react-native-ui-kit';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';

import ScreenService from '../../util/ScreenService';
import api from '../../util/ApiMock';

export default class ChatListScreen extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    let data = api.getUserMsgList(api.userId);
    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
    this._styles = _.cloneDeep(styles);
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <View style={this._styles.header}>
          <View>
            <Text style={this._styles.headerText}>
              Chats
            </Text>
          </View>
        </View>
        {this._renderChatList()}
      </View>
    );
  }

  _renderChatList() {
    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        renderSeparator={(sID, rID)=> this._renderSeparator(sID, rID)}
        dataSource={this.state.dataSource}
        style={this._styles.list}
        renderRow={(row) => this._renderMsgItem(row)}
      />
    )
  }

  _renderMsgItem(msg) {
    let user = api.getUserInfo(msg.from);
    return (
      <TouchableOpacity style={this._styles.itemWrap} onPress={()=>{this._openChat(user)}}>
        <View style={this._styles.itemContainer}>
          <Image source={user.avatar} style={this._styles.avatar}/>
          <View style={this._styles.textContainer}>
            <View style={this._styles.titleContainer}>
              <Text style={this._styles.title}>{user.name.first} {user.name.last}</Text>
              <Text style={this._styles.subTitle}>{msg.text}</Text>
            </View>
            <View style={this._styles.aside}>
              <Text style={this._styles.subTitle}>{msg.time}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _renderSeparator(sID, rID) {
    return (
      <RkSeparator style={this._styles.chatSeparator} key={`${sID}-${rID}`}/>
    )
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

let styles = {
  header: {
    minHeight: 50,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: RkConfig.colors.lightGray
  },
  headerText: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
  list: {
    backgroundColor: 'white'
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 7
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  titleContainer: {
    margin: 7,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 18,
    color: RkConfig.colors.primary,
  },
  subTitle: {
    color: RkConfig.colors.gray,
    fontSize: 14
  },
  aside: {
    flex: 1,
    alignItems: 'flex-end',
    padding: 7
  },
  chatSeparator: {
    marginLeft: 67
  },
};
