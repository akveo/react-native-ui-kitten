import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from '../../node_modules/react-native-vector-icons/Ionicons'; //TODO normal import string?
import {RkConfig, RkButton} from 'react-native-ui-kit';

export default class Toolbar extends Component {

  static height = 64;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.barContainer, this.props.style]}>
        <RkButton  rkType="clear" onPress={() => this.props.onLeftClick()}>
          <Icon name={this.props.leftIcon} style={[{color: 'white', fontSize: 32}, this.props.textStyle]}/>
        </RkButton>
        <Text style={[styles.barTitle, this.props.textStyle]}>{this.props.title}</Text>
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
  barTitle: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
    marginTop: -3,
  }
});