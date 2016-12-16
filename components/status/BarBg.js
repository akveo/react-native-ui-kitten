import React, {Component} from 'react';

import {
  View,
  Dimensions,
  StyleSheet
} from 'react-native';

import { RkConfig} from '../../util/config';


export class RkBarBg extends Component {

  static name = 'barBg';

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
        style={[styles.bar, this.props.style]}>
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

let styles = StyleSheet.create({
  bar:{
    backgroundColor: RkConfig.colors.blue500,
    height: 20,
    position: 'absolute',
    top: 0,
    left:0,
    right: 0
  }
});
