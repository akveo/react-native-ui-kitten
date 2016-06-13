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


export class RkButton extends Component {

  static propTypes = {
    children: React.PropTypes.string,
    style: View.propTypes.style,
    textStyle: Text.propTypes.style,
    type: React.PropTypes.oneOf(['outline', 'clear', 'rounded']),
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    onPress: React.PropTypes.func,
    onLongPress: React.PropTypes.func,
    onPressIn: React.PropTypes.func,
    onPressOut: React.PropTypes.func,
  };

  _renderInnerText(style) {
    return (
      <Text style={[style, this.props.textStyle]}>
        {this.props.children}
      </Text>
    );
  }

  render() {
    let boxStyle = [styles.button];
    let textStyle = [styles.textButton];
    if(this.props.type){
      boxStyle.push(styles[this.props.type]);
      textStyle.push(styles[this.props.type + 'Text']);
    }
    if(this.props.size){
      boxStyle.push(styles[this.props.size]);
      textStyle.push(styles[this.props.size + 'Text']);
    }
    let touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress
    };
    return (
      <TouchableOpacity {...touchableProps}
        style={[boxStyle, this.props.style]}>
        {this._renderInnerText(textStyle)}
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: RkConfig.colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  textButton: {
    fontSize: 18,
    alignSelf: 'center',
  },
  outline: {
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 14,
    backgroundColor: 'transparent',
    borderColor: RkConfig.colors.primary
  },
  outlineText: {
    color: RkConfig.colors.primary
  },
  clear: {
    backgroundColor: 'transparent',
  },
  clearText: {
    color: RkConfig.colors.primary
  },
  rounded: {
    borderRadius: 50,
  },
  roundedText: {
  },
  small: {
    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  smallText: {
    fontSize: 14,
  },
  medium: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  mediumText: {
    fontSize: 18,
  },
  large: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  largeText: {
    fontSize: 22,
  }

});
