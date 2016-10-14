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
import api from '../../util/ApiMock';
import MaterialToolbar from '../../components/MaterialToolbar';


//TODO extend from classic?
export default class ChatScreenMaterial extends Component {

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

  render() {
    let user = api.getUserInfo(this.props.userId);
    return (
      <View>
        <MaterialToolbar
          style={styles.toolbar}
          leftIcon="ios-arrow-round-back"
          title={user.name.first + ' ' + user.name.last}
          onLeftClick={()=>(this.props.navigator.pop())}/>
        <RkBoardUpView style={[RkStyle.whiteBg, {paddingTop: 0}]}>
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
                  style={{paddingHorizontal: 10, paddingBottom: 10, paddingTop: MaterialToolbar.height}}
                  dataSource={this.state.dataSource}
                  onLayout={()=>{this._scrollToBottom()}}
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
              containerStyle={{marginLeft: 20, marginRight: 15, paddingVertical: 1}}/>
            <RkButton type='clear' style={{paddingVertical: 5}} onPress={()=>this._sendMessage()}>
              <Icon name="md-send" style={{fontSize: 22}}/>
            </RkButton>
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

let styles = StyleSheet.create({
  toolbar: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  footer: {
    height: this._inputFooterHeight,
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: RkConfig.colors.lightGray
  },
  messageContainer: {
    backgroundColor: RkConfig.colors.lightGray,
    alignSelf: 'flex-start',
    marginRight: 50,
    padding: 10,
    borderRadius: 3,
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
