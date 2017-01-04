---
title: TextInput
author: vl
sort: 202
group: Components
template: componentArticle.jade
---

<div class="component" image="https://thumbs.gfycat.com/ShockingComplexCowrie-size_restricted.gif"></div>

`RkTextInput` component:

```html
import {RkTextInput} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons';

//... 

<RkTextInput 
    rkType='rounded' 
    label={<Icon name='ios-search-outline'/>} 
    containerStyle={{marginTop: 20}}
    placeholder='Search'/>

```

<a href="#" id="custom"></a>

### Create custom rkType

For example lets create colored type, first step - setup new type in  `RkConfig`:

```javascript

import {RkConfig} from 'react-native-ui-kitten';

RkConfig.setType('input', 'colored', {
    input: {
        color: RkConfig.colors.primary
    },
    container: {
        borderBottomWidth: 1,
        borderBottomColor: RkConfig.colors.darkWarning
    },
    label: {
        color: RkConfig.colors.danger
    },
});


```

After this we can use new type like this: 

```html
import {RkTextInput} from 'react-native-ui-kitten';

//... 

<RkTextInput 
    rkType='colored' 
    label='Name'/>

```

The result will be this:

![Image of Colored Input](/images/components/coloredInput.png)

### Props

<div class="doc-prop">
    <p><strong><a href="../customization#rkType">rkType</a></strong> string</p>
    <p>By default RkTextInput supports following types: bordered, rounded, underline, topLabel</p>
</div>

<div class="doc-prop">
    <p><a href="https://facebook.github.io/react-native/docs/textinput.html#props" target="_blank">TextInput.props</a></p>
</div>

<div class="doc-prop">
    <p><strong>containerStyle</strong> View.style</p>
    <p>Style for view around input and label</p>
</div>

<div class="doc-prop">
    <p><strong>label</strong> string || component</p>
    <p>Label displayed before input. When label is clicked input gets focus</p>
</div>

<div class="doc-prop">
    <p><strong>labelStyle</strong> style</p>
    <p>Style for label</p>
</div>