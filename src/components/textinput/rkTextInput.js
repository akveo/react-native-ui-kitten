import React from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';

/**
 * `RkTextInput` is a component to be used as a basic text input.
 *
 * @extends React.Component
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
 * `RkTextInput` has `rkType` prop. This prop works similar to CSS-class in web.
 * It's possible to set more than one type.
 * There are already some predefined types. Here is example of how to use rkType
 *
 * ```
 * <RkTextInput rkType='rounded' label='Search'/>
 * ```
 *
 * @example Define new rkTypes
 *
 * It's easy and very common to create new types.
 * Main point for all customization is `RkTheme` object.
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
 * @styles Available style properties:
 * - `color` : Color of typed text inside `RkTextInput`. Applied for 'input' component.
 * - `inputBackgroundColor` : Background color of `TextInput` inside `RkTextInput`.
 *    Applied for 'input' component.
 * - `placeholderTextColor` : Color of placeholder text. Applied for 'input' component.
 * - `labelColor` : Color of label/icon. Applied for 'label' component.
 * - `labelFontSize` : Font size of label. Applied for 'label' component.
 * - `underlineWidth` : Width of bottom border of component.
 *    Applied for 'container' component.
 * - `underlineColor` : Color of bottom border of component. Applied for 'container' component.
 * - ...: Any other style properties defined without specifying component explicitly
 *    will be applied to the default one.
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling.
 * `RkTextInput` consists from couple of base react component.
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
 * - `container` (Default): `TouchableOpacity` - container of `RkTextInput`.
 * - `input` : `TextInput`.
 * - `label` : `Text` or other View tree that you had specified in `label` props.
 *
 *
 * @example Inline styling:
 *
 * It's possible to set styles inline.
 * Use prop `style` for `container` component,
 * `labelStyle` for `label` component,
 * `inputStyle` for `input`.
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
 * @property {TextInput.props} props - Regular `TextInput` props
 * will be passed to internal `TextInput` component
 * @property {style} style - Style for TouchableOpacity wrapping input and label
 * @property {string || function} label - Label displayed with input.
 * When label is clicked input gets focus. function should return React component
 * @property {style} labelStyle - Style applied to label
 * @property {style} inputStyle - Style applied to text input
 */
export class RkTextInput extends RkComponent {
  static propTypes = {
    editable: PropTypes.bool,
    label: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    style: ViewPropTypes.style,
    inputStyle: ViewPropTypes.style,
  };
  static defaultProps = {
    editable: true,
    label: null,
    style: null,
    inputStyle: null,
  };
  componentName = 'RkTextInput';
  typeMapping = {
    container: {
      underlineWidth: 'borderBottomWidth',
      underlineColor: 'borderBottomColor',
    },
    input: {
      color: 'color',
      inputBackgroundColor: 'backgroundColor',
      placeholderTextColor: 'placeholderTextColor',
    },
    label: {
      labelColor: 'color',
      labelFontSize: 'fontSize',
    },
  };

  focusInput = () => {
    if (this.props.editable) {
      this.inputRef.focus();
    }
  };

  renderLabel(label, labelStyle) {
    if (typeof label === 'string') {
      return (
        <Text style={labelStyle} onPress={this.focusInput}>{label}</Text>
      );
    }
    return React.cloneElement(label, {
      onPress: (e) => {
        this.inputRef.focus();
        if (label.props.onPress) {
          label.props.onPress(e);
        }
      },
      style: [labelStyle, label.props.style],
    });
  }

  render() {
    const {
      style,
      label,
      inputStyle,
      ...inputProps
    } = this.props;
    const { container: boxStyle, input, label: labelS } = this.defineStyles();
    const placeholderColor = this.extractNonStyleValue(input, 'placeholderTextColor');
    inputProps.labelStyle = [labelS, inputProps.labelStyle];
    inputProps.style = [input, inputStyle];
    inputProps.placeholderTextColor = placeholderColor;
    boxStyle.push(style);
    return (
      <TouchableOpacity activeOpacity={1} onPress={this.focusInput} style={boxStyle}>
        {label && this.renderLabel(label, inputProps.labelStyle)}
        <TextInput
          underlineColorAndroid='transparent'
          ref={(inputValue) => {
            this.inputRef = inputValue;
          }}
          {...inputProps}
        />
      </TouchableOpacity>
    );
  }
}
