import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import {
  Layout,
  Text,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

class LayoutScreen extends React.Component<Props> {

  static navigationOptions = {
    title: 'Layout',
  };

  public render(): React.ReactElement<ViewProps> {
    return (
      <View style={this.props.themedStyle.container}>
        <Layout style={this.props.themedStyle.layout}>
          <Text>Layout</Text>
        </Layout>
      </View>
    );
  }
}

export default withStyles(LayoutScreen, (theme: ThemeType) => ({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  layout: {
    height: 300,
    backgroundColor: '#fff8e0',
  },
}));
