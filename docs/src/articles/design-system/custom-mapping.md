# Create a Custom Component Mapping

Creation mapping for a custom component is a very similar process to [Mapping Customization](design-system/customize-mapping). Only in this case, we suggest the following simple but very important rules so that we can minimize the number of necessary changes and avoid repeated code.

Before we start, let's pretend we want to create a `CircleButton` component.

<hr>

## Prepare the boilerplate

In this step, we'll create a component and it's initial mapping.

Create a component:
```js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styled } from '@ui-kitten/components';

class CircleButton extends React.Component {
  static styledComponentName = 'CircleButton'; // <-- This is important!
  
  render() {
    const { themedStyle, style, ...restProps } = this.props;
    
    return (
      <TouchableOpacity style={[themedStyle, style]} {...restProps} />
    );
  }
}

export default styled(CircleButton);
```

Create a custom mapping:

```json
{
  "components": {
    "CircleButton": {
      "meta": {
        "parameters": {},
        "variantGroups": {},
        "states": {},
        "appearances": {
          "filled": {
            "default": true
          }
        }
      },
      "appearances": {
        "filled": {
          "mapping": {}
        } 
      }
    }
  }
}
```

And pass it to an `ApplicationProvider` component:

```js
import React from 'react';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { default as customMapping } from './path-to/custom-mapping.json'; // <-- Import custom mapping
import CircleButton from './path-to/CircleButton'; // <-- Import custom component

const App = () => (
  <ApplicationProvider 
    mapping={mapping}
    customMapping={customMapping}
    theme={lightTheme}>
    <Layout style={{padding: 64, alignItems: 'center'}}>
      <CircleButton />
    </Layout>
  </ApplicationProvider>
);

export default App;
```

<hr>

## Start with an idea

The main idea of `CircleButton` component is that is going to be a circle. This means we need to provide some dimension styles and a `borderRadius` to make it round. Go back to `custom-mapping.json` and paste the following:

```json
{
  "components": {
    "CircleButton": {
      "meta": {
        "parameters": { // <-- Register parameters
          "width": {
            "type": "number"
          },
          "height": {
            "type": "number"
          },
          "borderRadius": {
            "type": "number"
          },
          "backgroundColor": {
            "type": "number"
          }
        },
        "variantGroups": {},
        "states": {},
        "appearances": {
          "filled": {
            "default": true
          }
        }
      },
      "appearances": {
        "filled": {
          "mapping": { // <-- Parameters applied by a component
            "width": 64,
            "height": 64,
            "borderRadius": 32,
            "backgroundColor": "color-primary-default"
          }
        } 
      }
    }
  }
}
```

This is an initial look:

![image](assets/images/articles/design-system/custom-mapping-initial.png)

<hr>

## Expand with a variants

The example above demonstrates how you can create a really simple configuration. And on this step you might think that it is over-engineering. Let's now do some magic now.

```json
{
  "components": {
    "CircleButton": {
      "meta": {
        // ...
        "variantGroups": {
          "shape": {
            "rounded": { // <-- Register a `rounded` variant
              "default": false
            }
          }
        }
      },
      "appearances": {
        "filled": {
          "mapping": {
            // ...
          }
        },
        "variantGroups": {
          "shape": {
            "rounded": { // <-- Describes a `rounded` variant parameters
              "borderRadius": 16
            }
          }
        }
      }
    }
  }
}
```

What we did is that we added a rounded [variant](design-system/design-system-glossary#variant) which will make our `CircleButton` not such circle. Let's now pass it to a component:

```js
import React from 'react';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { default as customMapping } from './path-to/custom-mapping.json';
import CircleButton from './path-to/CircleButton';

const App = () => (
  <ApplicationProvider 
    mapping={mapping}
    customMapping={customMapping}
    theme={lightTheme}>
    <Layout style={{padding: 64, alignItems: 'center'}}>
      <CircleButton shape='rounded'/> // <-- Apply `rounded` shape variant
    </Layout>
  </ApplicationProvider>
);

export default App;
```

And this is how it looks:

![image](assets/images/articles/design-system/custom-mapping-variant.png)

<hr>

## Add states

The other great example of the flexibility of using mappings is that you can provide styles to your component for a particular state. Let's say we've pressed this Button and we won't to see the default feedback of `TouchableOpacity`, but make our Button a shade darker.

```json
{
  "components": {
    "CircleButton": {
      "meta": {
        // ...
        "states": {
          "active": { // <-- Registers an `active` state
            "default": false
          }
        } 
      },
      "appearances": {
        "filled": {
          "mapping": {
            // ...
            "state": {
              "active": { // <-- Describes an `active` state parameters
                "backgroundColor": "color-primary-active"
              }
            }
          }
        },
        "variantGroups": {
          // ...
        }
      }
    }
  }
}
```

And dispatch this state from a component.

```js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styled, Interaction } from '@ui-kitten/components';

class CircleButton extends React.Component {
  static styledComponentName = 'CircleButton';
  
  onPressIn = () => {
    // Dispatch an `active` state to High Order Component
    this.props.dispatch([Interaction.ACTIVE]);
  };
  
  onPressOut = () => {
    // Go back to the default state
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
```

What we have done here is we used `dispatch` prop provided from by a `styled` HOC we previously wrapped our component. And now, when we press a Button, it will be re-rendered with a new color. But when we release it, it will be filled with a default color.

That's it. Here is the result:

<p align="center">
![image](assets/images/articles/design-system/custom-mapping-state.gif)
</p>

<hr>

## Conclusion

Using this way of styling components, you can also declare more [semantic parameters](design-system/design-system-glossary#semantic-properties) to get more flexibility. Try adding one more variant or appearance following the steps described above to feel the real power of UI Kitten theme system.

<hr>

## Related Articles

- [Customize mapping](design-system/custom-component-mapping)
