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

### Theme System Installation

```bash
npm i @eva/eva @eva/theme-eva
```

<hr>

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

<hr>

## Theme Configuration

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
Where **key** - is a variable name, and **value** - is a raw style value (color, string, etc).

<hr>

## Mapping Configuration

Then, for each React Native UI Kitten component, there is a single configuration file we call **mapping**. It presents a JSON map strictly structured by Eva Configuration Schema.

Let's say we have the following mapping configuration for `Button` component.

```json
{
  "Button": {
    "meta": {
      "scope": "mobile",
      "parameters": {
        "backgroundColor": {
          "type": "number"
        },
        "borderRadius": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      },
      "appearances": {
        "rounded": {
          "default": true
        },
        "square": {
          "default": false
        }
      },
      "variantGroups": {
        "size": {
          "medium": {
            "default": true
          },
          "large": {
            "default": false
          }
        }
      },
      "states": {
        "active": {
          "default": false,
          "priority": 0,
          "scope": "mobile"
        }
      }
    },
    "appearances": {
      "rounded": {
        "mapping": {
          "borderRadius": 8,
          "backgroundColor": "red",
          "state": {
            "active": {
              "backgroundColor": "pink"
            }
          }
        },
        "variantGroups": {
          "size": {
            "medium": {
              "height": 40
            },
            "large": {
              "height": 48
            }
          }
        }
      },
      "square": {
        "mapping": {
          "borderRadius": 0
        }
      }
    }
  }
}
```

<hr>

### Mapping Configuration Glossary

Before you think what's is going on in the code above, let's go through some terminology:

* **Meta**

  Defines meta-information about the component itself. It describes the platforms component is distributed, style parameters provided by Eva Design System and it's pre-defined properties.
  
    <div class="note note-warning">
      <div class="note-title">**IMPORTANT**</div>
      <div class="note-body">
      Any **appearance**, **variant**, **state** or **parameter** that is not defined in meta will not be applied to component.
      </div>
    </div>

  
* **Scope** 
  
  Defines where a component can be used (`web`, `mobile` or `all`).
  
  <div class="note note-warning">
    <div class="note-title">**IMPORTANT**</div>
    <div class="note-body">
    The **all** and **web** scopes do not mean component can be used with frameworks like **react-native-web**. This only means Eva Design System provides the same style configuration for component for both **React Native UI Kitten** and <a href="https://akveo.github.io/nebular/" target="_blank">**Nebular**</a> frameworks.
    </div>
  </div>
  
* **Parameters**  

  Defines a set of style variables provided by Eva Design System.
  
* **Appearances**
 
  Defines a list of component **appearances** that could be applied to a component.
  
  **Appearance** itself is a set of parameters that define at the high-level view of component: it's size, shape and main colors.
  
* **Variant Groups** 

  Defines a list of **variants** that could be applied to a component.
   
  **Variant** itself is a set of parameters that define a view of the component.
  Variants are combined into groups by the logic of how they affect controls appearance (e.g `shape` or `size`).
  
* **States**

  Defines a list of **states** in which component could be displayed (e.g `active`, `checked`, `disabled`).
  **State** itself defines how the control looks like, depending on the user actions that are made with it. Each state could be configured to be used by default with `default` key.
  
<hr>

# Configuring Components
  
Let's assume we need to render a `tiny` Avatar component. With React Native UI Kitten it could be done with the following code:

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

<hr>

## Related Articles

- [Creating Custom Styled Components](docs/guides/creating-styled-components)
- [Using theme inside Custom Components](docs/guides/creating-themed-components)
