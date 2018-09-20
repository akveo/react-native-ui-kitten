import React from 'react';

import { Text } from 'react-native';

import { RkComponent } from '../rkComponent';

/**
 * `RkText` is a component used to render text blocks
 *
 * @extends React.Component
 *
 * @example Simple usage example:
 *
 * ```
 * <RkText>Text</RkText>
 * ```
 *
 * @example Using rkType prop
 *
 * `RkText` has `rkType` prop. This prop works similar to CSS-class in web.
 * It's possible to set more than one type.
 * There are already some predefined types. Here is example of how to use rkType
 *
 * ```
 * <RkText rkType='primary'>Primary</RkText>
 * <RkText rkType='danger large'>Danger and Large</RkText>
 * ```
 *
 * @example Define new rkTypes
 *
 * It's easy and very common to create new types.
 * Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 *
 * ```
 * RkTheme.setType('RkText','hero',{
 *  fontSize: 40
 * });
 *
 * //...
 *
 * <RkText rkType='hero'>Header</RkText>
 * ```
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling. `RkText` wraps base `Text` component.
 * It's easy to set styles for each component.
 *
 * ```
 * RkTheme.setType('RkText','italic',{
 *   text:{
 *     fontStyle:'italic'
 *   }
 * });
 * ```
 *
 * @styles Available components:
 * - `text` (Default): `Text` - component used to show text.
 *
 * @property {string} rkType - Types for component stylization
 * By default RkText supports following types:
 * `primary`, `info`, `warning`, `danger`, `success`, `xxlarge`, `xlarge`,
 `large`, `small`, `medium`, `header`, `subtitle`
 * @property {Text.props} props - All `Text` props also applied to `RkText`
 */

export class RkText extends RkComponent {
  static propTypes = {
    rkType: RkComponent.propTypes.rkType,
    ...Text.propTypes,
  };
  static defaultProps = {
    rkType: RkComponent.defaultProps.rkType,
  };
  componentName = 'RkText';
  typeMapping = {
    text: {},
  };

  render() {
    const {
      rkType,
      style,
      children,
      ...textProps
    } = this.props;
    const styles = this.defineStyles(rkType);
    return (
      <Text rkType={rkType} style={[styles.text, style]} {...textProps}>{children}</Text>
    );
  }
}
