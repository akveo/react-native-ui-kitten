import React, {Component} from 'react';

import PostList from '../../components/PostList';
import api from '../../util/ApiMock';
import {RkConfig,} from 'react-native-ui-kit';


export default class NewsScreen extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PostList
        style={{backgroundColor: RkConfig.colors.lightGray, marginTop: 10}}
        posts={api.getUserFeed(api.userId)}
        iconStyle={{color: RkConfig.colors.primary}}/>
    )
  }

}

