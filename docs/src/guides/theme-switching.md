# React Native UI Kitten Theme Switching

React Native UI Kitten Theme System allows the developer to change the theme.
To do this, it is enough to replace the configuration object of the `theme` and pass it
through the property into the `ApplicationProvider`.

<hr>

### Changing Theme Example

```tsx
import { mapping } from '@eva/eva';
import { theme } from '@eva/themes';
import { customTheme } from './path-to/custom-theme;
import {
  ApplicationProvider,
  ThemeType,
} from '@kitten/theme';
import { Application } from './path-to/root.component';

interface AppState {
  theme: ThemeType;
}

export default class App extends React.Component<any, State> {

  public state: State = {
    theme: theme,
  };
  
  private changeTheme = (): void => {
    this.setState({ theme: customTheme });
  }

  public render(): React.ReactNode {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <Application/>
      </ApplicationProvider>
    );
  }
}
```

<hr>

### Other theme management options

This is not the only way to change the `theme` of the application. It is also possible to use one of the libraries that provide state management services, such as:

- [MobX](https://mobx.js.org/getting-started.html)
- [Redux](https://redux.js.org/)

