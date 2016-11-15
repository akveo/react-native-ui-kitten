import React, { Component } from 'react';

import PostList from '../../components/PostList';
import api from '../../util/ApiMock';
import {RkConfig} from 'react-native-ui-kit';


export default class NewsBlur extends Component {


  constructor(props) {
    super(props);
  }

  render(){
    return(
      <PostList posts={api.getUserFeed(api.userId)} iconStyle={{color: RkConfig.colors.blurTextStrong}}/>
    )
  }

}

