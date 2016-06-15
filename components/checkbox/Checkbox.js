import React, {Component} from 'react';

import {
  StyleSheet,
  TouchableWithoutFeedback,
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
    style: View.propTypes.style,
    checkedStyle: View.propTypes.style,
    innerStyle: View.propTypes.style,
    checkedInnerStyle: View.propTypes.style,
    iconStyle: Text.propTypes.style,
    checkedIconStyle: Text.propTypes.style,
    icon: React.PropTypes.string,
    checkedIcon: React.PropTypes.string,
    onChange: React.PropTypes.func,
    underlayColor: React.PropTypes.string,
    checked: React.PropTypes.bool,
    iconFamily: React.PropTypes.oneOf(['FontAwesome', 'Ionicons', 'MaterialIcons']),
    checkedIconFamily: React.PropTypes.oneOf(['FontAwesome', 'Ionicons', 'MaterialIcons'])
  };

  constructor(props) {
    super(props);

    this.state = {
      checked: !!props.checked
    };
    this.Icon = this._getIconTag();
  }

  render() {
    const iconName = this.state.checked ? this.props.icon || "check" : this.props.checkedIcon;
    const outerStyle = [styles.outerStyle, this.props.style, this.props.checked && this.props.checkedStyle];
    return (
        <View  style={outerStyle}>
          <TouchableWithoutFeedback onPress={(e) => this._toggle(e)}>
            <View style={[styles.innerStyle, this.props.innerStyle, this.state.checked && this.props.checkedInnerStyle]}>
              {this._renderIcon(iconName)}
            </View>
          </TouchableWithoutFeedback>
        </View>
    );
  }

  _getIconTag() {
    return this.state.checked ?
        icons[this.props.iconFamily || 'FontAwesome'] :
        icons[this.props.checkedIconFamily];
  }

  _renderIcon(iconName) {
    if (iconName != undefined) {
      let iconStyles = [styles.iconStyle, this.props.iconStyle, this.state.checked && this.props.checkedIconStyle];
      return (
          <this.Icon name={iconName} style={iconStyles}/>
      )
    }
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
