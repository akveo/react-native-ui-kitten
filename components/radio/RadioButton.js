import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  RkConfig
} from '../../config/config';


export class RkRadioButton extends Component {

  static propTypes = {
    innerStyle: View.propTypes.style,
    innerSelectedStyle: View.propTypes.style,
    underlayColor: React.PropTypes.string,
    onPress: React.PropTypes.func,
    selected: React.PropTypes.bool,
    inTrigger: React.PropTypes.bool,
  };

  constructor(props) {
    super(props);
  }

  render() {
    let innerStyle = [styles.inner, this.props.innerStyle];
    let outerStyle = [styles.outer, this.props.style];
    if (this.props.selected) {
      innerStyle.push(styles.innerSelected);
      innerStyle.push(this.props.innerSelectedStyle);
      outerStyle.push(this.props.selectedStyle);
    }
    if (this.props.inTrigger) {
      return (
        <View
          style={outerStyle}
          underlayColor={this.props.underlayColor || 'transparent'}>
          <View style={innerStyle}></View>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={outerStyle}
          onPress={this.props.onPress}
          underlayColor={this.props.underlayColor || 'transparent'}>
          <View style={innerStyle}></View>
        </TouchableOpacity>
      );
    }
  }

}

const styles = StyleSheet.create({
  outer: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 100,
  },
  inner: {
    width: 10,
    height: 10,
    borderRadius: 100,
  },
  innerSelected: {
    backgroundColor: 'black'
  },
});
