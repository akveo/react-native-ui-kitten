# Create a Custom Component Mapping

Creation mapping for a custom component is a very similar process to [Mapping Customization](design-system/customize-mapping). Only in this case, we suggest the following simple but very important rules so that we can minimize the number of necessary changes and avoid repeated code.

Before we start, let's pretend we want to create a `CircleButton` component.

<hr>

## Requirements

For better developer experience, `@babel/plugin-proposal-decorators` module should be installed and configured.
```bash
npm i -D @babel/plugin-proposal-decorators

// Using Yarn?
yarn add -D @babel/plugin-proposal-decorators
```

Then, make sure to configure Babel with installed plugin. In babel.config.js:
```js
module.exports = {
  // Whatever was previously specified

  plugins: [
    ["@babel/plugin-proposal-decorators", { "legacy": true }]
  ]
};
```

<hr>

## Prepare the boilerplate

In this step, we'll create a component and it's initial mapping.

Create a component:
```js
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styled } from '@ui-kitten/components';

@styled('CircleButton')
export class CircleButton extends React.Component {
  render() {
    const { eva, style, ...restProps } = this.props;
    
    return (
      <TouchableOpacity style={[eva.style, style]} {...restProps} />
    );
  }
}
```

Create a mapping:

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
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { default as mapping } from './path-to/mapping.json'; // <-- Import mapping
import { CircleButton } from './path-to/CircleButton'; // <-- Import component

export default () => (
  <ApplicationProvider
    {...eva}
    customMapping={mapping}
    theme={eva.light}>
    <Layout style={{ padding: 64, alignItems: 'center' }}>
      <CircleButton />
    </Layout>
  </ApplicationProvider>
);
```

<div class="note note-info">
  <div class="note-body">
   Custom Mapping is applied automatically in case of using `@ui-kitten/metro-config` package,
   meaning there is no need to modify ApplicationProvider.
   To check this, see if it used in metro.config.js. [Relative guide](guides/improving-performance).
  </div>
</div>

<hr>

## Start with an idea

The main idea of `CircleButton` component is that is going to be a circle. This means we need to provide some dimension styles and a `borderRadius` to make it round. Go back to `mapping.json` and paste the following:

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
}
```

What we did is that we added a rounded [variant](design-system/design-system-glossary#variant) which will make our `CircleButton` not such circle. Let's now pass it to a component:

```js
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import { default as mapping } from './path-to/mapping.json';
import { CircleButton } from './path-to/CircleButton';

export default () => (
  <ApplicationProvider
    {...eva}
    customMapping={mapping}
    theme={eva.light}>
    <Layout style={{padding: 64, alignItems: 'center'}}>
      <CircleButton shape='rounded'/> // <-- Apply `rounded` shape variant
    </Layout>
  </ApplicationProvider>
);
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
          },
          "variantGroups": {
            // ...
          }
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

@styled('CircleButton')
export class CircleButton extends React.Component {
  
  onPressIn = () => {
    // Dispatch an `active` state to High Order Component
    this.props.eva.dispatch([Interaction.ACTIVE]);
  };
  
  onPressOut = () => {
    // Go back to the default state
    this.props.eva.dispatch([]);
  };
  
  render() {
    const { eva, style, ...restProps } = this.props;
    
    return (
      <TouchableOpacity 
        {...restProps}
        activeOpacity={1.0}
        style={[eva.style, style]}
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
