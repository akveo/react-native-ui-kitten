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
  appearance?: string | 'default';
  children?: any;
}

export type Props = LayoutProps & StyledComponentProps & ViewProps;

export class Layout extends React.Component<Props> {

  getComponentStyle = (style: StyleType): StyleType => ({
    layout: style,
  });

  render() {
    const componentStyle = this.getComponentStyle(this.props.themedStyle);

    return (
      <View style={[componentStyle.layout, this.props.style]}>
        {this.props.children}
      </View>
    );
  }
}
