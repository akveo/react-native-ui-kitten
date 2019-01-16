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
    const { ToggleScreen: RootScreen, ...nestedScreens } = Screens;
    const Router = withNavigation(RootScreen, nestedScreens);

    return (
      <StyleProvider styles={styles} theme={this.state.theme} mapping={mapping}>
        <Router/>
      </StyleProvider>
    );
  }
}


const styles = {
  "Toggle": {
    "meta": {
      "variants": {
        "status": [
          "error"
        ],
        "size": [
          "small",
          "big"
        ]
      },
      "states": [
        "checked",
        "disabled",
        "active"
      ]
    },
    "default": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "gray-primary",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.checked": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "blue-primary",
      "selectColor": "blue-primary",
      "highlightColor": "transparent"
    },
    "default.checked.disabled": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "gray-primary",
      "highlightColor": "transparent"
    },
    "default.checked.active": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "blue-dark",
      "selectColor": "blue-primary",
      "highlightColor": "gray-light"
    },
    "default.checked.disabled.active": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "blue-dark",
      "selectColor": "gray-primary",
      "highlightColor": "gray-light"
    },
    "default.disabled": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.disabled.active": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.active": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.error": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.error.small": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.error.big": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.small": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "gray-primary",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.big": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "gray-primary",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.error.checked": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "pink-primary",
      "highlightColor": "transparent"
    },
    "default.error.checked.disabled": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "gray-primary",
      "highlightColor": "transparent"
    },
    "default.error.checked.active": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "pink-primary",
      "highlightColor": "gray-light"
    },
    "default.error.checked.disabled.active": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "gray-primary",
      "highlightColor": "gray-light"
    },
    "default.error.disabled": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.error.disabled.active": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.error.active": {
      "size": 36,
      "innerSize": 24,
      "highlightSize": 60,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.error.small.checked": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "pink-primary",
      "highlightColor": "transparent"
    },
    "default.error.small.checked.disabled": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "gray-primary",
      "highlightColor": "transparent"
    },
    "default.error.small.checked.active": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "pink-primary",
      "highlightColor": "gray-light"
    },
    "default.error.small.checked.disabled.active": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "gray-primary",
      "highlightColor": "gray-light"
    },
    "default.error.small.disabled": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.error.small.disabled.active": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.error.small.active": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.error.big.checked": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "pink-primary",
      "highlightColor": "transparent"
    },
    "default.error.big.checked.disabled": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "gray-primary",
      "highlightColor": "transparent"
    },
    "default.error.big.checked.active": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "pink-primary",
      "highlightColor": "gray-light"
    },
    "default.error.big.checked.disabled.active": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "pink-primary",
      "selectColor": "gray-primary",
      "highlightColor": "gray-light"
    },
    "default.error.big.disabled": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.error.big.disabled.active": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.error.big.active": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.small.checked": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "blue-primary",
      "selectColor": "blue-primary",
      "highlightColor": "transparent"
    },
    "default.small.checked.disabled": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "gray-primary",
      "highlightColor": "transparent"
    },
    "default.small.checked.active": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "blue-dark",
      "selectColor": "blue-primary",
      "highlightColor": "gray-light"
    },
    "default.small.checked.disabled.active": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "blue-dark",
      "selectColor": "gray-primary",
      "highlightColor": "gray-light"
    },
    "default.small.disabled": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.small.disabled.active": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.small.active": {
      "size": 30,
      "innerSize": 20,
      "highlightSize": 50,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.big.checked": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "blue-primary",
      "selectColor": "blue-primary",
      "highlightColor": "transparent"
    },
    "default.big.checked.disabled": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "gray-primary",
      "highlightColor": "transparent"
    },
    "default.big.checked.active": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "blue-dark",
      "selectColor": "blue-primary",
      "highlightColor": "gray-light"
    },
    "default.big.checked.disabled.active": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "blue-dark",
      "selectColor": "gray-primary",
      "highlightColor": "gray-light"
    },
    "default.big.disabled": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "gray-light",
      "selectColor": "transparent",
      "highlightColor": "transparent"
    },
    "default.big.disabled.active": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    },
    "default.big.active": {
      "size": 42,
      "innerSize": 28,
      "highlightSize": 70,
      "borderWidth": 2,
      "borderColor": "gray-dark",
      "selectColor": "transparent",
      "highlightColor": "gray-light"
    }
  }
};
