import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Toggle as ToggleComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {

}

class Toggle extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Toggle',
  };

  render() {
    return (
      <View>
        <ToggleComponent/>
      </View>
    )
  }

}

export const ToggleScreen = withStyles(Toggle, (theme: ThemeType) => ({

}));
