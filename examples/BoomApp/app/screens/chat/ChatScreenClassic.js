import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ListView,
  ScrollView,
  Dimensions
} from 'react-native';

import {RkConfig, RkButton, RkSeparator, RkStyle, RkTextInput, RkBoardUpView, RkBarBg} from 'react-native-ui-kit';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import api from '../../api';

export default class ChatScreen extends Component {

  constructor(props) {
    super(props);
    let {height} = Dimensions.get('window');
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this._messages = api.getMessages(props.userId);
    this._inputFooterHeight = 52;
    this._height = height - this._inputFooterHeight;
    this.state = {
      message: '',
      dataSource: ds.cloneWithRows(this._messages)
    };

  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    if (this.refs.scroll) {
      this.refs.scroll.scrollTo({y: this.state.msgListHeight - this._height});
    }
  }


  render() {
    return (
      <View>
        <RkBoardUpView style={[RkStyle.lightGrayBg]}>
          <ScrollView
            ref="scroll"
            automaticallyAdjustContentInsets={true}
            onContentSizeChange={(contentWidth, contentHeight)=>{
              this.setState({msgListHeight: contentHeight})
            }}
            style={{height: this._height}}>
            <View style={{justifyContent: 'flex-end'}}>
              <View>
                <ListView
                  ref="messageList"
                  scrollEnabled={false}
                  style={{paddingHorizontal: 10}}
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) => this._renderRow(rowData)}
                />
              </View>
            </View>
          </ScrollView>
          <View
            style={styles.footer}>
            <RkTextInput
              placeholder='Message...'
              placeholderColor={RkConfig.colors.lightGray}
              type='bordered'
              onChangeText={message => this.setState({message})}
              value={this.state.message}
              clearButtonMode='while-editing'
              containerStyle={{marginHorizontal: 20, paddingVertical: 1}}/>
            <RkButton type='clear' style={{paddingVertical: 5}} onPress={()=>this._sendMessage()}>Send</RkButton>
          </View>
        </RkBoardUpView>
        <RkBarBg/>
      </View>
    );
  }

  _renderRow(message) {
    let containerStyle = [styles.messageContainer];
    if (message.my) {
      containerStyle.push(styles.myMessageContainer)
    }
    return (
      <View style={containerStyle}>
        <View>
          <Text style={styles.messageText}>{message.text}</Text>
        </View>
      </View>
    );
  }

  _sendMessage() {
    if (this.state.message) {
      this._messages = this._messages.concat([{text: this.state.message, my: true}]);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._messages),
        message: ''
      });
    }
  }
}

let styles = StyleSheet.create({
  footer: {
    height: this._inputFooterHeight,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  messageContainer: {
    backgroundColor: RkConfig.colors.white,
    alignSelf: 'flex-start',
    marginRight: 50,
    padding: 10,
    borderRadius: 20,
    marginVertical: 5
  },
  myMessageContainer: {
    backgroundColor: RkConfig.colors.primary,
    alignSelf: 'flex-end',
    marginLeft: 50,
    marginRight: 0
  },
  messageText: {
    fontSize: 16
  }
});
