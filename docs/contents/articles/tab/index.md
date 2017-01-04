---
title: Tabs
author: vl
sort: 702
group: Components
template: componentArticle.jade
---

<div class="component" image="https://thumbs.gfycat.com/ScarceGleefulBluetickcoonhound-size_restricted.gif"></div>

Example usage of `RkTabView` and `RkTabView.Tab` components:

```html
import {RkTabView} from 'react-native-ui-kitten';

//...

<RkTabView>
    <RkTabView.Tab title={'Tab 1'}>
        <Text>Tab 1 Content</Text>
    </RkTabView.Tab>
    <RkTabView.Tab title={'Tab 2'}>
        <Text>Tab 2 Content</Text>
    </RkTabView.Tab>
    <RkTabView.Tab title={'Tab 3'}>
        <Text>Tab 3 Content</Text>
    </RkTabView.Tab>
</RkTabView>
```

<a href="#" id="custom"></a>

### Create custom rkType

To define new rkType you can modify style for 
*container*, *inner*, *containerSelected*, *innerSelected*  in `RkConfig`

```javascript

import {RkConfig} from 'react-native-ui-kitten';

RkConfig.setType('tab', 'dark', {
  container: {
    borderRadius: 15,
    borderWidth: 0,
    backgroundColor: RkConfig.colors.transparent
  },
  inner: {
    color: RkConfig.colors.white
  },
  containerSelected: {
    backgroundColor: RkConfig.colors.darkGray
  },
  innerSelected: {
  },
});

```

After this just set *rkType* to `RkTabView` component:

```html
import {RkTabView} from 'react-native-ui-kitten';

//... 

<RkTabView 
    rkType='dark'
    style={{backgroundColor: RkConfig.colors.lightGray, borderRadius: 15}}
    tabsContainerStyle={{backgroundColor: RkConfig.colors.gray, borderRadius: 15}}>
  <RkTabView.Tab title={'Tab 1'}>
    <Text style={styles.tabContent}>Tab 1 Content</Text>
  </RkTabView.Tab>
  <RkTabView.Tab title={'Tab 2'}>
    <Text style={styles.tabContent}>Tab 2 Content</Text>
  </RkTabView.Tab>
  <RkTabView.Tab title={'Tab 3'}>
    <Text style={styles.tabContent}>Tab 3 Content</Text>
  </RkTabView.Tab>
</RkTabView>

const styles = StyleSheet.create({
  tabContent: {
    alignSelf: 'center',
    padding: 50,
    fontSize: 32,
    color: RkConfig.colors.gray
  }
});

```

The result will be this:

![Image of dark buttons](/images/components/darkTab.png)


### RkTabView Props

<div class="doc-prop">
    <p><strong><a href="../customization#rkType">rkType</a></strong> string</p>
    <p>By default RkButton supports following types: material</p>
</div>
<div class="doc-prop">
    <p><strong>style</strong> View.style </p>
    <p>Style for RkTabView container (tabs & content)</p>
</div>
<div class="doc-prop">
    <p><strong>tabsContainerStyle</strong> View.style </p>
    <p>Style for container of tabs (not for content)</p>
</div>
<div class="doc-prop">
    <p><strong>maxVisibleTabs</strong> number </p>
    <p>If specified tabs will be scrollable and tab width will be screen.width/maxVisibleTabs</p>
</div>

### RkTabView.Tab Props

<div class="doc-prop">
    <p><strong>title</strong> string || function </p>
    <p>When type of title is string title is rendered like Text inside View.</p>
    <p>Otherwise title is rendered by function passed to this prop, function should return React component</p>
</div>
<div class="doc-prop">
    <p><strong>style</strong> View.style </p>
    <p>Style for RkTabView.Tab title container(applied only when title is text)</p>
</div>
<div class="doc-prop">
    <p><strong>styleSelected</strong> View.style </p>
    <p>Style for RkTabView.Tab title container when tab is selected(applied only when title is text)</p>
</div>
<div class="doc-prop">
    <p><strong>innerStyle</strong> Text.style </p>
    <p>Style for RkTabView.Tab title(applied only when title is text)</p>
</div>
<div class="doc-prop">
    <p><strong>innerStyleSelected</strong> Text.style </p>
    <p>Style for RkTabView.Tab title when tab is selected(applied only when title is text)</p>
</div>

