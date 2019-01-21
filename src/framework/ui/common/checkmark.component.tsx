import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
} from 'react-native';

interface CheckMarkProps {
  size: number;
  color: Animated.AnimatedDiffClamp | string;
  isAnimated?: boolean;
}

export class CheckMark extends React.Component<CheckMarkProps> {

  static defaultProps = {
    isAnimated: false,
  };

  private getStyle = (size: number, color: Animated.AnimatedDiffClamp | string) => ({
    checkMarkContainer: {
      width: size,
      height: size,
    },
    // the dependence of the variables was determined experimentally. Changes may be needed later.
    heartShape: {
      width: size * 0.25,
      height: size * 0.833,
      borderTopLeftRadius: size * 0.333,
      borderTopRightRadius: size * 0.333,
    },
    leftHeart: {
      height: size * 0.667,
      left: size * 0.167,
      top: size * 0.167,
    },
    rightHeart: {
      right: size * 0.167,
    },
  });

  render() {
    const {
      size,
      color,
      isAnimated,
    } = this.props;
    const componentStyles = this.getStyle(size, color);
    const Component = isAnimated ? Animated.View : View;

    return (
      <Component style={[styles.checkMarkContainer, componentStyles.checkMarkContainer]}>
        <Component style={[
          styles.heartShape,
          componentStyles.heartShape,
          styles.leftHeart,
          componentStyles.leftHeart,
          { backgroundColor: this.props.color },
        ]}/>
        <Component style={[
          styles.heartShape,
          componentStyles.heartShape,
          styles.rightHeart,
          componentStyles.rightHeart,
          { backgroundColor: this.props.color },
        ]}/>
      </Component>
    );
  }
}

const styles = StyleSheet.create({
  checkMarkContainer: {
    transform: [{ rotate: '-5deg' }],
  },
  heartShape: {
    position: 'absolute',
    top: 0,
  },
  leftHeart: {
    transform: [{ rotate: '-35deg' }],
  },
  rightHeart: {
    transform: [{ rotate: '45deg' }],
  },
});
