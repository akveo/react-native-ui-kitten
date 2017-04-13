---
title: RkText
author: vl
sort: 807
group: Components
template: componentArticle.jade
---

`RkText` is a component used to render text blocks in your application. 


Example usage:

```html
import {RkText} from 'react-native-ui-kitten';

//... 

<RkText>Text</RkText>

<RkText rkType='header'>Title</RkText>
```

<a href="#" id="custom"></a>

### Create custom rkType

To define new `rkType` you can use predefined properties which will passed to according element inside component:

```javascript

import {RkTheme} from 'react-native-ui-kitten';

RkTheme.setType('RkText','hero',{
  fontSize: 40
});

```

Now you can use *hero* type in your app:

```javascript
<RkText rkType='hero'>Header</RkText>
```

#### Available properties

- `color` : Color of text.
- `backgroundColor` : Background color of `RkText`.
- `fontSize` : Font size of text.

### Advanced Styling

It's also possible to implement more detailed styling. `RkText` consists from base react component.
You can easily set styles for it.

For example you can change font style:

```javascript
import {RkTheme} from 'react-native-ui-kitten';

RkTheme.setType('RkText','italic',{
  text:{
    fontStyle:'italic'
  }
});

```

#### Available components:

- `text` : `Text` - component used to show text.


#### Inline styling

It's possible to set styles inline. Use props `style` for `text` component.


### Props

<div class="doc-prop">
    <p><strong><a href="../customization#rkType">rkType</a></strong> string</p>
    <p>By default RkText supports following types: primary, info, warning, danger, success, xxlarge, xlarge,
        large, small, medium, header, subtitle</p>
</div>

<div class="doc-prop">
    <p><a href="https://facebook.github.io/react-native/docs/text.html#props" target="_blank">Text.props</a></p>
</div>


### Tips

You can set default style for all instances of `RkText` using `RkTheme`. And then use `RkText` in application
without explicit setting `rkType` to each control. This will allow change settings for whole text just in one place.
About default styles for rk-components you can read here...
