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

    return (
      <View {...this.props}>
        <View style={[componentStyle.layout, styles.layout]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
  },
});
