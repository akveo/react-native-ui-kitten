import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import _ from 'lodash';
import {RkComponent} from '../rkComponent';

/**
 * `RkChoice` component is an analog of html checkbox and radio buttons.
 *
 * @extends RkComponent
 *
 * @example Simple usage example:
 *
 * ```
 * <RkChoice selected={true}/>
 * ```
 *
 * @example Using rkType prop
 *
 * `RkChoice` has `rkType` prop. This prop works similar to CSS-class in web. It's possible to set more than one type.
 * There are already some predefined types. Here is example of how to use `rkType`:
 *
 * ```
 * <RkChoice rkType='clear' selected={true}/>
 * <RkChoice rkType='posNeg' selected={false}/>
 * ```
 *
 * @example Define new rkTypes
 *
 * It's easy and very common to create new types. Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 * `RkChoice` is a component which style depends or it's internal state. There are 4 states for this component:
 * - unselected (base)
 * - selected
 * - unselected & disabled
 * - selected & disabled
 * Each of this state can be configured using `rkTypes`. That means you can define set of correctly named `RkType`s
 * and `RkChoice` will apply them according to its state.
 * Use the following convention:
 * - `~name` : Unselected state.
 * - `~nameSelected` : Selected state.
 * - `~nameDisabled` : Unselected & disabled state.
 * - `~nameSelectedDisabled`: Selected & disabled state.
 * Where `~name` is name of yours `rkType`.
 * One more note: during state change `RkChoice` not replace base `rkType` with new one. It just add correct.
 * So for example `disabled` component will have actually two `rkTypes` - base and disabled.
 * To define new `rkType` you can use predefined properties which will passed to according element inside component:
 *
 * ```
 * RkTheme.setType('RkChoice', 'semaphore', {
 *   backgroundColor:'crimson',
 *   borderWidth:0,
 *   borderRadius:20
 * });
 *
 * RkTheme.setType('RkChoice', 'semaphoreSelected', {
 *   backgroundColor: 'chartreuse',
 * });
 *
 * RkTheme.setType('RkChoice', 'semaphoreDisabled', {
 *   backgroundColor: 'darkgray',
 * });
 *
 * RkTheme.setType('RkChoice', 'semaphoreSelectedDisabled', {
 *   backgroundColor: 'lightgray',
 * });
 *
 * //...
 *
 * <RkChoice rkType='semaphore'/>
 * <RkChoice selected rkType='semaphore'/>
 * <RkChoice disabled rkType='semaphore'/>
 * <RkChoice disabled selected rkType='semaphore'/>
 * ```
 *
 * @styles Available properties:
 * - `color` : Color of content in `RkChoice`. Applied for `content` property
 * - `backgroundColor` : Background color of `RkChoice`
 * - `borderWidth` : Width of outer border
 * - `borderRadius` : Border radius of `RkChoice`
 * - `borderColor` : Color of border
 * - `width` : Width of `RkChoice`
 * - `height` : Height of `RkChoice`
 * - `content` : Component tree which will be set into `RkChoice`. As `content` you can use text, icon, image etc
 *
 *
 * @example Custom content example
 *
 *
 *
 * ```
 * import Icon from 'react-native-vector-icons/Ionicons';
 *
 * RkTheme.setType('RkChoice', 'mic', {
 *   backgroundColor: 'darkred',
 *   borderWidth: 0,
 *   borderRadius: 20,
 *   content: (
 *     <View>
 *       <Icon style={{fontSize: 16, color: 'white'}} name={'ios-mic-off'}/>
 *     </View>
 *   )
 * });
 *
 * RkTheme.setType('RkChoice', 'micSelected', {
 *   content: (
 *     <View>
 *       <Icon style={{fontSize: 16, color: 'white'}} name={'ios-mic'}/>
 *     </View>
 *   )
 * });
 *
 * //...
 *
 * <RkChoice rkType='mic'/>
 * ```
 *
 * @example Advanced Styling
 *
 * It's also possible to implement more detailed styling. `RkChoice` consists from couple of base react component.
 * It's easy to set styles for each component.
 * For example you can add `disabled` and `disabled + selected` `rkType` for previous example
 *
 * ```
 * RkTheme.setType('RkChoice', 'micDisabled', {
 *   inner: {
 *     opacity: 0.7
 *   }
 * });
 *
 * RkTheme.setType('RkChoice', 'micSelectedDisabled', {
 *   content: (
 *     <View>
 *       <Icon style={{fontSize: 16, color: 'white'}} name={'ios-mic'}/>
 *     </View>
 *   ),
 *   inner: {
 *     opacity: 0.7
 *   }
 * });
 * ```
 *
 * @example Inline styling
 *
 * It's possible to set styles inline. Use props `style` for `container` component and `contentStyle` for `content` component.
 *
 * ```
 * <RkChoice style={{backgroundColor: 'green'}}
 *    contentStyle={{width: 50, height:50}}
 *    rkType='mic'/>
 * ```
 *
 * @styles Available Components:
 * - `container` : Can be `View` or `TouchableOpacity` depending on using with `RkChoiceGroup` or without
 * - `inner` : Applied to `content` property
 *
 * @property {string} rkType - Types for component stylization
 * By default `RkChoice` supports following types: `clear`, `radio`, `posNeg`
 * @property {bool} selected - Determines whether component is checked
 * @property {bool} disabled - Determines whether component is disabled
 * @property {function} onPress - Triggered on press
 * @property {style} style - Style for component container
 * @property {style} contentStyle - Style for content inside component
 */

