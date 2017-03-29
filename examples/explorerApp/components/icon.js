import React, {Component} from 'react';
import {Text} from 'react-native'
import Awesome from 'react-native-vector-icons/FontAwesome'

export class Icon extends Component {
  render() {
    let {style, ...otherProps} = this.props;
    return (
      <Awesome {...otherProps} style={[style, {fontFamily: 'FontAwesome'}]}/>
    );
  }
}