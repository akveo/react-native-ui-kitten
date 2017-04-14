---
title: RkButton
author: vl
sort: 808
group: Components
template: componentArticle.jade
---

<div class="component" image="../../images/gif/button.gif"></div>

`RkButton` is a basic button component.

Usage example:

```html
import {RkButton} from 'react-native-ui-kitten';

//... 

<RkButton>Button</RkButton>
```

### Usage with Icons 

You can put text or/and icon inside of `RkButton`. Example of button with icon usage:

```html
import {RkButton} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons';

//... 

<RkButton rkType='small outline'>
  <Icon style={{marginRight: 5, fontSize: 18}} name={'logo-github'}/> Star
</RkButton>
```

Here is result:

![](../../images/components/button/iconButton.png)

### Create custom rkType

To define new `rkType` you can use predefined properties which will passed to according element inside components:

```javascript

import {RkTheme} from 'react-native-ui-kitten';

RkTheme.setType('RkButton', 'dark', {
  backgroundColor: 'gray',
  borderRadius: 10,
});

RkTheme.setType('RkButton', 'icon', {
  fontSize: 24,
  width: 46,
  borderRadius: 25
});

```
Now you can use *dark* and *icon* types in you app:

```html
import {RkButton} from 'react-native-ui-kitten';

//... 

<RkButton rkType='dark'>SUBMIT</RkButton>

<RkButton rkType='dark icon' style={{marginLeft: 20}}>
  <Icon name="md-heart"/>
</RkButton>

```

This should look like this:

![](../../images/components/button/twoButtons.png)

#### Available properties

- `color` : Color of content of `RkButton`. Usually text or icon.
- `backgroundColor` : Background color of `RkButton`.
- `borderWidth` : Width of outer border.
- `borderRadius` : Border radius of `RkButton`.
- `borderColor` : Color of border.
- `fontSize` : Size of content inside. Applied only for first level children of `RkButton`.
- `width` : Width of `RkButton`.
- `height` : Height of `RkButton`.


### Advanced Styling

It's also possible to implement more detailed styling. `RkButton` consists from couple of base react component.
You can easily set styles for each component.

For example you can change the opacity of content passed to `RkButton`:
```javascript

import {RkTheme} from 'react-native-ui-kitten';

RkTheme.setType('RkButton', 'faded', {
  content: {
    opacity: 0.6,
  }
});

```

#### Available components:

- `container` : `TouchableOpacity` - container of `RkButton`.
- `content` : If you use plain text then `RkText`. If you insert children - then style will be applied to all children on first level.


#### Inline styling

It's possible to set styles inline. Use props `style` for `container` component and `contentStyle` for `content` component.

```javascript
import {RkButton} from 'react-native-ui-kitten';

//...

<RkButton
  style={{backgroundColor: 'red'}} 
  contentStyle={{color: 'white'}}> Hello </RkButton>

```
Here is the result:

![](../../images/components/button/redButton.png)

### Props

<div class="doc-prop">
    <p><strong><a href="../customization#rkType">rkType</a></strong> string</p>
    <p>By default RkButton supports following types: primary, info, warning, danger, success, outline, rounded,
    circle, small, medium, large, xlarge, clear</p>
</div>

<div class="doc-prop">
    <p><strong>style</strong> TouchableOpacity.style </p>
    <p>Style for button container</p>
</div>

<div class="doc-prop">
    <p><strong>contentStyle</strong> style </p>
    <p>Style for each button's children</p>
</div>

<div class="doc-prop">
    <p><strong>onPress, onPressIn, onPressOut, onLongPress</strong> function </p>
    <p>TouchableOpacity props</p>
</div>

