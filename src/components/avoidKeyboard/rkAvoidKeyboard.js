import React from 'react';
import {
  Animated,
  Platform,
  Keyboard
} from 'react-native';
import {RkComponent} from '../rkComponent';

export class RkAvoidKeyboard extends RkComponent {
  componentName = 'RkAvoidKeyboard';
  typeMapping = {
    container: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(0),
    };

    this.onKeyboardWillShow = this._onKeyboardWillShow.bind(this);
    this.onKeyboardWillHide = this._onKeyboardWillHide.bind(this);
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

  _onKeyboardWillShow(e) {
    Animated.timing(this.state.top, {
      toValue: -(e.startCoordinates.height),
      duration: e.duration,
    }).start();
  }

  _onKeyboardWillHide(e) {
    Animated.timing(this.state.top, {
      toValue: 0,
      duration: e.duration,
    }).start();
  }

  render() {
    let {
      style,
      children,
      ...props
    } = this.props;

    let {container} = this.defineStyles();

    return (
      <Animated.View style={[container, {top: this.state.top}, style]}
                     {...props}>
        {children}
      </Animated.View>
    );
  }
}