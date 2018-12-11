import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@rk-kit/theme';
import { Sample as SampleComponent } from '../component';

type Props = & ThemedComponentProps & NavigationScreenProps;

class Sample extends React.Component<Props> {

  static navigationOptions = {
    title: 'Sample',
  };

  render() {
    return (
      <View style={this.props.themedStyle.container}>
        <SampleComponent variant='dark success'/>
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
