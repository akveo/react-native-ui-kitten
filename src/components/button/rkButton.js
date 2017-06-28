import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';

import {RkText} from '../text/rkText';
import {RkComponent} from '../rkComponent'

/**
 * `RkButton` is a basic button component.
 *
 * @extends RkComponent
 *
 * @example Simple usage example:
 *
 * ```
 * <RkButton>Button</RkButton>
 * ```
 *
 * @example Custom content inside button
 *
 * `RkButton` can contains not only text but also other components:
 *
 * ```
 * <RkButton>
 *    <Image
 *      style={{width: 50, height: 50}}
 *      source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
 * </RkButton>
 * ```
 *
 *
 * @example Using rkType prop
 *
 * `RkButton` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.
 * There are already some predefined types. Here is example of how to use rkType
 *
 * ```
 * <RkButton rkType='success'>Accept</RkButton>
 * <RkButton rkType='danger small'>Cancel</RkButton>
 * ```
 *
 *
 * @example Define new rkTypes
 *
 * It's easy and very common to create new types. Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 *
 * ```
 * import {RkTheme} from 'react-native-ui-kitten';
 *
 *  RkTheme.setType('RkButton', 'dark', {
 *   backgroundColor: 'gray',
 *   borderRadius: 10,
 * });
 *
 *  RkTheme.setType('RkButton', 'icon', {
 *   fontSize: 24,
 *   width: 46,
 *   borderRadius: 25
 * });
 *
 * //...
 *
 * <RkButton rkType='dark'>SUBMIT</RkButton>
 *
 * <RkButton rkType='dark icon' style={{marginLeft: 20}}>
 *    <Text>+</Text>
 * </RkButton>
 *
 * ```
 *
 * @styles Available properties:
 * - `color` : Color of content of `RkButton`. Applies only if content of `RkButton` is `string`
 * - `backgroundColor` : Background color of `RkButton`
 * - `borderWidth` : Width of outer border
 * - `borderRadius` : Border radius of `RkButton`
 * - `borderColor` : Color of border
 * - `fontSize` : Size of content inside. Applied only for first level children of `RkButton`
 * - `width` : Width of `RkButton`
 * - `height` : Height of `RkButton`
 *
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling. `RkButton` consists from couple of base react component.
 * It's easy to set styles for each component.
 *
 * For example you can change the opacity of content passed to RkButton:
 *
 * ```
 * RkTheme.setType('RkButton', 'faded', {
 *   content: {
 *     opacity: 0.6,
 *   }
 * });
 * ```
 *
 * @styles Available components:
 * - `container` : `TouchableOpacity` - container of `RkButton`
 * - `content` : If you use plain text then `RkText`. If you insert children - then style will not applied
 *
 * @example Inline styling
 *
 * It's possible to set styles inline. Use props `style` for container component and `contentStyle` for content component.
 *
 * ```
 * <RkButton
 *    style={{backgroundColor: 'red'}}
 *    contentStyle={{color: 'white'}}>Hello</RkButton>
 * ```
 *
 * @property {string} rkType - Types for component stylization
 * By default `RkButton` supports following types: `primary`, `info`, `warning`, `danger`, `success`, `outline`, `rounded`,
 * `circle`, `small`, `medium`, `large`, `xlarge`, `clear`, `stretch`
 * @property {style} style - Style for button container
 * @property {style} contentStyle - Style for each button's children
 * @property {function} onPress - Called when the touch is released, but not if cancelled.
 * @property {function} onPressIn - Same as `TouchableWithoutFeedback.onPressIn`
 * @property {function} onPressOut - Same as `TouchableWithoutFeedback.onPressOut`
 * @property {function} onLongPress - Called when the touch is released and is longer than usual press, but not if cancelled
 */

export class RkButton extends RkComponent {
  componentName = 'RkButton';
  typeMapping = {
    container: {
      backgroundColor: 'backgroundColor',
      borderColor: 'borderColor',
      borderRadius: 'borderRadius',
      borderWidth: 'borderWidth',
      width: 'width',
      height: 'height'
    },
    content: {
      color: 'color',
      fontSize: 'fontSize'
    }
  };

  static contextTypes = {
    theme: PropTypes.object
  };

  _renderChildren(style) {
    let displayText = (text) => (<RkText style={[style, this.props.contentStyle]}>{text}</RkText>);
    if (typeof this.props.children === 'string') {
      return displayText(this.props.children)
    }
    let babies = _.isArray(this.props.children) ? this.props.children : [this.props.children];
    return React.Children.map(babies, (baby) => {
      if (typeof baby === 'string') {
        return displayText(baby);
      } else {
        let {style: babyStyle, ...babyProps} = baby.props;
        return React.cloneElement(baby, {
          style: [this.props.contentStyle, babyStyle],
          ...babyProps
        });
      }
    })
  }

  render() {
    let a = this.context;
    let {container, content} = super.defineStyles();
    let touchableProps = {
      onPress: this.props.onPress,
      onPressIn: this.props.onPressIn,
      onPressOut: this.props.onPressOut,
      onLongPress: this.props.onLongPress
    };

    return (
      <TouchableOpacity style={[container, this.props.style]} {...touchableProps}>
        {this.props.children && this._renderChildren(content)}
      </TouchableOpacity>
    );
  }
}
