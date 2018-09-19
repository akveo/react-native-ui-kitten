import React from 'react';
import {
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { RkChoice } from '../choice/rkChoice';
import { RkComponent } from '../rkComponent';

/**
 * `RkChoiceGroup` component is container for elements
 * that can be used as checkboxes or radio buttons.
 * Used usually in combination with `RkChoice` component.
 *
 * @extends React.Component
 *
 * @example Simple usage with labels
 *
 * In order to render checkbox/radio with touchable label inside `RkChoiceGroup`
 * should be placed any `touchable` component with `choiceTrigger` prop.
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
 * In order to create radio-like component for `RkChoiceGroup` should be set `radio` prop.
 * You can set default selected RkChoice with `selectedIndex` prop:
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
 * `RkChoiceGroup` has `rkType` prop. This prop works similar to CSS-class in web.
 * It's possible to set more than one type.
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
 * It's easy and very common to create new types.
 * Main point for all customization is `RkTheme` object.
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
 * You can handle event of changing of RkChoice state by using `onChange` function
 * ('index' arg is zero-based index of the changed RkChoice):
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
 * @property {number} selectedIndex - Determines which RkChoice component
 * is checked from radio group
 * @property {function} onChange - Called when state of RkChoice is changed.
 */
export class RkChoiceGroup extends RkComponent {
  static propTypes = {
    selectedIndex: PropTypes.number,
    radio: PropTypes.bool,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    style: ViewPropTypes.style,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  };
  static defaultProps = {
    selectedIndex: undefined,
    radio: false,
    onChange: (() => null),
    disabled: false,
    style: null,
    children: [],
  };
  componentName = 'RkChoiceGroup';
  typeMapping = {
    container: {},
  };

  state = {
    selectionWasUpdated: false,
  };

  constructor(props) {
    super(props);
    this.choice = {};
    if (props.selectedIndex !== undefined) {
      this.choice[props.selectedIndex] = true;
    }
  }

  componentWillMount() {
    let index = 0;
    const process = (child) => {
      if (child.type === RkChoice && this.choice[index] === undefined) {
        index += 1;
        this.choice[index] = child.props.selected;
      } else if (child.props && child.props.children) {
        React.Children.map(child.props.children, process);
      }
    };
    React.Children.map(this.props.children, process);
  }

  onSelect(index) {
    if (this.props.radio) {
      this.clearChoice();
    }
    this.choice[index] = this.props.radio ? true : !this.choice[index];
    this.props.onChange(index);
    this.setState({ selectionWasUpdated: true });
  }

  clearChoice() {
    Object.keys(this.choice).forEach(key => {
      this.choice[key] = false;
    });
  }

  processNotClickTrigger(child, index) {
    const newSelectedValue = (index === this.props.selectedIndex) ? true : child.props.selected;
    if (this.props.onChange && newSelectedValue !== this.choice[index] && newSelectedValue) {
      this.props.onChange(index);
    }
    if (this.props.radio && newSelectedValue) {
      this.clearChoice();
    }
    this.choice[index] = newSelectedValue;
  }

  processTrigger(child, index) {
    const props = {};
    if (child.type === RkChoice) {
      if (!this.state.selectionWasUpdated) {
        this.processNotClickTrigger(child, index);
      }
      props.selected = this.choice[index];
      props.inTrigger = true;
      props.disabled = this.props.disabled;
    } else if (child.props && child.props.children) {
      props.children =
        _.isArray(child.props.children) ?
          React.Children.map(child.props.children, (view) => this.processTrigger(view, index)) :
          this.processTrigger(child.props.children, index);
    }
    return typeof child === 'string' ? child : React.cloneElement(child, props);
  }

  processChild(child) {
    const props = {};
    if (child.type === RkChoice) {
      this.globalChoiceIndex += 1;
      const choiceIndex = this.globalChoiceIndex;
      props.onPress = () => this.onSelect(choiceIndex);
      props.selected = this.choice[choiceIndex];
      props.disabled = this.props.disabled;
    } else if (child.props && child.props.choiceTrigger) {
      const choiceIndex = this.globalChoiceIndex;
      this.globalChoiceIndex += 1;
      props.onPress = () => this.onSelect(choiceIndex);
      props.children = this.processTrigger(child.props.children, choiceIndex);
    } else if (child.props && child.props.children) {
      props.children =
        _.isArray(child.props.children) ?
          React.Children.map(child.props.children, (view) => this.processChild(view)) :
          this.processChild(child.props.children);
    }
    return typeof child === 'string' ? child : React.cloneElement(child, props);
  }

  processChildren() {
    this.globalChoiceIndex = 0;
    return React.Children.map(this.props.children, (child) => this.processChild(child));
  }

  render() {
    const { container } = this.defineStyles();
    const children = this.processChildren();
    this.state.selectionWasUpdated = false;
    return (
      <View style={[container, this.props.style]}>
        {children}
      </View>
    );
  }
}
