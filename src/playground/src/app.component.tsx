import React from 'react';
import {
  mapping,
  style,
} from 'eva/packages/mapping-kitten/eva';
import { theme } from 'eva/packages/theme/eva';
import { ThemeMappingType } from 'eva/packages/common';
import {
  StyleProvider,
  ThemeType,
} from '@kitten/theme';
import { withNavigation } from './navigation';
import * as Screens from './ui/screen';

interface State {
  mapping: ThemeMappingType;
  styles: any;
  theme: ThemeType;
}

type Props = any;

export default class App extends React.Component<Props, State> {

  public state: State = {
    mapping: mapping,
    styles: style,
    theme: theme,
  };

  public render(): React.ReactNode {
    const { HomeScreen: RootScreen, ...screens } = Screens;
    const Router: React.ComponentClass = withNavigation(RootScreen, screens);

    return (
      <StyleProvider styles={this.state.styles} theme={this.state.theme} mapping={mapping}>
        <Router/>
      </StyleProvider>
    );
  }
}
