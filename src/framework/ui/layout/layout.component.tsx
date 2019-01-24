import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface LayoutProps {
  appearance?: string;
  children?: any;
}

export type Props = LayoutProps & StyledComponentProps & ViewProps;

export class Layout extends React.Component<Props> {

  getComponentStyle = (style: StyleType): StyleType => ({
    layout: style,
  });

  render() {
    const componentStyle = this.getComponentStyle(this.props.themedStyle);
    const { style, ...restProps } = this.props;

    return (
      <View {...restProps} style={[componentStyle.layout, style]}>
        {this.props.children}
      </View>
    );
  }
}
