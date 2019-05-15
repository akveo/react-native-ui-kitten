# Creating Styled Components

React Native UI Kitten allows you creating your own components powered by Eva Design System. This helps you to have less StyleSheet-based styles and keeps your React components more clean and organized.

<hr>

### Declare Custom Component

As a first step, you need to declare your custom component.

```tsx
import React from 'react';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  Interaction,
} from '@kitten/theme';

type AwesomeComponentProps = TouchableOpacityProps & StyledComponentProps;

class StyledAwesomeComponent extends React.Component<AwesomeComponentProps> {

  static styledComponentName: string = 'AwesomeComponent';

  private onPressIn = (e: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(e);
    }
  };

  private onPressOut = (e: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(e);
    }
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, style, ...restProps } = this.props;

    return (
      <TouchableOpacity
        {...restProps}
        style={[themedStyle, style]}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      />
    );
  }
}

export const AwesomeComponent = styled(StyledAwesomeComponent);
```

<hr>

### Declare Custom Mappings

Now you have your own styled component that can use all of the Eva Design System power. 
The next step would be to let Eva know about your component.

```json
{
  "components": {
    "AwesomeComponent": {
      "meta": {
        "scope": "mobile",
        "parameters": {
          "backgroundColor": {
            "type": "string"
          }
        },
        "appearances": {
          "filled": {
            "default": "true"
          }
        },
        "variantGroups": {},
        "states": {
          "active": {
            "default": false,
            "priority": 0,
            "scope": "mobile"
          }
        }
      },
      "appearances": {
        "filled": {
          "mapping": {
            "backgroundColor": "red",
            "state": {
              "active": {
                "backgroundColor": "pink"
              }
            }
          }
        }
      }
    }
  }
}
```

<hr>

### Provide Custom Mappings

The code above presents your custom mapping configuration JSON.
It says you have AwesomeComponent which can be styled with `backgroundColor`.
The `backgroundColor` is `red` by default. But when your component becomes `active`, it would be changed to `pink`.

All that you have to do is to provide a custom mapping to ApplicationProvider.

```tsx
import React from 'react';
import { mapping } from '@eva/eva';
import { theme } from '@eva/theme-eva';
import { 
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import { Application } from './path-to/root.component';
import { customMapping } from './path-to/customMapping';

export default class App extends React.Component<ApplicationProviderProps> {

  public render(): React.ReactElement<ApplicationProviderProps> {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}
        customMapping={customMapping}>
        <Application/>
      </ApplicationProvider>
    );
  }
}
```

That's it! Now you're done and able to use your styled component.

<hr>

### Styled Component Usage

```tsx
import React from 'react';
import { 
  AwesomeComponent,
  AwesomeComponentProps,
} from './path-to/awesome.component';

export const AwesomeComponentShowcase = (props?: AwesomeComponentProps): React.ReactElement<AwesomeComponentProps> => (
  <AwesomeComponent {...props}/>
);
```

<hr>

## Related Articles

- [React Native UI Kitten Theme System](docs/guides/theme-system)

