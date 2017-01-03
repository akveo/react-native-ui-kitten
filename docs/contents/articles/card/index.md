---
title: Card
author: vl
sort: 402
group: Components
template: componentArticle.jade
---

<div class="component" image="https://thumbs.gfycat.com/OptimalSmoothAsianpiedstarling-size_restricted.gif"></div>

`RkCard` component works with custom props on react components. 


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

Every component inside `RkCard` can use prop that starts with *rkCard*, for example *rkCardHeader* apply to the `View` this style:

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

By default there are 12 *rkCard* props that exist: 

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

<a href="#" id="custom"></a>

### Create custom rkType

You can create your own prop for example define style *footerText* and use it like *rkCardFooterText'

For example lets create blue type, first step - setup new type in  `RkConfig`:

```javascript

import {RkConfig} from 'react-native-ui-kit';

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

After this we can use new type like this: 

```html
import {RkCard} from 'react-native-ui-kit';

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

