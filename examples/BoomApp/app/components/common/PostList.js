import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  Image
} from 'react-native';

import api from '../../util/ApiMock';
import ThemeService from "../../util/ThemeService";

export default class Toolbar extends Component {


  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 === r2,
    });
    this._data = props.posts;
    this.state = {
      dataSource: ds.cloneWithRows(props.posts)
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
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.posts)
    })
  }

}