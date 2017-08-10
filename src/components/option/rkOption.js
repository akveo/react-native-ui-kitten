import React from 'react';
import {
  Text,
  TouchableHighlight,
  Modal,
  View,
  FlatList
} from 'react-native';
import {RkText} from '../text/rkText';
import {RkComponent} from '../rkComponent';

export class RkOption extends RkComponent {
  componentName = 'RkOption';

  constructor(props) {
    super(props);
    this.optionHeight = this.props.optionHeight || 30;
    this.optionKey = this.props.data.key || this.props.data;
  }

  render() {
    let rkType = ((this.props.selectedOption.key || this.props.selectedOption) === this.optionKey)
      ?'header xxlarge'
      :'subtitle xxlarge';
    return (
      <View style={[this.props.style, {height: this.optionHeight}]}>
        <RkText rkType={rkType}>
          {this.props.data.value || this.props.data}
        </RkText>
      </View>
    )
  }
}