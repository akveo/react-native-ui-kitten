---
title: TextInput
author: vl
sort: 202
group: Components
template: componentArticle.jade
---

<div class="component" image="https://thumbs.gfycat.com/ShockingComplexCowrie-size_restricted.gif"></div>

`RkTextInput` is a component to be used as a basic customizable text input. Sample usage:

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

Following segments of `RkTextInput` can be customized:

- *input*  
- *container*  
- *label* 

For example lets create colored input.

First, we need to define new *rkType* in  `RkConfig`:

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

After this we can apply this type to inputs in our app: 

```html
import {RkTextInput} from 'react-native-ui-kitten';

//... 

<RkTextInput 
    rkType='colored' 
    label='Name'/>

```

The result will look like this:

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
    <p>Style for view wrapping input and label</p>
</div>

<div class="doc-prop">
    <p><strong>label</strong> string || component</p>
    <p>Label displayed with input. When label is clicked input gets focus</p>
</div>

<div class="doc-prop">
    <p><strong>labelStyle</strong> style</p>
    <p>Style applied to label</p>
</div>