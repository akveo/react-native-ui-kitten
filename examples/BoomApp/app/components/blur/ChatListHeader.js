import React, {Component} from 'react';
import {StyleSheet} from 'react-native';

import {RkText, RkConfig, RkCard, RkButton} from 'react-native-ui-kit';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ChatListHeaderBlur extends Component {


  render() {
    return (
      <RkCard rkCardHeader style={styles.container}>
        <RkButton rkType='clear iconButton'>
          <Icon rkCardIcon name={'ios-person-add-outline'}/>
        </RkButton>
        <RkText rkCardTitle>
          CHATS
        </RkText>
        <RkButton rkType='clear iconButton'>
          <Icon rkCardIcon name={'ios-mail'}/>
        </RkButton>
      </RkCard>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    backgroundColor: RkConfig.colors.blurBgStrong,
    marginTop: 20,
    marginBottom: 0,
    paddingVertical: 5,
  }
});