---
title: RkModalImg
author: vl
sort: 804
group: Components
template: componentArticle.jade
---

<div class="component" image="../../images/gif/image.gif"></div>


`RkModalImg` is extension of basic Image that also opens it in full screen on tap:

```javascript
import {RkModalImg} from 'react-native-ui-kitten';

//... 

<RkModalImg source={require('../img/river.jpeg')}/>

```

### Custom header and footer

In order to render custom header and/or footer you can pass functions as props `renderHeader` and `renderFooter`.
This functions can accept object `options` described below.

```javascript
import {RkModalImg, RkButton} from 'react-native-ui-kitten';

//... 

_renderHeader(options){
  return (
    <View>
      <RkButton onPress={options.closeImage}>Custom Header</RkButton>
    </View>
   );
}

//... 

<RkModalImg source={require('../img/river.jpeg')}
            renderHeader={this._renderHeader}/>

```

### Gallery

Also `RkModalImg` supports multi-image source.
This options allows to show several images in a gallery:

```javascript
import {RkModalImg} from 'react-native-ui-kitten';

let images = [ require('../img/animal.jpeg'),
               require('../img/bird.jpeg')]
               
//... 

<RkModalImg source={images} index={0}/>
<RkModalImg source={images} index={1}/>

```

### Create custom rkType

You can define new `rkType` and then reuse it. There is no predefined properties for this control.
So you can add styles for each component in `RkModalImg`:

```javascript
import {RkTheme, RkModalImg} from 'react-native-ui-kitten';

//...

RkTheme.setType('RkModalImg','small',{
  img:{
    width: 50,
    height: 50,
    borderRadius: 10
  }
});

//...

<RkModalImg rkType='small' source={require('../img/cat.jpeg')}/>
```

Code above will render this:

![](../../images/components/image/custom.png)

#### Available components

- `img` : `Image` - Image in regular (not modal) mode.
- `imgContainer` : `TouchableWithoutFeedback` - container of `img` in regular (not modal) mode.
- `modal` : `View` - Root view of `Modal` component.
- `modalImg` : `Image` - Image in modal mode.
- `header` : `View` - View container for header in modal mode. Here also will be set content returned form `renderHeader` function.
- `headerContent` : `View` - View container for header in modal mode (A child of `header` view). 
Only available if `renderHeader` not passed to component.
- `headerText`: `RkText` - Text that render page number in header. Only available if `renderHeader` not passed to component.
- `footer` : `View` - View container for footer in modal mode. Here also will be set content returned form `renderFooter` function.
- `footerContent` : `View` - View container for footer in modal mode (A child of `footer` view).
 Only available if `renderFooter` not passed to component.


### Inline Styling

It's possible to set styles inline. Use props `style` for `img` component, `imgContainerStyle` for `imgContainer` component,
`modalStyle` for `modal` component, `modalImgStyle` for `modalImg` component, `headerStyle` for `header` component,
`footerStyle` for `footer` component.

### Props

<div class="doc-prop">
    <p><strong><a href="../customization#rkType">rkType</a></strong> string</p>
    <p>RkType define a style of component</p>
</div>

<div class="doc-prop">
    <p><a href="https://facebook.github.io/react-native/docs/image.html#props" target="_blank">Image.props</a></p>
    <p>Props will be applied to image in regular and modal mods.</p>
</div>

<div class="doc-prop">
    <p><strong>style</strong> Image.style</p>
    <p>Style for image in regular (not modal) mode</p>
</div>

<div class="doc-prop">
    <p><strong>imgContainerStyle</strong> TouchableWithoutFeedback.style</p>
    <p>Style for wrapper of image in regular (not modal) mode</p>
</div>

<div class="doc-prop">
    <p><strong>modalStyle</strong> View.style</p>
    <p>Style for root view of modal component</p>
</div>

<div class="doc-prop">
    <p><strong>modalImgStyle</strong> View.style</p>
    <p>Style for image in modal mode</p>
</div>

<div class="doc-prop">
    <p><strong>headerStyle</strong> View.style</p>
    <p>Style for header container in modal mode. Applied only if renderHeader prop is not set</p>
</div>

<div class="doc-prop">
    <p><strong>footerStyle</strong> View.style</p>
    <p>Style for footer container in modal mode. Applied only if renderFooter prop is not set</p>
</div>

<div class="doc-prop">
    <p><strong>visible</strong> boolean</p>
    <p>true if modal is opened at the moment</p>
</div>

<div class="doc-prop">
    <p><strong>animationType</strong> enum('none', 'slide', 'fade')</p>
    <p>Type of animation for Modal component</p>
</div>

<div class="doc-prop">
    <p><strong>transparent</strong> boolean</p>
    <p>Prop will be passed to Modal component</p>
</div>

<div class="doc-prop">
    <p><strong>modalContainerStyle</strong> View.style</p>
    <p>Style passed to container inside of Modal component</p>
</div>

<div class="doc-prop">
    <p><strong>renderHeader</strong> function</p>
    <p>For custom header</p>
</div>

<div class="doc-prop">
    <p><strong>renderFooter</strong> function</p>
    <p>For custom footer</p>
</div>

<div class="doc-prop">
    <p><strong>index</strong> number</p>
    <p>Order of image in a gallery (used only with multi image source)</p>
</div>

