---
title: Text
author: vl
sort: 102
group: Components
template: componentArticle.jade
---

<div class="component" image="text.png"></div>

`RkText` component:

```html
import {RkText} from 'react-native-ui-kit';

//... 

<RkText>Text</RkText>
```

### Create custom rkType

First step - setup new type in  `RkConfig`:

```javascript
import {RkConfig} from 'react-native-ui-kit'; 

RkConfig.setType('text', 'title', {
  fontSize: 20
});

RkConfig.setType('text', 'gray', {
  color: RkConfig.colors.darkGray
});

RkConfig.setType('text', 'borg', {
  fontFamily: 'Borg'
});

RkConfig.setType('text', 'curely', {
  fontFamily: 'Curely'
});

```

After this we can use new type like this: 

```html
import {RkChoice} from 'react-native-ui-kit';

//... 

<RkText>Default text</RkText>

<RkText rkType='gray'>Gray text</RkText>

<RkText rkType='title'>Title text</RkText>

<RkText rkType='title gray'>Title & Gray text</RkText>

<RkText rkType='title borg'>Borg font text</RkText>

<RkText rkType='title curely'>Curely font text</RkText>


```


### Props


<div class="doc-prop">
    <p><strong>rkType</strong> string</p>
</div>

<div class="doc-prop">
    <p><a href="https://facebook.github.io/react-native/docs/text.html#props" target="_blank">Text.props</a></p>
</div>
