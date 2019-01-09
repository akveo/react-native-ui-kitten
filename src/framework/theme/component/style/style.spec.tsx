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
import { APPEARANCE_DEFAULT } from 'eva/rk-kit/src/service/mapping/mapping.service';
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

  const json = (object: any) => JSON.stringify(object);

  interface ComplexStyleProviderProps {
    themeInverse: ThemeType;
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
        theme: this.props.themeInverse,
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
      <StyleProvider mapping={mapping} theme={theme}>
        <StyleConsumer appearance={APPEARANCE_DEFAULT}/>
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
      <StyleProvider mapping={mapping} theme={theme}>
        <StyleConsumer/>
      </StyleProvider>,
    );
    const withAppearance = render(
      <StyleProvider mapping={mapping} theme={theme}>
        <StyleConsumer status='success'/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    const withAppearanceComponent = withAppearance.getByTestId(styleConsumerTestId);

    expect(json(styledComponent.props.themedStyle)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: theme.grayPrimary,
      selectColor: 'transparent',
    }));
    expect(json(withAppearanceComponent.props.themedStyle)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: theme.grayPrimary,
      selectColor: 'transparent',
    }));
  });

  it('dispatch action works properly', async () => {
    const StyleConsumer = styled(Test);

    const component = render(
      <StyleProvider mapping={mapping} theme={theme}>
        <StyleConsumer/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    styledComponent.props.dispatch([Interaction.ACTIVE]);

    const styledComponentChanged = await waitForElement(() => {
      return component.getByTestId(styleConsumerTestId);
    });

    expect(json(styledComponentChanged.props.themedStyle)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: theme.grayDark,
      selectColor: 'transparent',
    }));
  });

  it('provides correct styles on theme change', async () => {
    const StyleConsumer = styled(Test);

    const component = render(
      <ComplexStyleProvider
        mapping={mapping}
        theme={theme}
        themeInverse={themeInverse}>
        <StyleConsumer/>
      </ComplexStyleProvider>,
    );
    const styledComponent = component.getByTestId(styleConsumerTestId);

    expect(json(styledComponent.props.themedStyle)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: theme.grayPrimary,
      selectColor: 'transparent',
    }));

    const touchableComponent = component.getByTestId(styleTouchableTestId);

    fireEvent.press(touchableComponent);

    const styledComponentChanged = await waitForElement(() => {
      return component.getByTestId(styleConsumerTestId);
    });

    expect(json(styledComponentChanged.props.themedStyle)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: themeInverse.grayPrimary,
      selectColor: 'transparent',
    }));
  });

});
