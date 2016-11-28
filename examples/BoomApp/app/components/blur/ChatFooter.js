import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import {RkConfig, RkTextInput, RkButton} from 'react-native-ui-kit';

export default class ChatFooter extends Component {

  render() {
    console.log(this.props.message);
    return (
      <View style={styles.footer}>
        <RkTextInput
          style={{flex: 1, color: RkConfig.colors.white}}
          placeholder='Message...'
          placeholderColor={'#ffffff'}
          rkType='rounded'
          onChangeText={message => this.props.onChange(message)}
          value={this.props.message}
          clearButtonMode='while-editing'
          containerStyle={styles.inputContainer}/>
        <RkButton onPress={() => this.props.onSend()}>
          SEND
        </RkButton>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: RkConfig.colors.blurBg,
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderTopColor: RkConfig.colors.blurBgStong,
    borderTopWidth: 1
  },
  inputContainer:{
    marginHorizontal: 10,
    backgroundColor: RkConfig.colors.blurBgStrong,
  }
});