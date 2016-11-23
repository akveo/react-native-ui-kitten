import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {RkConfig, RkButton, RkStyle, RkModalImg, RkCard, RkText} from 'react-native-ui-kit';
import api from '../util/ApiMock';

export default class Toolbar extends Component {


  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => {
        return true
      },
    });
    this._data = props.posts;
    this.state = {
      vis: false,
      dataSource: ds.cloneWithRows(this._data)
    };
  }

  render() {
    return (
      <View style={[{flex: 1}, this.props.style]}>
        <ListView
          automaticallyAdjustContentInsets={true}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this._renderRow(rowData)}
        />
      </View>
    );
  }

  _renderRow(post) {
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
          <RkModalImg source={post.img}
                      style={{width: null, height: 250, resizeMode: "cover"}}
                      modalContainerStyle={{backgroundColor: 'rgba(0,0,0,0.9)'}}
                      renderHeader={this._renderHeader.bind({post: post})}
                      renderFooter={this._renderFooter.bind({post: post})}
                      imageInModalStyle={{resizeMode: "contain"}}/>
          {this._renderPostText(post.text)}
        </View>
        <View rkCardFooter>
          <View rkCardRowCenter>
            <RkButton rkType='clear iconButton' onPress={()=> this._setLike(post)}>
              <Icon  rkCardIcon name={post.liked ? 'ios-heart' : 'ios-heart-outline'}/>
            </RkButton>
            <RkText style={[{fontSize: 16, marginTop: -3, marginRight: 10}]}>{post.likes.toString()}</RkText>
            <RkButton rkType='clear iconButton'>
              <Icon  rkCardIcon name={'ios-chatboxes'}/>
            </RkButton>
          </View>
          <RkButton rkType='clear iconButton'>
            <Icon  rkCardIcon name={'md-cloud-download'}/>
          </RkButton>
        </View>
      </RkCard>
    );
  }

  _renderPostText(text) {
    if (text) {
      return (
        <View style={{paddingHorizontal: 15, paddingTop: 10}}>
          <RkText>{text}</RkText>
        </View>
      )
    } else {
      return (
        <View/>
      )
    }
  }


  _renderFooter(closeImage, pageNumber, totalPages, delimiter) {
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20
      }}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <RkButton rkType='clear' style={{paddingHorizontal: 5, paddingVertical: 5}}
                    innerStyle={{fontSize: 26, color: 'white'}}>
            <Icon name={this.post.liked ? 'ios-heart' : 'ios-heart-outline'}/>
          </RkButton>
          <Text style={[RkStyle.whiteText, {fontSize: 16, marginTop: -3}]}>{this.post.likes.toString()}</Text>
        </View>
        <View style={{flex: 1}}>
          <RkButton rkType='clear' style={{marginLeft: 10, paddingHorizontal: 5, paddingVertical: 5}}
                    innerStyle={{fontSize: 26, color: 'white'}}>
            <Icon name={'ios-chatboxes-outline'}/>
          </RkButton>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    );
  }

  _renderHeader(closeImage, pageNumber, totalPages, delimiter) {
    return (
      <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
        <RkButton innerStyle={{color: 'white'}} rkType={'clear'}
                  onPress={closeImage}>Close</RkButton>
        <Text style={{textAlign: 'center', color: 'white'}}>{this.post.userName}</Text>
        <RkButton innerStyle={{color: 'transparent'}}>Close</RkButton>
      </View>
    );
  }

  _setLike(post) {
    api.likePost(post);
    this._data = api.getUserFeed(api.userId);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this._data)
    })
  }

}

var styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#212121',
    flexDirection: 'row',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#212121',
    height: 40
  }
});