import React, {Component} from 'react';

import {
  View,
} from 'react-native';

import { RkConfig} from '../../config/config';

export class RkBarBg extends Component {

  render() {
    return (
      <View style={[{backgroundColor: RkConfig.colors.primary, height: 20, position: 'absolute', top: 0, left:0, right: 0}, this.props.style]}></View>
    );
  }


}
