import React, {Component} from 'react';

import {
  View,
} from 'react-native';

import { RkConfig} from '../../config/config';

export class RkSeparator extends Component {


  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[{backgroundColor: RkConfig.colors.lightGray, height:1}, this.props.style]}/>
    );
  }


}
