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
  RkRadioButton
} from './RadioButton';

import _ from 'lodash';

export class RkRadioGroup extends Component {
  static propTypes = {
    style: View.propTypes.style,
    selectedIndex: React.PropTypes.number,
    onChange: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: props.selectedIndex == undefined ? -1 : props.selectedIndex
    }
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
    this.setState({
      selectedIndex: index
    });
    this.props.onChange && this.props.onChange(index);
  }

  _processChildren() {
    let index = 0;
    let selectedIndex = this.state.selectedIndex;

    let processTrigger = (child, index) => {
      if (child.type === RkRadioButton) {
        return React.cloneElement(child, {
          inTrigger: true,
          selected: index === selectedIndex
        });
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
      if (child.type === RkRadioButton) {
        let radioIndex = index++;
        return React.cloneElement(child, {
          onPress: () => this._onSelect(radioIndex),
          selected: radioIndex === selectedIndex
        });
      }
      else if (child.props && child.props.radioTrigger) {
        let radioIndex = index++;
        return React.cloneElement(child, {
          onPress: () => this._onSelect(radioIndex),
          children: processTrigger(child.props.children, radioIndex)
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
