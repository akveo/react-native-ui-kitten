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
import api from '../../util/ApiMock';
import ThemeService from "../../util/ThemeService";

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
      <ListView
        style={this.props.style}
        automaticallyAdjustContentInsets={true}
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this._renderRow(rowData)}
      />
    );
  }

  _renderRow(post) {
    let Post = ThemeService.getPostComponent();
    return (
      <Post post={post} setLike={(post)=> this._setLike(post)}/>
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