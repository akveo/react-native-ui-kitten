---
id: 4x-to-5
title: 4.x - 5.0.0 Migration
sidebar_label: 4.x to 5.0.0 Migration
description: Migration process and purposes to new UI Kitten 5.0.0 version.
keywords:
  - React Native
  - UI Kitten
  - migration
  - version 5
---

# 4.x - 5.0.0 Migration

UI Kitten v5.0 is a significant improvement and rework of the previous version. We believe these changes bring UI Kitten to the new level of quality and feature richness. To achieve this and allow UI Kitten to grow faster and better, we had to refactor a lot of internal implementations, as well as public APIs.

We hope that next UI Kitten versions won't receive such significant upgrades and the amount of breaking changes will be kept as low as possible.

### Migration Purposes

- Flexible styling with new convenient and unified component interfaces;
- [Declarative](https://en.wikipedia.org/wiki/Declarative_programming) way of rendering nested components;
- Better TypeScript support;
- Better documentation with detailed description for component examples and properties.

---

## Understanding new API

To slightly simplify the migration process we strongly recommend getting familiar with the short list of rules we followed during the refactoring process:

1. All components that previously could render a text by passing a string to a corresponding property now may accept a string, number, or a function component. If the function is passed, it will be called with style properties provided by Eva. This makes `{componentName}Style` properties redundant.

2. In order to follow the rule above, CheckBox, Radio and Toggle components now accept the text as a child element.

3. Icon properties are renamed to `accessoryLeft` and `accessoryRight`. (Except tabs, because it may have only one icon).

4. Popover and related components (Tooltip and OverflowMenu) now accept its content as a child element. A component relative to which the content is rendered is now passed to `anchor` property.

---

## Migration Steps

The following migration steps are required to update:

- Update `@ui-kitten/*` packages to version 5 *required*
- Update `@ui-kitten/eva` package to version 2 *required*

---

## Update UI Kitten

```bash
npm i @ui-kitten/components @ui-kitten/eva

// Using Yarn?
yarn add @ui-kitten/components @ui-kitten/eva
```

Additionally, if you use any other UI Kitten packages, you can add them like this:

```bash
npm i @ui-kitten/eva-icons

// Using Yarn?
yarn add @ui-kitten/eva-icons
```

---

## Migrate Components

### Button

[Button](/docs/components/button) does not accept `textStyle` property anymore. Instead, if having custom styles is required, function component with additional text style should be used as a child element.

```js
import { Button, Text } from '@ui-kitten/components';

<Button>
  {evaProps => <Text {...evaProps} style={[evaProps.style, myStyle]}>BUTTON</Text>}
</Button>
```

Icons within Button now are rendered with `accessoryLeft` or `accessoryRight` properties, replacing the old `icon` property.

```js
import { Button, Icon } from '@ui-kitten/components';

const StarIcon = (evaProps) => (
  <Icon {...evaProps} name='star' />
);

<Button accessoryRight={StarIcon} />
```

### Radio

[Radio](/docs/components/radio) does not accept `text` property anymore. It was moved to children in favor of using a declarative way of building components.

```js
import { Radio } from '@ui-kitten/components';

<Radio>Place your Text</Radio>
```

### CheckBox

[CheckBox](/docs/components/checkbox) does not accept `text` property anymore. It was moved to children in favor of using a declarative way of building components.

```js
import { CheckBox } from '@ui-kitten/components';

<CheckBox>Place your Text</CheckBox>
```

### Toggle

[Toggle](/docs/components/toggle) does not accept `text` property anymore. It was moved to children in favor of using a declarative way of building components.

```js
import { Toggle } from '@ui-kitten/components';

<Toggle>Place your Text</Toggle>
```

### Input

[Input](/docs/components/input) has no `icon` property anymore. Instead, `accessoryRight` or `accessoryLeft` properties should be used.

```js
import { Input, Icon } from '@ui-kitten/components';

const StarIcon = (evaProps) => (
  <Icon {...evaProps} name='star' />
);

<Input accessoryRight={StarIcon} />
```

### Select

[Select](/docs/components/select) now exports two related components - `SelectItem` and `SelectGroup`, which makes it possible to accept any type of data. Now its contents are fully controlled by you as a developer and should be passed as child elements.

```js
import { Select, SelectItem } from '@ui-kitten/components';

<Select>
  <SelectItem title='Option 1' />
  <SelectGroup title='Group 2'>
    <SelectItem title='Option 1.1' />
    <SelectItem title='Option 1.2' />
  </SelectGroup>
</Select>
```

### Autocomplete

[Autocomplete](/docs/components/autocomplete) now exports a related component - `AutocompleteItem`. It removes `renderItem` and `placeholderData` properties in favor of children.

```js
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';

<Autocomplete>
  <AutocompleteItem title='Option 1' />
  <AutocompleteItem title='Option 2' />
  <AutocompleteItem title='Option 3' />
</Autocomplete>
```

### Popover

[Popover](/docs/components/popover) now accepts its content as child element. A component relative to which the content is rendered is now passed to `anchor` property.

```js
import { Popover, Layout, Text, Button } from '@ui-kitten/components';

const renderToggleButton = () => (
  <Button>TOGGLE POPOVER</Button>
);

<Popover anchor={renderToggleButton}>
  <Layout>
    <Text>Welcome to UI Kitten</Text>
  </Layout>
</Popover>
```

### Tooltip

[Tooltip](/docs/components/tooltip) now accepts its text as child element. A component relative to which the content is rendered is now passed to `anchor` property.

```js
import { Tooltip, Button } from '@ui-kitten/components';

const renderToggleButton = () => (
  <Button>TOGGLE TOOLTIP</Button>
);

<Tooltip anchor={renderToggleButton}>
  Welcome to UI Kitten
</Tooltip>
```

### Overflow Menu

[OverflowMenu](/docs/components/overflow-menu) `data` property is replaced in favor of child elements. A component relative to which the menu is rendered is now passed to `anchor` property.

```js
import { OverflowMenu, MenuItem, Button } from '@ui-kitten/components';

const renderToggleButton = () => (
  <Button>TOGGLE MENU</Button>
);

<OverflowMenu anchor={renderToggleButton}>
  <MenuItem title='Option 1' />
  <MenuItem title='Option 2' />
  <MenuItem title='Option 3' />
</OverflowMenu>
```

### Drawer

[Drawer](/docs/components/drawer) now exports two related components - `DrawerItem` and `DrawerGroup`.

```js
import { Drawer, DrawerItem, DrawerGroup } from '@ui-kitten/components';

<Drawer>
  <DrawerItem title='Option 1'/>
  <DrawerGroup title='Group'>
    <DrawerItem title='Option 1.1'/>
    <DrawerItem title='Option 1.2'/>
  </DrawerGroup>
</Drawer>
```

### Menu

[Menu](/docs/components/menu) now exports two related components - `MenuItem` and `MenuGroup`.

```js
import { Menu, MenuItem, MenuGroup } from '@ui-kitten/components';

<Menu>
  <MenuItem title='Option 1'/>
  <MenuGroup title='Group'>
    <MenuItem title='Option 1.1'/>
    <MenuItem title='Option 1.2'/>
  </MenuGroup>
</Menu>
```

---

## Migrate High Order Components

### withStyles

Now injects a single `eva` property, which combines `theme` and `style`.

```js
import { View } from 'react-native';
import { withStyles } from '@ui-kitten/components';

const MyComponent = (props) => (
  <View style={props.eva.style.container}/>
);

export const MyStyledComponent = withStyles(MyComponent, theme => ({
  container: {
    backgroundColor: theme['color-primary-default'],
  },
}));
```

### styled

Now injects a single `eva` property, which combines `dispatch` function, `theme` and `style` properties.

```js
import React from 'react';
import { View } from 'react-native';
import { styled } from '@ui-kitten/components';

const MyComponent = styled('MyComponent')((props) => {
  const { eva, ...restProps } = props;
  return <View />;
});

export { MyComponent };
```
