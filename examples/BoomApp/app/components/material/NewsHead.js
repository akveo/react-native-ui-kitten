import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RkConfig, RkCard, RkTextInput, RkButton} from 'react-native-ui-kit';

export default class NewsHead extends Component {

  static newsContainerStyle = {
    backgroundColor: RkConfig.colors.materialGray,
    paddingTop: 10
  };

  render() {
    let user = this.props.user;
    return (
      <RkCard style={styles.container} rkCardHeader>
        <Image source={user.avatar} rkCardAvatarSmall/>
        <RkTextInput
          style={{flex: 1}}
          rkType="clear"
          clearButtonMode='while-editing'
          placholderTextColor={RkConfig.colors.gray}
          placeholder="What's news?"/>
        <RkButton rkType="clear"><Icon rkCardIcon name='ios-camera'/></RkButton>
      </RkCard>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    marginHorizontal: 0,
    marginBottom: 0,
    borderRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomColor: RkConfig.colors.lightGray,
    borderBottomWidth: 1
  }
});