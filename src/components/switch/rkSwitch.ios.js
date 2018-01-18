import React from 'react';
import {
  Switch,
  View
} from 'react-native';
import {RkComponent} from 'react-native-ui-kitten'

/**
 * `RkSwitch` is a component which looks like a standard iOS switch on both platforms.
 *
 * @extends RkComponent
 *
 * @example Simple usage example:
 *
 * ```
 * <RkSwitch value={this.state.value}
 *           onValueChange={() => this.setState({value: !this.state.value})}/>
 * ```
 *
 * @example Color settings
 *
 * As in a standard react-native's Switch, colors of the control can be configured via appropriate props:
 *
 * ```
 * <RkSwitch tintColor='blue' onTintColor='yellow' thumbTintColor='purple'
 *           value={this.state.value}
 *           onValueChange={() => this.setState({value: !this.state.value})} />
 * ```
 *
 *
 * @example Using rkType prop
 *
 * `RkSwitch` has `rkType` prop. This prop works similar to CSS-class in web. It is possible to set more than one type. There is a possibility to control tint colors via rkTypes. The library already contains some predefined types and also it is possible to create new ones:
 *
 * ```
 * RkTheme.setType('RkSwitch', 'mySwitch', {
 *     tintColor: 'blue',
 *     onTintColor: 'yellow',
 *     thumbTintColor: 'purple',
 *     margin: 10
 * });

 * <RkSwitch rkType='danger' value={this.state.value}
 *           onValueChange={() => this.setState({value: !this.state.value})} />
 * <RkSwitch rkType='mySwitch' value={this.state.value}
 *           onValueChange={() => this.setState({value: !this.state.value})} />
 *
 * ```
 *
 * @styles Available style properties:
 * - `tintColor` : will be converted into `tintColor` prop of `Switch`
 * - `onTintColor` : will be converted into `onTintColor` prop of `Switch`
 * - `thumbTintColor` : will be converted into `thumbTintColor` prop of `Switch`
 * - ...: Any other style properties will be applied to `View` container.
 *
 *
 * @property {string} rkType - Types for component stylization
 * By default `RkSwitch` supports following types: `primary`, `warning`, `danger`, `success`, `info`
 * @property {style} style - Style for `View` container
 * @property {Switch.props} props - All `Switch` props also applied to `RkSwitch`
 */
export class RkSwitch extends RkComponent {
  componentName = 'RkSwitch';
  typeMapping = {
    component: {
      onTintColor: 'onTintColor',
      thumbTintColor: 'thumbTintColor',
      tintColor: 'tintColor'
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {style, onTintColor, thumbTintColor, tintColor, ...restProps} = this.props;
    let {component} = super.defineStyles();

    onTintColor = onTintColor  || this.extractNonStyleValue(component, 'onTintColor');
    thumbTintColor = thumbTintColor || this.extractNonStyleValue(component, 'thumbTintColor');
    tintColor = tintColor || this.extractNonStyleValue(component, 'tintColor');

    return (
      <View style={[style, component]}>
        <Switch onTintColor={onTintColor}
                thumbTintColor={thumbTintColor}
                tintColor={tintColor}
                {...restProps}/>
      </View>
    )
  }
}