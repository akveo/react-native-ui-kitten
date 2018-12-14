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

const styleConsumerTestId = '@style/consumer';
const styleTouchableTestId = '@style/touchable';

interface ComplexStyleProviderProps {
  changedMappings: ThemeMappingConfigType;
  changedTheme: ThemeType;
}

class ComplexStyleProvider extends React.Component<ComplexStyleProviderProps & StyleProviderProps> {

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

describe('@style: style consumer checks', () => {

  it('receives custom props', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <StyleProvider mapping={config.mappings} theme={config.theme}>
        <StyleConsumer variant='default'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.variant).not.toBeNull();
    expect(styledComponent.props.variant).not.toBeUndefined();
    expect(styledComponent.props.theme).not.toBeNull();
    expect(styledComponent.props.theme).not.toBeUndefined();
    expect(styledComponent.props.themedStyle).not.toBeNull();
    expect(styledComponent.props.themedStyle).not.toBeUndefined();
    expect(styledComponent.props.requestStateStyle).not.toBeNull();
    expect(styledComponent.props.requestStateStyle).not.toBeUndefined();
  });

  it('default variant styled properly', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <StyleProvider mapping={config.mappings} theme={config.theme}>
        <StyleConsumer variant='default'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.themedStyle.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(styledComponent.props.themedStyle.textColor).toEqual(config.values.textDefault);
  });

  it('list of non-default variants styled properly', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <StyleProvider mapping={config.mappings} theme={config.theme}>
        <StyleConsumer variant='dark success'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.themedStyle.backgroundColor).toEqual(config.values.backgroundDark);
    expect(styledComponent.props.themedStyle.textColor).toEqual(config.values.textSuccess);
  });

  it('style request works properly', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <StyleProvider mapping={config.mappings} theme={config.theme}>
        <StyleConsumer variant='dark success'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    const stateStyle = styledComponent.props.requestStateStyle(['active']);
    const undefinedStateStyle = styledComponent.props.requestStateStyle('undefined');

    expect(stateStyle).not.toBeNull();
    expect(stateStyle).not.toBeUndefined();
    expect(stateStyle.backgroundColor).toEqual(config.values.backgroundDefault);
    expect(stateStyle.textColor).toEqual(config.values.textSuccessActive);

    expect(undefinedStateStyle).not.toBeNull();
    expect(undefinedStateStyle).not.toBeUndefined();
    expect(undefinedStateStyle.backgroundColor).toEqual(config.values.backgroundDark);
    expect(undefinedStateStyle.textColor).toEqual(config.values.textSuccess);

    styledComponent.props.requestStateStyle([]);
    jest.spyOn(console, 'warn');
  });

  it('static methods are copied over', async () => {
    // @ts-ignore: test-case
    Test.staticMethod = function() {};
    const StyleConsumer = StyledComponent(Test);

    // @ts-ignore: test-case
    expect(StyleConsumer.staticMethod).not.toBeUndefined();
  });

});

describe('@style: complex hierarchy checks', async () => {

  it('@style: provides correct styles on mapping/theme change', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <ComplexStyleProvider
        mapping={config.mappings}
        theme={config.theme}
        changedMappings={config.mappings}
        changedTheme={config.themeInverse}>
        <StyleConsumer variant='default'/>
      </ComplexStyleProvider>,
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
