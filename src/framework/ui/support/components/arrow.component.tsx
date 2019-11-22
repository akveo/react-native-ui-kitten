import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { StyleType } from '@kitten/theme';

export type ArrowProps = ViewProps;
export type ArrowElement = React.ReactElement<ArrowProps>;

export class Arrow extends React.Component<ArrowProps> {

  private getComponentStyle = (source: StyleProp<ViewStyle>): StyleType => {
    const flatStyle: ViewStyle = StyleSheet.flatten(source);

    return {
      container: {
        // @ts-ignore: `width` is restricted to be a number
        borderLeftWidth: flatStyle.width,
        // @ts-ignore: `width` is restricted to be a number
        borderRightWidth: flatStyle.width,
        // @ts-ignore: `height` is restricted to be a number
        borderBottomWidth: flatStyle.height,
        borderBottomColor: flatStyle.backgroundColor,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        backgroundColor: 'transparent',
      },
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, ...props } = this.props;
    const componentStyle = this.getComponentStyle(style);

    return (
      <View
        {...props}
        style={[style, styles.container, componentStyle.container]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
