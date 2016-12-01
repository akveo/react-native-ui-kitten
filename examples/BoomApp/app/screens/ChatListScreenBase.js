import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  ListView
} from 'react-native';


import ThemeService from '../util/ThemeService';
import api from '../util/ApiMock';

export default class ChatListScreenBase extends Component {

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
     let Header = ThemeService.getChatListHeaderComponent();
    return (
      <View style={styles.container}>
        <Header/>
        <ListView
          style={styles.list}
          automaticallyAdjustContentInsets={false}
          dataSource={this.state.dataSource}
          renderRow={(row) => this._renderMsgItem(row)}
        />
      </View>
    )
  }

  _renderMsgItem(msg) {
    let user = api.getUserInfo(msg.from);
    let ChatItem = ThemeService.getChatItemComponent();
    msg.text = msg.text.length > 25 ? msg.text.substring(0,23)+'...' : msg.text;
    return (
      <ChatItem
        user={user}
        message={msg}
        onClick={(user) => this._openChat(user)}
      />
    );
  }

  _openChat(user) {
    this.props.navigator.push({
      screen: ThemeService.getChatScreen(true),
      passProps: {
        userId: user.id
      }
    });
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  list: {
    paddingTop: 10
  },
});