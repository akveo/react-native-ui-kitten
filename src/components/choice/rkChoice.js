import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';

import {RkComponent} from '../rkComponent';

export class RkChoice extends RkComponent {
  componentName = 'RkChoice';
  typeMapping = {
    container: {
      backgroundColor: 'backgroundColor',
      borderWidth: 'borderWidth',
      borderColor: 'borderColor',
      borderRadius: 'borderRadius',
      content: 'content',
      paddingVertical: 'paddingVertical',
      paddingHorizontal: 'paddingHorizontal'
    },
    inner: {
      color: 'color'
    }
  };
  selectedType = 'selected';
  disabledType = 'disabled';
  selectedDisabledType = 'selectedDisabled';

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || false,
      disabled: props.disabled || false
    }

    this._initStyles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.state.selected) {
      this.setState({selected: nextProps.selected});
    }
  }

  render() {
    let {container, content} = this._defineStyles();

    if (this.props.inTrigger) {
      return (
        <View style={container}>
          {content}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={this.props.disabled ? 1 : 0.2}
          style={[container, this.props.containerStyle]}
          onPress={(e) => {
            this._onPress(e)
          }}>

          {content}

        </TouchableOpacity>
      );
    }
  }

  _initStyles() {
    let base = this.props.rkType ? this.props.rkType.split(" ")[0] : undefined;

    if (base) {
      this.selectedType = `${base}${_.upperFirst(this.selectedType)}`;
      this.disabledType = `${base}${_.upperFirst(this.disabledType)}`;
      this.selectedDisabledType = `${base}${_.upperFirst(this.selectedDisabledType)}`;
    }

    if (this.props.rkSelectedType) {
      this.selectedType = this.props.rkSelectedType
    }
    if (this.props.rkDisabledType) {
      this.disabledType = this.props.rkDisabledType
    }
    if (this.props.rkSelectedDisabledType) {
      this.selectedDisabledType = this.props.rkSelectedDisabledType
    }
  }

  _onPress(e) {
    if (!this.props.disabled) {
      let selected = !this.state.selected;
      this.setState({selected});
      this.props.onChange && this.props.onChange(selected, e);
    }
  }

  _defineStyles() {
    let computedTypes = [];
    if (this.props.rkSmartType) {
      computedTypes.push(this.props.rkSmartType);
    }

    if (this.state.selected && this.state.disabled) {
      computedTypes.push(this.selectedDisabledType)
    } else {
      if (this.state.selected)
        computedTypes.push(this.selectedType);
      if (this.state.disabled)
        computedTypes.push(this.disabledType);
    }

    let {container, inner} = this.defineStyles(_.join(computedTypes, " "));

    let contentValue = _.find(container, (e) => e.hasOwnProperty('content'));
    if (contentValue) {
      container.splice(container.indexOf(contentValue), 1);
    }
    let content = React.cloneElement(contentValue.content, {
        style: [inner]
      }) || (<View/>);

    return {container, content};
  }
}
