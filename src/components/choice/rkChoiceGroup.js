import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  RkChoice
} from './rkChoice';

import _ from 'lodash';

export class RkChoiceGroup extends Component {

  static name = 'choiceGroup';

  constructor(props) {
    super(props);
    let values = {};
    if (props.selectedIndex !== undefined) {
      values[+props.selectedIndex] = true;
    }
    this.state = {values}
  }

  componentWillMount() {
    let values = this.state.values;
    let index = 0;
    let process = (child) => {
      if (child.type === RkChoice && values[index] === undefined) {
        values[index++] = !!child.props.selected;
      } else if (child.props && child.props.children) {
        React.Children.map(child.props.children, process)
      }
    };
    React.Children.map(this.props.children, process);
    this.setState({values});
  }

  render() {
    let children = this._processChildren();
    return (
      <View style={this.props.style}>
        {children}
      </View>
    );
  }

  _onSelect(index) {
    let values = this.state.values;

    if (this.props.radio) {
      for (let key in values) {
        values[key] = false
      }
      values[index] = true;
      this.props.onChange && this.props.onChange(index);
    }
    else {
      values[index] = !values[index];
      this.props.onChange && this.props.onChange(values);
    }
    this.setState({values});
  }

  _processChildren() {
    let index = 0;

    let appendChoiceProps = (props, child) =>{
      if (this.props.rkType && !child.props.rkType) props.rkType = this.props.rkType;
      if (this.props.disabled !== undefined && child.props.disabled == undefined) props.disabled = this.props.disabled;
    };

    let processTrigger = (child, index) => {
      let props = {};
      if (child.type === RkChoice) {
        props.inTrigger =  true;
        props.selected  = this.state.values[index];
        appendChoiceProps(props, child);
      } else if (child.props && child.props.children) {
        props.children = _.isArray(child.props.children) ?
          React.Children.map(child.props.children, (child) => processTrigger(child, index)) :
          processTrigger(child.props.children, index);
      }
      return typeof child === 'string' ? child : React.cloneElement(child, props);

    };

    let process = (child) => {
      let passProps = {};
      if (child.type === RkChoice) {
        let choiceIndex = index++;
        passProps.onPress = () => this._onSelect(choiceIndex);
        passProps.selected = this.state.values[choiceIndex];
        appendChoiceProps(passProps, child);
      } else if (child.props && child.props.choiceTrigger) {
        let choiceIndex = index++;
        passProps.onPress = () => this._onSelect(choiceIndex);
        passProps.children = processTrigger(child.props.children, choiceIndex)
      } else if (child.props && child.props.children) {
        passProps.children = _.isArray(child.props.children) ?
          React.Children.map(child.props.children, process) :
          process(child.props.children);
      }
      return typeof child === 'string' ? child : React.cloneElement(child, passProps);
    };

    return React.Children.map(this.props.children, process);
  }


}
