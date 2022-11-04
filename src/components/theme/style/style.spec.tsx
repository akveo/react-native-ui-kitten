/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
  ViewProps,
  Text,
  GestureResponderEvent,
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
  useStyleSheet,
} from './style.service';
import { ThemeStyleType } from '@eva-design/dss';
import { ThemeType } from '@ui-kitten/components';

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

  @styled('Test')
  class Test extends React.Component<{ disabled?: boolean }> {

    static someStaticValueToCopy = 'Test';

    public render(): React.ReactElement<ViewProps> {
      return (
        <View
          {...this.props}
          testID={styleConsumerTestId}
        />
      );
    }
  }

  const Provider = ({ children }: { children: React.ReactNode }): React.ReactElement => {
    return (
      <StyleProvider
        styles={computedMapping}
        theme={theme}
      >
        {children}
      </StyleProvider>
    );
  };

  it('styled component should not re-renderer because of parent render', async () => {
    const rerenderButtonText = 'Rerender parent';
    const getRenderCountText = (elementType: string, count: number): string => {
      return `${elementType}: render for ${count} ${count === 1 ? 'time' : 'times'}`;
    };

    // eslint-disable-next-line react/no-multi-comp
    @styled('Test')
    class ChildStyledComponent extends React.Component {
      renderCount = 0;

      public render(): React.ReactElement<ViewProps> {
        this.renderCount++;
        return (
          <Text>
            {getRenderCountText('Child', this.renderCount)}
          </Text>
        );
      }
    }

    const ParentComponent = (): React.ReactElement => {
      const [renderCount, setRenderCount] = React.useState(1);
      return (
        <View>
          <TouchableOpacity onPress={() => setRenderCount(renderCount + 1)}>
            <Text>
              {rerenderButtonText}
            </Text>
          </TouchableOpacity>
          <Text>
            {getRenderCountText('Parent', renderCount)}
          </Text>
          <ChildStyledComponent />
        </View>
      );
    };

    const renderedComponent: RenderAPI = render(<ParentComponent />, { wrapper: Provider });
    fireEvent.press(renderedComponent.getByText(rerenderButtonText));
    fireEvent.press(renderedComponent.getByText(rerenderButtonText));

    expect(renderedComponent.queryByText(getRenderCountText('Parent', 3))).toBeTruthy();
    expect(renderedComponent.queryByText(getRenderCountText('Child', 1))).toBeTruthy();
  });

  it('static methods are copied over', async () => {
    expect(Test.someStaticValueToCopy).not.toBeFalsy();
  });

  it('receives custom props', async () => {
    const component: RenderAPI = render(
      <StyleProvider
        styles={computedMapping}
        theme={theme}
      >
        <Test />
      </StyleProvider>,
    );

    const styledComponent = component.getByTestId(styleConsumerTestId);

    expect(styledComponent.props.appearance).not.toBeFalsy();
    expect(styledComponent.props.eva.theme).not.toBeFalsy();
    expect(styledComponent.props.eva.style).not.toBeFalsy();
    expect(styledComponent.props.eva.dispatch).not.toBeFalsy();
  });

  it('default appearance styled properly', async () => {
    const component: RenderAPI = render(
      <StyleProvider
        styles={computedMapping}
        theme={theme}
      >
        <Test />
      </StyleProvider>,
    );

    const withStateProp: RenderAPI = render(
      <StyleProvider
        styles={computedMapping}
        theme={theme}
      >
        <Test disabled={true} />
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
    const component: RenderAPI = render(
      <StyleProvider
        styles={computedMapping}
        theme={theme}
      >
        <Test />
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
    interface IThemeChangingProvider {
      styles: ThemeStyleType;
      theme: ThemeType;
      themeInverse: ThemeType;
      children: React.ReactNode;
    }

    const ThemeChangingProvider = (props: IThemeChangingProvider): React.ReactElement => {
      const [currentTheme, setCurrentTheme] = React.useState(props.theme);

      return (
        <StyleProvider
          styles={props.styles}
          theme={currentTheme}
        >
          <TouchableOpacity
            testID={styleTouchableTestId}
            onPress={() => setCurrentTheme(props.themeInverse)}
          >
            {props.children}
          </TouchableOpacity>
        </StyleProvider>
      );
    };

    const component: RenderAPI = render(
      <ThemeChangingProvider
        styles={computedMapping}
        theme={theme}
        themeInverse={{
          ...theme,
          defaultColor: '#ffffff',
        }}
      >
        <Test />
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

describe('@useStyleSheet: rendering performance check', () => {
  const styleTouchableTestId = '@style/touchable';

  interface IThemeChangingProvider {
    styles: ThemeStyleType;
    theme: ThemeType;
    onPress: (event: GestureResponderEvent) => void;
    value: string | number;
  }

  const ThemeChangingProvider = (props: IThemeChangingProvider): React.ReactElement => {
    return (
      <StyleProvider
        styles={props.styles}
        theme={theme}
      >
        <TouchableOpacity
          testID={styleTouchableTestId}
          onPress={props.onPress}
        >
          <Text style={{ color: theme.defaultColor }}>
            {`${props.value}`}
          </Text>
        </TouchableOpacity>
      </StyleProvider>
    );
  };

  it('useStyleSheet should not be called with every render', async () => {
    const stylesFuncMock = jest.fn();

    const Component = (): React.ReactElement => {
      const [state, setState] = React.useState(0);
      const styles = useStyleSheet({});

      React.useEffect(() => {
        stylesFuncMock();
      }, [styles]);

      return (
        <ThemeChangingProvider
          styles={computedMapping}
          theme={theme}
          onPress={() => setState(state + 1)}
          value={theme.defaultColor}
        />
      );
    };

    const component = render(<Component />);
    fireEvent.press(component.getByTestId(styleTouchableTestId));
    expect(stylesFuncMock).toBeCalledTimes(1);
  });

  it('useStyleSheet should not be called with every render when memoized', async () => {
    const stylesFuncMock = jest.fn();

    const Component = (): React.ReactElement => {
      const [state, setState] = React.useState(0);
      const styles = useStyleSheet({});

      const memoizeValue = React.useMemo(() => {
        stylesFuncMock();
        return theme;
      }, [styles]);

      const changeState = React.useCallback(() => {
        setState(state + 1);
      }, [state, memoizeValue]);

      return (
        <ThemeChangingProvider
          styles={computedMapping}
          theme={theme}
          onPress={changeState}
          value={theme.defaultColor}
        />
      );
    };

    const component = render(<Component />);
    expect(stylesFuncMock).toBeCalledTimes(1);
    fireEvent.press(component.getByTestId(styleTouchableTestId));
    expect(stylesFuncMock).toBeCalledTimes(1);
  });
});
