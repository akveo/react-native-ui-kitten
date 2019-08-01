import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import { RTLService } from '@kitten/ui/i18n/rtl.service';

interface ComponentProps {
  isAnimated?: boolean;
}

export type CheckMarkProps = ViewProps & ComponentProps;
export type CheckMarkElement = React.ReactElement<CheckMarkProps>;

export class CheckMark extends React.Component<CheckMarkProps> {

  static defaultProps = {
    isAnimated: false,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { width, height, backgroundColor } = source;

    return {
      container: {
        width: width,
        height: height,
      },
      // the dependence of the variables was determined experimentally. Changes may be needed later.
      shape: {
        borderWidth: width * 0.125,
        borderTopStartRadius: height * 0.5,
        borderTopEndRadius: height * 0.5,
        borderBottomStartRadius: height * 0.5,
        borderBottomEndRadius: height * 0.5,
        borderColor: backgroundColor,
        backgroundColor: backgroundColor,
      },
      left: {
        start: width * 0.125,
        top: width * 0.25,
        height: height * 0.65,
      },
      right: {
        end: width * 0.175,
        height: height * 0.875,
      },
    };
  };

  public render(): React.ReactNode {
    const { style, isAnimated } = this.props;
    const { container, shape, left, right } = this.getComponentStyle(StyleSheet.flatten(style));

    const Component = isAnimated ? Animated.View : View;

    return (
      <Component style={[container, styles.container]}>
        <Component style={[shape, left, styles.shape, styles.left]}/>
        <Component style={[shape, right, styles.shape, styles.right]}/>
      </Component>
    );
  }
}

const styles = StyleSheet.create({
  container: RTLService.ignoreRTLFlexStyle({
    flexDirection: 'row',
    transform: [{ rotate: '-5deg' }],
  }),
  shape: {
    position: 'absolute',
  },
  left: {
    transform: [{ rotate: '-40deg' }, { translateY: 1 }],
  },
  right: {
    transform: [{ rotate: '40deg' }, { translateY: 1 }],
  },
});
