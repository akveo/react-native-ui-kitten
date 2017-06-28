import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {RkComponent} from '../rkComponent.js';

/**
 * `RkTextInput` is a component to be used as a basic text input.
 *
 * @extends RkComponent
 *
 * @example Usage sample:
 *
 * ```
 * <RkTextInput placeholder='Login'/>
 * ```
 *
 * @example Usage with icon or label
 *
 * `RkTextInput` can contain label or icon. By clicking on label/icon input will be focused.
 *
 * ```
 * import Icon from 'react-native-vector-icons/Ionicons';
 *
 * //...
 *
 * <RkTextInput label={<Icon name={'ios-search'}/>}/>
 * <RkTextInput label='Search'/>
 *```
 *
 * @example Using rkType prop
 *
 * `RkTextInput` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.
 * There are already some predefined types. Here is example of how to use rkType
 *
 * ```
 * <RkTextInput rkType='rounded' label='Search'/>
 * ```
 *
 * @example Define new rkTypes
 *
 * It's easy and very common to create new types. Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 *
 * ```
 * RkTheme.setType('RkTextInput','success',{
 *   labelColor:'darkgreen',
 *   underlineColor:'darkgreen',
 *   underlineWidth:1,
 * });
 *
 * //...
 *
 * <RkTextInput label='Login' rkType='success'/>
 * ```
 *
 * @styles Available properties:
 * - `color` : Color of typed text inside `RkTextInput`
 * - `inputBackgroundColor` : Background color of `TextInput` inside `RkTextInput`
 * - `placeholderTextColor` : Color of placeholder text
 * - `labelColor` : Color of label/icon
 * - `labelFontSize` : Font size of label
 * - `backgroundColor` : Background color of `RkTextInput`
 * - `borderWidth` : Width of outer border
 * - `borderRadius` : Border radius of `RkTextInput`
 * - `borderColor` : Color of border
 * - `underlineWidth` : Width of bottom border of component
 * - `underlineColor` : Color of bottom border of component
 * - `width` : Width of `RkTextInput`
 * - `height` : Height of `RkTextInput`
 *
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling. `RkTextInput` consists from couple of base react component.
 * It's easy to set styles for each component.
 *
 * ```
 * RkTheme.setType('RkTextInput', 'frame', {
 *   input: {
 *     backgroundColor: 'white',
 *     marginLeft: 0,
 *     marginHorizontal: 0,
 *     borderRadius: 5
 *   },
 *   color: 'gray',
 *   backgroundColor: 'gray',
 *   borderRadius: 10,
 *   container: {
 *     paddingHorizontal: 20
 *   }
 * });
 *
 * //...
 *
 *  <RkTextInput rkType='frame'/>
 * ```
 *
 * @styles Available components:
 * - `container` : `TouchableOpacity` - container of `RkTextInput`.
 * - `input` : `TextInput`.
 * - `label` : `Text` or other View tree that you had specified in `label` props.
 *
 *
 * @example Inline styling:
 *
 * It's possible to set styles inline. Use prop `style` for `container` component, `labelStyle` for `label` component and `inputStyle` for `input`.
 * Here is example of inline style usage:
 *
 * ```
 * <RkTextInput
 *  labelStyle={{color: 'gray'}}
 *  label={'Name'}
 *  inputStyle={{
 *     backgroundColor: 'lightgray',
 *     color: 'black',
 *   }}/>
 * ```
 *
 * @property {string} rkType - Types for component stylization
 * By default `RkTextInput` supports following types: `bordered`, `rounded`, `form`, `topLabel`
 * @property {TextInput.props} props - Regular `TextInput` props will be passed to internal `TextInput` component
 * @property {style} style - Style for TouchableOpacity wrapping input and label
 * @property {string || function} label - Label displayed with input. When label is clicked input gets focus. function should return React component
 * @property {style} labelStyle - Style applied to label
 * @property {style} inputStyle - Style applied to text input
 */

export class RkTextInput extends RkComponent {

  componentName = 'RkTextInput';
  typeMapping = {
    container: {
      borderRadius: 'borderRadius',
      backgroundColor: 'backgroundColor',
      borderWidth: 'borderWidth',
      borderColor: 'borderColor',
      underlineWidth: 'borderBottomWidth',
      underlineColor: 'borderBottomColor',
      height: 'height',
      width: 'width'
    },
    input: {
      color: 'color',
      inputBackgroundColor: 'backgroundColor',
      placeholderTextColor: 'placeholderTextColor'
    },
    label: {
      labelColor: 'color',
      labelFontSize: 'fontSize'
    }
  };

  constructor(props) {
    super(props);
    this.focusInput = this._focusInput.bind(this);
  }

  _focusInput() {
    this.refs.input.focus();
  }

  _displayLabel(label, labelStyle) {
    if (typeof label === 'string') {
      return (
        <Text style={labelStyle} onPress={this.focusInput}>{label}</Text>
      )
    } else {
      return React.cloneElement(label, {
        onPress: (e) => {
          this.refs.input.focus();
          label.props.onPress && label.props.onPress(e)
        },
        style: [labelStyle, label.props.style]
      });
    }
  }

  render() {
    let {
      style,
      label,
      labelStyle,
      inputStyle,
      ...inputProps
    } = this.props;
    let {container:boxStyle, input:input, label:labelS} = this.defineStyles();
    let placeholderColor = this.extractNonStyleValue(input, 'placeholderTextColor');
    labelStyle = [labelS, labelStyle];
    inputProps.style = [input, inputStyle];
    inputProps.placeholderTextColor = placeholderColor;
    boxStyle.push(style);
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.focusInput} style={boxStyle}>
        {label && this._displayLabel(label, labelStyle)}
        <TextInput underlineColorAndroid='transparent' ref={'input'} {...inputProps}/>
      </TouchableOpacity>
    );
  }
}
