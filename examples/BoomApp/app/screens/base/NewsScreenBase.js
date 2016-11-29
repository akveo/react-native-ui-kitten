import React, {Component} from 'react';
import {
  View
} from 'react-native';
import PostList from '../../components/PostList';
import api from '../../util/ApiMock';
import {RkConfig} from 'react-native-ui-kit';
import ScreenService from "../../util/ScreenService";


export default class NewsScreenBase extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    let NewsHead = ScreenService.getNewsHeadComponent();
    return (
      <View>
        <NewsHead user={api.getUserInfo(api.userId)}/>
        <PostList
          style={{backgroundColor: NewsHead.newsBackgroundColor}}
          posts={api.getUserFeed(api.userId)}/>
      </View>
    )
  }

}

