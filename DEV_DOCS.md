- [Before contributing](#things-you-must-follow-before-contributing)
- [New Feature Checklist](#new-feature-checklist)
- [Framework Structure](#framework-structure)
- [Demo Application](#demo-application---kitten-tricks)
- [Documentation](#Documentation)
- [Development](#development)
- [Release](#release)

## Things you must follow before contributing

- Don’t overcomplicate
- Don’t make things too abstract
- Use tslint, to check the code style
- Never forget [document your changes add create some examples](#documentation)
- Write tests
- [Create showcase components](#create-a-new-component) per each new component/feature

## New Feature Checklist

- Lint checks are passing
- Tests are added or updated and passing
- Showcase components in [Kitten Tricks application](https://github.com/akveo/kittenTricks) added or updated
- Showcase components in [documentation application](./src/showcases) added or updated
- Readable documentation added or updated
- Commit message is properly formatted
- Looks great on all default themes
- Requires approval from several core team contributors

## Framework Structure

- docs - Documentation and framework website built on top on the framework
- src
    - components - `@ui-kitten/components` package. UI components itself.     
    - eva-icons - `@ui-kitten/eva-icons` package. Eva Icons for React Native     
    - date-fns - `@ui-kitten/moment` package. Services that allows UI Kitten components to work with date-fns.
    - moment - `@ui-kitten/moment` package. Services that allows UI Kitten components to work with moment.js.    
    - template-js - `@ui-kitten/template-js` package. Template app for creating UI Kitten project with React Native CLI.    
    - template-ts - `@ui-kitten/template-ts` package. Template app for creating TypeScript UI Kitten project with React Native CLI.     
    - [Demo Application](https://github.com/akveo/kittenTricks) - independent application with runnable examples for each feature
      
### UI Kit 

Located in [./src/components](./src/components). Divided into two dirs:

- [theme](./src/components/theme) - Contains styling services and supporting components used to provide styles to basic components.
- [ui](./src/components/ui) - Contains basic UI components.

### Styling services

Located in [./src/components/theme](./src/components/theme)

- [theme](./src/components/theme/theme) - ThemeProvider component. Used to provide one of Eva themes used to style basic components.
- [mapping](./src/components/theme/mapping) - MappingProvider component. Used to provide one of Eva mappings to style basic components.
- [style](./src/components/theme/style) - StyleProvider components. This mixes both Theme- and Mapping- providers to provide usable basic component style object.
- [application](./src/components/theme/application) - Global ApplicationProvider component. This mixes StyleProvider implementation with Eva processing engine.

### Basic UI components

Located in [./src/components/ui](./src/components/ui)

Each component implementation can be found in a directory with the corresponding name.

#### UI component directory structure:

- `*.component.tsx` - component implementation itself.
- `*.spec.tsx` - component tests.
- `*.spec.tsx.snap` - component test snapshots. This is a generated file. Could be presented or not depending on tests.

Some of the components can have a more complex implementation. In this case, the final component implementation could be divided into sub-components, but tests should be written in a single `*.spec` file. The good example is [TabView](./src/components/ui/tab). 

## Demo Application - Kitten Tricks

[Kitten Tricks](https://github.com/akveo/kittenTricks) is an example app built on top of the Expo containing reusable screens and runnable component examples. This application is used as a framework demo.

### Start a Demo Application

Before running, please make sure to clone UI Kitten, Eva Design System and Kitten Tricks:

- Clone UI Kitten `git clone https://github.com/akveo/react-native-ui-kitten`
- Clone Eva Design System `git clone https://github.com/eva-design/eva`
- Clone Kitten Tricks `git clone https://github.com/akveo/kittenTricks`

- **IMPORTANT** Ensure you have the following structure of repos:
```
- /
  - eva
  - kittenTricks
  - react-native-ui-kitten
```

- Run `yarn` from react-native-ui-kitten directory to install dependencies

#### Run in development mode

- `yarn demo env dev` to switch to development environment 
- `yarn demo expo start` to start as Expo project or `yarn demo start` to start as Bare React Native project.

#### Run in production mode

- `yarn demo env prod` to switch to production environment 
- `yarn demo expo start` to start as Expo project or `yarn demo start` to start as Bare React Native project.

## Documentation

Documentation is a separate Angular application located right in this project in [docs](./docs) folder.
The pages structure is taken from `structure.ts` file.
The components documentation is taken from the component comment sections. 
   
Documentation is generated by the custom generator built on top of UI Kit.
You have to use typedoc everywhere for the documentation purpose.

### How to add a page to the documentation

Docs application split into the sections which you can find in the app's sidebar.
Each section contains some pages.
If you wanna add new page in the documentation, please, open `structure.ts`
file in the root of docs application and add a new page in the required section:

```
{
  type: 'page',
  name: 'Awesom page',
  children: [
    ... blocks
  ],
},
```

If it's a completely new feature, maybe it would be better to create a new section:

```
{
  type: 'section',
  name: 'New super section',
  children: [
    ... pages
  ],
},
```

Page can contain multiple blocks of the following types:

- [markdown](#markdown-block)
- [component](#component-block)
- [tabbed component](#tabbed-component-block)

#### Markdown block

Renders plain markdown file from the `articles` dir.
For example, if you wanna add getting started article you have to do the following:

- put `getting-started.md` file in the `articles` folder.
- add markdown block to the page children:

```
{
  type: 'block',
  block: 'markdown',
  source: 'getting-started.md',
},
```

#### Component block

If you have to render all the information about component parsed with typedoc
you have to use component blocks:

```
{
  type: 'block',
  block: 'component',
  source: 'MyNewComponentName',
},
```

#### Tabbed component block

Tabbed component block will render component description splitted on the following tabs:
- Overview - This is typedoc comment above component
- Theme - Theme variables listed in the typedoc comment above component with `@styles` tag, for example:

```
/**
 * ...
 *
 * @styles
 *
 * var1
 * var2
 *
 * ...
 */
```

- API - parsing result of the typedoc above public methods and props
- Examples - live examples listed in the typedoc comment above component

#### Add raw code

If you wan't to describe a small thing in two lines of code you can just add something similar in your typedoc comment:

````
```jsx
const AwesomeComponentShowcase = () => (
  <AwesomeComponent/>
);
```
````

And don't forget to specify the language above your example.

## Development

### Create a new component

- create directory in `./src/components/ui/awesomeComponent` with following files:
````
- awesomeComponent.component.tsx (component file)
- awesomeComponent.spec.tsx (component tests)
````

- create directory in Kitten Tricks `./src/scenes/components/awesomeComponent` with following files:
````
- awesome-component.component.tsx (component showcase container)
- awesome-component-showcase.component.tsx (basic component showcase)
- type.tsx (component configuration file)
````

Look through already existing showcases and use similar implementation (e.g [Button Showcase](https://github.com/akveo/kittenTricks/tree/master/src/scenes/components/button))

- register your showcase in a Demo Application: 

Open [Components Navigator](https://github.com/akveo/kittenTricks/tree/master/src/navigation/components.navigator.tsx) and expand navigation with your component container:
```
import { AwesomeComponentScreen } from '../scenes/components/awesome-component.component';
...
<Stack.Screen name='AwesomeComponent' component={AwesomeComponentScreen} />
```

Open [Components Screen](https://github.com/akveo/kittenTricks/tree/master/src/scenes/components/data.ts) and expand it with route to new component:
```
{
    title: 'AwesomeComponent',
    route: 'AwesomeComponent',
    ...
  }
```

## Release

0. For major version, search for `@breaking-change` to make sure all breaking changes are covered.

To start a new release (publish the framework packages on NPM) you need:

1. Create a new release branch with template `release/vX.X.X`
2. Run tests: `npm run lint && npm run test`
3. MANUALLY update a version in main ./package.json to a new one
4. Generate changelog: `npm run bump-version`
5. Fix/expand changelog manually
6. Update documentation (e.g [DEV_DOCS.md](./DEV_DOCS.md)) files if needed
7. Push the branch, create PR, approve - merge
8. Pull the upstream (master or another version branch (e.g. 4.0.1, next))
9. Verify that React Native CLI works properly with local JS template `npx react-native init MyApp --template file:///path-to/react-native-ui-kitten/src/template-js)`. [See CLI docs](https://github.com/react-native-community/cli/blob/master/docs/commands.md#--template-string).
10. Verify that React Native CLI works properly with local TS template `npx react-native init MyApp --template file:///path-to/react-native-ui-kitten/src/template-ts)`. [See CLI docs](https://github.com/react-native-community/cli/blob/master/docs/commands.md#--template-string)
11. Publish documentation: `npm run publish-docs`
12. Publish framework packages: `npm run publish-packages`
13. Create and push [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging) with template `(vX.X.X)`
14. Create release on GitHub for the tag
