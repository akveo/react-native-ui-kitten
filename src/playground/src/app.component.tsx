import React from 'react';
import {
  StyleProvider,
  ThemeMappingType,
  ThemeType,
} from '@rk-kit/theme';
import {
  Mappings,
  Theme,
} from './theme-token';
import { withNavigation } from './navigation';
import * as Screens from './ui/screen';

interface State {
  mappings: ThemeMappingType[];
  theme: ThemeType;
}

export default class App extends React.Component<any, State> {

  constructor(props) {
    super(props);
    this.state = {
      mappings: Mappings,
      theme: Theme,
    };
  }

  render() {
    const { HomeScreen: RootScreen, ...nestedScreens } = Screens;
    const Router = withNavigation(RootScreen, nestedScreens);
    return (
      <StyleProvider theme={this.state.theme} mapping={this.state.mappings}>
        <Router/>
      </StyleProvider>
    );
  }
}
