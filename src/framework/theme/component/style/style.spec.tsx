import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitForElement,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
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
import { default as styles } from '../../common/styles.json';
import { default as theme } from '../../common/theme.json';
import { default as themeInverse } from '../../common/themeInverse.json';

const styleConsumerTestId = '@style/consumer';
const styleTouchableTestId = '@style/touchable';

interface ThemeChangingProviderProps extends StyleProviderProps {
  themeInverse: ThemeType;
}

class ThemeChangingProvider extends React.Component<ThemeChangingProviderProps> {

  public state = {
    styles: this.props.styles,
    theme: this.props.theme,
  };

  private onTouchablePress = () => {
    this.setState({
      theme: this.props.themeInverse,
    });
  };

  public render(): React.ReactElement<ThemeChangingProviderProps> {
    return (
      <StyleProvider {...this.state}>
        <TouchableOpacity
          testID={styleTouchableTestId}
          onPress={this.onTouchablePress}>
          {this.props.children}
        </TouchableOpacity>
      </StyleProvider>
    );
  }
}

interface TestComponentProps extends StyledComponentProps, ViewProps {
  disabled?: boolean;
}

class Test extends React.Component<TestComponentProps> {
  static styledComponentName: string = 'Radio';

  static defaultProps: Partial<TestComponentProps> = {
    testID: styleConsumerTestId,
  };

  public render(): React.ReactElement<ViewProps> {
    return (
      <View testID={this.props.testID}/>
    );
  }
}

class NonStyledComponent extends React.Component<TestComponentProps> {
  public render(): React.ReactElement<ViewProps> {
    return undefined;
  }
}

describe('@style: ui component checks', () => {

  it('* returns null if has no static `styledComponentName` property', () => {
    const styledComponent = styled(NonStyledComponent);

    expect(styledComponent).toBeNull();
  });

  it('* static methods are copied over', async () => {
    // @ts-ignore: test-case
    Test.staticMethod = function () {
    };
    const StyleConsumer = styled<TestComponentProps>(Test);

    // @ts-ignore: test-case
    expect(StyleConsumer.staticMethod).not.toBeUndefined();
  });

  it('* receives custom props', async () => {
    const StyleConsumer = styled<TestComponentProps>(Test);

    const component: RenderAPI = render(
      <StyleProvider styles={styles} theme={theme}>
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

  it('* default appearance styled properly', async () => {
    const StyleConsumer = styled<TestComponentProps>(Test);

    const component: RenderAPI = render(
      <StyleProvider styles={styles} theme={theme}>
        <StyleConsumer/>
      </StyleProvider>,
    );

    const withStateProp: RenderAPI = render(
      <StyleProvider styles={styles} theme={theme}>
        <StyleConsumer disabled={true}/>
      </StyleProvider>,
    );

    const styledComponent: ReactTestInstance = component.getByTestId(styleConsumerTestId);
    const withAppearanceComponent: ReactTestInstance = withStateProp.getByTestId(styleConsumerTestId);

    expect(styledComponent.props.themedStyle).toMatchSnapshot();
    expect(withAppearanceComponent.props.themedStyle).toMatchSnapshot();
  });

  it('* dispatch action works properly', async () => {
    const StyleConsumer = styled<TestComponentProps>(Test);

    const component: RenderAPI = render(
      <StyleProvider styles={styles} theme={theme}>
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

  it('* provides correct styles on theme change', async () => {
    const StyleConsumer = styled<TestComponentProps>(Test);

    const component: RenderAPI = render(
      <ThemeChangingProvider
        styles={styles}
        theme={theme}
        themeInverse={themeInverse}>
        <StyleConsumer/>
      </ThemeChangingProvider>,
    );

    const styledComponent: ReactTestInstance = component.getByTestId(styleConsumerTestId);

    expect(styledComponent.props.themedStyle).toMatchSnapshot();

    const touchableComponent: ReactTestInstance = component.getByTestId(styleTouchableTestId);

    fireEvent.press(touchableComponent);

    const styledComponentChanged: ReactTestInstance = await waitForElement(() => {
      return component.getByTestId(styleConsumerTestId);
    });

    expect(styledComponentChanged.props.themedStyle).toMatchSnapshot();
  });

});
