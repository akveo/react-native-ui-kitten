### Overview
React Native UI Kitten has strong customization support. In order to get this support it's possible to create 
custom rk-components. This guide discover how to create your own rk-component from scratch.

Let's create avatar component which will have image of user, text with user name and optional description of user.

### RkComponent 

All *rk-components* are inherited from `RkComponent`. This class contains methods responsible for customization.
Here is code for our Avatar component:

```jsx
// avatar.js

export class Avatar extends RkComponent {
  
  constructor(props) {
    super(props);
  }
    
 render() {

    let description = this.props.description ? 
      (<RkText>{this.props.description}</RkText>) : 
      (<View/>);

    return (
      <View>
        <Image source={this.props.source}/>
        <View>
          <RkText>{this.props.name}</RkText>
          {description}
        </View>
      </View>
    )
  }
}

```

Avatar component now looks like this:

![](assets/avatar/avatar1.png)

At this point we create skeleton of component. Now we need to add styles in order to make component more pretty.
All *rk-components* has default style for each internal component. Here we have 4 internal components: `container`, `image`,
`username` and `description`. (We won't include View that wraps texts because it just help to group them).
So we need to add default styles for this components.
This styles should include not only layout styles but also color, font styles. And also it would be nice to make this component
dependent on theme.

Here we need to use method `registerComponent` from `RkTheme`. This method accept name of component and a function which returns
object with styles. Let's start from first parameter. Name should be set in `componentName` property of your component.
Let's stand with `Avatar` name:

```jsx
// avatar.js

export class Avatar extends RkComponent {
  componentName = 'Avatar';
    
  constructor(props) {
       super(props);
     }
//...
  
}
```
Now we have to define base style for component.

### Define base style 
Each *rk-component* has base style. This style applied by default for all instances of component. Base style should be named `_base`.
You can change base style using `RkTheme.setType` method.

Here we define base style for avatar component:

```javascript
// avatarTypes.js

export const AvatarTypes = (theme) => {
  return({
     _base: {
       container: {
         flex: 1,
         alignItems: 'center',
         flexDirection: 'row',
         marginVertical:4
       },
       image: {
         width: 40,
         height: 40
       },
       username: {
         paddingLeft: 10,
         color: theme.colors.text.base
       },
       description:{
         paddingLeft: 10,
         color: theme.colors.text.hint,
         fontSize: theme.fonts.sizes.small
       },
     }
  });
}

```

Here we export function which accept theme object. Using `theme` we can set values based on current theme. If theme will change - 
those values will be also changed.

### Register rk-component

Now we have all parameters for `registerComponent` method. Let's call it. Best place to do this - some kind of bootstrap method 
which will be called on app startup.

```jsx
//index.ios.js

import {RkTheme} from 'react-native-ui-kitten';
import {AvatarTypes} from 'avatarTypes.js';

//....

RkTheme.registerComponent('Avatar', AvatarTypes);

```

After this step `RkTheme` knows about `Avatar` class. And can compile styles for it according to current theme.
Now we need to set computed styles in our controls.
First let's add a special mapping object to component. It can be used in order to provide more user-friendly properties
for your component. This will be described a bit later. Now you only need to create skeleton of this mapping.

This is just an object where properties are names of inner components:

```jsx
//avatar.js

export class Avatar extends RkComponent {
  componentName = 'Avatar';
  typeMapping = {
    container: {},
    image: {},
    username: {},
    description: {}
  };
  
  constructor(props) {
       super(props);
     }
//...
  
}
```

Last step is to set computed styles in according components. Here we should use method `defineStyles` of `RkComponent`:

```jsx
// avatar.js

export class Avatar extends RkComponent {

  componentName = 'Avatar';
  typeMapping = {
    container: {},
    image: {},
    username: {},
    description: {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {container, image, username, description: descriptionStyle} = this.defineStyles();
    let description = this.props.description ? (<RkText style={descriptionStyle}>{this.props.description}</RkText>) :
      <View/>;

    return (
      <View style={container}>
        <Image style={image} source={this.props.source}/>
        <View>
          <RkText style={username}>{this.props.name}</RkText>
          {description}
        </View>
      </View>
    )
  }
}
```

After this last step we have nice looking, theme-dependent components. We can use our component in application:

```jsx
import {Avatar} from 'avatar.js'

//...

<Avatar source={require('../img/aGilbert.png')}
        name='Alex Gilbert' 
        description='developer'/>

```

Component now looks much better:

![](assets/avatar/avatar2.png)

Now if we change for example color for hint text in theme -
avatar's description color will be also changed.

For example:
```jsx
// index.ios.js

import {RkTheme} from 'react-native-ui-kitten';

RkTheme.setTheme({
  colors: {
    text: {
      hint: 'red'
    }
  }
});
```

Now avatar should look like this:

![](assets/avatar/avatar3.png)

### Adding rkTypes to component.

As long as `Avatar` is *rk-component* we can define rkTypes for it. As base style we may won't to create types that also will depend on 
current theme. In order to add such types we need to make changes into `avatarTypes.js`.
Let's add couple new types for `Avatar`:

```jsx
// avatarTypes.js

export const AvatarTypes = (theme) => {
  return({
  
//...
    round: {
      image: {
        borderRadius: 20,
        width: 36,
        height: 36,
        margin: 2
      }
    },
    info: {
      container: {
        backgroundColor: theme.colors.screen.info,
      },
      username:{
        color: theme.colors.text.subtitle
      },
      description:{
        color: theme.colors.text.subtitle
      }
    }
  });
}
```

Now we have two new `rkType` which we can use in our app:

```jsx
import {Avatar} from 'avatar.js'

//...

<Avatar rkType='round'
        source={require('../img/aGilbert.png')}
        name='Alex Gilbert' 
        description='developer'/>
        
<Avatar rkType='info round'
        source={require('../img/aGilbert.png')}
        name='Alex Gilbert' 
        description='developer'/>

```

Here is result of code above:

![](assets/avatar/avatar4.png)

### User-friendly properties

For advanced styling of `Avatar` component we need to know all customizable elements. But more often we need to change only
some base properties such as background color, text color etc. To set this values you still need to know internal structure of component.
React Native UI Kitten provide ability to define simplified property and then map them to some internal component.

Let's define properties `backgroundColor`, `color` and `descriptionColor` for `Avatar` component.
There are only few things to change in our component. 
Currently in our component we have variable `typeMapping` which has next structure:

```jsx
// avatar.js

//...

  typeMapping = {
    container: {},
    image: {},
    username: {},
    description: {}
  };

//...

```

All we need to do is put in this mapping key-value pair. Where `name` is desired user-friendly name of property.
`Value` is name of property which should be customized.

Let's add `backgroundColor` for `Avatar` component. Background color should apply to whole component. In our case it should
apply to `container` component of control. And should mapped to `backgroundColor` property of it:

```jsx
// avatar.js

//...

  typeMapping = {
    container: {
      backgroundColor: 'backgroundColor'
    },
    image: {},
    username: {},
    description: {}
  };

//...

```

Let's add other two properties. `color` property should apply for `username` component and mapped to `color` property,
`descriptionColor` property should apply for `description` component and mapped to `color` property:

```jsx
// avatar.js

//...

  typeMapping = {
    container: {
      backgroundColor: 'backgroundColor'
    },
    image: {},
    username: {
      color: 'color'
    },
    description: {
      descriptionColor: 'color'
    }
  };

//...

```

And that's all! Now you can use this property to define `rkType`.
Let's rewrite defined above 'info' type using new properties.

```jsx
// avatarTypes.js

export const AvatarTypes = (theme) => {
  return({
  
//...
    info: {
      backgroundColor: theme.colors.screen.info,
      color: theme.colors.text.subtitle,
      descriptionColor: theme.colors.text.subtitle
    }
  })
};
```

Now it's more cleaner and user-friendly.
