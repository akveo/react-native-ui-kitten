import React from 'react';
import {
  Button,
  View,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@rk-kit/theme';
import { Sample as SampleComponent } from '../component';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  sampleDisabled: boolean;
}

class Sample extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Sample',
  };

  state = {
    sampleDisabled: false,
  };

  onDisableButtonPress = () => {
    this.setState({
      sampleDisabled: !this.state.sampleDisabled,
    });
  };

  getDisableButtonTitle = () => this.state.sampleDisabled ? 'Enable' : 'Disable';

  render() {
    return (
      <View style={this.props.themedStyle.container}>
        <SampleComponent
          variant='success'
          disabled={this.state.sampleDisabled}
        />
        <Button
          title={this.getDisableButtonTitle()}
          onPress={this.onDisableButtonPress}
        />
      </View>
    );
  }
}

export const SampleScreen = withStyles(Sample, (theme: ThemeType) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

