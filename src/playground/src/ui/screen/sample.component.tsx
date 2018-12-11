import React from 'react';
import { View } from 'react-native';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@rk-kit/theme';
import { Sample as SampleComponent } from '@rk-kit/ui';
import { NavigationScreenProps } from 'react-navigation';

type Props = & ThemedComponentProps & NavigationScreenProps;

class Sample extends React.Component<Props> {

  static navigationOptions = {
    title: 'Sample',
  };

  render() {
    return (
      <View style={this.props.themedStyle.container}>
        <SampleComponent variant='default'/>
      </View>
    );
  }
}

export const SampleScreen = withStyles(Sample, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
}));
