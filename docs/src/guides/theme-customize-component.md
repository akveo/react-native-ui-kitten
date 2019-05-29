# Customize React Native UI Kitten Components

React Native UI Kitten allows you to customize provided components. You have two ways to do this:

* Inline styles
* Pre-defined properties
* Appearance property
* Variant Group properties
* Mapping customization

<hr>

### Inline styles

This way is a regular way of how React Native components could be styled. Passing your custom styles to `style` property is exactly what you can do.

```tsx
import React from 'react';
import { 
  Button,
  ButtonProps,
} from '@kitten/ui';

const AwesomeButton = (props?: ButtonProps): React.ReactElement<ButtonProps> => {
  const customStyle = {
    opacity: 0.75,
  };

  const { style, ...restProps } = props;
  
  return (
    <Button
      style={[customStyle, style]}
      {...restProps}
    />
  );
};
```

<hr>

### Pre-defined properties

All React Native UI Kitten components has a set of properties which you can use to style component.
Each component have `appearance` property which can have single or multiple values depending on mapping configuration.
Also there are a list of *variant group* properties like `size`, `status` etc.

These properties are defined by Eva Design System. For more information read the [Theme System Guide](docs/guides/theme-system).

### Appearance property

Each React Native UI Kitten component has `appearance` property, where you can pass values depending on mapping configuration.

Assuming that mapping configuration has `outline` *appearance* for Button, you can create outline Button with following code.

```tsx
import React from 'react';
import {
  Button,
  ButtonProps,
} from '@kitten/ui';

export const OutlineButton = (props?: ButtonProps): React.ReactElement<ButtonProps> => (
  <Button appearance='outline'/>
);
```

<hr>

### Variant Group properties

Unlike `appearance` property, each component can have *variant group* properties, e.g `status` or `size`.

Assuming that mapping configuration has `size` *variant group* and `tiny` *variant* for Button, you can create tiny Button with following code.

```tsx
import React from 'react';
import {
  Button,
  ButtonProps,
} from '@kitten/ui';

export const TinyButton = (props?: ButtonProps): React.ReactElement<ButtonProps> => (
  <Button size='tiny'/>
);
```

<hr>

### Mapping customization

Sometimes there are cases that could not be covered with inline styles. A pretty example would be Button's `backgroundColor` when it is pressed. So we have a solution for it. All you need to do is to create your own mapping configuration file.

```json
{
  "components": {
    "Button": {
      "meta": {},
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

The code above demonstrates how Button component can be modified. This says that by default Button will have `red` background, and when it is `active` it will change to `pink`.

This is a short example of how you can customize mapping configuration only with modifying component parameters. Eva Design System does not strict you with creating your own *appearance* and *variant group* configurations.

Let's take a look of how custom *appearance* could be created.

```json
{
  "components": {
    "Button": {
      "meta": {
        "appearances": {
          "square": {
            "default": false
          }
        }
      },
      "appearances": {
        "custom": {
          "mapping": {
            "borderRadius": 0
          }
        }
      }
    }
  }
}
```

That's it! Now you can pass `square` to Button `appearance` property to apply styles.

<hr>

### Provide Custom Mapping

The one thing to apply custom mapping is to provide it to `ApplicationProvider` component.

```tsx
import React from 'react';
import { mapping } from '@eva-design/eva';
import { theme } from '@eva/themes';
import { 
  ApplicationProvider,
  ApplicationProviderProps
} from '@kitten/theme';
import { Application } from './path-to/root.component';
import { customMapping } from './path-to/custom-mapping';

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

<hr>

### Related Articles

* [React Native UI Kitten Theme System](docs/guides/theme-system)
* [Creating Styled Components](docs/guides/theme-using-mapping)
