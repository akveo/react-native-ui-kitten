import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {RkConfig, RkButton, RkCard, RkText} from 'react-native-ui-kit';
import PostImage from './PostImage';

export default class Post extends Component {


  render() {
    let post = this.props.post;
    return (
      <RkCard>
        <View rkCardHeader>
          <View rkCardRowCenter>
            <Image source={post.userAvatar} rkCardAvatarSmall/>
            <View>
              <RkText rkCardTitle>{post.userName}</RkText>
              <RkText rkCardSubTitle>posted photo</RkText>
            </View>
          </View>
        </View>
        <View rkCardContent>
          <PostImage post={post}/>
          {this._renderPostText(post.text)}
        </View>
        <View rkCardFooter>
          <View rkCardRowCenter>
            <RkButton rkType='clear iconButton' onPress={()=> this.props.setLike(post)}>
              <Icon rkCardIcon name={post.liked ? 'ios-heart' : 'ios-heart-outline'}/>
            </RkButton>
            <RkText type='likes'>{post.likes.toString()}</RkText>
            <RkButton rkType='clear iconButton'>
              <Icon rkCardIcon name={'ios-chatboxes'}/>
            </RkButton>
          </View>
          <RkButton rkType='clear iconButton'>
            <Icon rkCardIcon name={'md-cloud-download'}/>
          </RkButton>
        </View>
      </RkCard>
    );
  }


  _renderPostText(text) {
    if (text)
      return (
        <View style={styles.text}>
          <RkText>{text}</RkText>
        </View>
      );
    else return (<View/>)
  }


}

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 15,
    paddingTop: 10
  }
});


