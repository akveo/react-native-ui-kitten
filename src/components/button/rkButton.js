import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';

import {RkText} from '../text/rkText';
import {RkComponent} from '../rkComponent'

export class RkButton extends RkComponent {
  componentName = 'RkButton';
  typeMapping = {
    container: {
      backgroundColor: 'backgroundColor',
      borderColor: 'borderColor',
      borderRadius: 'borderRadius',
      borderWidth: 'borderWidth',
      paddingVertical: 'paddingVertical',
      paddingHorizontal: 'paddingHorizontal'
    },
    inner: {
      color: 'color',
      fontSize: 'fontSize'
    }
  };

  render() {
    let {container, inner} = super.defineStyles();
    let touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress
    };
    return (
      <TouchableOpacity style={[container, this.props.style]} {...touchableProps}>
          {this.props.children && this._renderChildren(inner)}
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
}
