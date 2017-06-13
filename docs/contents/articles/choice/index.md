---
title: RkChoice
author: vl
sort: 805
group: Components
template: componentArticle.jade
---

<div class="component" image="../../images/gif/choice.gif"></div>

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

```javascript
import {RkChoice, RkChoiceGroup} from 'react-native-ui-kitten';

//... 

<RkChoiceGroup>
  <TouchableOpacity choiceTrigger>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <RkChoice rkType='posNeg'/>
      <Text>Label</Text>
    </View>
  </TouchableOpacity>
</RkChoiceGroup>

```

Code above should produce this:

![](../../images/components/choice/label.png)

### Radio example

Define `radio` prop on `RkChoiceGroup` component, when only one option can be selected:

```javascript
import {RkChoice, RkChoiceGroup} from 'react-native-ui-kitten';

//... 

<RkChoiceGroup radio>
  <TouchableOpacity choiceTrigger>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <RkChoice rkType='radio'/>
      <Text>Option 1</Text>
    </View>
  </TouchableOpacity>
  <TouchableOpacity choiceTrigger>
    <View style={{flexDirection:'row', alignItems:'center'}}>
      <RkChoice rkType='radio'/>
      <Text>Option 2</Text>
     </View>
  </TouchableOpacity>
  <TouchableOpacity choiceTrigger>
    <View style={{flexDirection:'row', alignItems:'center'}}> 
      <RkChoice rkType='radio'/>
      <Text>Option 3</Text>
    </View>
  </TouchableOpacity>
</RkChoiceGroup>

```

<a href="#" id="custom"></a>

### Create custom rkType

`RkChoice` is a component which style depends or it's internal state. There are 4 states for this component:
- unselected (base)
- selected
- unselected & disabled
- selected & disabled

Each of this state can be configured using `rkTypes`. That means you can define set of correctly named `RkType`s 
and `RkChoice` will apply them according to its state.

Use the following convention:

- `%name%` : Unselected state.
- `%name%Selected` : Selected state.
- `%name%Disabled` : Unselected & disabled state.
- `%name%SelectedDisabled`: Selected & disabled state.

\* Where `%name%` is name of yours `rkType`.

One more note: during state change `RkChoice` not *replace* base `rkType` with new one. It just *add* correct.
So for example *disabled* component will have actually two `rkType`s - base and disabled.
    
To define new `rkType` you can use predefined properties which will passed to according element inside component:

```javascript
import {RkTheme, RkChoice} from 'react-native-ui-kitten';

RkTheme.setType('RkChoice', 'semaphore', {
  backgroundColor:'crimson',
  borderWidth:0,
  borderRadius:20
});

RkTheme.setType('RkChoice', 'semaphoreSelected', {
  backgroundColor: 'chartreuse',
});

RkTheme.setType('RkChoice', 'semaphoreDisabled', {
  backgroundColor: 'darkgray',
});

RkTheme.setType('RkChoice', 'semaphoreSelectedDisabled', {
  backgroundColor: 'lightgray',
});

//...

<RkChoice rkType='semaphore'/>
<RkChoice selected rkType='semaphore'/>
<RkChoice disabled rkType='semaphore'/>
<RkChoice disabled selected rkType='semaphore'/>

```

#### Available properties

- `color` : Color of content in `RkChoice`. Applied for `content` property.
- `backgroundColor` : Background color of `RkChoice`.
- `borderWidth` : Width of outer border.
- `borderRadius` : Border radius of `RkChoice`.
- `borderColor` : Color of border.
- `width` : Width of `RkChoice`.
- `height` : Height of `RkChoice`.
- `content` : Component tree which will be set into `RkChoice`. As `content` you can use text, icon, image etc.

Custom content example:
```javascript
import {RkTheme} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/Ionicons';

RkTheme.setType('RkChoice', 'mic', {
  backgroundColor: 'darkred',
  borderWidth: 0,
  borderRadius: 20,
  content: (
    <View>
      <Icon style={{fontSize: 16, color: 'white'}} name={'ios-mic-off'}/>
    </View>
  )
});

RkTheme.setType('RkChoice', 'micSelected', {
  content: (
    <View>
      <Icon style={{fontSize: 16, color: 'white'}} name={'ios-mic'}/>
    </View>
  )
});

//...

<RkChoice rkType='mic'/>
```

### Advanced Styling

It's also possible to implement more detailed styling. `RkChoice` consist from couple of base react components.
You can easily set styles for each component.

For example you can add *disabled* and *disabled & selected* `rkTypes` for previous example
```javascript

import {RkTheme} from 'react-native-ui-kitten';

RkTheme.setType('RkChoice', 'micDisabled', {
  inner: {
    opacity: 0.7
  }
});

RkTheme.setType('RkChoice', 'micSelectedDisabled', {
  content: (
    <View>
      <Icon style={{fontSize: 16, color: 'white'}} name={'ios-mic'}/>
    </View>
  ),
  inner: {
    opacity: 0.7
  }
});
```

#### Available components:

- `RkChoice`:
    - `container` : Can be `View` or `TouchableOpacity` depending on using with `RkChoiceGroup` or without.
    - `inner` : Applied to `content` property.
- `RkChoiceGroup`:
    - `container`: View which wraps all children of component. 

#### Inline styling

It's possible to set styles inline. Use props `style` for `container` component and `contentStyle` for `content` component.

```html
import {RkChoice} from 'react-native-ui-kitten';


//...
<RkChoice style={{backgroundColor: 'green'}} 
          contentStyle={{width: 50, height:50}} 
          rkType='mic'/>

```

### RkChoice Props

<div class="doc-prop">
    <p><strong><a href="../customization#rkType">rkType</a></strong> string</p>
    <p>By default RkChoice supports following types: clear, radio, posNeg</p>
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
    <p><strong>contentStyle</strong> TouchableOpacity.style or View.style</p>
    <p>Style for content inside component</p>
</div>


### RkChoiceGroup Props

<div class="doc-prop">
    <p><strong>rkType</strong> string</p>
    <p>By default RkChoiceGroup has not predefined rkTypes.</p>
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
