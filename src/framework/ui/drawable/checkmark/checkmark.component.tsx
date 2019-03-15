import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ViewProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';

interface CheckMarkProps {
  isAnimated?: boolean;
}

export type Props = CheckMarkProps & ViewProps;

export class CheckMark extends React.Component<Props> {

  static defaultProps = {
    isAnimated: false,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      container: {
        width: source.width,
        height: source.height,
      },
      // the dependence of the variables was determined experimentally. Changes may be needed later.
      shape: {
        width: source.width * 0.2,
        height: source.height * 0.833,
        borderTopLeftRadius: source.height * 0.333,
        borderTopRightRadius: source.height * 0.333,
      },
      left: {
        height: source.height * 0.667,
        left: source.width * 0.167,
        top: source.width * 0.167,
        backgroundColor: source.backgroundColor,
      },
      right: {
        right: source.width * 0.167,
        backgroundColor: source.backgroundColor,
      },
    };
  };

  public render(): React.ReactNode {
    const { style, isAnimated } = this.props;
    const { container, shape, left, right } = this.getComponentStyle(StyleSheet.flatten(style));

    const Component = isAnimated ? Animated.View : View;

    return (
      <Component style={[container, styles.container]}>
        <Component style={[left, shape, styles.left, styles.shape]}/>
        <Component style={[right, shape, styles.right, styles.shape]}/>
      </Component>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    transform: [{ rotate: '-5deg' }],
  },
  shape: {
    position: 'absolute',
    top: 0,
  },
  left: {
    transform: [{ rotate: '-35deg' }],
  },
  right: {
    transform: [{ rotate: '45deg' }],
  },
});
