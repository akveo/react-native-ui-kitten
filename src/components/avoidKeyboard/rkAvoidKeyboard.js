import React from 'react';
import {
  Animated,
  Platform,
  Keyboard,
  ViewPropTypes,
} from 'react-native';
import { RkComponent } from '../rkComponent';

/**
 * `RkAvoidKeyboard` is a component for handling keyboard appearing on the screen.
 * This component is just a container for other react components.
 * In order to avoid keyboard it just changes `top` value according to keyboard height.
 * It doesn't have any customization. We also recommend not customize it.
 *
 * @deprecated since version 3.1.1. Will be deleted in version 3.2.0.
 *
 * @extends React.Component
 *
 * @example Important notes
 *
 * Deprecated since version 3.1.1. Will be deleted in version 3.2.0.
 *
 * ```
 * <RkAvoidKeyboard>
 *   <RkTextInput/>
 * </RkAvoidKeyboard>
 * ```
 */
export class RkAvoidKeyboard extends RkComponent {
  static propTypes = {
    ...ViewPropTypes,
  };
  componentName = 'RkAvoidKeyboard';
  typeMapping = {
    container: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(0),
    };

    this.onKeyboardWillShow = this.onKeyboardWillShow.bind(this);
    this.onKeyboardWillHide = this.onKeyboardWillHide.bind(this);
  }

  componentWillMount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowListner = Keyboard.addListener('keyboardWillShow', this.onKeyboardWillShow);
      this.keyboardWillHideListner = Keyboard.addListener('keyboardWillHide', this.onKeyboardWillHide);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShowListner.remove();
      this.keyboardWillHideListner.remove();
    }
  }

  onKeyboardWillShow(e) {
    Animated.timing(this.state.top, {
      toValue: -(e.startCoordinates.height),
      duration: e.duration,
    }).start();
  }

  onKeyboardWillHide(e) {
    Animated.timing(this.state.top, {
      toValue: 0,
      duration: e.duration,
    }).start();
  }

  render() {
    const {
      style,
      children,
      ...props
    } = this.props;

    const { container } = this.defineStyles();

    return (
      <Animated.View
        style={[container, { top: this.state.top }, style]}
        {...props}>
        {children}
      </Animated.View>
    );
  }
}
