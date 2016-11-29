import React, {Component} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import {RkConfig, RkButton, RkCard, RkText} from 'react-native-ui-kit';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ChatItem extends Component {


  render() {
    let msg = this.props.message;
    let user = this.props.user;
    return (
      <TouchableOpacity onPress={()=> {
        this.props.onClick(user)
      }}>
        <RkCard rkCardHeader style={styles.container}>
          <View rkCardRow>
            <Image rkCardAvatarSmall source={user.avatar} style={styles.avatar}/>
            <View>
              <RkText style={styles.title}>{user.name.first} {user.name.last}</RkText>
              <RkText style={styles.subtitle}>{msg.text}</RkText>
            </View>
          </View>
          <View rkCardRow style={styles.rightBlock}>
            <View style={styles.timeContainer}>
              <RkText rkCardSubTitle>{msg.time}</RkText>
            </View>
            <Icon style={styles.rightIcon} name='md-arrow-dropright'/>
          </View>
        </RkCard>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomColor: RkConfig.colors.lightGray,
    borderBottomWidth: 1,
    shadowOpacity: 0,

  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  timeContainer: {
    alignSelf: 'flex-start'
  },
  title: {
    fontSize: 17,
    color: RkConfig.colors.black
  },
  subtitle: {
    fontSize: 15,
    marginTop: 5,
    color: RkConfig.colors.gray
  },
  rightIcon: {
    alignSelf: 'center',
    marginLeft: 10,
    fontSize: 28,
    color: RkConfig.colors.lightGray
  },
  rightBlock:{
    alignSelf: 'stretch'
  }
});
