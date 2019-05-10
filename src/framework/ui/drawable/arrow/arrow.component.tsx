import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';

export type ArrowProps = ViewProps;

export class Arrow extends React.Component<ArrowProps> {

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      borderLeftWidth: source.width,
      borderRightWidth: source.width,
      borderBottomWidth: source.height,
      borderBottomColor: source.backgroundColor,
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      backgroundColor: 'transparent',
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, ...props } = this.props;
    const componentStyle = this.getComponentStyle(style);

    return (
      <View
        {...props}
        style={[style, componentStyle]}
      />
    );
  }
}
