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

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.state.selected) {
      this.setState({selected: nextProps.selected});
    }
  }

  render() {
    let {outerStyle, innerStyle} = this._defineStyles(this.state.selected, this.props.disabled);
    let content = this._defineContent(this.state.selected, this.props.disabled, innerStyle);
    if (this.props.inTrigger) {
      return (
        <View style={outerStyle}>
          {content}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={this.props.disabled ? 1 : 0.2}
          style={[{padding: 10}, this.props.containerStyle]}
          onPress={(e) => {this._onPress(e)}}
          >
          <View style={outerStyle}>
            {content}
          </View>
        </TouchableOpacity>
      );
    }
  }

  _onPress(e) {
    if (!this.props.disabled) {
      let selected = !this.state.selected;
      this.setState({selected});
      this.props.onChange && this.props.onChange(selected, e);
    }
  }

  _defineContent(selected, disabled,  style){
    let types = this._getTypes();
    let theme = RkConfig.themes.styles.choice;
    let contentName = selected ? '_content' : '_contentUnchecked';
    let content = disabled ? theme[contentName + 'Disabled'] : theme[contentName];
    contentName = selected ? 'content' : 'contentUnchecked';
    if(disabled){
      contentName += 'Disabled'
    }
    for (let type of types) {
      content = theme[type][contentName] === undefined ? content : theme[type][contentName]
    }
    content = this.props[contentName] === undefined ? content : this.props[contentName];
    if(content){
      return React.cloneElement(content, {
        style: [style, content.props.style]
      });
    } else {
      return null;
    }
  }

  _defineStyles(selected, disabled) {
    let types = this._getTypes();
    var styles = RkConfig.themes.styles.choice;
    let outerStyle = [];
    let innerStyle = [];
    let pushStyles = (source, outerName, innerName) => {
      outerStyle.push(source[outerName]);
      innerStyle.push(source[innerName]);
      if(selected){
        outerStyle.push(source[outerName + 'Selected']);
        innerStyle.push(source[innerName + 'Selected']);
      }
      if(disabled){
        outerStyle.push(source[outerName + 'Disabled']);
        innerStyle.push(source[innerName + 'Disabled']);
      }
      if(disabled && selected){
        outerStyle.push(source[outerName + 'SelectedDisabled']);
        innerStyle.push(source[innerName + 'SelectedDisabled']);
      }
    };
    pushStyles(styles, '_container', '_inner');
    for (let type of types) {
      pushStyles(styles[type], 'container', 'inner');
    }
    pushStyles(this.props, 'style', 'innerStyle');
    return {outerStyle, innerStyle}
  }

  _getTypes(){
    let types = this.props.type || (RkConfig.theme.choice ? RkConfig.theme.choice.defaultType : '');
    types = types && types.length ? types.split(" ") : [];
    return types;
  }

}
