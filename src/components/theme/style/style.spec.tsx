import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
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
  StyleProviderProps,
} from './styleProvider.component';
import {
  styled,
  StyledComponentProps,
} from './styled';
import { StyleConsumerService } from './styleConsumer.service';
import {
  StyleService,
  Interaction,
} from './style.service';
import {
  ThemeService,
  ThemeType,
} from '../theme/theme.service';
import {
  styles,
  theme,
  themeInverse,
} from '../support/tests';

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


const json = (value: any): string => JSON.stringify(value);

describe('@style: consumer service methods check', () => {

  // @ts-ignore
  const service: StyleConsumerService = new StyleConsumerService('Radio', styles);

  describe('* style mapping', () => {

    const derivedProps: StyledComponentProps & any = {
      appearance: 'default',
      disabled: true,
    };

    it('creates valid default props', () => {
      const value: StyledComponentProps = service.createDefaultProps();

      expect(json(value)).toEqual(json({
        appearance: 'default',
        size: 'medium',
      }));
    });

    it('creates valid themedStyle prop', () => {
      const defaultProps: StyledComponentProps = service.createDefaultProps();

      const props: StyledComponentProps = {
        ...defaultProps,
        ...derivedProps,
      };

      // @ts-ignore
      const value: StyledComponentProps = service.withStyledProps(props, styles, theme, [Interaction.ACTIVE]);

      expect(value.themedStyle).toMatchSnapshot();
    });

  });

});

describe('@style-sheet: service checks', () => {

  it('finds theme value properly', async () => {
    const themeValue = ThemeService.getValue('gray-100', theme);
    const undefinedValue = ThemeService.getValue('undefined', theme);

    expect(themeValue).toEqual(theme['gray-100']);
    expect(undefinedValue).toBeUndefined();
  });

  it('finds referencing theme value properly', async () => {
    const themeValue = ThemeService.getValue('referencing', theme);

    expect(themeValue).toEqual(theme['gray-100']);
  });

  it('finds multiple referencing theme value properly', async () => {
    const themeValue = ThemeService.getValue('double-referencing', theme);

    expect(themeValue).toEqual(theme['gray-100']);
  });

  it('finds referencing theme value properly (initial reference)', async () => {
    const themeValue = ThemeService.getValue('referencing', theme);

    expect(themeValue).toEqual(theme['gray-100']);
  });

  it('* creates themedStyle property for mapping properly', () => {
    const mapping = {
      prop1: 'blue-primary',
      prop2: 'blue-dark',
      prop3: 'gray-primary',
      prop4: 42,
    };

    const value = StyleService.createThemedEntry(mapping as ViewStyle, theme);
    expect(value).toMatchSnapshot();
  });

});

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
