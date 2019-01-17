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
  value: boolean;
}

class Toggle extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Toggle',
  };

  state: State = {
    value: false,
  };

  render() {
    return (
      <View style={this.props.themedStyle.container}>
        <ToggleComponent
          value={this.state.value}
          onValueChange={(value: boolean) => this.setState({value: !this.state.value})}
          status='error'
          disabled={false}
        />
      </View>
    )
  }

}

export const ToggleScreen = withStyles(Toggle, (theme: ThemeType) => ({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
}));
