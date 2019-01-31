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
  children?: React.ReactElement<any>;
}

export type Props = LayoutProps & StyledComponentProps & ViewProps;

export class Layout extends React.Component<Props> {

  private getComponentStyle: (style: StyleType) => StyleType = (style: StyleType): StyleType => ({
    layout: style,
  });

  render(): React.ReactElement<ViewProps> {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);
    const { style, ...restProps } = this.props;

    return (
      <View {...restProps} style={[componentStyle.layout, style]}>
        {this.props.children}
      </View>
    );
  }
}
