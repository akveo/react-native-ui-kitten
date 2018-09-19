import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  ViewPropTypes,
} from 'react-native';
import _ from 'lodash';

import { RkText } from '../text/rkText';
import { RkComponent } from '../rkComponent';

/**
 * `RkButton` is a basic button component.
 *
 * @extends React.Component
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
 * `RkButton` has `rkType` prop. This prop works similar to CSS-class in web.
 * It's possible to set more than one type.
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
 * It's easy and very common to create new types.
 * Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 *
 * ```
 * import {RkTheme} from 'react-native-ui-kitten';
 *
 * RkTheme.setType('RkButton', 'dark', {
 *   container: {
 *      backgroundColor: 'gray',
 *      borderRadius: 10,
 *   }
 * });
 *
 * // The same because 'container' is default component:
 * RkTheme.setType('RkButton', 'dark', {
 *   backgroundColor: 'gray',
 *   borderRadius: 10,
 * });
 *
 * RkTheme.setType('RkButton', 'icon', {
 *   fontSize: 24,
 *   width: 46,
 *   borderRadius: 25,
 *   hitSlop: {top: 5, left: 5, bottom: 5, right: 5}
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
 * @styles Available style properties:
 * - `color` : Color of content of `RkButton`. Applied to `content` component.
 *    Applies only if content of `RkButton` is `string`.
 * - `fontSize` : Size of content inside. Applied to `content` component.
 *    Applies only if content of `RkButton` is `string`.
 * - `hitSlop` : hitSlop prop of `TouchableWithoutFeedback`.
 *    Will be extracted and applied to `container` props during rendering.
 * - ...: Any other style properties defined without specifying component explicitly
 *    will be applied to the default one.
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling.
 * `RkButton` consists from couple of base react component.
 * It's easy to set styles for each component.
 *
 * For example you can change the opacity of content passed to RkButton:
 *
 * ```
 * RkTheme.setType('RkButton', 'faded', {
 *   content: {
 *     opacity: 0.6
 *   }
 * });
 * ```
 *
 * @styles Available components:
 * - `container` (default): `TouchableOpacity` - container of `RkButton`.
 * - `content` : If you use plain text then `RkText`.
 *    If you insert children - then style will not applied
 *
 * @example Inline styling
 *
 * It's possible to set styles inline.
 * Use props `style` for container component and `contentStyle` for content component.
 *
 * ```
 * <RkButton
 *    style={{backgroundColor: 'red'}}
 *    contentStyle={{color: 'white'}}>Hello</RkButton>
 * ```
 *
 * @property {string} rkType - Types for component stylization
 * By default `RkButton` supports following types:
 * `primary`, `info`, `warning`, `danger`, `success`, `outline`, `rounded`,
 * `circle`, `small`, `medium`, `large`, `xlarge`, `clear`, `stretch`
 * @property {style} style - Style for button container
 * @property {style} contentStyle - Style for each button's children
 * @property {Touchable} touchable - Touchable component which'll be rendered
 * instead of TouchableOpacity
 * @property {TouchableOpacity.props} props - All `TouchableOpacity` props also
 * applied to `RkButton`
 *
 */
export class RkButton extends RkComponent {
  static propTypes = {
    style: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    touchable: PropTypes.func,
  };
  static defaultProps = {
    style: null,
    contentStyle: null,
    children: [],
    touchable: TouchableOpacity,
  };
  static contextTypes = {
    theme: PropTypes.object,
  };
  componentName = 'RkButton';
  typeMapping = {
    container: {
      hitSlop: 'hitSlop',
    },
    content: {
      color: 'color',
      fontSize: 'fontSize',
    },
  };

  renderChildren(style) {
    const displayText = (text) => (
      <RkText style={[style, this.props.contentStyle]}>{text}</RkText>);
    if (typeof this.props.children === 'string') {
      return displayText(this.props.children);
    }
    const babies = _.isArray(this.props.children) ? this.props.children : [this.props.children];
    return React.Children.map(babies, (baby) => {
      if (typeof baby === 'string') {
        return displayText(baby);
      }
      const { style: babyStyle, ...babyProps } = baby.props;
      return React.cloneElement(baby, {
        style: [this.props.contentStyle, babyStyle],
        ...babyProps,
      });
    });
  }

  render() {
    const { container, content } = super.defineStyles();
    const { style, touchable: Touchable, ...touchableProps } = this.props;
    const hitSlop = this.extractNonStyleValue(container, 'hitSlop');
    if (hitSlop) touchableProps.hitSlop = hitSlop;

    return (
      <Touchable style={[container, style]} {...touchableProps}>
        {this.props.children && this.renderChildren(content)}
      </Touchable>
    );
  }
}
