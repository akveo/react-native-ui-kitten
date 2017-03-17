import React, {Component} from 'react';

import {
  ScrollView,
  Animated,
} from 'react-native';

export class RkBoardUpView extends Component {

  static name = 'boardUp';

  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(0),
    };
  }

  onKeyboardWillShow(e) {
    Animated.timing(this.state.top, {
      toValue: -(e.startCoordinates.height),
      duration: e.duration,
    }).start();
  }

  onKeyboardDidShow(e) {

  }

  onKeyboardWillHide(e) {
    Animated.timing(this.state.top, {
      toValue: 0,
      duration: e.duration,
    }).start();
  }

  onKeyboardDidHide(e) {

  }

  render() {

    let {
      style,
      children,
      ...props
      } = this.props;
    return (
      <Animated.View style={[{position: 'relative', top: this.state.top}, style]} {...props}
        >
        {children}
        <ScrollView
          style={{height: 0, width: 0}}
          onKeyboardWillShow={(e)=>{this.onKeyboardWillShow(e)}}
          onKeyboardDidShow={(e)=>{this.onKeyboardDidShow(e)}}
          onKeyboardWillHide={(e)=>{this.onKeyboardWillHide(e)}}
          onKeyboardDidHide={(e)=>{this.onKeyboardDidHide(e)}}
          scrollEnabled={false}
          >
        </ScrollView>
      </Animated.View>
    );
  }


}
