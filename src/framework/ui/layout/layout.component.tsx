import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface LayoutComponentProps {
  appearance?: string | 'default';
  children?: any;
}

export type LayoutProps = LayoutComponentProps & StyledComponentProps & ViewProps;

export class Layout extends React.Component<LayoutProps> {

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
