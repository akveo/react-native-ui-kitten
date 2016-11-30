import React, {Component} from 'react';
import {
  View
} from 'react-native';
import PostList from '../components/common/PostList';
import api from '../util/ApiMock';
import ThemeService from "../util/ThemeService";

export default class NewsScreenBase extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let NewsHead = ThemeService.getNewsHeadComponent();
    return (
      <View>
        <NewsHead user={api.getUserInfo(api.userId)}/>
        <PostList
          style={NewsHead.newsContainerStyle}
          posts={api.getUserFeed(api.userId)}/>
      </View>
    )
  }

}

