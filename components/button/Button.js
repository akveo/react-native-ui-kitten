import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {RkConfig}from '../../util/config';
import {RkText} from '../text/Text'

import _ from 'lodash';

export class RkButton extends Component {

  static name = 'button';

  render() {
    let {boxStyle, innerStyle} = this._defineStyles();
    let touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress
    };
    return (
      <TouchableOpacity {...touchableProps}>
        <View style={[boxStyle, this.props.style]}>
          {this.props.children && this._renderChildren(innerStyle)}
        </View>
      </TouchableOpacity>
    );
  }

  _renderChildren(style) {
    let displayText = (text) => (<RkText style={[style, this.props.innerStyle]}>{text}</RkText>);
    if (typeof this.props.children === 'string') {
      return displayText(this.props.children)
    }
    let babies = _.isArray(this.props.children) ? this.props.children : [this.props.children];
    return React.Children.map(babies, (baby) => {
      if (typeof baby === 'string') {
        return displayText(baby);
      } else {
        return React.cloneElement(baby, {
          style: [style, this.props.innerStyle, baby.props.style]
        });
      }
    })
  }

  _defineStyles() {
    let types = this.props.rkType || (RkConfig.theme.button ? RkConfig.theme.button : '');
    types = types && types.length ? types.split(" ") : [];
    let themeStyles = RkConfig.themes.styles.button;
    let boxStyle = [themeStyles._container];
    let innerStyle = [themeStyles._inner];
    for (let type of types) {
      boxStyle.push(themeStyles[type].container);
      innerStyle.push(themeStyles[type].inner);
    }
    return {boxStyle, innerStyle}
  }

}

