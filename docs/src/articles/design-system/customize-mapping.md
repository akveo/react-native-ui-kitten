# Customize Component Mapping

UI Kitten components are styled with Eva Design System configuration files and themes. When we talk about configuration files we mean a mapping provided by Eva Design System. This configuration file is later processed by Eva Design System Processor to provide a final style applied by a component.

In terms of UI Kitten the mapping configuration file is a JSON or a JavaScript object which describes the rules and behavior for each component provided by UI Kitten.

Working with mappings is a quite difficult process, but it gives you a lot of flexibility to style components. Let's take a look at some simple examples of customizing UI Kitten components.

<hr>

## Determine a change

You're able to do the following changes in mapping:

- Change a single [parameter](design-system/design-system-glossary#parameter)

- Change a [semantic property](design-system/design-system-glossary#semantic-properties)

While changing a single parameter is a simple process, changing semantic properties is a bit harder. However, read a corresponding guide below to see how it could be done.

<hr>

## Create a mapping

Let's create a file to define a mapping. In your project root, create a `mapping.json`;

```json
{
  "components": {
    "Button": {
      "meta": {},
      "appearances": {}
    }
  }
}
```

The code above contains a bare minimum of code to start customizing a Button component.

<hr>

## Change a single parameter

Let's assume we want to change the default `backgroundColor` of a Button. Before we do this, let's take a look at how it is configured by Eva Design System. Open a configuration file. It should be located in `./PROJECT_ROOT/node_modules/@eva-design/eva/mapping.json`

In order to change the **default** parameter, you need to find out where it is declared. To do that, we can quickly look through a meta-information about a component.

```json
{
  "components": {
    "Button": {
      "meta": {
        "appearances": {
          "filled": {
            "default": true // <-- The default appearance is `filled`
          }
        },
        "variantGroups": {
          "status": {
            "primary": {
              "default": true // <-- The default variant `status` variant is `primary`
            }
          }
        }
      }
    }
  }
}
```

We determined that default appearance is `filled` and default variant for a `status` group is `primary`. This means, that a `backgroundColor` property should be declared inside some of them. Let's now find a default appearance configuration.

```json
{
  "components": {
    "Button": {
      "meta": {
        // ...
      },
      "appearances": {
        "filled": {
          "mapping": {
            // ... <-- A parameter of interest should be declared here
          }
        }
      }
    }
  }
}
```

In case of default appearance has no `backgroundColor`, let's find a default variant configuration.

```json
{
  "components": {
    "Button": {
      "appearances": {
        "filled": {
          "mapping": {},
          "variantGroups": {
            "status": {
              "primary": {
                "backgroundColor": "color-primary-default" // <-- Here we are!
              }
            }
          }
        }
      }
    }
  }
}
```

Now let's go back to our `mapping.json` and modify `backgroundColor` to be `pink`

```json
{
  "components": {
    "Button": {
      "meta": {},
      "appearances": {
        "filled": {
          "mapping": {},
          "variantGroups": {
            "status": {
              "primary": {
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

## Merge mappings

The only thing we have to do is to pass our mapping to an `ApplicationProvider` component.

```js
import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { default as mapping } from './path-to/mapping.json'; // <-- import mapping

export default () => (
  <ApplicationProvider 
    {...eva}
    customMapping={mapping} // <-- apply mapping
    theme={eva.light}>
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

Here we are. Now the default `backgroundColor` of a Button should be `pink`. Here is a result

![image](assets/images/articles/design-system/customize-mapping.png)

<hr>

## Change a semantic parameter

Making changes with semantic parameters means changing a set of parameters declared inside it. To do that, simply follow the steps of changing a single parameter explained above.

You are also able to make one of the semantic parameters to be used by default. Let's take an example with a Button appearance.

```json
{
  "components": {
    "Button": {
      "meta": {
        "appearances": {
          "outline": {
            "default": true // <-- Set `outline` appearance to be default
          }
        }
      }
    }
  }
}

```

That's it. Now you're able to use UI Kitten Button without passing `appearance` property.

<hr>

## Related articles

- [Create custom component mapping](design-system/custom-component-mapping)
