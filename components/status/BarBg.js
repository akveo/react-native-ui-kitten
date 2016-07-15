import React, {Component} from 'react';

import {
  View,
  Dimensions
} from 'react-native';

import { RkConfig} from '../../config/config';


export class RkBarBg extends Component {

  render() {
    let {height, width} = Dimensions.get('window');
    if(width > height) return null;
    return (
      <View
        style={[{backgroundColor: RkConfig.colors.primary, height: 20, position: 'absolute', top: 0, left:0, right: 0}, this.props.style]}>
      </View>
    );
  }

}
