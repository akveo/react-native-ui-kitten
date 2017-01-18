---
title: Selectable components
author: vl
sort: 702
group: Components
template: componentArticle.jade
---

<div class="component" image="https://thumbs.gfycat.com/FantasticRawGermanwirehairedpointer-size_restricted.gif"></div>

`RkChoice` component is an analog of html checkbox and radio buttons.

Basic example: 

```html
import {RkChoice} from 'react-native-ui-kitten';

//... 

<RkChoice/>
```

### Labels example

To render checkbox/radio with touchable label, you need to use `RkChoiceGroup` component.
You need to put any *Touchable* component inside of it with `choiceTrigger` prop.
After that define view with text and `RkChoice` component.

Sample code:

```html
import {RkChoice, RkChoiceGroup} from 'react-native-ui-kitten';

//... 

<RkChoiceGroup>
    <TouchableOpacity choiceTrigger>
        <View>
            <Text>Label</Text>
            <RkChoice rkType='posNeg'/>
        </View>
    </TouchableOpacity>
</RkChoiceGroup>

```

### Radio example

Define `radio` prop on `RkChoiceGroup` component, when only one option can be selected:

```html
import {RkChoice, RkChoiceGroup} from 'react-native-ui-kitten';

//... 

<RkChoiceGroup rkType='radio' radio>
    <TouchableOpacity choiceTrigger>
        <View>
            <Text>Option 1</Text>
            <RkChoice/>
        </View>
    </TouchableOpacity>
    <TouchableOpacity choiceTrigger>
        <View>
            <Text>Option 2</Text>
            <RkChoice/>
        </View>
    </TouchableOpacity>
    <TouchableOpacity choiceTrigger>
        <View>
            <Text>Option 3</Text>
            <RkChoice/>
        </View>
    </TouchableOpacity>
</RkChoiceGroup>

```

<a href="#" id="custom"></a>

### Create custom rkType

Following segments and states of `RkChoice` can be customized:

- *container*  
- *inner*  
- *containerSelected*  
- *innerSelected* 
- *containerDisabled*  
- *innerDisabled*
- *containerSelectedDisabled*  
- *innerSelectedDisabled*

Also you can define content inside `RkChoice` with 
this settings, which needs to contain some component:
    
- *content*  
- *contentUnchecked*  
- *contentDisabled*  
- *contentUncheckedDisabled*
    
Example of setting up new type in `RkConfig`:

```javascript
import {RkConfig} from 'react-native-ui-kitten'; 
import Icon from 'react-native-vector-icons/FontAwesome';

RkConfig.setType('choice', 'dark', {
  container: {
    borderWidth: 0,
    backgroundColor: RkConfig.colors.lightGray,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

RkConfig.setType('choice', 'star', {
  container: {
    borderWidth: 0,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  inner:{
    width: 32,
    height: 32,
    fontSize: 32,
    color: RkConfig.colors.warning
  },
  content: (<Icon name="star"/>),
  contentUnchecked: (<Icon name="star-o"/>)
});

```

We can then use created style like this: 

```html
import {RkChoice} from 'react-native-ui-kitten';

//... 

<RkChoice rkType="dark" selected={true}/>

<RkChoice rkType="star" selected={true}/>

<RkChoice rkType="star" selected={false}/>

```

The result will be:

![Image of dark buttons](/images/components/customChoice.png)

### RkChoice Props

<div class="doc-prop">
    <p><strong><a href="../customization#rkType">rkType</a></strong> string</p>
    <p>By default RkChoice supports following types: clear, radio, material, posNeg</p>
</div>

<div class="doc-prop">
    <p><strong>selected</strong> boolean</p>
    <p>Determines whether component is checked.</p>
</div>

<div class="doc-prop">
    <p><strong>disabled</strong> boolean</p>
    <p>If true disable component</p>
</div>

<div class="doc-prop">
    <p><strong>onPress</strong> function</p>
    <p>Triggered on press</p>
</div>

<div class="doc-prop">
    <p><strong>style</strong> View.style</p>
    <p>Style for component container</p>
</div>

<div class="doc-prop">
    <p><strong>containerStyle</strong> TouchableOpacity.style</p>
    <p>Style for TouchableOpacity around container</p>
</div>

<div class="doc-prop">
    <p><strong>innerStyle</strong> style</p>
    <p>Style for component content</p>
</div>

<div class="doc-prop">
    <p><strong>styleSelected</strong> View.style</p>
    <p>Style for component container when selected</p>
</div>

<div class="doc-prop">
    <p><strong>innerStyleSelected</strong> style</p>
    <p>Style for component content when selected</p>
</div>

<div class="doc-prop">
    <p><strong>styleDisabled</strong> View.style</p>
    <p>Style for component container when disabled</p>
</div>

<div class="doc-prop">
    <p><strong>innerStyleDisabled</strong> style</p>
    <p>Style for component content when disabled</p>
</div>

<div class="doc-prop">
    <p><strong>styleSelectedDisabled</strong> View.style</p>
    <p>Style for component container when selected and disabled</p>
</div>

<div class="doc-prop">
    <p><strong>innerStyleSelectedDisabled</strong> style</p>
    <p>Style for component content when selected and disabled</p>
</div>

<div class="doc-prop">
    <p><strong>content</strong> Component</p>
    <p>For custom content</p>
</div>

<div class="doc-prop">
    <p><strong>contentDisabled</strong> Component</p>
    <p>For custom content when component disabled</p>
</div>

<div class="doc-prop">
    <p><strong>contentUnchecked</strong> Component</p>
    <p>For custom content when component is not selected</p>
</div>

<div class="doc-prop">
    <p><strong>contentUncheckedDisabled</strong> Component</p>
    <p>For custom content when component is not selected and disabled</p>
</div>

### RkChoiceGroup Props

<div class="doc-prop">
    <p><strong>rkType</strong> string</p>
    <p>By default RkChoiceGroup supports all RkChoice types, type will be applied on each RkChoice component inside</p>
</div>

<div class="doc-prop">
    <p><strong>radio</strong> boolean</p>
    <p>Switch to radio buttons mode</p>
</div>

<div class="doc-prop">
    <p><strong>selectedIndex</strong> number</p>
    <p>Determines which RkChoice component is checked.</p>
</div>

<div class="doc-prop">
    <p><strong>style</strong> View.style</p>
    <p>Style for component container</p>
</div>
