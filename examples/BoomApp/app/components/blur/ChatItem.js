import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import {RkConfig, RkButton, RkCard, RkText} from 'react-native-ui-kit';

export default class ChatItemBlur extends Component {


  render() {
    let msg = this.props.message;
    let user = this.props.user;
    return (
      <TouchableOpacity onPress={()=> {this.props.onClick(user)}}>
        <RkCard rkCardHeader style={styles.container}>
          <View rkCardRow>
            <Image rkCardAvatarSmall source={user.avatar}/>
            <View>
              <RkText rkCardTitle>{user.name.first} {user.name.last}</RkText>
              <RkText rkCardSubTitle style={styles.subtitle}>{msg.text}</RkText>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <RkText rkCardSubTitle>{msg.time}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    marginBottom: 5,
    marginRight: 10,
    marginTop: 5,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: RkConfig.colors.blurBgLight,
    borderLeftWidth: 5,
    borderLeftColor: RkConfig.colors.blurBg
  },
  timeContainer:{
    alignSelf: 'flex-start'
  },
});
