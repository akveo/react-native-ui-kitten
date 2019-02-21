import React from 'react';
import { View } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Text as TextComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

class Text extends React.Component<Props> {

  static navigationOptions = {
    title: 'Text',
  };

  public render(): React.ReactNode {
    const { container, component } = this.props.themedStyle;

    return (
      <View style={container}>
        <TextComponent style={component} category='h1'>H1</TextComponent>
        <TextComponent style={component} category='h2'>H2</TextComponent>
        <TextComponent style={component} category='h3'>H3</TextComponent>
        <TextComponent style={component} category='h4'>H4</TextComponent>
        <TextComponent style={component} category='h5'>H5</TextComponent>
        <TextComponent style={component} category='h6'>H6</TextComponent>
        <TextComponent style={component} category='body'>Body</TextComponent>
      </View>
    );
  }
}

export const TextScreen = withStyles(Text, (theme: ThemeType) => ({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  component: {
  },
}));
