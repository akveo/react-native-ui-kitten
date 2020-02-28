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
import { StyleProvider } from './styleProvider.component';
import {
  styled,
  StyledComponentProps,
} from './styled';
import { StyleConsumerService } from './styleConsumer.service';
import {
  Interaction,
  StyleService,
} from './style.service';

const theme = {
  defaultColor: '#000000',
  disabledColor: '#646464',
  activeColor: '#3366FF',
  refValue: '$defaultColor',
  doubleRefValue: '$refValue',
};

const computedMapping = {
  Test: {
    meta: {
      scope: 'all',
      parameters: {
        width: {
          type: 'number',
        },
        height: {
          type: 'number',
        },
        backgroundColor: {
          type: 'string',
        },
      },
      appearances: {
        default: {
          default: true,
        },
      },
      variantGroups: {},
      states: {
        disabled: {
          default: false,
          priority: 0,
          scope: 'all',
        },
        active: {
          default: false,
          priority: 1,
          scope: 'all',
        },
      },
    },
    styles: {
      'default': {
        width: 4,
        height: 4,
        backgroundColor: 'defaultColor',
      },
      'default.disabled': {
        width: 4,
        height: 4,
        backgroundColor: 'disabledColor',
      },
      'default.active': {
        width: 4,
        height: 4,
        backgroundColor: 'activeColor',
      },
    },
  },
};

describe('@style: consumer service methods check', () => {

  const service: StyleConsumerService = new StyleConsumerService('Test', computedMapping);

  it('should create valid default props', () => {
    const value: StyledComponentProps = service.createDefaultProps();

    expect(value).toEqual({
      appearance: 'default',
    });
  });

  it('should create valid style prop', () => {
    const props: StyledComponentProps = service.createDefaultProps();
    const style = service.createStyleProp(props, computedMapping, theme, []);

    expect(style).toEqual({
      width: 4,
      height: 4,
      backgroundColor: theme.defaultColor,
    });
  });
});

describe('@style-service: service method checks', () => {

  it('should apply theme on mapping', () => {
    const mapping = {
      prop1: 'defaultColor',
      prop2: 'refValue',
      prop3: 'doubleRefValue',
    };

    const value = StyleService.createThemedEntry(mapping, theme);

    expect(value).toEqual({
      prop1: theme.defaultColor,
      prop2: theme.defaultColor,
      prop3: theme.defaultColor,
    });
  });

});

describe('@style: ui component checks', () => {

  const styleConsumerTestId = '@style/consumer';
  const styleTouchableTestId = '@style/touchable';

  class Test extends React.Component {
    static styledComponentName: string = 'Test';

    public render(): React.ReactElement<ViewProps> {
      return (
        <View {...this.props} testID='@style/consumer'/>
      );
    }
  }

  it('should returns null if there is no static `styledComponentName`', () => {

    const NonStyledComponent = () => null;

    const styledComponent = styled(NonStyledComponent);
    expect(styledComponent).toBeFalsy();
  });

  it('static methods are copied over', async () => {
    // @ts-ignore: test-case
    Test.staticMethod = function () {
    };
    const StyleConsumer = styled(Test);

    // @ts-ignore: test-case
    expect(StyleConsumer.staticMethod).not.toBeFalsy();
  });

  it('receives custom props', async () => {
    const StyleConsumer = styled(Test);

    const component: RenderAPI = render(
      <StyleProvider styles={computedMapping} theme={theme}>
        <StyleConsumer/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);

    expect(styledComponent.props.appearance).not.toBeFalsy();
    expect(styledComponent.props.eva.theme).not.toBeFalsy();
    expect(styledComponent.props.eva.style).not.toBeFalsy();
    expect(styledComponent.props.eva.dispatch).not.toBeFalsy();
  });

  it('default appearance styled properly', async () => {
    const StyleConsumer = styled<any>(Test);

    const component: RenderAPI = render(
      <StyleProvider styles={computedMapping} theme={theme}>
        <StyleConsumer/>
      </StyleProvider>,
    );

    const withStateProp: RenderAPI = render(
      <StyleProvider styles={computedMapping} theme={theme}>
        <StyleConsumer disabled={true}/>
      </StyleProvider>,
    );

    const styledComponent: ReactTestInstance = component.getByTestId(styleConsumerTestId);
    const withStateComponent: ReactTestInstance = withStateProp.getByTestId(styleConsumerTestId);

    expect(styledComponent.props.eva.style).toEqual({
      width: 4,
      height: 4,
      backgroundColor: theme.defaultColor,
    });

    expect(withStateComponent.props.eva.style).toEqual({
      width: 4,
      height: 4,
      backgroundColor: theme.disabledColor,
    });
  });

  it('dispatch action works properly', async () => {
    const StyleConsumer = styled(Test);

    const component: RenderAPI = render(
      <StyleProvider styles={computedMapping} theme={theme}>
        <StyleConsumer/>
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);
    styledComponent.props.eva.dispatch([Interaction.ACTIVE]);

    const styledComponentChanged = await waitForElement(() => {
      return component.getByTestId(styleConsumerTestId);
    });

    expect(styledComponentChanged.props.eva.style).toEqual({
      width: 4,
      height: 4,
      backgroundColor: theme.activeColor,
    });
  });

  it('provides correct styles on theme change', async () => {

    const ThemeChangingProvider = (props) => {
      const [currentTheme, setCurrentTheme] = React.useState(props.theme);

      return (
        <StyleProvider styles={props.styles} theme={currentTheme}>
          <TouchableOpacity
            testID={styleTouchableTestId}
            onPress={() => setCurrentTheme(props.themeInverse)}>
            {props.children}
          </TouchableOpacity>
        </StyleProvider>
      );
    };

    const StyleConsumer = styled(Test);

    const component: RenderAPI = render(
      <ThemeChangingProvider
        styles={computedMapping}
        theme={theme}
        themeInverse={{
          ...theme,
          defaultColor: '#ffffff',
        }}>
        <StyleConsumer/>
      </ThemeChangingProvider>,
    );

    const touchableComponent: ReactTestInstance = component.getByTestId(styleTouchableTestId);

    fireEvent.press(touchableComponent);

    const styledComponentChanged: ReactTestInstance = await waitForElement(() => {
      return component.getByTestId(styleConsumerTestId);
    });

    expect(styledComponentChanged.props.eva.style).toEqual({
      ...computedMapping.Test.styles.default,
      backgroundColor: '#ffffff',
    });
  });
});
