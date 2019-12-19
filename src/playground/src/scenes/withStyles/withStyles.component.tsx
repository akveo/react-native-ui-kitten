import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  Text,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@ui-kitten/components';

class WithStylesClassComponent extends React.Component<ViewProps & ThemedComponentProps> {

  public render(): React.ReactElement<ViewProps> {
    return (
      <View style={this.props.themedStyle.container}>
        <Text category='h4' status='control'>Class Component</Text>
      </View>
    );
  }
}

const WithStylesFunctionComponent = (props: ViewProps & ThemedComponentProps): React.ReactElement<ViewProps> => (
  <View style={props.themedStyle.container}>
    <Text category='h4' status='control'>Functional Component</Text>
  </View>
);

const WithStylesClassShowcase = withStyles(WithStylesClassComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme['color-primary-default'],
  },
}));

const WithStylesFunctionShowcase = withStyles(WithStylesFunctionComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme['color-success-default'],
  },
}));

export const WithStylesScreen = (): React.ReactElement<ViewProps> => (
  <View style={{ flex: 1 }}>
    <WithStylesClassShowcase/>
    <WithStylesFunctionShowcase/>
  </View>
);

