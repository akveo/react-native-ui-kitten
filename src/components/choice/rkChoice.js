import React from 'react';
import {
  TouchableOpacity,
  Image,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { RkComponent } from '../rkComponent';

/**
 * `RkChoice` component is an analog of html checkbox and radio buttons.
 *
 * @extends React.Component
 *
 * @example Simple usage example:
 *
 * ```
 * <RkChoice selected={true}/>
 * ```
 *
 * @example Using rkType prop
 *
 * `RkChoice` has `rkType` prop. This prop works similar to CSS-class in web.
 * It's possible to set more than one type.
 * There are already some predefined types. Here is example of how to use predefined `rkTypes`:
 *
 * ```
 * <RkChoice rkType='clear' selected={true}/>
 * <RkChoice rkType='posNeg' selected={false}/>
 * <RkChoice rkType='radio' selected />
 * ```
 *
 * @example Definition of new rkTypes
 *
 * It's easy and very common to create new types.
 * A starting point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`:
 * `RkChoice` is a component which style depends or it's internal state.
 * There are 4 states for this component:
 * - `Unselected` (base)
 * - `Selected`
 * - `Unselected and disabled`
 * - `Selected and disabled`.
 *
 * Each of this states can be configured using `rkTypes`.
 * That means you can define set of correctly named `RkTypes`
 * and `RkChoice` will apply them according to its state.
 * Use the following convention:
 * - `yourRkType` - Unselected state.
 * - `yourRkTypeSelected` - Selected state.
 * - `yourRkTypeDisabled` - Unselected & disabled state.
 * - `yourRkTypeSelectedDisabled` - Selected & disabled state.
 *
 * You can define just part of this types if you don't need to customize some of them.
 * For example you can create 'myType' and 'myTypeSelected' `rkTypes`
 * and not to define another two types.
 * Those 2 state will be rendered by default (or in according to other RkTypes in your component)
 * Note: during state change `RkChoice` doesn't replace base `rkType` with new state-based ones.
 *
 * ```
 * RkTheme.setType('RkChoice', 'redCheckMarkSelected', {
 *   backgroundColor: 'transparent',
 *   inner: {
 *     tintColor: 'red',
 *   }
 * });
 *
 * RkTheme.setType('RkChoice', 'magentaCyan', {
 *   inner: {
 *     tintColor: 'magenta',
 *   }
 * });
 *
 * RkTheme.setType('RkChoice', 'magentaCyanSelected', {
 *   inner: {
 *     tintColor: 'cyan',
 *   }
 * });
 *
 * RkTheme.setType('RkChoice', 'starSelected', {
 *   backgroundColor: 'transparent',
 *   inner: {
 *     imageSource: () => require('../img/star.png'),
 *     tintColor: 'green'
 *   }
 * });
 *
 * //...
 *
 * <RkChoice rkType='redCheckMark'/>
 * <RkChoice selected rkType='posNeg magentaCyan'/>
 * <RkChoice disabled rkType='star'/>
 * <RkChoice disabled selected rkType='radio star'/>
 * ```
 *
 * @styles Available style properties:
 * - `imageSource` : Source of `Image` component inside `RkChoice`.
 * - ...: Any other style properties defined without specifying component explicitly
 * will be applied to the default one.
 *
 * @example Content customization - replacing image
 *
 * `RkChoice` component consist of `TouchableOpacity`
 * (or `View` if your `RkChoice` is in other touchable component marked as 'choiceTrigger') and
 * `Image` inside it.
 *  It's possible to customize `RkChoice` to display your own content.
 *  It can be achieved in two ways.
 *  The first one it's just defining your picture to display in `Image` component:
 *
 * ```
 * RkTheme.setType('RkChoice', 'smileColorSelected', {
 *    borderWidth: 0,
 *    inner: {
 *      imageSource: () => require('../img/smile_color.png'),
 *      tintColor: null,
 *      margin: 0,
 *      width: 34,
 *      height: 34
 *    }
 *  });
 * ```
 * @example Content customization - rendering your own content
 *
 * Another way is defining `renderContentFunction` in props of `RkChoice`.
 * This way you can render content of component as you wish,
 * but the framework will be no longer control and apply rkTypes styling to your own
 * rendered content.
 * (But for 'container' rkTypes still will be applied).
 * This function takes the following argument:
 * `{isDisabled: bool, isSelected: bool, rkStyle: object}`. Pay attention to 'rkStyle'.
 * Although the framework does not apply styles to custom rendered content
 * it calculates style from rkTypes.
 * It is passed to the 'rkStyle' argument and you can apply this style by yourself.
 *
 * ```
 * <RkChoice selected style={{backgroundColor: 'transparent', borderWidth:0}}
 *           renderContentFunction={(args) => this._renderCustomContent(args)}/>
 *
 * _renderCustomContent(args) {
 *    if (args.isSelected) {
 *      return <View style={{flexDirection: 'row'}}>
 *          <ActivityIndicator/>
 *          <RkText style={{marginLeft: 4}}>
 *            Hello custom content!
 *          </RkText>
 *        </View>;
 *    } else {
 *      <View/>
 *    }
 *  }
 * ```
 *
 * @example Inline styling
 *
 * It's possible to set styles inline.
 * Use props `style` for `container` component and `contentStyle` for `inner` component.
 *
 * ```
 * <RkChoice style={{backgroundColor: 'green'}}
 *    contentStyle={{width: 50, height:50}}
 *    rkType='radio'/>
 * ```
 *
 * @styles Available Components:
 * - `container` (default): Can be `View` or `TouchableOpacity` depending on using
 *    with `RkChoiceGroup` or without.
 * - `inner` : `Image` or your own rendered content.
 *
 * @property {string} rkType - Types for component stylization.
 * By default `RkChoice` supports following types: `clear`, `radio`, `posNeg`.
 * (And `checkbox` style by default if there is no types specified explicitly).
 * @property {bool} selected - Determines whether component is checked
 * @property {bool} disabled - Determines whether component is disabled
 * @property {function} onChange - Triggered on change value
 * @property {function} renderContentFunction - Function to rendering your own content
 * @property {style} style - Style for `container` component
 * @property {style} contentStyle - Style for `inner` component
 */
export class RkChoice extends RkComponent {
  static propTypes = {
    rkType: PropTypes.string,
    style: ViewPropTypes.style,
    contentStyle: ViewPropTypes.style,
    selected: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    renderContentFunction: PropTypes.func,
  };
  static defaultProps = {
    rkType: '',
    style: null,
    contentStyle: null,
    selected: false,
    disabled: false,
    onChange: (() => null),
    renderContentFunction: undefined,
  };
  componentName = 'RkChoice';
  typeMapping = {
    container: {},
    inner: {
      imageSource: 'imageSource',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: props.selected,
      disabled: props.disabled,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.state.selected) {
      this.setState({ selected: nextProps.selected });
    }
  }

  onPress(e) {
    this.setState({ selected: !this.state.selected });
    this.props.onChange(this.state.selected, e);
  }

  renderDefaultContentView(style) {
    const image = this.extractNonStyleValue(style.rkStyle.inner, 'imageSource');
    return (
      <Image
        style={[style.rkStyle.inner, this.props.contentStyle]}
        source={image}
      />
    );
  }

  renderContentView() {
    const styles = this.props.rkType ? this.props.rkType.split(' ') : [];
    styles.unshift('');
    styles.forEach((v, k, state) => {
      state[k] += this.state.selected ? 'Selected' : ''; // eslint-disable-line no-param-reassign
      state[k] += this.state.disabled ? 'Disabled' : ''; // eslint-disable-line no-param-reassign
    });
    const { container, inner } = this.defineStyles(_.join(styles, ' '));
    const style = {
      isDisabled: this.state.disabled,
      isSelected: this.state.selected,
      rkStyle: { inner },
    };
    const contentView = this.props.renderContentFunction ?
      this.props.renderContentFunction(style) :
      this.renderDefaultContentView(style);
    return { container, contentView };
  }

  render() {
    const { container, contentView } = this.renderContentView();
    return (
      <TouchableOpacity
        style={[container, this.props.style]}
        activeOpacity={this.props.disabled ? 1 : 0.2}
        onPress={this.props.disabled ? () => {} : (e) => {
          this.onPress(e);
        }}>
        {contentView}
      </TouchableOpacity>
    );
  }
}
