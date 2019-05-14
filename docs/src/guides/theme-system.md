# React Native UI Kitten Theme System

React Native UI Kitten Theme System is based on Eva Design System rules and is a set of rules and variables that helps to achieve the following goals:

- ability to flexibly change looks & feel of the application by managing variables, without changing the component style itself;
- ability to switch between visual themes in runtime without reloading the page;

There are two main configuration files needed to style your app:
* Theme Configuration
* Mapping Configuration

Both of them are presented as JSON maps and distributed as separated `npm` packages.
We don't provide styling configuration files out of the box to let you choose a set of style rules yourself.
<hr>

### Theme System installation

```bash
npm i @eva/eva @eva/theme-eva
```

### Applying Theme System

```tsx
import { mapping } from '@eva/eva';
import { theme } from '@eva/theme-eva';
import { ApplicationProvider } from '@kitten/theme';
import { Application } from './path-to/root.component';

export default class App extends React.Component {

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

## Theme Configuration File

Each theme is represented as a JSON map with a list of key-value pairs.

```json
{
  "color-primary-100": "#F2F6FF",
  "color-primary-200": "#D9E4FF",
  "color-primary-300": "#A6C1FF",
  "color-primary-400": "#598BFF",
  "color-primary-500": "#3366FF",
  "color-success-100": "#EDFFF3",
  "color-success-200": "#B3FFD6",
  "color-success-300": "#8CFAC7",
  "color-success-400": "#51F0B0",
  "color-success-500": "#00E096",
  "color-white": "#FFFFFF",
  "color-black": "#0D1C2E",
  "opacity-transparent": "transparent"
}
```
Where *key* - is a variable name, and *value* - is a raw style value (color, string, etc).

## Mapping Configuration

Then, for each React Native UI Kitten component, there is a single configuration file we call *mapping*. It presents a JSON map strictly structured by Eva Configuration Schema.


Let's take a look at how Avatar component is configured.

```json
{
  "Avatar": {
    "meta": {
      "scope": "all",
      "parameters": {
        "roundCoefficient": {
          "type": "number"
        },
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      },
      "appearances": {
        "default": {
          "default": true
        }
      },
      "variantGroups": {
        "shape": {
          "round": {
            "default": true
          },
          "rounded": {
            "default": false
          },
          "square": {
            "default": false
          }
        },
        "size": {
          "tiny": {
            "default": false
          },
          "small": {
            "default": false
          },
          "medium": {
            "default": true
          },
          "large": {
            "default": false
          },
          "giant": {
            "default": false
          }
        }
      },
      "states": {}
    },
    "appearances": {
      "default": {
        "mapping": {
        },
        "variantGroups": {
          "shape": {
            "round": {
              "roundCoefficient": 0.5
            },
            "rounded": {
              "roundCoefficient": 0.3
            },
            "square": {
              "roundCoefficient": 0.0
            }
          },
          "size": {
            "tiny": {
              "width": 24,
              "height": 24
            },
            "small": {
              "width": 32,
              "height": 32
            },
            "medium": {
              "width": 40,
              "height": 40
            },
            "large": {
              "width": 48,
              "height": 48
            },
            "giant": {
              "width": 56,
              "height": 56
            }
          }
        }
      }
    }
  }
}
```

* The `meta` key contains meta-information about component itself:
  * The `scope` key describes where a component can be used (`web`, `mobile` or `all`)
  
  * The `parameters` key describes what component style keys are provided by Eva Design System and applied to a component. These keys regularly have the same names as CSS style variables, but sometimes we have exceptions (e.g `roundCoefficient`)
  
  * The `appearances` key describes a list of component *appearances* that could be applied to a component. *Appearance* itself is a set of *mappings* that define at the high-level view of related component: it's size, shape and main colors. Each *appearance* could be configured to be used by default with `default` key.
  
  * The `variantGroups` key describes a list of *variants* that could be applied to component (e.g `size`). *Variant* itself is a set of *mappings* that define component's appearance. Variants are combined into `variantGroups` key by the logic of how they affect controls appearance (e.g `shape` or `size`). Each *variant* could be configured to be used by default with `default` key.
  
  * The `state` key describes a list of states in which component could be displayed (e.g `active`, `checked`, `disabled`). *State* itself defines how control looks like, depending on the actions that are made with it. Each *state* could be configured to be used by default with `default` key.
  
* The `appearances` key describes the *mapping* process for each *appearance* and *variant* supported by the component.

  The `default` key in `appearances` meta means that component has `default` appearance, so we need to configure it. `Avatar` itself has no special high-level configuration, so we leave it empty.
  
  The `tiny` key in `variantGroups` meta means that component has `tiny` size, and is configured to contain special `width` and `height` style variables.
  
Let's assume we need to render `tiny` Avatar component. With React Native UI Kitten it could be done with the following code:

```tsx
import React from 'react';
import {
  Avatar,
  AvatarProps,
} from '@kitten/ui';

export const TinyAvatar = (props?: AvatarProps): React.ReactElement<AvatarProps> => (
  <Avatar 
    size='tiny'
    {...props}
  />
);
```

That's it! All the magic is done by React Native UI Kitten style system and we don't have to inline some styles to achieve this.

## Related Articles

- [Creating Custom Styled Components](docs/guides/theme-using-mapping)
- [Using theme inside Custom Components](docs/guides/theme-using-variables)
