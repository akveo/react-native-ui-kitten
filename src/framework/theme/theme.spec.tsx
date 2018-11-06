import React from 'react';
import {
  View,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  ThemeProvider,
  withTheme,
} from './component';

const touchableTestId = '@theme/touchable';
const consumerTestId = '@theme/consumer';

interface ProviderComponentProps extends ViewProps {
  onPress?: () => void;
}

class ProviderComponent extends React.Component<ProviderComponentProps> {
  themedComponentRef = undefined;

  constructor(props) {
    super(props);
    this.onThemedComponentPress = this.onThemedComponentPress.bind(this);
  }

  onThemedComponentPress() {
    this.themedComponentRef.setStyle({});
    this.props.onPress();
  }

  setThemedComponentRef(ref) {
    this.themedComponentRef = ref;
  }

  render() {
    const ThemedComponent = withTheme(ConsumerComponent);
    return (
      <ThemeProvider theme={{}}>
        <TouchableOpacity
          testID={touchableTestId}
          onPress={this.onThemedComponentPress}>
          <ThemedComponent
            testID={consumerTestId}
            ref={(ref) => this.setThemedComponentRef(ref)}
          />
        </TouchableOpacity>
      </ThemeProvider>
    );
  }
}

class ConsumerComponent extends React.Component<any> {
  setStyle(style: ViewStyle) {
    this.setState({ style });
  }

  render() {
    return (
      <View {...this.props}/>
    );
  }
}

it('Checks theme consumer renders properly', async () => {
  const component = render(
    <ProviderComponent/>,
  );
  const consumerComponent = component.getByTestId(consumerTestId);
  expect(consumerComponent).not.toBeNull();
});

it('Checks theme consumer receives theme prop', async () => {
  const component = render(
    <ProviderComponent/>,
  );
  const consumerComponent = component.getByTestId(consumerTestId);
  expect(consumerComponent.props.theme).not.toBeNull();
});

it(`Checks root component has consumers's ref`, async () => {
  const onPress = jest.fn();
  const component = render(
    <ProviderComponent onPress={onPress}/>,
  );
  const touchableComponent = component.getByTestId(touchableTestId);
  fireEvent.press(touchableComponent);
  expect(onPress).toHaveBeenCalled();
});

