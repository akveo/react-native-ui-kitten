import React, {Component} from 'react';

import {
  View,
} from 'react-native';

import { RkConfig} from '../../util/config';

export class RkSeparator extends Component {

  static name = 'separator';

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[{backgroundColor: RkConfig.colors.lightGray, height:1}, this.props.style]}/>
    );
  }


}
