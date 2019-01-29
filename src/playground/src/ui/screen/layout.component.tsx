import React from 'react';
import {
  Text,
  View,
  ViewProps,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Layout as LayoutComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

class Layout extends React.Component<Props> {

  static navigationOptions = {
    title: 'Layout',
  };

  render(): React.ReactElement<ViewProps> {
    return (
      <View style={this.props.themedStyle.container}>
        <LayoutComponent style={this.props.themedStyle.layout}>
          <Text>Layout</Text>
        </LayoutComponent>
      </View>
    );
  }

}

export const LayoutScreen = withStyles(Layout, (theme: ThemeType) => ({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  layout: {
    height: 300,
    backgroundColor: '#fff8e0',
  },
}));
