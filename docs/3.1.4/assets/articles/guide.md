### Overview
React Native UI Kitten has strong customization implemented based on custom *rk-components*. This guide describes how to create your own *rk-component* from scratch.

Let's create *avatar component* which will have an image of a user, text with the user name and optional user description.

### RkComponent 

All *rk-components* are inherited from `RkComponent` class. This class contains methods responsible for customization.
Here is a complete code of our avatar component:

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

The avatar component now looks like this:

![](assets/avatar/avatar1.png)

At this point, we created a skeleton of the component. Now we need to add styles in order to make the component prettier.
All *rk-components* have a default style for each internal component. Here we have 4 internal components: `container`, `image`,
`username` and `description`. (We won't include View that wraps texts because it just helps to group them).
So we need to add default styles for these components.
These styles should include not only layout styles but also color and font styles. And also it would be nice to make this component
dependent on a theme.

Here we need to use a method `registerComponent` from `RkTheme`. This method accepts the name of a component and function which returns an object with styles. Let's start with the first parameter. The name should be set in `componentName` property of your component.
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
Now we have to define a base style for the component.

### Define base style 
Each *rk-component* has a base style. This style applied by default for all instances of the component. Base style should be named `_base`.
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

Here we export the function which accepts the theme object. Using `theme` we can set values based on the current theme. If the theme will change - 
those values will also be changed.

### Register rk-component

Now we have all parameters for `registerComponent` method. Let's call it. Best place to do this - some kind of a bootstrap method 
which will be called on app startup.

```jsx
//index.ios.js

import {RkTheme} from 'react-native-ui-kitten';
import {AvatarTypes} from 'avatarTypes.js';

//....

RkTheme.registerComponent('Avatar', AvatarTypes);

```

After this step `RkTheme` knows about `Avatar` class, and can compile styles for it according to the current theme.
Now we need to set computed styles in our controls.
First, let's add a special mapping object to the component. It can be used in order to provide more user-friendly properties
for your component. This will be described a bit later. Now you only need to create a skeleton of this mapping.

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

After this last step, we have a nice looking, theme-dependent component. We can use our component in the application:

```jsx
import {Avatar} from 'avatar.js'

//...

<Avatar source={require('../img/aGilbert.png')}
        name='Alex Gilbert' 
        description='developer'/>

```

The component looks much better now:

![](assets/avatar/avatar2.png)

From this point if we change for example a color for a hint text in the theme -
avatar's description color will also be changed.

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

Now the avatar should look like this:

![](assets/avatar/avatar3.png)

### Adding rkTypes to component.

As long as `Avatar` is *rk-component* we can define rkTypes for it. As a base style, we may want to create types that also will depend on the current theme. In order to add such types, we need to make changes into `avatarTypes.js`.
Let's add a couple of new types for `Avatar`:

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

Here is the result of the code above:

![](assets/avatar/avatar4.png)

### User-friendly properties

For advanced styling of `Avatar` component, we need to know all customizable elements. But more often we need to change only
some base properties such as background color, text color etc. To set this values you still need to know the internal structure of the component.
React Native UI Kitten provides the ability to define simplified property and then map them to some internal component.

Let's define properties `backgroundColor`, `color` and `descriptionColor` for `Avatar` component.
There are only a few things to change in our component. 
Currently in our component we have variable `typeMapping` which has the following structure:

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

All we need to do is to put it in this mapping key-value pair. Where `name` is desired user-friendly name of the property.
`Value` is a name of the property which should be customized.

Let's add `backgroundColor` for `Avatar` component. Background color should apply to the whole component. In our case, it should
apply to `container` component of control. And should be mapped to the `backgroundColor` property of it:

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

Let's add other two properties. `color` property should be applied to the `username` component and mapped to the `color` property,
`descriptionColor` property should be applied to the `description` component and mapped to the `color` property:

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

Now it's much cleaner and user-friendlier.
