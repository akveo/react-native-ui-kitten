---
title: Text
author: vl
sort: 102
group: Components
template: componentArticle.jade
---

<div class="component" image="text.png"></div>

Main purpose of `RkText` component - define custom *rkType* for
different types of typography in your app. For example you can 
define *rkType* for headers, articles, names and etc.

```html
import {RkText} from 'react-native-ui-kit';

//... 

<RkText>Text</RkText>
```

### Create custom rkType

Define style in `RkConfig`:

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

Use your *rkType* like this:

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
