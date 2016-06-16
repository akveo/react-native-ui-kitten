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

import Ionicons from 'react-native-vector-icons/Ionicons';


export class RkRadioButton extends Component {

  static propTypes = {
    underlayColor: React.PropTypes.string,
    onPress: React.PropTypes.func,
    selected: React.PropTypes.bool,
    inTrigger: React.PropTypes.bool,
    icon: React.PropTypes.string,
    iconUnchecked: React.PropTypes.string,
    type: React.PropTypes.oneOf(['classic'])
  };

  constructor(props) {
    super(props);
  }

  render() {
    let type = this.props.type || 'basic';

    let innerStyle = [styles[type + 'Inner'], this.props.innerStyle];
    let outerStyle = [styles[type + 'Outer'], this.props.style];
    if (this.props.selected) {
      innerStyle.push(styles[type + 'InnerSelected']);
      innerStyle.push(this.props.innerSelectedStyle);
      outerStyle.push(this.props.selectedStyle);
    }
    let icon = this.props.selected ? this.props.icon : this.props.iconUnchecked;
    let inner = icon ? (<Ionicons name={icon} style={innerStyle}/>) : (<View style={innerStyle}/>);
    if (this.props.inTrigger) {
      return (
        <View style={outerStyle}>
          {inner}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={outerStyle}
          onPress={this.props.onPress}
          underlayColor={this.props.underlayColor || 'transparent'}>
          {inner}
        </TouchableOpacity>
      );
    }
  }

}

const styles = StyleSheet.create({
  basicOuter:{},
  basicInter:{},
  basicInnerSelected:{},
  classicOuter: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: RkConfig.colors.primary
  },
  classicInner: {
    width: 15,
    height: 15,
    borderRadius: 100,
  },
  classicInnerSelected: {
    backgroundColor: RkConfig.colors.primary
  },
});
