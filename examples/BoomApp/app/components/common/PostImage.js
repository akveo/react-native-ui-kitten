import React, {Component} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {RkModalImg, RkButton, RkStyle, RkText} from 'react-native-ui-kit';

export default class PostImage extends Component {

  render() {
    return (
      <RkModalImg source={this.props.post.img}
                  style={styles.imageStyle}
                  modalContainerStyle={styles.modalContainer}
                  renderHeader={(closeImage) => this._renderHeader(closeImage, this.props.post)}
                  renderFooter={() => this._renderFooter(this.props.post)}
                  imageInModalStyle={{resizeMode: "contain"}}/>
    )
  }

  _renderFooter(post) {
    return (
      <View style={styles.footerContainer}>
        <View style={styles.likesContainer}>
          <RkButton rkType='clear' style={styles.footerButton} innerStyle={styles.footerIcon}>
            <Icon name={post.liked ? 'ios-heart' : 'ios-heart-outline'}/>
          </RkButton>
          <RkText style={styles.text}>{post.likes.toString()}</RkText>
        </View>
        <View style={RkStyle.flex1}>
          <RkButton rkType='clear' style={styles.footerButton} innerStyle={styles.footerIcon}>
            <Icon name={'ios-chatboxes-outline'}/>
          </RkButton>
        </View>
        <View style={RkStyle.flex1}>
          <RkButton type="clear"/>
        </View>
      </View>
    );
  }

  _renderHeader(closeImage, post) {
    return (
      <View style={styles.headerContainer}>
        <RkButton innerStyle={RkStyle.whiteText} rkType={'clear'} onPress={closeImage}>Close</RkButton>
        <RkText style={styles.text}>{post.userName}</RkText>
        <RkButton rkType="clear" innerStyle={RkStyle.transparentBg}>Close</RkButton>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  imageStyle: {
    width: null,
    height: 250,
    resizeMode: "cover"
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0,0.9)'
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  headerContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  likesContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  footerButton: {
    padding: 5
  },
  footerIcon: {
    fontSize: 26,
    color: 'white'
  },
  text: {
    color: 'white',
    fontSize: 16
  }
});