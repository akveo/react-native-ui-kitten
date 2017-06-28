import React from 'react';
import {
  View,
} from 'react-native';
import _ from 'lodash';
import {RkChoice} from '../choice/rkChoice';
import {RkComponent} from '../rkComponent';

/**
 * `RkChoiceGroup` component is container for elements that can be used as checkboxes or radio buttons
 * Used usually in combination with `RkChoice` component.
 * @extends RkComponent
 *
 * @example Simple usage with labels
 *
 * In order to render checkbox/radio with touchable label inside `RkChoiceGroup` should be placed any `touchable` component with `choiceTrigger` prop.
 * This `touchable` component will trigger state change for component
 *
 * ```
 * <RkChoiceGroup>
 *   <TouchableOpacity choiceTrigger>
 *     <View style={{flexDirection:'row', alignItems:'center'}}>
 *       <RkChoice rkType='posNeg'/>
 *       <Text>Label</Text>
 *     </View>
 *   </TouchableOpacity>
 * </RkChoiceGroup>
 * ```
 *
 * @example Radio buttons example
 *
 * In order to create radio-like component for `RkChoiceGroup` should be set `radio` prop:
 *
 * ```
 * <RkChoiceGroup radio>
 *   <TouchableOpacity choiceTrigger>
 *     <View style={{flexDirection:'row', alignItems:'center'}}>
 *       <RkChoice rkType='radio'/>
 *       <Text>Option 1</Text>
 *     </View>
 *   </TouchableOpacity>
 *   <TouchableOpacity choiceTrigger>
 *     <View style={{flexDirection:'row', alignItems:'center'}}>
 *       <RkChoice rkType='radio'/>
 *       <Text>Option 2</Text>
 *     </View>
 *   </TouchableOpacity>
 *   <TouchableOpacity choiceTrigger>
 *     <View style={{flexDirection:'row', alignItems:'center'}}>
 *       <RkChoice rkType='radio'/>
 *       <Text>Option 3</Text>
 *     </View>
 *   </TouchableOpacity>
 * </RkChoiceGroup>
 * ```
 *
 * @example Using rkType prop
 *
 * `RkChoiceGroup` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.
 * There are already some predefined types. Here is example of how to use rkType
 *
 * ```
 * <RkChoiceGroup rkType='bordered'>
 *   <TouchableOpacity choiceTrigger>
 *     <View style={{flexDirection:'row', alignItems:'center'}}>
 *       <RkChoice rkType='posNeg'/>
 *       <Text>Label</Text>
 *     </View>
 *   </TouchableOpacity>
 * </RkChoiceGroup>
 * ```
 *
 * @example Define new rkTypes
 *
 * It's easy and very common to create new types. Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 *
 * ```
 * RkTheme.setType('RkChoiceGroup','rounded',{
 *  container: {
 *    borderRadius: 10
 *  }
 * });
 * ```
 *
 * @styles Available properties:
 * - `container` : `View` - root element of `RkChoiceGroup`
 *
 *
 * @property {string} rkType - Types for component stylization
 * By default `RkChoiceGroups` supports following types: `bordered`
 * @property {style} style - Style for root container
 * @property {boolean} radio - Enable radio buttons mode
 * @property {number} selectedIndex - Determines which RkChoice component is checked from radio group
 */
export class RkChoiceGroup extends RkComponent {

  componentName = 'RkChoiceGroup';
  typeMapping = {
    container: {}
  };

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
    let {container} = this.defineStyles();
    let children = this._processChildren();
    return (
      <View style={[container, this.props.style]}>
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

    let appendChoiceProps = (props, child) => {
      if (this.props.disabled !== undefined && child.props.disabled == undefined)
        props.disabled = this.props.disabled;
    };

    let processTrigger = (child, index) => {
      let props = {};
      if (child.type === RkChoice) {
        props.inTrigger = true;
        props.selected = this.state.values[index];
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
