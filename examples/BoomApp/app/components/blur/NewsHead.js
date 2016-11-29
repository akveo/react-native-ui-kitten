import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RkConfig, RkCard, RkTextInput, RkButton} from 'react-native-ui-kit';


export default class NewsHead extends Component {

  static newsBackgroundColor = RkConfig.colors.bluBg;

  render() {
    let user = this.props.user;
    return (
      <RkCard style={styles.container} rkCardHeader>
        <Image source={user.avatar} style={styles.avatar}/>
        <RkTextInput
          style={styles.inputStyle}
          containerStyle={styles.inputContainer}
          rkType="rounded"
          clearButtonMode='while-editing'
          placeholder="What's news?"
          placeholderTextColor={RkConfig.colors.blurText}/>
        <RkButton style={styles.button} rkType="clear"><Icon rkCardIcon name='ios-camera'/></RkButton>
      </RkCard>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: RkConfig.colors.blurBg,
    marginHorizontal: 0,
    marginTop: 20,
    marginBottom: 0,
    borderRadius: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomColor: RkConfig.colors.blurBg,
    borderBottomWidth: 1,
  },
  avatar:{
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  button: {
    borderColor: RkConfig.colors.blurTextStrong,
    borderWidth: 0.5,
    paddingHorizontal: 8,
    paddingVertical: 2
  },
  inputStyle: {
    flex: 1,
    color: RkConfig.colors.blurTextStrong,
  },
  inputContainer:{
    backgroundColor: RkConfig.colors.blurBgStrong,
    marginRight: 20,
  }

});