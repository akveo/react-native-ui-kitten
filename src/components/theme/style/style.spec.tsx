/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useState } from 'react';
import {
  TouchableOpacity,
  View,
  ViewProps,
  Text,
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

  @styled('Test')
  class Test extends React.Component<{ disabled?: boolean }> {

    static someStaticValueToCopy: string = 'Test';

    public render(): React.ReactElement<ViewProps> {
      return (
        <View {...this.props} testID='@style/consumer'/>
      );
    }
  }

  @styled(null)
  class NonStyledTest extends React.Component {

    public render(): React.ReactElement<ViewProps> {
      return (
        <View {...this.props} testID='@style/consumer'/>
      );
    }
  }

  const Provider = ({ children }) => {
    return (
      <StyleProvider styles={computedMapping} theme={theme}>
        {children}
      </StyleProvider>
    );
  };

  it('styled component should not re-renderer because of parent render', async () => {
    const rerenderButtonText = 'Rerender parent';
    const getRenderCountText = (elementType: string, count: number) => {
      return `${elementType}: render for ${count} ${count === 1 ? 'time' : 'times'}`;
    };

    @styled('Test')
    class ChildStyledComponent extends React.Component<any, any> {
      renderCount = 0;

      public render(): React.ReactElement<ViewProps> {
        this.renderCount++;
        return (
          <Text>{getRenderCountText('Child', this.renderCount)}</Text>
        );
      }
    }

    const ParentComponent = () => {
      const [renderCount, setRenderCount] = useState(1);
      return <View>
        <TouchableOpacity onPress={() => setRenderCount(renderCount + 1)}>
          <Text>{rerenderButtonText}</Text>
        </TouchableOpacity>
        <Text>{getRenderCountText('Parent', renderCount)}</Text>
        <ChildStyledComponent />
      </View>;
    };

    const renderedComponent: RenderAPI = render(<ParentComponent />, { wrapper: Provider});
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
      <StyleProvider styles={computedMapping} theme={theme}>
        <Test/>
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
      <StyleProvider styles={computedMapping} theme={theme}>
        <Test/>
      </StyleProvider>,
    );

    const withStateProp: RenderAPI = render(
      <StyleProvider styles={computedMapping} theme={theme}>
        <Test disabled={true}/>
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
      <StyleProvider styles={computedMapping} theme={theme}>
        <Test/>
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

    const component: RenderAPI = render(
      <ThemeChangingProvider
        styles={computedMapping}
        theme={theme}
        themeInverse={{
          ...theme,
          defaultColor: '#ffffff',
        }}>
        <Test/>
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
