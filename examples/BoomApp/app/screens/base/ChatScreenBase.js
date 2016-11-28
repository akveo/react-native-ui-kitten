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
import {RkConfig, RkButton, RkText, RkTextInput, RkBoardUpView, RkBarBg} from 'react-native-ui-kit';
import Toolbar from '../../components/Toolbar';
import api from '../../util/ApiMock';
import ScreenService from "../../util/ScreenService";

export default class ChatScreenBase extends Component {

  constructor(props) {
    super(props);
    let {height} = Dimensions.get('window');
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this._messages = api.getMessages(props.userId);
    this._inputFooterHeight = 50;
    this._toolBarHeight = 60;
    this._height = height - this._inputFooterHeight - this._toolBarHeight;
    this.state = {
      message: '',
      dataSource: ds.cloneWithRows(this._messages)
    };
  }

  render(){
    let user = api.getUserInfo(this.props.userId);
    let Wrapper = ScreenService.getAppWrapperComponent();
    return(
      <Wrapper>
        <Toolbar
          leftIcon="ios-arrow-round-back"
          title={user.name.first + ' ' + user.name.last}
          onLeftClick={()=>this.props.navigator.pop()}/>
        {this._renderBoardUp()}
      </Wrapper>
    )
  }

  _renderBoardUp() {
    let Message = ScreenService.getMessageComponent();
    let ChatFooter = ScreenService.getChatFooterComponent();
    return (
      <RkBoardUpView>
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
                renderRow={(rowData) => <Message message={rowData}/>}
              />
            </View>
          </View>
        </ScrollView>
        <ChatFooter
          message={this.state.message}
          onSend={()=>this._sendMessage()}
          onChange={message => this.setState({message})}
        />
      </RkBoardUpView>
    )
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

  getStyle(){
    return styles;
  }
}

const styles = StyleSheet.create({

});
