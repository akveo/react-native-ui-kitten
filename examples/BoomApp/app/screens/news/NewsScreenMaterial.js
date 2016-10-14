import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  ListView,
  TouchableOpacity,
} from 'react-native';

import {RkConfig, RkSeparator, RkStyle, RkButton, RkModalImg, RkCard} from 'react-native-ui-kit';
import Icon from '../../../node_modules/react-native-vector-icons/Ionicons';
import api from '../../util/ApiMock';

export default class NewsScreenMaterial extends Component {


  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => {
        return true
      },
    });
    this._data = api.getUserFeed(api.userId);
    this.state = {
      vis: false,
      dataSource: ds.cloneWithRows(this._data)
    };
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          style={[RkStyle.lightGrayBg]}
          automaticallyAdjustContentInsets={false}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this._renderRow(rowData)}
          />
        </ScrollView>
      </View>
    );
  }


  _renderRow(post) {
    return (
      <RkCard type='material'>
        <View rkCardHeader style={{flexDirection: 'row'}}>
          <Image source={post.userAvatar} style={RkStyle.card.avatarSmallImg}/>
          <View style={RkStyle.card.titleContainer}>
            <Text style={RkStyle.card.title}>{post.userName}</Text>
            <Text style={RkStyle.card.subTitle}>posted photo</Text>
          </View>
          <View style={RkStyle.card.headerControls}>
            <RkButton type='clear' style={{paddingVertical: 0}}>
              <Icon name={'ios-more'}
                    style={{ fontSize: 36, color: RkConfig.colors.gray, alignSelf: 'flex-start', padding: 0}}/>
            </RkButton>
          </View>
        </View>
        <View rkCardContent>
          <RkModalImg source={post.img}
                      style={{width: null, height: 250, marginTop: 5, resizeMode: "cover"}}
                      modalContainerStyle={{backgroundColor: 'rgba(0,0,0,0.9)'}}
                      renderHeader={this._renderHeader.bind({post: post})}
                      renderFooter={this._renderFooter.bind({post: post})}
                      imageInModalStyle={{ resizeMode: "contain"}}/>
        </View>
        <View rkCardFooter>
          <View style={RkStyle.card.leftControls}>
            <RkButton type='clear' onPress={()=> this._setLike(post)} style={{paddingHorizontal: 5, paddingVertical: 5}}
                      innerStyle={{fontSize: 26}}>
              <Icon name={post.liked ? 'ios-heart': 'ios-heart-outline'}/>
            </RkButton>
            <Text style={[RkStyle.primaryText, {fontSize: 16, marginTop: -3}]}>{post.likes.toString()}</Text>
            <RkButton type='clear' style={{marginLeft: 10, paddingHorizontal: 5, paddingVertical: 5}}
                      innerStyle={{fontSize: 26}}>
              <Icon name={'ios-chatboxes-outline'}/>
            </RkButton>
          </View>
        </View>
      </RkCard>
    );
  }


  _renderFooter(closeImage, pageNumber, totalPages, delimiter) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' ,paddingVertical: 10, paddingHorizontal: 20}}>
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <RkButton type='clear' style={{paddingHorizontal: 5, paddingVertical: 5}}
                    innerStyle={{fontSize: 26, color: 'white'}}>
            <Icon name={this.post.liked ? 'ios-heart': 'ios-heart-outline'}/>
          </RkButton>
          <Text style={[RkStyle.whiteText, {fontSize: 16, marginTop: -3}]}>{this.post.likes.toString()}</Text>
        </View>
        <View style={{flex: 1}}>
          <RkButton type='clear' style={{marginLeft: 10, paddingHorizontal: 5, paddingVertical: 5}}
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
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <RkButton innerStyle={{color: 'white'}} style={{width: 60}} type={'clear'}
                    onPress={closeImage}>Close</RkButton>
        </View>
        <View style={{flex: 1}}>
          <Text style={{textAlign: 'center', color: 'white'}}>{this.post.userName}</Text>
        </View>
        <View style={{flex: 1}}></View>
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

const styles = StyleSheet.create({
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
