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

import ScreenService from '../../ScreenService';
import api from '../../api';

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
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerText}>
              Chats
            </Text>
          </View>
        </View>
        <ListView
          automaticallyAdjustContentInsets={false}
          renderSeparator={(sID, rID)=> <RkSeparator style={styles.chatSeparator}  key={`${sID}-${rID}`}/>}
          dataSource={this.state.dataSource}
          style={RkStyle.whiteBg}
          renderRow={(row) => this._renderRow(row)}
        />
      </View>
    );
  }

  _renderRow(msg) {
    let user = api.getUserInfo(msg.from);
    return (
      <TouchableOpacity onPress={()=>{this._openChat(user)}}>
        <View style={styles.itemContainer}>
          <Image source={user.avatar} style={styles.avatar}/>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{user.name.first} {user.name.last}</Text>
            <Text style={styles.subTitle}>{msg.text}</Text>
          </View>
          <View style={styles.aside}>
            <Text style={styles.subTitle}>{msg.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  _openChat(user) {
    this.props.navigator.push({
      title: `${user.name.first} ${user.name.last}`,
      component: ScreenService.getChatScreen(true),
      barTintColor: RkConfig.colors.primary,
      titleTextColor: RkConfig.colors.white,
      navigationBarHidden: false,
      passProps: {
        userId: user.id
      }
    });
  }
}

let styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 7
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  titleContainer: {
    marginLeft: 10,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    color: RkConfig.colors.primary,
  },
  subTitle: {
    marginTop: 5,
    color: RkConfig.colors.gray,
    fontSize: 14
  },
  aside: {
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
    backgroundColor: 'white',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: RkConfig.colors.lightGray
  },
  headerText: {
    fontSize: 18,
    paddingHorizontal: 8,
  },
});
