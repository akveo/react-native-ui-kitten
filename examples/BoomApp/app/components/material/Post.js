import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {RkConfig, RkButton, RkCard, RkText} from 'react-native-ui-kit';
import PostImage from '../common/PostImage';

export default class Post extends Component {


  render() {
    let post = this.props.post;
    return (
      <RkCard>
        <View rkCardContent style={styles.header}>
          <PostImage post={post}/>
          <View style={styles.name}>
            <RkText style={styles.title} rkCardTitle>{post.userName}</RkText>
            <RkText style={styles.subtitle} rkCardSubTitle>posted photo</RkText>
          </View>
          <RkButton style={styles.likeButton}
                    innerStyle={styles.likeButtonContent}
                    onPress={()=> this.props.setLike(post)}>
            <Icon name={post.liked ? 'md-heart' : 'md-heart-outline'}/>
          </RkButton>
        </View>
        <View rkCardContent style={styles.content}>
          {this._renderPostText(post.text)}
        </View>
        <View rkCardFooter style={styles.footer}>
          <RkButton innerStyle={styles.textButton} rkType='clear'>
            COMMENT
          </RkButton>
          <RkButton innerStyle={styles.textButton} rkType='clear'>
            SHARE
          </RkButton>
        </View>
      </RkCard>
    );
  }


  _renderPostText(text) {
    if (text)
      return (
        <RkText style={styles.text}>{text}</RkText>
      );
    else return (<View/>)
  }


}

const styles = StyleSheet.create({
  name: {
    marginTop: -50,
    marginBottom: -25,
    paddingLeft: 15,
    backgroundColor: RkConfig.colors.blurBgLight
  },
  header: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    overflow: 'hidden'
  },
  content: {
    paddingTop: 10,
  },
  footer: {
    justifyContent: 'flex-end',
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  title: {
    color: RkConfig.colors.white,
    fontSize: 24
  },
  subtitle: {
    fontSize: 14,
    color: RkConfig.colors.lightGray
  },
  likeButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 5,
    backgroundColor: RkConfig.colors.materialWarning,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  likeButtonContent: {
    fontSize: 32,
    color: RkConfig.colors.white
  },
  textButton: {
    color: RkConfig.colors.materialBg
  },
  text: {
    fontSize: 18,
    color: RkConfig.colors.darkGray
  }
});


