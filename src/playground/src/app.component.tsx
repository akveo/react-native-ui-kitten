import React from 'react';
import {
  DefaultScheme,
  DefaultTheme,
} from 'eva';
import { ThemeMappingType } from 'eva/rk-kit';
import {
  StyleProvider,
  ThemeType,
} from '@rk-kit/theme';
import { withNavigation } from './navigation';
import * as Screens from './ui/screen';

interface State {
  mapping: ThemeMappingType;
  theme: ThemeType;
}

export default class App extends React.Component<any, State> {

  constructor(props) {
    super(props);
    this.state = {
      mapping: DefaultScheme,
      theme: DefaultTheme,
    };
  }

  render() {
    const { RadioScreen: RootScreen, ...nestedScreens } = Screens;
    const Router = withNavigation(RootScreen, nestedScreens);
    return (
      <StyleProvider theme={this.state.theme} mapping={this.state.mapping}>
        <Router/>
      </StyleProvider>
    );
  }
}
