import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

import {RkText, RkConfig} from 'react-native-ui-kit';

export default class ChatListHeaderClassic extends Component {


  render() {
    return (
      <View style={styles.container}>
        <RkText style={styles.text}>
          CHATS
        </RkText>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: RkConfig.colors.white,
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 20,
  }
});