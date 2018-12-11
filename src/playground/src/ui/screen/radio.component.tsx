import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@rk-kit/theme';
import { Radio as RadioComponent } from '@rk-kit/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  isRadioSelected: boolean;
}

class Radio extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Radio',
  };

  state: State = {
    isRadioSelected: false,
  };

  onRadioSelectionChange = (selected: boolean) => {
    this.setState({
      isRadioSelected: !selected,
    });
  };

  render() {
    return (
      <View style={this.props.themedStyle.container}>
        <RadioComponent
          variant='large'
          selected={this.state.isRadioSelected}
          onChange={this.onRadioSelectionChange}
        />
      </View>
    );
  }
}

export const RadioScreen = withStyles(Radio, (theme: ThemeType) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
