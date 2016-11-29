import React, {Component} from 'react';

import PostList from '../../components/common/PostList';
import api from '../../util/ApiMock';
import {RkConfig,} from 'react-native-ui-kit';


export default class NewsScreen extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PostList
        posts={api.getUserFeed(api.userId)}
        style={{padding: 5, backgroundColor: RkConfig.colors.materialGray}}
      />
    )
  }

}

