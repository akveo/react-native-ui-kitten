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

import Icon from 'react-native-vector-icons/Ionicons';

export class RkChoice extends Component {

  static propTypes = {
    onChange: React.PropTypes.func,
    selected: React.PropTypes.bool,
    inTrigger: React.PropTypes.bool,
    icon: React.PropTypes.string,
    iconUnchecked: React.PropTypes.string,
  };


  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || false
    }
  }

  render() {
    let {outerStyle, innerStyle, icon} = this._defineStyles(this.state.selected);
    let inner = <Text style={innerStyle}/>;
    if(icon){
      inner = typeof icon === 'string' ? (<Icon name={icon} style={innerStyle}/>) : icon;
    }
    if (this.props.inTrigger) {
      return (
        <View style={outerStyle}>
          {inner}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={[{padding: 10}, this.props.containerStyle]}
          onPress={(e) => {this._onPress(e)}}
          >
          <View style={outerStyle}>
            {inner}
          </View>
        </TouchableOpacity>
      );
    }
  }

  _onPress(e){
    let selected = !this.state.selected;
    this.setState({selected});
    this.props.onChange && this.props.onChange(selected, e);
  }

  _defineStyles(selected) {
    let types = this.props.type || (RkConfig.theme.choice ? RkConfig.theme.choice.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    let outerStyle = [RkConfig.themes.styles.choice._container];
    let innerStyle = [RkConfig.themes.styles.choice._inner];
    let icon = RkConfig.themes.styles.choice._iconUnchecked;
    if (selected) {
      outerStyle.push(RkConfig.themes.styles.choice._containerSelected);
      innerStyle.push(RkConfig.themes.styles.choice._innerSelected);
      icon = RkConfig.themes.styles.choice._icon;
    }
    for (type of types) {
      outerStyle.push(RkConfig.themes.styles.choice[type].container);
      innerStyle.push(RkConfig.themes.styles.choice[type].inner);
      if (selected) {
        outerStyle.push(RkConfig.themes.styles.choice[type].containerSelected);
        innerStyle.push(RkConfig.themes.styles.choice[type].innerSelected);
        icon = RkConfig.themes.styles.choice[type].icon === undefined ? icon : RkConfig.themes.styles.choice[type].icon;
      } else {
        icon = RkConfig.themes.styles.choice[type].iconUnchecked === undefined ? icon : RkConfig.themes.styles.choice[type].iconUnchecked;
      }
    }
    outerStyle.push(this.props.style);
    innerStyle.push(this.props.innerStyle);
    if(selected){
      outerStyle.push(this.props.styleSelected);
      innerStyle.push(this.props.innerStyleSelected);
      icon = this.props.icon === undefined ?  icon : this.props.icon;
    } else {
      icon = this.props.iconUnchecked === undefined ?  icon : this.props.iconUnchecked;
    }
    return {outerStyle, innerStyle, icon}
  }

}
