import React, {Component} from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import {RkConfig, RkTextInput, RkButton} from 'react-native-ui-kit';

export default class ChatFooter extends Component {

  render() {
    return (
      <View style={styles.footer}>
        <RkTextInput
          style={{flex: 1, color: RkConfig.colors.white}}
          placeholder='Message...'
          placeholderTextColor={RkConfig.colors.blurText}
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
    backgroundColor: RkConfig.colors.blurBgLight,
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