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

import _ from 'lodash';

export class RkButton extends Component {

  static propTypes = {
    style: View.propTypes.style,
    innerStyle: Text.propTypes.style,
    type: React.PropTypes.string,
    size: React.PropTypes.string,
    onPress: React.PropTypes.func,
    onLongPress: React.PropTypes.func,
    onPressIn: React.PropTypes.func,
    onPressOut: React.PropTypes.func,
  };


  render() {
    let {boxStyle, innerStyle} = this._defineStyles();
    let touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress
    };
    return (
      <TouchableOpacity {...touchableProps}
        style={[boxStyle, this.props.style]}>
        <View style={styles.buttonContainer}>
          {this._renderChildren(innerStyle)}
        </View>
      </TouchableOpacity>
    );
  }

  _renderChildren(style) {
    let displayText = (text) => (<Text style={[style, this.props.innerStyle]}>{text}</Text>);
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
    let types = this.props.type || (RkConfig.theme.buttons? RkConfig.theme.buttons.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let boxStyle = [RkConfig.themes.styles.button._container];
    let innerStyle = [RkConfig.themes.styles.button._inner];
    for (type of types) {
      boxStyle.push(RkConfig.themes.styles.button[type].container);
      innerStyle.push(RkConfig.themes.styles.button[type].inner);
    }
    return {boxStyle, innerStyle}
  }

}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
