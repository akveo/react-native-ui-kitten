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

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

let icons = {
  'FontAwesome': FontAwesome,
  'Ionicons': Ionicons,
  'MaterialIcons': MaterialIcons
};

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
    iconFamily: React.PropTypes.oneOf(['FontAwesome', 'Ionicons', 'MaterialIcons']),
    iconStyle: Text.propTypes.style,
    icon: React.PropTypes.string
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
    let iconStyle = [styles.iconStyle];
    if(this.props.type){
      boxStyle.push(styles[this.props.type]);
      textStyle.push(styles[this.props.type + 'Text']);
      iconStyle.push(styles[this.props.type + 'Text']);
    }
    if(this.props.size){
      boxStyle.push(styles[this.props.size]);
      textStyle.push(styles[this.props.size + 'Text']);
      iconStyle.push(styles[this.props.size + 'Text']);
    }
    let touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress
    };
    const Icon = icons[this.props.iconFamily || 'FontAwesome'];
    return (
        <TouchableOpacity {...touchableProps}
            style={[boxStyle, this.props.style]}>
          <View style={styles.buttonContainer}>
            {this.props.icon && <Icon name={this.props.icon} style={[iconStyle, this.props.iconStyle]}/>}
            {this._renderInnerText(textStyle)}
          </View>
        </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: RkConfig.colors.gray,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
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
  },
  iconStyle: {
    fontSize: 18,
    marginRight: 10
  },

});
