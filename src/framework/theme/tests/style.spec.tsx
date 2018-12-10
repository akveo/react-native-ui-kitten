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
  ThemeMappingType,
  ThemeType,
} from '../component';

import * as config from './config';

const styleConsumerTestId = '@style/consumer';
const styleTouchableTestId = '@style/touchable';

interface ComplexStyleProviderProps {
  changedMappings: [ThemeMappingType];
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

  const mappings = [config.themeMappings.test, config.themeMappings.mock];

  it('receives custom props', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <StyleProvider mapping={mappings} theme={config.theme}>
        <StyleConsumer variant='default'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.variant).not.toBeNull();
    expect(styledComponent.props.variant).not.toBeUndefined();
    expect(styledComponent.props.theme).not.toBeNull();
    expect(styledComponent.props.theme).not.toBeUndefined();
    expect(styledComponent.props.themedStyle).not.toBeUndefined();
    expect(styledComponent.props.themedStyle).not.toBeUndefined();
  });

  it('default variant styled properly', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <StyleProvider mapping={mappings} theme={config.theme}>
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
      <StyleProvider mapping={mappings} theme={config.theme}>
        <StyleConsumer variant='dark success'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.themedStyle.backgroundColor).toEqual(config.values.backgroundDark);
    expect(styledComponent.props.themedStyle.textColor).toEqual(config.values.textSuccess);
  });

});

describe('@style: complex hierarchy checks', async () => {

  it('@style: provides correct styles on mapping/theme change', async () => {
    const StyleConsumer = StyledComponent(Test);

    const component = render(
      <ComplexStyleProvider
        mapping={[config.themeMappings.test]}
        theme={config.theme}
        changedMappings={[config.themeMappings.testInverse]}
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