export class RkChoice extends RkComponent {
  componentName = 'RkChoice';
  typeMapping = {
    container: {
      backgroundColor: 'backgroundColor',
      borderWidth: 'borderWidth',
      borderColor: 'borderColor',
      borderRadius: 'borderRadius',
    },
    inner: {
      color: 'color',
      width: 'width',
      height: 'height',
      content: 'content',
    }
  };

  selectedType = 'selected';
  disabledType = 'disabled';
  selectedDisabledType = 'selectedDisabled';

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected || false,
      disabled: props.disabled || false
    };

    this._initStyles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.state.selected) {
      this.setState({selected: nextProps.selected});
    }
  }

  render() {
    let {container, content} = this._defineStyles();


    if (this.props.inTrigger) {
      return (
        <View style={[container, this.props.style]}>
          {content}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          activeOpacity={this.props.disabled ? 1 : 0.2}
          style={[container, this.props.style]}
          onPress={(e) => {
            this._onPress(e)
          }}>
          {content}
        </TouchableOpacity>
      );
    }
  }

  _initStyles() {
    let base = this.props.rkType ? this.props.rkType.split(" ")[0] : undefined;

    if (base) {
      this.selectedType = `${base}${_.upperFirst(this.selectedType)}`;
      this.disabledType = `${base}${_.upperFirst(this.disabledType)}`;
      this.selectedDisabledType = `${base}${_.upperFirst(this.selectedDisabledType)}`;
    }

    if (this.props.rkSelectedType) {
      this.selectedType = this.props.rkSelectedType
    }
    if (this.props.rkDisabledType) {
      this.disabledType = this.props.rkDisabledType
    }
    if (this.props.rkSelectedDisabledType) {
      this.selectedDisabledType = this.props.rkSelectedDisabledType
    }
  }

  _onPress(e) {
    if (!this.props.disabled) {
      let selected = !this.state.selected;
      this.setState({selected});
      this.props.onChange && this.props.onChange(selected, e);
    }
  }

  _getContentFromProps() {
    let propName = 'content';
    if (this.state.selected) {
      propName += 'Selected';
    }
    if (this.state.disabled) {
      propName += 'Disabled';
    }
    return this.props[propName];
  }

  _defineStyles() {
    let computedTypes = [];
    if (this.state.selected && this.state.disabled) {
      computedTypes.push(this.selectedDisabledType)
    } else {
      if (this.state.selected)
        computedTypes.push(this.selectedType);
      if (this.state.disabled)
        computedTypes.push(this.disabledType);
    }

    let {container, inner} = this.defineStyles(_.join(computedTypes, " "));
    let propsContent = this._getContentFromProps();
    let contentValue = this.extractNonStyleValue(inner, 'content');

    let content = React.cloneElement(contentValue, {
        style: [inner, this.props.contentStyle]
      }) || (<View/>);

    if (propsContent) {
      content = React.cloneElement(propsContent);
    }

    return {container, content};
  }
}
