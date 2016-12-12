---
title: Button
author: vl
sort: 802
group: Components
template: componentArticle.jade
---

<div class="component" image="buttons.gif"></div>

The *Button* can be added to the screen using the `RkButton` component:

```html
import {RkButton} from 'react-native-ui-kit';

//... 

<RkButton>Button</RkButton>
```

### Usage with Icons 

Simple put Icon component inside button with or without text

```html
import {RkButton} from 'react-native-ui-kit';
import Icon from 'react-native-vector-icons/Ionicons';

//... 

<RkButton rkType='small outline' 
          style={RkStyle.deepWarningBorder} 
          innerStyle={RkStyle.deepWarningText}>
  <Icon style={{marginRight: 5, fontSize: 18}} name={'logo-github'}/> Star
</RkButton>
```

### Create custom rkType

For example lets create dark type, first step - setup new type in  `RkConfig`:

```javascript

import {RkConfig} from 'react-native-ui-kit';

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

After this we can use new type like this: 

```html
import {RkButton} from 'react-native-ui-kit';

//... 

<RkButton rkType='dark'>SUBMIT</RkButton>

<RkButton rkType='dark icon' style={{marginLeft: 20}}>
  <Icon name="md-heart"/>
</RkButton>

```

The result will be this:

![Image of dark buttons](/images/components/darkButtons.png)

### Props

<div class="doc-prop">
    <p><strong>rkType</strong> string</p>
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

<div class="component-end"></div>

