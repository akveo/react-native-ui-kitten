import React from 'react';
import {
  View,
  Animated,
} from 'react-native';

interface CheckMarkProps {
  size: number;
  color: Animated.AnimatedDiffClamp;
  isAnimated?: boolean;
}

export class CheckMark extends React.Component<CheckMarkProps> {

  static defaultProps = {
    isAnimated: false,
  };

  private getStyle = (size: number, color: Animated.AnimatedDiffClamp) => ({
    width: size / 2,
    height: size / 2,
    borderRadius: size / 2,
    backgroundColor: color,
  });

  render() {
    const {
      size,
      color,
      isAnimated,
    } = this.props;
    const Component = isAnimated ? Animated.View : View;

    return (
      <Component style={this.getStyle(size, color)}/>
    );
  }
}
