import React, {Component} from 'react';
import {
  View
} from 'react-native';

import {RkText} from 'react-native-ui-kit';

export default class ProfileTabBase extends Component {


  render() {
    let styles = this.getStyles();
    let containerStyle = [styles.statContainer];
    let textStyle = [styles.statText];
    if(this.props.selected){
      containerStyle.push(styles.statContainerSelected);
      textStyle.push(styles.statTextSelected);
    }
    return (
      <View style={containerStyle}>
        <RkText style={[textStyle, styles.titleStatText]}>{this.props.value}</RkText>
        <RkText style={textStyle}>{this.props.name}</RkText>
      </View>
    )
  }

  getStyles(){

  }

}
