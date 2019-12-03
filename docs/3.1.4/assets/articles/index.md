### What is React Native UI Kitten?

*React Native UI Kitten* is a mobile framework with a set of easily customizable elements.
Despite there are a lot of standalone react-native components nowadays, there are not so many frameworks that offer you
a bunch of commonly used ones as a single dependency with similar UI design. For instance in Web Development there are
CSS frameworks like Bootstrap that allows you to add a single include and use dozens of nice-looking elements.
You can also style them according to your corporate guidelines by just changing variables.
Our framework attempts to fill this gap.
It aims at boosting your mobile application development and allows you to focus on business logic instead of view composition.
It helps you to bring your MVP to life in a shorter period of time.

### What is the main benefit of using this kitten?

Using *React Native UI Kitten* you will be able to create style configurations of components you use the most (buttons, inputs etc.).
These styles can be reused then in the process of development. Configure them once and use anywhere!

### Can I use this kitten with other react libraries?

Yes, it's just set of UI components. It doesn't force you to use any specific library for business logic implementation.

### How to install

Simply add it as an npm dependency:

```
npm install --save react-native-ui-kitten
```

And include the component you need into your application:
```
import {RkButton} from 'react-native-ui-kitten';
```

Then just use:

```
render() {
  return (
    <View>
      <RkButton>Click me!</RkButton>
    </View>
  )
}
```

### Customization
All components are flexible and can be customized.
More details about stylization of components can be found [here](#/docs/quick-start/customization)
