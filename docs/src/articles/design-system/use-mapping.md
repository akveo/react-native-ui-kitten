# Creating Styled Components

React Native UI Kitten allows you creating your own components powered by Eva Design System. This helps you to have less StyleSheet-based styles and keeps your React components more clean and organized.

<hr>

## Declare Custom Mappings

Let's say we have an `AwesomeView` component that we also want to be powered by Eva Design System.
To do that, you need to use our styling configuration we call `mapping`.
Let's declare a custom mapping in a separated `customMapping.json` file.

```json
{
  "components": {
    "AwesomeView": {
      "meta": {
        "scope": "mobile", // <-- We're going to use AwesomeView only on mobile devices
        "parameters": {
          "backgroundColor": {
            "type": "string" // <-- And AwesomeView can be styled with `backgroundColor`
          }
        },
        "appearances": {
          "filled": {
            "default": "true" // <-- It has an appearance called `filled`, which is default
          }
        },
        "variantGroups": {},
        "states": {
          "active": { // <-- AwesomeView has an `active` state
            "default": false,
            "priority": 0,
            "scope": "mobile"
          }
        }
      },
      "appearances": {
        "filled": {
          "mapping": {
            "backgroundColor": "color-primary-500", // <-- By default backgroundColor is `color-primary-500`
            "state": {
              "active": {
                "backgroundColor": "color-primary-700" // <-- But when AwesomeView is active, it is `color-primary-700`
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

## Declare Custom Component

As a first step, you need to declare your custom component.

```js
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { styled, Interaction } from 'react-native-ui-kitten';

class AwesomeView extends React.Component {

  static styledComponentName = 'AwesomeView';

  onPressIn = () => {    
    this.props.dispatch([Interaction.ACTIVE]); // <-- Notify UI Kitten on `AwesomeView` state change.
  };

  onPressOut = () => {
    this.props.dispatch([]);
  };

  render() {
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

export const StyledAwesomeView = styled(AwesomeView);
```

In the example above we have declared an `AwesomeView` class which renders `TouchableOpacity`.
We want it to get some visible feedback when we press it. So we simply call `dispatch` function to request an `active` styles we previously declared in `customMapping.json`.

## Provide Custom Mappings

The only thing we need to do is to combine `customMapping` with `mapping` exported by Eva Design System. We can do this with the following code:

```js
import * as React from 'react';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import { StyledAwesomeView } from './path-to/awesome.component'; // <-- Import styled component
import { customMapping } from './path-to/customMapping'; // <-- Import `customMapping.json` and convert it to JavaScript object

const App = () => (
  <ApplicationProvider
    mapping={mapping}
    theme={lightTheme}
    customMapping={customMapping}>
    <Layout style={{flex: 1}}>
      <StyledAwesomeView/>
    </Layout>
  </ApplicationProvider>
);

export default App;
```

That's it! Now you're done and able to use your styled component.

<hr>

## Related Articles


