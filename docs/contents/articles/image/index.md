---
title: Modal Image
author: vl
sort: 502
group: Components
template: componentArticle.jade
---

<div class="component" image="https://thumbs.gfycat.com/IncredibleAnotherDorado-size_restricted.gif"></div>


`RkModalImg` is extension on basic Image that opens image to full screen on click:

```html
import {RkModalImg} from 'react-native-ui-kit';

//... 

<RkModalImg source={require('../img/river.jpeg')}/>

```

### Custom header and footer

Props `renderHeader` and `renderFooter` allow creating custom header and footer:

```html
import {RkModalImg, RkButton} from 'react-native-ui-kit';

//... 

<RkModalImg source={require('../img/river.jpeg')}
            renderHeader={this._renderHeader}
/>

//... 

_renderHeader(closeImage, pageNumber, totalPages, delimiter) {
    return (
      <View>
        <RkButton onPress={closeImage}>Custom Header</RkButton>
      </View>
    );
}

```

<div class="component" image="https://thumbs.gfycat.com/SpeedyCheeryConure-size_restricted.gif"></div>

### Gallery

Also `RkModalImg` supports multi image source,
this options enable swaps between images

```html
import {RkModalImg} from 'react-native-ui-kit';

let images = [ require('../img/animal.jpeg'),
               require('../img/bird.jpeg'),...]
               
//... 

<RkModalImg source={images} index={0}/>
<RkModalImg source={images} index={1}/>
<RkModalImg source={images} index={2}/>

```

### Props

<div class="doc-prop">
    <p><a href="https://facebook.github.io/react-native/docs/image.html#props" target="_blank">Image.props</a></p>
</div>

<div class="doc-prop">
    <p><strong>containerStyle</strong> View.style</p>
    <p>Style for container around image</p>
</div>

<div class="doc-prop">
    <p><strong>visible</strong> boolean</p>
    <p>If image opened, prop will be passed to Modal component</p>
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
    <p>Style for container inside Modal component</p>
</div>

<div class="doc-prop">
    <p><strong>imageInModalStyle</strong> Image.style</p>
    <p>Style for image when modal is visible</p>
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
    <p><strong>delimiter</strong> string</p>
    <p>Delimiter between page numbers</p>
</div>

<div class="doc-prop">
    <p><strong>index</strong> number</p>
    <p>Number of image(needed with multi source)</p>
</div>

