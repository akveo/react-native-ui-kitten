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

import _ from "lodash";
import {RkConfig, RkButton, RkSeparator, RkStyle, RkTextInput, RkBoardUpView, RkBarBg} from 'react-native-ui-kit';
import Toolbar from '../../components/Toolbar';
import api from '../../util/ApiMock';

export default class ChatScreenClassic extends Component {

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
    this._styles = _.cloneDeep(styles);
  }

  render() {
    return (
      this._render()
    );
  }

  _render(){
    let user = api.getUserInfo(this.props.userId);
    return(
      <View>
        <Toolbar
          style={this._styles.toolbar}
          leftIcon="ios-arrow-round-back"
          title={user.name.first + ' ' + user.name.last}
          onLeftClick={()=>this.props.navigator.pop()}/>
        {this._renderBoardUp()}
      </View>
    )
  }

  _renderBoardUp() {
    return (
      <RkBoardUpView style={this._styles.boardUp}>
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
                onLayout={()=>{this._scrollToBottom()}}
                renderRow={(rowData) => this._renderMessage(rowData)}
              />
            </View>
          </View>
        </ScrollView>
        {this._renderFooter()}
      </RkBoardUpView>
    )
  }

  _renderMessage(message) {
    let containerStyle = [this._styles.messageContainer];
    if (message.my) {
      containerStyle.push(this._styles.myMessageContainer)
    }
    return (
      <View style={containerStyle}>
        <View>
          <Text style={this._styles.messageText}>{message.text}</Text>
        </View>
      </View>
    );
  }

  _renderFooter() {
    return (
      <View style={this._styles.footer}>
        {this._renderMsgInput()}
        {this._renderMsgSubmit()}
      </View>
    )
  }

  _renderMsgInput() {
    return (
      <RkTextInput
        placeholder='Message...'
        placeholderColor={RkConfig.colors.lightGray}
       rkType='bordered'
        onChangeText={message => this.setState({message})}
        value={this.state.message}
        clearButtonMode='while-editing'
        containerStyle={{marginHorizontal: 20, paddingVertical: 1}}/>
    )
  }

  _renderMsgSubmit() {
    return (
      <RkButton rkType='clear' style={{paddingVertical: 5}}
                onPress={()=>this._sendMessage()}>
        Send
      </RkButton>
    );
  }

  _scrollToBottom() {
    if (this.refs.scroll) {
      setTimeout(() => {
        this.refs.scroll.scrollTo({y: this.state.msgListHeight - this._height});
      }, 100)
    }
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

let styles = {
  toolbar: {
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0
  },
  boardUp: {
    backgroundColor: RkConfig.colors.lightGray
  },
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
};
