import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';

import {RkConfig, RkText, RkButton} from 'react-native-ui-kit';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Profile extends Component {

  render() {
    let user = this.props.user;
    return (
      <View>
        <Image source={user.avatar}
               style={styles.avatar}/>
        <View style={styles.buttonWrap}>
          <RkButton style={styles.button} innerStyle={styles.buttonIconInner}><Icon name='ios-person'/></RkButton>
        </View>
        <RkText style={styles.nameText}>
          {user.name.first} {user.name.last}
        </RkText>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  buttonWrap:{
    backgroundColor: RkConfig.colors.materialBg,
    alignItems: 'flex-end',
    paddingBottom: 10,
  },
  button: {
    marginTop: -24.5,
    marginRight: 30,
    borderRadius: 30,
    backgroundColor: RkConfig.colors.materialWarning
  },
  buttonIconInner: {
    fontSize: 30,
    color: RkConfig.colors.white
  },
  avatar: {
    width: null,
    height: 200,
  },
  nameText: {
    backgroundColor: RkConfig.colors.materialBg,
    paddingLeft: 20,
    paddingVertical: 5,
    fontSize: 28,
    color: 'white'
  }
});