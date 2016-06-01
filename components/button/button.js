import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


export class Button extends Component {

  static propTypes = {
    children: React.PropTypes.string,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
    onPress: React.PropTypes.func,
    onLongPress: React.PropTypes.func,
    onPressIn: React.PropTypes.func,
    onPressOut: React.PropTypes.func
  };

  _renderInnerTextiOS() {
    return (
      <Text style={[styles.textButton]}>
        {this.props.children}
      </Text>
    );
  }

  render() {
    let touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress
    };
    return (
      <TouchableOpacity {...touchableProps}
        style={[styles.button]}>
        {this._renderInnerTextiOS()}
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textButton: {
    fontSize: 18,
    alignSelf: 'center',
  }
});
