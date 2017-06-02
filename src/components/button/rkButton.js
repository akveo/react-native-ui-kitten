/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, {Component} from 'react';
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
 * This is full description for `RkButton`
 *
 * @extends RkComponent
 * @example
 *
 * Usage example
 *
 * ```
 * import {RkButton} from 'react-native-ui-kitten';
 *
 *  //...
 *
 *  <RkButton>Click</RkButton>
 *```
 *
 * @example Usage with Icons
 *
 * You can put text or/and icon inside of `RkButton`. Example of button with icon usage:
 *
 * ```
 * import {RkButton} from 'react-native-ui-kitten';
 * import Icon from 'react-native-vector-icons/Ionicons';
 *
 * //...
 *
 * <RkButton rkType='small outline'>
 * <Icon style={{marginRight: 5, fontSize: 18}} name={'logo-github'}/> Star
 * </RkButton>*
 * ```
 *
 * @example Create custom rkType
 *
 * To define new `rkType` you can use predefined properties which will passed to according element inside components:
 *
 * ```
 * import {RkTheme} from 'react-native-ui-kitten';
 *
 * RkTheme.setType('RkButton', 'dark', {
 *  backgroundColor: 'gray',
 *  borderRadius: 10,
 * });
 *
 * RkTheme.setType('RkButton', 'icon', {
 *  fontSize: 24,
 *  width: 46,
 *  borderRadius: 25
 * });
 * ```
 *
 * Now you can use *dark* and *icon* types in you app:
 *
 * ```
 * import {RkButton} from 'react-native-ui-kitten';
 *
 * //...
 *
 * <RkButton rkType='dark'>SUBMIT</RkButton>
 *
 * <RkButton rkType='dark icon' style={{marginLeft: 20}}>
 * <Icon name="md-heart"/>
 * </RkButton>
 *
 * ```
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling. `RkButton` consists from couple of base react component.
 * You can easily set styles for each component.
 *
 * For example you can change the opacity of content passed to `RkButton`:
 *
 * ```
 * import {RkTheme} from 'react-native-ui-kitten';
 *
 * RkTheme.setType('RkButton', 'faded', {
 *   content: {
 *     opacity: 0.6,
 *   }
 * });
 * ```
 *
 * @example Inline styling
 *
 * It's possible to set styles inline. Use props `style` for `container` component and `contentStyle` for `content` component.
 *
 * ```
 * import {RkButton} from 'react-native-ui-kitten';
 *
 * //...
 *
 * <RkButton
 * style={{backgroundColor: 'red'}}
 * contentStyle={{color: 'white'}}> Hello </RkButton>
 * ```
 *
 * @styles Available properties
 * - `color` : Color of content of `RkButton`. Usually text or icon.
 * - `backgroundColor` : Background color of `RkButton`.
 * - `borderWidth` : Width of outer border.
 * - `borderRadius` : Border radius of `RkButton`.
 * - `borderColor` : Color of border.
 * - `fontSize` : Size of content inside. Applied only for first level children of `RkButton`.
 * - `width` : Width of `RkButton`.
 * - `height` : Height of `RkButton`.
 *
 *  * @styles Available components
 * - `container` : `TouchableOpacity` - container of `RkButton`.
 * - `content` : If you use plain text then `RkText`. If you insert children - then style will be applied to all children on first level.
 *
 * @required
 * @property {string} rkType - Types for stylization component
 * By default RkButton supports following types: primary, info, warning, danger, success, outline, rounded,
 * circle, small, medium, large, xlarge, clear
 *
 * @property {TouchableOpacity.style} style - Style for button container
 *
 * @platform ios
 * @property {style} contentStyle - Style for each button's children
 *
 * @property {function} onPress - Called when the touch is released, but not if cancelled.
 * @property {function} onPressIn - Called when the touch is released, but not if cancelled.
 * @property {function} onPressOut - Called when the touch is released, but not if cancelled.
 * @property {function} onLongPress - Called when the touch is released and is longer than usual press, but not if cancelled.
 *
 *
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
