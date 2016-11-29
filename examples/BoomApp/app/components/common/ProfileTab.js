import React, {Component} from 'react';
import {
  View
} from 'react-native';

import {RkText} from 'react-native-ui-kit';

export default class ProfileTabBase extends Component {


  render() {
    let styles = this.getStyles();
    return (
      <View style={[styles.statContainer, this.props.selected ? styles.statContainerSelected : {}]}>
        <RkText style={[styles.statText, styles.titleStatText]}>{this.props.value}</RkText>
        <RkText style={[styles.statText]}>{this.props.name}</RkText>
      </View>
    )
  }

  getStyles(){

  }

}
