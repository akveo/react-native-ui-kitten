import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {
  fireEvent,
  render,
  waitForElement,
} from 'react-native-testing-library';
import {
  styled,
  StyledComponentProps,
  StyleProvider,
  StyleProviderProps,
  ThemeType,
} from '../component';
import {
  StyleConsumerService,
  APPEARANCE_DEFAULT,
} from '../service';
import {
  mapping,
  theme,
  themeInverse,
} from './config';

describe('@style: service methods check', () => {

  const { Test: testMapping, Empty: emptyMapping } = mapping;
  const service: StyleConsumerService = new StyleConsumerService();

  it('retrieves variant prop keys properly', () => {
    const defaultAppearanceKeys = service.getVariantPropKeys(testMapping, {
      appearance: APPEARANCE_DEFAULT,
      checked: false,
      status: 'info',
      size: 'small',
    });
    const customAppearanceKeys = service.getVariantPropKeys(testMapping, {
      appearance: 'custom',
      checked: false,
      size: 'small',
    });
    const undefinedAppearanceKeys = service.getVariantPropKeys(testMapping, {
      appearance: 'undefined',
      checked: false,
      status: 'info',
    });
    const emptyAppearanceKeys = service.getVariantPropKeys(emptyMapping, {
      appearance: 'default',
      checked: false,
      status: 'info',
    });

    expect(defaultAppearanceKeys).toEqual(['info', 'small']);
    expect(customAppearanceKeys).toEqual(['small']);
    expect(undefinedAppearanceKeys).toEqual(['info']);
    expect(emptyAppearanceKeys).toEqual([]);
  });

});

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
    expect(styledComponent.props.requestStateStyle).not.toBeNull();
    expect(styledComponent.props.requestStateStyle).not.toBeUndefined();
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

  it('style request works properly', async () => {
    const StyleConsumer = styled(Test);

    const component = render(
      <StyleProvider mapping={mapping} theme={theme}>
        <StyleConsumer />
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    const stateStyle = styledComponent.props.requestStateStyle(['active']);
    const undefinedStateStyle = styledComponent.props.requestStateStyle('undefined');

    expect(json(stateStyle)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: theme.grayDark,
      selectColor: 'transparent',
    }));
    expect(json(undefinedStateStyle)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: theme.grayPrimary,
      selectColor: 'transparent',
    }));

    styledComponent.props.requestStateStyle([]);
    jest.spyOn(console, 'warn');
  });

  it('@style: provides correct styles on theme change', async () => {
    const StyleConsumer = styled(Test);

    const component = render(
      <ComplexStyleProvider
        mapping={mapping}
        theme={theme}
        themeInverse={themeInverse}>
        <StyleConsumer />
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
