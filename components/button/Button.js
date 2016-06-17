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
    type: React.PropTypes.oneOf(['outline', 'clear', 'basic']),
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
    let iconStyle = this.props.children ? [styles.iconStyle, styles.iconMargin] : [styles.iconStyle];
    let type = this.props.type || RkConfig.theme.buttons.defaultType;
    boxStyle.push(styles[type]);
    textStyle.push(styles[type + 'Text']);
    let size = this.props.size || RkConfig.theme.buttons.defaultSize;
    boxStyle.push(styles[size]);
    textStyle.push(styles[size + 'Text']);
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
          {this.props.children && this._renderInnerText(textStyle)}
        </View>
      </TouchableOpacity>
    );
  }

}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    backgroundColor: RkConfig.colors.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textButton: {
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
  },
  basic: {},
  basicText: {},
  outline: {
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 14,
    backgroundColor: 'transparent',
    borderColor: RkConfig.colors.blue
  },
  outlineText: {
    color: RkConfig.colors.blue
  },
  clear: {
    backgroundColor: 'transparent',
  },
  clearText: {
    color: RkConfig.colors.blue
  },
  small: {
    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  smallText: {
    fontSize: 14,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediumText: {
    fontSize: 16,
  },
  large: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  largeText: {
    fontSize: 20,
  },
  iconStyle: {
    fontSize: 18,
  },
  iconMargin: {
    marginRight: 10
  }

});
