import * as Service from '../service/styleUtil.service';
import {
  Theme as theme,
  Mapping as mapping,
} from './config-new';
import { APPEARANCE_DEFAULT } from '../service';

describe('@style: service methods checks', () => {

  const { Test: testMapping } = mapping;

  const json = (object: any) => JSON.stringify(object);

  it('normalizes appearance properly', () => {
    const implicitDefault = Service.normalizeAppearance('default');
    const custom = Service.normalizeAppearance('custom');
    const empty = Service.normalizeAppearance('');
    const nullable = Service.normalizeAppearance(undefined);

    expect(implicitDefault).toEqual([
      'default',
    ]);
    expect(custom).toEqual([
      'default',
      'custom',
    ]);
    expect(empty).toEqual([
      'default',
    ]);
    expect(nullable).toEqual([
      'default',
    ]);
  });

  it('normalizes variants properly', () => {
    const success = Service.normalizeVariants([
      'success',
    ]);
    const successTiny = Service.normalizeVariants([
      'success',
      'tiny',
    ]);
    const withDuplicates = Service.normalizeVariants([
      'success',
      'success',
      'tiny',
    ]);
    const withNulls = Service.normalizeVariants([
      'success',
      undefined,
      'tiny',
      null,
    ]);
    const empty = Service.normalizeVariants([
      '',
    ]);

    expect(success).toEqual([
      'success',
    ]);
    expect(successTiny).toEqual([
      'success',
      'tiny',
    ]);
    expect(withDuplicates).toEqual([
      'success',
      'tiny',
    ]);
    expect(withNulls).toEqual([
      'success',
      'tiny',
    ]);
    expect(withNulls).toEqual([
      'success',
      'tiny',
    ]);
    expect(empty).toEqual([]);
  });

  it('normalizes states properly', () => {
    const active = Service.normalizeStates([
      'active',
    ]);
    const activeChecked = Service.normalizeStates([
      'active',
      'checked',
    ]);
    const activeCheckedDisabled = Service.normalizeStates([
      'active',
      'checked',
      'disabled',
    ]);
    const withDuplicates = Service.normalizeStates([
      'active',
      'checked',
      'active',
    ]);
    const withNulls = Service.normalizeStates([
      'active',
      undefined,
      'checked',
      null,
    ]);
    const empty = Service.normalizeStates([
      '',
    ]);

    expect(active).toEqual([
      'active',
    ]);
    expect(activeChecked).toEqual([
      'active',
      'checked',
      'active.checked',
    ]);
    expect(activeCheckedDisabled).toEqual([
      'active',
      'checked',
      'active.checked',
      'disabled',
      'active.checked.disabled',
    ]);
    expect(withDuplicates).toEqual([
      'active',
      'checked',
      'active.checked',
    ]);
    expect(withNulls).toEqual([
      'active',
      'checked',
      'active.checked',
    ]);
    expect(empty).toEqual([]);
  });

  it('creates styles for default appearance properly', () => {
    const style = Service.createStyle(theme, testMapping);
    const withVariant = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      ['success'],
    );
    const withVariants = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      ['success', 'big'],
    );
    const withState = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      [],
      ['active'],
    );
    const withStates = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      [],
      ['active', 'checked'],
    );
    const withVariantAndState = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      ['success'],
      ['active'],
    );
    const withVariantAndStates = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      ['success'],
      ['active', 'checked'],
    );
    const withVariantsAndStates = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      ['success', 'big'],
      ['active', 'checked'],
    );

    expect(json(style)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariant)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariants)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#1976D2',
      selectColor: '#2196F3',
    }));
    expect(json(withVariantAndState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withVariantAndStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
    expect(json(withVariantsAndStates)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 2,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
  });

  it('creates styles for custom appearance properly', () => {
    const style = Service.createStyle(theme, testMapping, 'custom');
    const withVariant = Service.createStyle(
      theme,
      testMapping,
      'custom',
      ['success'],
    );
    const withVariants = Service.createStyle(
      theme,
      testMapping,
      'custom',
      ['success', 'big'],
    );
    const withState = Service.createStyle(
      theme,
      testMapping,
      'custom',
      [],
      ['active'],
    );
    const withStates = Service.createStyle(
      theme,
      testMapping,
      'custom',
      [],
      ['active', 'checked'],
    );
    const withVariantAndState = Service.createStyle(
      theme,
      testMapping,
      'custom',
      ['success'],
      ['active'],
    );
    const withVariantAndStates = Service.createStyle(
      theme,
      testMapping,
      'custom',
      ['success'],
      ['active', 'checked'],
    );
    const withVariantsAndStates = Service.createStyle(
      theme,
      testMapping,
      'custom',
      ['success', 'big'],
      ['active', 'checked'],
    );

    expect(json(style)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariant)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariants)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 4,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#1976D2',
      selectColor: '#2196F3',
    }));
    expect(json(withVariantAndState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withVariantAndStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
    expect(json(withVariantsAndStates)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 4,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
  });

  it('creates styles for undefined appearance properly', () => {
    const style = Service.createStyle(theme, testMapping, 'undefined');
    const withVariant = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      ['success'],
    );
    const withVariants = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      ['success', 'big'],
    );
    const withState = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      [],
      ['active'],
    );
    const withStates = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      [],
      ['active', 'checked'],
    );
    const withVariantAndState = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      ['success'],
      ['active'],
    );
    const withVariantAndStates = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      ['success'],
      ['active', 'checked'],
    );
    const withVariantsAndStates = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      ['success', 'big'],
      ['active', 'checked'],
    );

    expect(json(style)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariant)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariants)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#1976D2',
      selectColor: '#2196F3',
    }));
    expect(json(withVariantAndState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withVariantAndStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
    expect(json(withVariantsAndStates)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 2,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
  });

  // it('default variant styled properly', async () => {
  //   const style = createStyle(config.theme, config.mappings.Test);
  //   const withState = createStyle(config.theme, config.mappings.Test, 'default', 'active');
  //   const withUndefinedState = createStyle(config.theme, config.mappings.Test, 'default', 'undefined');
  //
  //   expect(style).not.toBeNull();
  //   expect(style).not.toBeUndefined();
  //   expect(style.backgroundColor).toEqual(config.values.backgroundDefault);
  //
  //   expect(withState).not.toBeNull();
  //   expect(withState).not.toBeUndefined();
  //   expect(withState.backgroundColor).toEqual(config.values.backgroundDark);
  //
  //   expect(withUndefinedState).not.toBeNull();
  //   expect(withUndefinedState).not.toBeUndefined();
  //   expect(withUndefinedState.backgroundColor).toEqual(config.values.backgroundDefault);
  // });

  // it('single non-default variant styled properly (string type)', async () => {
  //   const style = createStyle(config.theme, config.mappings.Test, 'dark');
  //   const withState = createStyle(config.theme, config.mappings.Test, 'dark', 'active');
  //   const withUndefinedState = createStyle(config.theme, config.mappings.Test, 'dark', 'undefined');
  //
  //   expect(style).not.toBeNull();
  //   expect(style).not.toBeUndefined();
  //   expect(style.backgroundColor).toEqual(config.values.backgroundDark);
  //
  //   expect(withState).not.toBeNull();
  //   expect(withState).not.toBeUndefined();
  //   expect(withState.backgroundColor).toEqual(config.values.backgroundDefault);
  //
  //   expect(withUndefinedState).not.toBeNull();
  //   expect(withUndefinedState).not.toBeUndefined();
  //   expect(withUndefinedState.backgroundColor).toEqual(config.values.backgroundDark);
  // });

  // it('list of non-default variants styled created properly (string type)', async () => {
  //   const style = createStyle(config.theme, config.mappings.Test, 'dark success');
  //   const withState = createStyle(config.theme, config.mappings.Test, 'dark success', 'active disabled');
  //   const withOneOfUndefined = createStyle(config.theme, config.mappings.Test, 'dark success', 'active ');
  //   const withUndefinedState = createStyle(config.theme, config.mappings.Test, 'dark success', 'undefined');
  //
  //   expect(style).not.toBeNull();
  //   expect(style).not.toBeUndefined();
  //   expect(style.backgroundColor).toEqual(config.values.backgroundDark);
  //   expect(style.textColor).toEqual(config.values.textSuccess);
  //
  //   expect(withState).not.toBeNull();
  //   expect(withState).not.toBeUndefined();
  //   expect(withState.backgroundColor).toEqual(config.values.backgroundSuccessDisabled);
  //   expect(withState.textColor).toEqual(config.values.textSuccessActive);
  //
  //   expect(withOneOfUndefined).not.toBeNull();
  //   expect(withOneOfUndefined).not.toBeUndefined();
  //   expect(withOneOfUndefined.backgroundColor).toEqual(config.values.backgroundDefault);
  //   expect(withOneOfUndefined.textColor).toEqual(config.values.textSuccessActive);
  //
  //   expect(withUndefinedState).not.toBeNull();
  //   expect(withUndefinedState).not.toBeUndefined();
  //   expect(withUndefinedState.backgroundColor).toEqual(config.values.backgroundDark);
  //   expect(withUndefinedState.textColor).toEqual(config.values.textSuccess);
  // });

  // it('single non-default variant styled properly (string[] type)', async () => {
  //   const style = createStyle(config.theme, config.mappings.Test, ['dark']);
  //   const withState = createStyle(config.theme, config.mappings.Test, ['dark'], ['active']);
  //   const withOneOfUndefined = createStyle(config.theme, config.mappings.Test, ['dark'], ['active', undefined]);
  //   const withUndefinedState = createStyle(config.theme, config.mappings.Test, ['dark'], ['undefined']);
  //
  //   expect(style).not.toBeNull();
  //   expect(style).not.toBeUndefined();
  //   expect(style.backgroundColor).toEqual(config.values.backgroundDark);
  //
  //   expect(withState).not.toBeNull();
  //   expect(withState).not.toBeUndefined();
  //   expect(withState.backgroundColor).toEqual(config.values.backgroundDefault);
  //
  //   expect(withOneOfUndefined).not.toBeNull();
  //   expect(withOneOfUndefined).not.toBeUndefined();
  //   expect(withOneOfUndefined.backgroundColor).toEqual(config.values.backgroundDefault);
  //
  //   expect(withUndefinedState).not.toBeNull();
  //   expect(withUndefinedState).not.toBeUndefined();
  //   expect(withUndefinedState.backgroundColor).toEqual(config.values.backgroundDark);
  // });

  // it('array of non-default variants styled properly (string[] type)', async () => {
  //   const style = createStyle(config.theme, config.mappings.Test, ['dark', 'success']);
  //   const withState = createStyle(config.theme, config.mappings.Test, ['dark', 'success'], ['active', 'disabled']);
  //   const withOneOfUndefined = createStyle(
  //     config.theme,
  //     config.mappings.Test,
  //     ['dark', 'success'],
  //     ['active', undefined],
  //   );
  //   const withUndefinedState = createStyle(config.theme, config.mappings.Test, ['dark', 'success'], ['undefined']);
  //
  //   expect(style).not.toBeNull();
  //   expect(style).not.toBeUndefined();
  //   expect(style.backgroundColor).toEqual(config.values.backgroundDark);
  //   expect(style.textColor).toEqual(config.values.textSuccess);
  //
  //   expect(withState).not.toBeNull();
  //   expect(withState).not.toBeUndefined();
  //   expect(withState.backgroundColor).toEqual(config.values.backgroundSuccessDisabled);
  //   expect(withState.textColor).toEqual(config.values.textSuccessActive);
  //
  //   expect(withOneOfUndefined).not.toBeNull();
  //   expect(withOneOfUndefined).not.toBeUndefined();
  //   expect(withOneOfUndefined.backgroundColor).toEqual(config.values.backgroundDefault);
  //   expect(withOneOfUndefined.textColor).toEqual(config.values.textSuccessActive);
  //
  //   expect(withUndefinedState).not.toBeNull();
  //   expect(withUndefinedState).not.toBeUndefined();
  //   expect(withUndefinedState.backgroundColor).toEqual(config.values.backgroundDark);
  //   expect(withUndefinedState.textColor).toEqual(config.values.textSuccess);
  // });

});

