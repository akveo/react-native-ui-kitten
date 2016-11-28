import React, {Component} from 'react';
import {
  View
} from 'react-native';

import {RkText} from 'react-native-ui-kit';

export default class MessageBase extends Component {


  render() {
    let styles = this.getStyles();
    let message = this.props.message;
    let containerStyle = [styles.messageContainer];
    let messageStyle = [styles.messageText];
    if (message.my) {
      containerStyle.push(styles.myMessageContainer);
      messageStyle.push(styles.myMessageText)
    }
    return (
      <View style={containerStyle}>
        <View>
          <RkText style={messageStyle}>{message.text}</RkText>
        </View>
      </View>
    )
  }

  getStyles(){

  }

}
