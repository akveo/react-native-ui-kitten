import React, {Component} from 'react';

import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
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

export class RkCheckbox extends Component {

  static propTypes = {
    style: TouchableHighlight.propTypes.style,
    checkedStyle: TouchableHighlight.propTypes.style,
    innerStyle: View.propTypes.style,
    iconStyle: Text.propTypes.style,
    icon: React.PropTypes.string,
    onChange: React.PropTypes.func,
    underlayColor: React.PropTypes.string,
    checked: React.PropTypes.bool,
    iconFamily: React.PropTypes.oneOf(['FontAwesome', 'Ionicons', 'MaterialIcons'])
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: !!props.checked
    };
  }

  render() {
    const Icon = icons[this.props.iconFamily || 'FontAwesome'];
    const iconName = this.props.icon || "check";
    const outerStyle = [styles.outerStyle, this.props.style];
    if (this.props.checkedStyle && this.state.checked) {
      outerStyle.push(this.props.checkedStyle);
    }
    return (
      <TouchableHighlight underlayColor={this.props.underlayColor || 'transparent'}
                          onPress={(e) => this._toggle(e)}
                          style={outerStyle}>
        <View style={[styles.innerStyle, this.props.innerStyle]}>
          {this.state.checked && <Icon name={iconName} style={[styles.iconStyle, this.props.iconStyle]}/>}
        </View>
      </TouchableHighlight>
    );
  }

  _toggle(event) {
    let checked = !this.state.checked;
    this.setState({checked: checked});
    if (this.props.onChange) {
      this.props.onChange(checked, event);
    }
  }

}

const styles = StyleSheet.create({

  outerStyle: {
    borderWidth: 1,
    width: 22,
    height: 22
  },

  innerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },

  iconStyle: {
    fontSize: 16,
  },

});
