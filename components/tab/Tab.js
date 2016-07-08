import React, {Component} from 'react';

import {
  View,
} from 'react-native';

import { RkConfig} from '../../config/config';

export class RkTab extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>{this.props.children}</View>
    );
  }



}
