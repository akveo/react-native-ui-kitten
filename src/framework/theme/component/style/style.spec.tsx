import React from 'react';
import {
  fireEvent,
  render,
  waitForElement,
} from 'react-native-testing-library';
import {
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {
  StyleProvider,
  Props as StyleProviderProps,
} from './styleProvider.component';
import {
  styled,
  Props as StyledComponentProps,
} from './styleConsumer.component';
import {
  Interaction,
  ThemeType,
} from '../../type';
import {
  mapping,
  theme,
  themeInverse,
} from './style.spec.config';

describe('@style: ui component checks', () => {

  const styleConsumerTestId = '@style/consumer';
  const styleTouchableTestId = '@style/touchable';

  interface ComplexStyleProviderProps {
    themeInverse: ThemeType;
  }

  class ComplexStyleProvider extends React.Component<ComplexStyleProviderProps & StyleProviderProps> {

    state = {
      mappings: [],
      styles: {},
      theme: {},
    };

    constructor(props) {
      super(props);
      this.state = {
        mappings: this.props.mapping,
        styles: this.props.styles,
        theme: this.props.theme,
      };
    }

    onTouchablePress = () => {
      this.setState({
        theme: this.props.themeInverse,
      });
    };

    render() {
      return (
        <StyleProvider
          mapping={this.state.mappings}
          styles={this.state.styles}
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

  interface TestComponentProps {
    status?: string | 'success';
    checked?: boolean;
  }

  class Test extends React.Component<TestComponentProps & StyledComponentProps & ViewProps> {
    static defaultProps = {
      testID: styleConsumerTestId,
    };

    render() {
      return (
        <View testID={this.props.testID}/>
      );
    }
  }

  it('static methods are copied over', async () => {
    // @ts-ignore: test-case
    Test.staticMethod = function () {
    };
    const StyleConsumer = styled(Test);

    // @ts-ignore: test-case
    expect(StyleConsumer.staticMethod).not.toBeUndefined();
  });

  it('receives custom props', async () => {
    const StyleConsumer = styled(Test);

    const component = render(
      <StyleProvider mapping={mapping} theme={theme} styles={{}}>
        <StyleConsumer/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    expect(styledComponent.props.appearance).not.toBeNull();
    expect(styledComponent.props.appearance).not.toBeUndefined();
    expect(styledComponent.props.theme).not.toBeNull();
    expect(styledComponent.props.theme).not.toBeUndefined();
    expect(styledComponent.props.themedStyle).not.toBeNull();
    expect(styledComponent.props.themedStyle).not.toBeUndefined();
    expect(styledComponent.props.dispatch).not.toBeNull();
    expect(styledComponent.props.dispatch).not.toBeUndefined();
  });

  it('default appearance styled properly', async () => {
    const StyleConsumer = styled(Test);

    const component = render(
      <StyleProvider mapping={mapping} theme={theme} styles={{}}>
        <StyleConsumer/>
      </StyleProvider>,
    );
    const withAppearance = render(
      <StyleProvider mapping={mapping} theme={theme} styles={{}}>
        <StyleConsumer status='success'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    const withAppearanceComponent = withAppearance.getByTestId(styleConsumerTestId);

    expect(styledComponent.props.themedStyle).toMatchSnapshot();
    expect(withAppearanceComponent.props.themedStyle).toMatchSnapshot();
  });

  it('dispatch action works properly', async () => {
    const StyleConsumer = styled(Test);

    const component = render(
      <StyleProvider mapping={mapping} theme={theme} styles={{}}>
        <StyleConsumer/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    styledComponent.props.dispatch([Interaction.ACTIVE]);

    const styledComponentChanged = await waitForElement(() => {
      return component.getByTestId(styleConsumerTestId);
    });

    expect(styledComponentChanged.props.themedStyle).toMatchSnapshot();
  });

  it('provides correct styles on theme change', async () => {
    const StyleConsumer = styled(Test);

    const component = render(
      <ComplexStyleProvider
        mapping={mapping}
        theme={theme}
        styles={{}}
        themeInverse={themeInverse}>
        <StyleConsumer/>
      </ComplexStyleProvider>,
    );
    const styledComponent = component.getByTestId(styleConsumerTestId);

    expect(styledComponent.props.themedStyle).toMatchSnapshot();

    const touchableComponent = component.getByTestId(styleTouchableTestId);

    fireEvent.press(touchableComponent);

    const styledComponentChanged = await waitForElement(() => {
      return component.getByTestId(styleConsumerTestId);
    });

    expect(styledComponentChanged.props.themedStyle).toMatchSnapshot();
  });

});
