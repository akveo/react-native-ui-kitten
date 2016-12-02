## Button 

The *Button*{.component image=button.png} can be added to the page using the `RkButton` component:
```html
import {RkButton} from 'react-native-ui-kit';

//... 

<RkButton>Click me</RkButton>
```
### Props
**rkType** string

**style** View.style

Style for container

**innerStyle** style

Style for each button's children


### Default supported types

| rkType   | defenition |
|----------|------------|
| basic    | Basic button has gray background and black font color |
| clear    | 2          |
| outline  | 3          |
| material | 4          |
| circle   | 5          |
| shadow   | 6          |
| small    | 7          |
| medium   | 8          |
| large    | 9          |