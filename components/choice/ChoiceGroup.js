import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import {
  RkConfig
} from '../../config/config';

import {
  RkChoice
} from './Choice';

import _ from 'lodash';

export class RkChoiceGroup extends Component {

  static Choice = RkChoice;

  static propTypes = {
    style: View.propTypes.style,
    selectedIndex: React.PropTypes.number,
    radio: React.PropTypes.bool,
    onChange: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    let values = {};
    if (props.selectedIndex !== undefined){
      values[+props.selectedIndex] = true;
    }
    this.state = {values}
  }

  componentWillMount(){
    let values = this.state.values;
    let index = 0;
    let process = (child) => {
      if (child.type === RkChoice) {
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

    if(this.props.radio) {
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

    let processTrigger = (child, index) => {
      if (child.type === RkChoice) {
        let props = {
          inTrigger: true,
          selected: this.state.values[index]
        }
        if(this.props.type && !child.props.type) props.type = this.props.type;
        if(this.props.disabled !== undefined && child.props.disabled == undefined) props.disabled = this.props.disabled;
        return React.cloneElement(child, props);
      } else if (child.props && child.props.children) {
        let children;
        if (_.isArray(child.props.children)) {
          children = React.Children.map(child.props.children, (child) => processTrigger(child, index));
        } else {
          children = processTrigger(child.props.children, index);
        }
        return React.cloneElement(child, {
          children: children
        });
      }
      return child;
    };

    let process = (child) => {
      if (child.type === RkChoice) {
        let choiceIndex = index++;
        let props =  {
          onPress: () => this._onSelect(choiceIndex),
          selected: this.state.values[choiceIndex]
        };
        if(this.props.type && !child.props.type) props.type = this.props.type;
        if(this.props.disabled !== undefined && child.props.disabled == undefined) props.disabled = this.props.disabled;
        return React.cloneElement(child, props);
      }
      else if (child.props && child.props.choiceTrigger) {
        let choiceIndex = index++;
        return React.cloneElement(child, {
          onPress: () => this._onSelect(choiceIndex),
          children: processTrigger(child.props.children, choiceIndex)
        });
      }
      else if (child.props && child.props.children) {
        let children = _.isArray(child.props.children) ?
          React.Children.map(child.props.children, process) :
          process(child.props.children);
        return React.cloneElement(child, {
          children: children
        });
      }
      return child;
    };

    return React.Children.map(this.props.children, process);
  }


}
