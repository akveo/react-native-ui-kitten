import * as config from './config';
import React from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  render,
  fireEvent,
  waitForElement,
} from 'react-native-testing-library';
import {
  StyleProvider,
  StyledComponent,
  StyleProviderProps,
  StyledComponentProps,
  ThemeMappingConfigType,
  ThemeType,
} from '../component';
import {
  createStyle,
  getTokenValue,
  VARIANT_DEFAULT,
} from '../service';

const styleConsumerTestId = '@style/consumer';
const styleTouchableTestId = '@style/touchable';

interface ComplexStyleMockProps {
  changedMappings: ThemeMappingConfigType;
  changedTheme: ThemeType;
}

class ComplexStyleMock extends React.Component<ComplexStyleMockProps & StyleProviderProps> {

  state = {
    mappings: [],
    theme: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      mappings: this.props.mapping,
      theme: this.props.theme,
    };
  }

  onTouchablePress = () => {
    this.setState({
      mappings: this.props.changedMappings,
      theme: this.props.changedTheme,
    });
  };

  render() {
    return (
      <StyleProvider
        mapping={this.state.mappings}
        theme={this.state.theme}>
        <TouchableOpacity
          testID={styleTouchableTestId}
          onPress={this.onTouchablePress}>
          {this.props.children}
        </TouchableOpacity>
      </StyleProvider>
    );
  }
}

type TestComponentProps = any;

class Test extends React.Component<TestComponentProps & StyledComponentProps> {
  static defaultProps = {
    testID: styleConsumerTestId,
  };

  render() {
    return (
      <View testID={this.props.testID}/>
    );
  }
}

const StyledMock = StyledComponent(Test);

