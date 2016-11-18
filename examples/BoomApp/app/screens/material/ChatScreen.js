import React, { Component } from 'react';
import {
  View
} from 'react-native';

import _ from "lodash";
import {RkConfig, RkButton,RkStyle, RkTextInput} from 'react-native-ui-kit';
import ChatScreenClassic from '../classic/ChatScreen';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';

export default class ChatScreenMaterial extends Component {

  constructor(props) {
    super(props);
    this._styles = _.merge(this._styles, styles);
  }

  render() {
    return (
      this._render()
    );
  }

  _renderMsgSubmit() {
    return (
      <RkButton type='clear' style={{paddingVertical: 5}} onPress={()=>this._sendMessage()}>
        <Icon name="md-send" style={{fontSize: 22}}/>
      </RkButton>
    );
  }

}

let styles = {
  boardUp:{
    backgroundColor: 'white'
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: RkConfig.colors.lightGray
  },
  messageContainer: {
    backgroundColor: RkConfig.colors.lightGray,
    borderRadius: 3,
  },
};
