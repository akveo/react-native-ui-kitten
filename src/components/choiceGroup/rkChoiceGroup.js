import React from 'react';
import {
  View,
} from 'react-native';
import _ from 'lodash';
import {RkChoice} from '../choice/rkChoice';
import {RkComponent} from '../rkComponent';

/**
 * `RkChoiceGroup` component is container for elements that can be used as checkboxes or radio buttons.
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
 * In order to create radio-like component for `RkChoiceGroup` should be set `radio` prop. You can set default selected RkChoice with `selectedIndex` prop:
 *
 * ```
 * <RkChoiceGroup selectedIndex={2} radio>
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
 * @example Event of changing of RkChoice state
 *
 * You can handle event of changing of RkChoice state by using `onChange` function ('index' arg is zero-based index of the changed RkChoice):
 *
 * ```
 * <RkChoiceGroup radio onChange={(index) => doSomething(index))}>
    ...
 * ```
 *
 * @styles Available components:
 * - `container` (default) : `View` - root element of `RkChoiceGroup`
 *
 * @property {string} rkType - Types for component stylization
 * By default `RkChoiceGroups` supports following types: `bordered`
 * @property {style} style - Style for root container
 * @property {boolean} radio - Enable radio buttons mode
 * @property {number} selectedIndex - Determines which RkChoice component is checked from radio group
 * @property {function} onChange - Called when state of RkChoice is changed.
 */
export class RkChoiceGroup extends RkComponent {

  componentName = 'RkChoiceGroup';
  typeMapping = {
    container: {}
  };

  constructor(props) {
    super(props);
    this.choice = {};
    if (props.selectedIndex !== undefined) {
      this.choice[+props.selectedIndex] = true;
    }
    this.state = {
      selectionWasUpdated: false,
    }
  }

  componentWillMount() {
    let index = 0;
    let process = (child) => {
      if (child.type === RkChoice && this.choice[index] === undefined) {
        this.choice[index++] = child.props.selected;
      } else if (child.props && child.props.children) {
        React.Children.map(child.props.children, process)
      }
    };
    React.Children.map(this.props.children, process);
  }

  _onSelect(index) {
    this.props.radio && this._clearChoice();
    this.choice[index] = this.props.radio ? true : !this.choice[index];
    this.props.onChange && this.props.onChange(index);
    this.setState({selectionWasUpdated: true});
  }

  _clearChoice() {
    Object.keys(this.choice).forEach((key) => this.choice[key] = false);
  }

  _appendChoiceProps(props, child) {
    if (this.props.disabled !== undefined && child.props.disabled === undefined)
      props.disabled = this.props.disabled;
  }

  _processNotClickTrigger(child, index) {
    let newSelectedValue = (index === this.props.selectedIndex) ? true : child.props.selected;
    if (this.props.onChange && newSelectedValue !== this.choice[index] && newSelectedValue) {
      this.props.onChange(index);
    }
    this.props.radio && newSelectedValue && this._clearChoice();
    this.choice[index] = newSelectedValue;
  }

  _processTrigger(child, index) {
    let props = {};
    if (child.type === RkChoice) {
      !this.state.selectionWasUpdated && this._processNotClickTrigger(child, index);
      props.selected = this.choice[index];
      props.inTrigger = true;
      this._appendChoiceProps(props, child);
    } else if (child.props && child.props.children) {
      props.children =
        _.isArray(child.props.children)
          ? React.Children.map(child.props.children, (child) => this._processTrigger(child, index))
          : this._processTrigger(child.props.children, index);
    }
    return typeof child === 'string' ? child : React.cloneElement(child, props);
  }

  _processChild(child) {
    let passProps = {};
    if (child.type === RkChoice) {
      let choiceIndex = this.globalChoiceIndex++;
      passProps.onPress = () => this._onSelect(choiceIndex);
      passProps.selected = this.choice[choiceIndex];
      this._appendChoiceProps(passProps, child);
    } else if (child.props && child.props.choiceTrigger) {
      let choiceIndex = this.globalChoiceIndex++;
      passProps.onPress = () => this._onSelect(choiceIndex);
      passProps.children = this._processTrigger(child.props.children, choiceIndex)
    } else if (child.props && child.props.children) {
      passProps.children =
        _.isArray(child.props.children)
          ? React.Children.map(child.props.children, (child) => this._processChild(child))
          : this._processChild(child.props.children);
    }
    return typeof child === 'string' ? child : React.cloneElement(child, passProps);
  }

  _processChildren() {
    this.globalChoiceIndex = 0;
    return React.Children.map(this.props.children, (child) => this._processChild(child));
  }

  render() {
    let {container} = this.defineStyles();
    let children = this._processChildren();
    this.state.selectionWasUpdated = false;
    return (
      <View style={[container, this.props.style]}>
        {children}
      </View>
    );
  }
}
