import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {RkConfig, RkButton, RkText} from 'react-native-ui-kit';

export default class Toolbar extends Component {

  static height = 64;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.barContainer, this.props.style]}>
        <RkButton  rkType="clear" onPress={() => this.props.onLeftClick()}>
          <Icon name={this.props.leftIcon} style={[styles.barIcon, this.props.textStyle]}/>
        </RkButton>
        <RkText style={[styles.barTitle, this.props.textStyle]}>{this.props.title}</RkText>
      </View>
    )
  }

}

var styles = StyleSheet.create({
  barContainer: {
    paddingTop: 20,
    height: Toolbar.height,
    backgroundColor: RkConfig.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 3,
    zIndex: 2
  },
  barIcon:{
    color: 'white',
    fontSize: 32
  },
  barTitle: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
    marginTop: -3,
  }
});