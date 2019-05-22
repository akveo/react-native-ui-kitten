import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Text } from '@kitten/ui';
import { ThemeConsumer } from '../themeConsumer';

type Props = & ThemedComponentProps & NavigationScreenProps;

class TextScreen extends React.Component<Props> {

  static navigationOptions = {
    title: 'Text',
  };

  public render(): React.ReactNode {
    const { container, component } = this.props.themedStyle;

    return (
      <ThemeConsumer>
        <View style={container}>
          <Text style={component} category='h1'>H1</Text>
          <Text style={component} category='h2'>H2</Text>
          <Text style={component} category='h3'>H3</Text>
          <Text style={component} category='h4'>H4</Text>
          <Text style={component} category='h5'>H5</Text>
          <Text style={component} category='h6'>H6</Text>
          <Text style={component} category='s1'>S1</Text>
          <Text style={component} category='s2'>S2</Text>
          <Text style={component} category='c1'>C1</Text>
          <Text style={component} category='c2'>C2</Text>
          <Text style={component} category='p1'>P1</Text>
          <Text style={component} category='p2'>P2</Text>
          <Text style={component} category='overline'>OVERLINE</Text>
          <Text style={component} category='label'>LABEL</Text>
        </View>
      </ThemeConsumer>
    );
  }
}

export default withStyles(TextScreen, (theme: ThemeType) => ({
  container: {
    flex: 1,
    backgroundColor: theme['background-color-default-1'],
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  component: {},
}));
