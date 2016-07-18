import React, {Component} from 'react';

import {
  View,
  Dimensions
} from 'react-native';

import { RkConfig} from '../../config/config';


export class RkBarBg extends Component {

  constructor(props){
    super(props);
    this.state = {
      show: true
    }
  }

  render() {
    return (
      <View
        onLayout={e => this._onLayout(e)}
        style={[{backgroundColor: RkConfig.colors.primary, height: 20, position: 'absolute', top: 0, left:0, right: 0}, this.props.style]}>
      </View>
    );
  }

  _onLayout(e){
    let {height, width} = Dimensions.get('window');
    let show = width > height;
    if(show !== this.state.show){
      this.setState({
        show: false
      })
    }
  }

}
