---
title: Card
author: vl
sort: 402
group: Components
template: componentArticle.jade
---

<div class="component" image="https://thumbs.gfycat.com/OptimalSmoothAsianpiedstarling-size_restricted.gif"></div>

`RkCard` component used to render card view in your application. 
It's usually being used with its props (described below) applied to standard react or custom components. 


```html
import {RkCard} from 'react-native-ui-kitten';

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

By default there are 12 *rkCard* props: 

- *rkCardContainer*  
- *rkCardContent*  
- *rkCardHeader*  
- *rkCardFooter*  
- *rkCardTitle*  
- *rkCardSubTitle*  
- *rkCardRow*  
- *rkCardRowCenter*  
- *rkCardImg*  
- *rkCardBigImg*  
- *rkCardAvatar*  
- *rkCardAvatarSmall* 

Every component inside `RkCard` can use these props to define specific layout behavior to that component. 
For example, `rkCardHeader` will apply following styles to appropriate `View`.

```javascript

{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    padding: 8,
}

``` 

<a href="#" id="custom"></a>

### Create custom rkType

You can customize 12 predefined *rkCard* props. As well it's possible to define your own one.

For example let's create blue card type. First, we need to define new type in `RkConfig`:

```javascript

import {RkConfig} from 'react-native-ui-kitten';

RkConfig.setType('card', 'blue', {
  container: {
    borderRadius: 15,
    borderWidth: 0,
    backgroundColor: RkConfig.colors.white,
  },
  content: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: RkConfig.colors.lightGray,
    borderRightColor: RkConfig.colors.lightGray
  },
  header: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: RkConfig.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15
  },
  footer: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: RkConfig.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  contentTitle:{
    color: RkConfig.colors.darkGray
  },
  title: {
    color: RkConfig.colors.white
  },
  subTitle: {
    color: RkConfig.colors.white
  },
  footerText: {
    fontSize: 20,
    color: RkConfig.colors.white
  }
});

```

After this we can use created type like this: 

```html
import {RkCard} from 'react-native-ui-kitten';

//... 

<RkCard rkType="blue">
    <View rkCardHeader>
        <Image resizeMode={'cover'} source={require('../img/sea.jpg')} rkCardAvatar/>
        <Text rkCardTitle>HEADER</Text>
        <Text rkCardSubTitle>sub header</Text>
    </View>
    
    <Image resizeMode={'cover'} source={require('../img/sea.jpg')} rkCardImg/>
    
    <View rkCardContent>
        <Text rkCardTitle rkCardContentTitle>Card content</Text>
        <Text rkCardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Mauris feugiat vel quam ac scelerisque...
        </Text>
    </View>
    
    <View rkCardFooter>
        <Text rkCardFooterText>FOOTER HERE</Text>
    </View>
</RkCard>

```


The result will be this:

![Image of dark buttons](/images/components/customCard.png)

### Props

<div class="doc-prop">
    <p><strong><a href="../customization#rkType">rkType</a></strong> string</p>
    <p>By default RkCard supports following types: material, bordered, noPadding</p>
</div>

<div class="doc-prop">
    <p><a href="https://facebook.github.io/react-native/docs/view.html#props" target="_blank">View.props</a></p>
</div>

