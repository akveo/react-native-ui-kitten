import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {}

class Layout extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Layout',
  };

  render() {
    return (
      <View>
        <Text>Layout component</Text>
      </View>
    )
  }

}

export const LayoutScreen = withStyles(Layout, (theme: ThemeType) => ({
}));