describe('@style: service methods checks', () => {

  it('retrieves token value correctly', async () => {
    const mappingVariant = config.mappings.Test.variants.default;

    const themeValue = getTokenValue(mappingVariant, 'backgroundColor', config.theme);
    const parameterValue = getTokenValue(mappingVariant, 'size', config.theme);
    const undefinedValue = getTokenValue(mappingVariant, 'undefined', config.theme);

    const stateThemeValue = getTokenValue(mappingVariant.state.active, 'backgroundColor', config.theme);
    const stateParameterValue = getTokenValue(mappingVariant.state.active, 'size', config.theme);
    const stateUndefinedValue = getTokenValue(mappingVariant.state.active, 'undefined', config.theme);

    expect(themeValue).toEqual(config.values.backgroundDefault);
    expect(parameterValue).toEqual(config.values.sizeDefault);
    expect(undefinedValue).toEqual(undefined);
    expect(stateThemeValue).toEqual(config.values.backgroundDark);
    expect(stateParameterValue).toEqual(undefined);
    expect(stateUndefinedValue).toEqual(undefined);
  });

  it('default variant styled properly', async () => {
    const style = createStyle(config.theme, config.mappings.Test);
    const withState = createStyle(config.theme, config.mappings.Test, 'default', 'active');
    const withUndefinedState = createStyle(config.theme, config.mappings.Test, 'default', 'undefined');

    expect(style.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(style.textColor).toEqual(config.values.textDefault);
    expect(style.size).toEqual(config.values.sizeDefault);
    expect(withState.backgroundColor).toEqual(config.values.backgroundDark);
    expect(withState.textColor).toEqual(config.values.textDark);
    expect(withState.size).toEqual(config.values.sizeDefault);
    expect(withUndefinedState.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(withUndefinedState.textColor).toEqual(config.values.textDefault);
  });

  it('custom variant styled properly (string type)', async () => {
    const style = createStyle(config.theme, config.mappings.Test, 'dark');
    const withState = createStyle(config.theme, config.mappings.Test, 'dark', 'active');
    const withUndefinedState = createStyle(config.theme, config.mappings.Test, 'dark', 'undefined');

    expect(style.backgroundColor).toEqual(config.values.backgroundDark);
    expect(style.textColor).toEqual(config.values.textDark);
    expect(style.size).toEqual(config.values.sizeDark);
    expect(withState.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(withState.textColor).toEqual(config.values.textDefault);
    expect(withState.size).toEqual(config.values.sizeDark);
    expect(withUndefinedState.backgroundColor).toEqual(config.values.backgroundDark);
    expect(withUndefinedState.textColor).toEqual(config.values.textDark);
    expect(withUndefinedState.size).toEqual(config.values.sizeDark);
  });

  it('list of custom variants styled created properly (string type)', async () => {
    const style = createStyle(config.theme, config.mappings.Test, 'dark success');
    const withState = createStyle(config.theme, config.mappings.Test, 'dark success', 'active disabled');
    const withOneOfUndefined = createStyle(config.theme, config.mappings.Test, 'dark success', 'active ');
    const withUndefinedState = createStyle(config.theme, config.mappings.Test, 'dark success', 'undefined');

    expect(style.backgroundColor).toEqual(config.values.backgroundDark);
    expect(style.textColor).toEqual(config.values.textSuccess);
    expect(style.size).toEqual(config.values.sizeDark);
    expect(withState.backgroundColor).toEqual(config.values.backgroundSuccessDisabled);
    expect(withState.textColor).toEqual(config.values.textSuccessActive);
    expect(withState.size).toEqual(config.values.sizeDark);
    expect(withOneOfUndefined.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(withOneOfUndefined.textColor).toEqual(config.values.textSuccessActive);
    expect(withOneOfUndefined.size).toEqual(config.values.sizeDark);
    expect(withUndefinedState.backgroundColor).toEqual(config.values.backgroundDark);
    expect(withUndefinedState.textColor).toEqual(config.values.textSuccess);
    expect(withUndefinedState.size).toEqual(config.values.sizeDark);
  });

  it('custom variant styled properly (string[] type)', async () => {
    const style = createStyle(config.theme, config.mappings.Test, ['dark']);
    const withState = createStyle(config.theme, config.mappings.Test, ['dark'], ['active']);
    const withOneOfUndefined = createStyle(config.theme, config.mappings.Test, ['dark'], ['active', undefined]);
    const withUndefinedState = createStyle(config.theme, config.mappings.Test, ['dark'], ['undefined']);

    expect(style.backgroundColor).toEqual(config.values.backgroundDark);
    expect(style.textColor).toEqual(config.values.textDark);
    expect(style.size).toEqual(config.values.sizeDark);
    expect(withState.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(withState.textColor).toEqual(config.values.textDefault);
    expect(withState.size).toEqual(config.values.sizeDark);
    expect(withOneOfUndefined.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(withOneOfUndefined.textColor).toEqual(config.values.textDefault);
    expect(withOneOfUndefined.size).toEqual(config.values.sizeDark);
    expect(withUndefinedState.backgroundColor).toEqual(config.values.backgroundDark);
    expect(withUndefinedState.textColor).toEqual(config.values.textDark);
    expect(withUndefinedState.size).toEqual(config.values.sizeDark);
  });

  it('list of custom variants styled properly (string[] type)', async () => {
    const style = createStyle(config.theme, config.mappings.Test, ['dark', 'success']);
    const withState = createStyle(config.theme, config.mappings.Test, ['dark', 'success'], ['active', 'disabled']);
    const withOneOfUndefined = createStyle(
      config.theme,
      config.mappings.Test,
      ['dark', 'success'],
      ['active', undefined],
    );
    const withUndefinedState = createStyle(config.theme, config.mappings.Test, ['dark', 'success'], ['undefined']);

    expect(style.backgroundColor).toEqual(config.values.backgroundDark);
    expect(style.textColor).toEqual(config.values.textSuccess);
    expect(style.size).toEqual(config.values.sizeDark);
    expect(withState.backgroundColor).toEqual(config.values.backgroundSuccessDisabled);
    expect(withState.textColor).toEqual(config.values.textSuccessActive);
    expect(withState.size).toEqual(config.values.sizeDark);
    expect(withOneOfUndefined.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(withOneOfUndefined.textColor).toEqual(config.values.textSuccessActive);
    expect(withOneOfUndefined.size).toEqual(config.values.sizeDark);
    expect(withUndefinedState.backgroundColor).toEqual(config.values.backgroundDark);
    expect(withUndefinedState.textColor).toEqual(config.values.textSuccess);
    expect(withUndefinedState.size).toEqual(config.values.sizeDark);
  });

});

describe('@style: ui component checks', () => {

  it('receives custom props', async () => {
    const component = render(
      <StyleProvider mapping={config.mappings} theme={config.theme}>
        <StyledMock variant={VARIANT_DEFAULT}/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.variant).toEqual(VARIANT_DEFAULT);
    expect(styledComponent.props.theme).toEqual(config.theme);
    expect(styledComponent.props.themedStyle).not.toBeNull();
    expect(styledComponent.props.themedStyle).not.toBeUndefined();
    expect(styledComponent.props.requestStateStyle).not.toBeNull();
    expect(styledComponent.props.requestStateStyle).not.toBeUndefined();
  });

  it('static methods are copied over', async () => {
    // @ts-ignore: test-case
    Test.staticMethod = function() {};
    const StyleConsumer = StyledComponent(Test);

    // @ts-ignore: test-case
    expect(StyleConsumer.staticMethod).not.toBeUndefined();
  });

  it('default variant styled properly', async () => {
    const component = render(
      <StyleProvider mapping={config.mappings} theme={config.theme}>
        <StyledMock />
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.themedStyle.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(styledComponent.props.themedStyle.textColor).toEqual(config.values.textDefault);
    expect(styledComponent.props.themedStyle.size).toEqual(config.values.sizeDefault);
  });

  it('list of non-default variants styled properly', async () => {
    const component = render(
      <StyleProvider mapping={config.mappings} theme={config.theme}>
        <StyledMock variant='dark success'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.themedStyle.backgroundColor).toEqual(config.values.backgroundDark);
    expect(styledComponent.props.themedStyle.textColor).toEqual(config.values.textSuccess);
    expect(styledComponent.props.themedStyle.size).toEqual(config.values.sizeDark);
  });

  it('style request works properly', async () => {
    const component = render(
      <StyleProvider mapping={config.mappings} theme={config.theme}>
        <StyledMock variant='dark success'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    const stateStyle = styledComponent.props.requestStateStyle(['active']);
    const undefinedStateStyle = styledComponent.props.requestStateStyle('undefined');

    expect(stateStyle.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(stateStyle.textColor).toEqual(config.values.textSuccessActive);
    expect(stateStyle.size).toEqual(config.values.sizeDark);

    expect(undefinedStateStyle.backgroundColor).toEqual(config.values.backgroundDark);
    expect(undefinedStateStyle.textColor).toEqual(config.values.textSuccess);
    expect(undefinedStateStyle.size).toEqual(config.values.sizeDark);

    styledComponent.props.requestStateStyle([]);
    jest.spyOn(console, 'warn');
  });

  it('@style: provides correct styles on mapping/theme change', async () => {
    const component = render(
      <ComplexStyleMock
        mapping={config.mappings}
        theme={config.theme}
        changedMappings={config.mappings}
        changedTheme={config.themeInverse}>
        <StyledMock variant={VARIANT_DEFAULT}/>
      </ComplexStyleMock>,
    );
    const styledComponent = component.getByTestId(styleConsumerTestId);

    const { themedStyle: initialStyle } = styledComponent.props;
    expect(initialStyle.backgroundColor).toEqual(config.theme.backgroundColorTestDefault);

    const touchableComponent = component.getByTestId(styleTouchableTestId);

    fireEvent.press(touchableComponent);

    const styledComponentChanged = await waitForElement(() => {
      return component.getByTestId(styleConsumerTestId);
    });

    const { themedStyle: changedStyle } = styledComponentChanged.props;
    expect(changedStyle.backgroundColor).toEqual(config.themeInverse.backgroundColorTestDefault);
  });

});
