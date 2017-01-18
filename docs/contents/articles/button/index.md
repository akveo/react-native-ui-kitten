---
title: Button
author: vl
sort: 802
group: Components
template: componentArticle.jade
---

<div class="component" image="https://thumbs.gfycat.com/UnripeSpryBighornedsheep-size_restricted.gif"></div>

`RkButton` is a basic button component.

Example usage:

```html
import {RkButton} from 'react-native-ui-kitten';

//... 

<RkButton>Button</RkButton>
```

### Usage with Icons 

You can put text and/or icon inside of `RkButton`. Example of button with icon usage:

```html
import {RkButton} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons';

//... 

<RkButton rkType='small outline' 
          style={RkStyle.deepWarningBorder} 
          innerStyle={RkStyle.deepWarningText}>
  <Icon style={{marginRight: 5, fontSize: 18}} name={'logo-github'}/> Star
</RkButton>
```

<a href="#" id="custom"></a>

### Create custom rkType

To define new rkType you can override style for *container* and/or *inner* segments of your button
using `RkConfig`:

```javascript

import {RkConfig} from 'react-native-ui-kitten';

RkConfig.setType('button', 'dark', {
  container: {
    backgroundColor: RkConfig.colors.darkGray,
    borderRadius: 10,
  },
  inner: {
    color: RkConfig.colors.white
  },
});

RkConfig.setType('button', 'icon', {
  container: {
    paddingTop: 8,
    paddingBottom: 4,
    paddingHorizontal: 10,
    borderRadius: 32
  },
  inner: {
    fontSize: 24
  }
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

![Image of dark buttons](/images/components/darkButtons.png)

### Props

<div class="doc-prop">
    <p><strong><a href="../customization#rkType">rkType</a></strong> string</p>
    <p>By default RkButton supports following types: basic, outline, material, clear, circle, shadow, small, medium, large</p>
</div>

<div class="doc-prop">
    <p><strong>style</strong> View.style </p>
    <p>Style for button container container</p>
</div>

<div class="doc-prop">
    <p><strong>innerStyle</strong> style </p>
    <p>Style for each button's children</p>
</div>

<div class="doc-prop">
    <p><strong>onPress, onPressIn, onPressOut, onLongPress</strong> function </p>
    <p>TouchableOpacity props</p>
</div>

