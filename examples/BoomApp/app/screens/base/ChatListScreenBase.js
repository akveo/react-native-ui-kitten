import React, {Component} from 'react';
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

import {RkSeparator, RkButton, RkCard, RkText, RkConfig} from 'react-native-ui-kit';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';

import ScreenService from '../../util/ScreenService';
import api from '../../util/ApiMock';

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
    return (
      this._render()
    )
  }

  _render(styles) {
    return (
      <View style={[{flex: 1, marginTop: 20}, styles]}>
        {this._renderHeader()}
        {this._renderChatList()}
      </View>
    );
  }

  _renderHeader() {
    return (
      <RkCard rkCardHeader rkCardHeaderBorder style={styles.titleContainer}>
        <RkButton rkType='clear iconButton'>
          <Icon rkCardIcon name={'ios-person-add-outline'}/>
        </RkButton>
        <RkText style={styles.chatLabel}>
          CHATS
        </RkText>
        <RkButton rkType='clear iconButton'>
          <Icon rkCardIcon name={'ios-mail'}/>
        </RkButton>
      </RkCard>
    )
  }

  _renderChatList() {
    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        renderSeparator={(sID, rID)=> this._renderSeparator(sID, rID)}
        dataSource={this.state.dataSource}
        renderRow={(row) => this._renderMsgItem(row)}
      />
    )
  }

  _renderMsgItem(msg) {
    let user = api.getUserInfo(msg.from);
    return (
      <TouchableOpacity onPress={()=> {
        this._openChat(user)
      }}>
        <RkCard rkCardHeader rkCardChatItem>
          <View rkCardRow>
            <Image rkCardAvatarSmall rkCardChatAvatar source={user.avatar}/>
            <View>
              <RkText rkCardTitle>{user.name.first} {user.name.last}</RkText>
              <RkText rkCardChatSubtitle>{msg.text}</RkText>
            </View>
          </View>
          <View>
            <RkText rkCardChatSubtitle>{msg.time}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    );
  }

  _renderSeparator(sID, rID) {
    return (
      <RkSeparator key={`${sID}-${rID}`}/>
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

const styles = StyleSheet.create({
  titleContainer: {
    margin: 0,
    marginHorizontal: 0,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 0
  },
  chatLabel: {
    fontSize: 18
  }
});