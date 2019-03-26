import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Text } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

class TextScreen extends React.Component<Props> {

  static navigationOptions = {
    title: 'Text',
  };

  public render(): React.ReactNode {
    const { container, component } = this.props.themedStyle;

    return (
      <View style={container}>
        <Text style={component} category='h1'>H1</Text>
        <Text style={component} category='h2'>H2</Text>
        <Text style={component} category='h3'>H3</Text>
        <Text style={component} category='h4'>H4</Text>
        <Text style={component} category='h5'>H5</Text>
        <Text style={component} category='h6'>H6</Text>
        <Text style={component} category='body'>Body</Text>
      </View>
    );
  }
}

export default withStyles(TextScreen, (theme: ThemeType) => ({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  component: {},
}));
