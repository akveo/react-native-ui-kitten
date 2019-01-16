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

export default class App extends React.Component<any, State> {

  constructor(props) {
    super(props);
    this.state = {
      mapping: mapping,
      styles: style,
      theme: theme,
    };
  }

  render() {
    const { RadioScreen: RootScreen, ...nestedScreens } = Screens;
    const Router = withNavigation(RootScreen, nestedScreens);

    return (
      <StyleProvider styles={this.state.styles} theme={this.state.theme} mapping={mapping}>
        <Router/>
      </StyleProvider>
    );
  }
}