// describe('@style: ui component checks', () => {
//
//
//   const styleConsumerTestId = '@style/consumer';
//   const styleTouchableTestId = '@style/touchable';
//
//   interface ComplexStyleProviderProps {
//     changedMappings: ThemeMappingType;
//     changedTheme: ThemeType;
//   }
//
//   class ComplexStyleProvider extends React.Component<ComplexStyleProviderProps & StyleProviderProps> {
//
//     state = {
//       mappings: [],
//       theme: {},
//     };
//
//     constructor(props) {
//       super(props);
//       this.state = {
//         mappings: this.props.mapping,
//         theme: this.props.theme,
//       };
//     }
//
//     onTouchablePress = () => {
//       this.setState({
//         mappings: this.props.changedMappings,
//         theme: this.props.changedTheme,
//       });
//     };
//
//     render() {
//       return (
//         <StyleProvider
//           mapping={this.state.mappings}
//           theme={this.state.theme}>
//           <TouchableOpacity
//             testID={styleTouchableTestId}
//             onPress={this.onTouchablePress}>
//             {this.props.children}
//           </TouchableOpacity>
//         </StyleProvider>
//       );
//     }
//   }
//
//   type TestComponentProps = any;
//
//   class Test extends React.Component<TestComponentProps & StyledComponentProps> {
//     static defaultProps = {
//       testID: styleConsumerTestId,
//     };
//
//     render() {
//       return (
//         <View testID={this.props.testID}/>
//       );
//     }
//   }
//
//   it('static methods are copied over', async () => {
//     // @ts-ignore: test-case
//     Test.staticMethod = function() {};
//     const StyleConsumer = StyledComponent(Test);
//
//     // @ts-ignore: test-case
//     expect(StyleConsumer.staticMethod).not.toBeUndefined();
//   });
//
//   it('receives custom props', async () => {
//     const StyleConsumer = StyledComponent(Test);
//
//     const component = render(
//       <StyleProvider mapping={config.mappings} theme={config.theme}>
//         <StyleConsumer variant='default'/>
//       </StyleProvider>,
//     );
//
//     const styledComponent = component.getByTestId(styleConsumerTestId);
//     expect(styledComponent.props.variant).not.toBeNull();
//     expect(styledComponent.props.variant).not.toBeUndefined();
//     expect(styledComponent.props.theme).not.toBeNull();
//     expect(styledComponent.props.theme).not.toBeUndefined();
//     expect(styledComponent.props.themedStyle).not.toBeNull();
//     expect(styledComponent.props.themedStyle).not.toBeUndefined();
//     expect(styledComponent.props.requestStateStyle).not.toBeNull();
//     expect(styledComponent.props.requestStateStyle).not.toBeUndefined();
//   });
//
//   it('default variant styled properly', async () => {
//     const StyleConsumer = StyledComponent(Test);
//
//     const component = render(
//       <StyleProvider mapping={config.mappings} theme={config.theme}>
//         <StyleConsumer variant='default'/>
//       </StyleProvider>,
//     );
//
//     const styledComponent = component.getByTestId(styleConsumerTestId);
//     expect(styledComponent.props.themedStyle.backgroundColor).toEqual(config.values.backgroundDefault);
//     expect(styledComponent.props.themedStyle.textColor).toEqual(config.values.textDefault);
//   });
//
//   it('list of non-default variants styled properly', async () => {
//     const StyleConsumer = StyledComponent(Test);
//
//     const component = render(
//       <StyleProvider mapping={config.mappings} theme={config.theme}>
//         <StyleConsumer variant='dark success'/>
//       </StyleProvider>,
//     );
//
//     const styledComponent = component.getByTestId(styleConsumerTestId);
//     expect(styledComponent.props.themedStyle.backgroundColor).toEqual(config.values.backgroundDark);
//     expect(styledComponent.props.themedStyle.textColor).toEqual(config.values.textSuccess);
//   });
//
//   it('style request works properly', async () => {
//     const StyleConsumer = StyledComponent(Test);
//
//     const component = render(
//       <StyleProvider mapping={config.mappings} theme={config.theme}>
//         <StyleConsumer variant='dark success'/>
//       </StyleProvider>,
//     );
//
//     const styledComponent = component.getByTestId(styleConsumerTestId);
//     const stateStyle = styledComponent.props.requestStateStyle(['active']);
//     const undefinedStateStyle = styledComponent.props.requestStateStyle('undefined');
//
//     expect(stateStyle).not.toBeNull();
//     expect(stateStyle).not.toBeUndefined();
//     expect(stateStyle.backgroundColor).toEqual(config.values.backgroundDefault);
//     expect(stateStyle.textColor).toEqual(config.values.textSuccessActive);
//
//     expect(undefinedStateStyle).not.toBeNull();
//     expect(undefinedStateStyle).not.toBeUndefined();
//     expect(undefinedStateStyle.backgroundColor).toEqual(config.values.backgroundDark);
//     expect(undefinedStateStyle.textColor).toEqual(config.values.textSuccess);
//
//     styledComponent.props.requestStateStyle([]);
//     jest.spyOn(console, 'warn');
//   });
//
//   it('@style: provides correct styles on mapping/theme change', async () => {
//     const StyleConsumer = StyledComponent(Test);
//
//     const component = render(
//       <ComplexStyleProvider
//         mapping={config.mappings}
//         theme={config.theme}
//         changedMappings={config.mappings}
//         changedTheme={config.themeInverse}>
//         <StyleConsumer variant='default'/>
//       </ComplexStyleProvider>,
//     );
//     const styledComponent = component.getByTestId(styleConsumerTestId);
//
//     const { themedStyle: initialStyle } = styledComponent.props;
//     expect(initialStyle.backgroundColor).toEqual(config.theme.backgroundColorTestDefault);
//
//     const touchableComponent = component.getByTestId(styleTouchableTestId);
//
//     fireEvent.press(touchableComponent);
//
//     const styledComponentChanged = await waitForElement(() => {
//       return component.getByTestId(styleConsumerTestId);
//     });
//
//     const { themedStyle: changedStyle } = styledComponentChanged.props;
//     expect(changedStyle.backgroundColor).toEqual(config.themeInverse.backgroundColorTestDefault);
//   });
//
// });
