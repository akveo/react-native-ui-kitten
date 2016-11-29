import React, {Component} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import {RkCard, RkText, RkButton, RkConfig} from 'react-native-ui-kit';
import Icon from 'react-native-vector-icons/Ionicons';

export default class FollowerItem extends Component {


  render() {
    let user = this.props.user;
    return (
      <TouchableOpacity>
        <RkCard rkCardHeader style={styles.container}>
          <View rkCardRowCenter>
            <Image source={user.avatar} rkCardAvatarSmall/>
            <View>
              <RkText rkCardTitle>{user.name.first} {user.name.last}</RkText>
            </View>
          </View>
          <RkButton rkType="clear"><Icon rkCardIcon name='ios-person-add-outline'/></RkButton>
        </RkCard>
      </TouchableOpacity>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginBottom: 0,
    borderRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
});

