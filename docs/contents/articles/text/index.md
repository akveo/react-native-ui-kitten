---
title: Text
author: vl
sort: 102
group: Components
template: componentArticle.jade
---

`RkText` is a component used to render text blocks in your application. 
Its main purpose is to define custom *rkType*s for different types of typography in your app. 
For example, you can define *rkType* for headers, articles, names and etc.

Sample usage:

```html
import {RkText} from 'react-native-ui-kitten';

//... 

<RkText>Text</RkText>
```

<a href="#" id="custom"></a>

### Create custom rkType

`RkText` doesn't have any segments.

Sample style definition in `RkConfig`:

```javascript
import {RkConfig} from 'react-native-ui-kitten'; 

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

Use created *rkType* like this:

```html
import {RkChoice} from 'react-native-ui-kitten';

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
    <p><strong><a href="../customization#rkType">rkType</a></strong> string</p>
</div>

<div class="doc-prop">
    <p><a href="https://facebook.github.io/react-native/docs/text.html#props" target="_blank">Text.props</a></p>
</div>
