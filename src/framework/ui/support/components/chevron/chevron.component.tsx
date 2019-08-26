import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';

export type ChevronDirection = 'top' | 'bottom' | 'left' | 'right';

interface ComponentProps {
  isAnimated?: boolean;
  direction?: ChevronDirection;
}

export type ChevronProps = ViewProps & ComponentProps;
export type ChevronElement = React.ReactElement<ChevronProps>;

export class Chevron extends React.Component<ChevronProps> {

  static defaultProps = {
    isAnimated: false,
    direction: 'bottom',
  };

  private getDirectionStyle = (): StyleType => {
    const { direction } = this.props;

    switch (direction) {
      case 'top':
        return styles.containerTopRotate;
      case 'right':
        return styles.containerRightRotate;
      case 'left':
        return styles.containerLeftRotate;
      default:
        return null;
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      width,
      height,
      tintColor: backgroundColor,
      marginHorizontal,
    } = source;

    return {
      container: {
        width: width,
        height: height,
        marginHorizontal: marginHorizontal,
      },
      // the dependence of the variables was determined experimentally. Changes may be needed later.
      shape: {
        top: height * 0.25,
        borderWidth: width * 0.06,
        borderTopLeftRadius: height * 0.5,
        borderTopRightRadius: height * 0.5,
        borderBottomLeftRadius: height * 0.5,
        borderBottomRightRadius: height * 0.5,
        borderColor: backgroundColor,
        backgroundColor: backgroundColor,
      },
      left: {
        left: width * 0.28,
        height: height * 0.45,
      },
      right: {
        right: width * 0.28,
        height: height * 0.45,
      },
    };
  };

  public render(): React.ReactNode {
    const { style, isAnimated } = this.props;
    const { container, shape, left, right } = this.getComponentStyle(StyleSheet.flatten(style));
    const directionStyle: StyleType = this.getDirectionStyle();

    const Component = isAnimated ? Animated.View : View;

    return (
      <Component style={[container, directionStyle, style]}>
        <Component style={[shape, left, styles.shape, styles.left]}/>
        <Component style={[shape, right, styles.shape, styles.right]}/>
      </Component>
    );
  }
}

const styles = StyleSheet.create({
  containerTopRotate: {
    transform: [{ rotate: '180deg' }],
  },
  containerLeftRotate: {
    transform: [{ rotate: '90deg' }],
  },
  containerRightRotate: {
    transform: [{ rotate: '-90deg' }],
  },
  shape: {
    position: 'absolute',
  },
  left: {
    transform: [{ rotate: '-45deg' }, { translateY: 1 }],
  },
  right: {
    transform: [{ rotate: '45deg' }, { translateY: 1 }],
  },
});
