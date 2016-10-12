import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Icon from '../../node_modules/react-native-vector-icons/Ionicons'; //TODO normal import string?
import {RkConfig, RkButton} from 'react-native-ui-kit';

export default class MaterialToolbar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.barContainer}>
        <RkButton style={{paddingVertical: 0}} type="clear" onPress={() => this.props.onMenuClick()}>
          <Icon name="md-menu" style={{color: 'white', fontSize: 32}}/>
        </RkButton>
        <Text style={{fontSize: 16, color: 'white'}}>{this.props.title}</Text>
        <View style={{width: 54}}/>
      </View>
    )
  }

}

var styles = StyleSheet.create({
  barContainer: {
    paddingTop: 20,
    height: 56,
    backgroundColor: RkConfig.colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});