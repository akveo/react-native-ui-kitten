import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

import {RkConfig, RkText} from 'react-native-ui-kit';

export default class ProfileTab extends Component {

  render() {
    let user = this.props.user;
    return (
      <Image source={user.profileBg}
             style={styles.profileBackground}>
        <View/>
        <Image source={user.avatar}
               style={styles.avatar}/>
        <RkText style={styles.nameText}>
          {user.name.first} {user.name.last}
        </RkText>
      </Image>
    )
  }

}

const styles = StyleSheet.create({
  profileBackground: {
    width: null,
    height: 220,
    justifyContent: 'flex-end',
    alignItems: 'stretch'
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center'
  },
  nameText: {
    backgroundColor: RkConfig.colors.blurBg,
    paddingLeft: 20,
    paddingVertical: 5,
    fontSize: 32,
    color: 'white'
  }
});