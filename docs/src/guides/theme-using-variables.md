# Using Theme Variables

React Native UI Kitten allows you using theme you have provided in application root. This allows you easily create themed components.

<hr>

### Declare Custom Component

As a first step, you need to declare your custom component.

```tsx
import React from 'react';
import { 
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  withStyles,
  ThemedComponentProps,
  ThemeType,
} from '@kitten/theme';

type AwesomeComponentProps = TouchableOpacityProps & ThemedComponentProps;

class ThemedAwesomeComponent extends React.Component<AwesomeComponentProps> {

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, style, ...restProps } = this.props;
    
    return (
      <TouchableOpacity
        {...restProps}
        style={[themedStyle, style]}
      />
    );
  }
}

export const AwesomeComponent = withStyles(ThemedAwesomeComponent, (theme: ThemeType) => ({
  backgroundColor: theme['color-primary-500'],
}));
```

That's it! Now you're done and able to use your themed component.

<hr>

### Themed Component Usage

```tsx
import React from 'react';
import { 
  AwesomeComponent,
  AwesomeComponentProps,
} from './path-to/awesome.component';

export const AwesomeComponentShowcase = (props?: AwesomeComponentProps): React.ReactElement<AwesomeComponentProps> => (
  <AwesomeComponent {...props}/>
);
```
