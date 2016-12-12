---
title: Card
author: vl
sort: 402
group: Components
template: componentArticle.jade
---

<div class="component" image="card.gif"></div>

`RkCard` component works with custom props on react components like `View` or `Text`. 

```html
import {RkCard} from 'react-native-ui-kit';

//... 

<RkCard>
    <View rkCardHeader>
        <View>
            <Text rkCardTitle>Header</Text>
            <Text rkCardSubTitle>Sub header</Text>
        </View>
    </View>
    
    <View rkCardContent>
        <Image source={require('../img/sea.jpg')} rkCardImg/>
    </View>
    
    <View rkCardContent>
        <Text rkCardTitle>Card content</Text>
        <Text rkCardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris feugiat vel quam ac scelerisque...
        </Text>
    </View>
    
    <View rkCardFooter rkType='bordered'>
        <Text>Footer</Text>
    </View>
</RkCard>
```

### Props

<div class="doc-prop">
    <p><strong>rkType</strong> string</p>
    <p>By default RkCard supports following types: material, bordered, noPadding</p>
</div>

<div class="doc-prop">
    <p><a href="https://facebook.github.io/react-native/docs/view.html#props" target="_blank">View.props</a></p>
</div>

