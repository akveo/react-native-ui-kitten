import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  TextInput,
} from 'react-native';
import {
  render,
  fireEvent,
  shallow,
  RenderAPI,
} from 'react-native-testing-library';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  Input as InputComponent,
  Props as InputProps,
} from './input.component';
import * as config from './input.spec.config';
import { ReactTestInstance } from 'react-test-renderer';

const Input = styled<InputComponent, InputProps>(InputComponent);

const Mock = (props?: InputProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <Input style={{}} {...props} />
  </StyleProvider>
);

const renderComponent = (props?: InputProps): RenderAPI => {
  return render(
    <Mock {...props} />,
  );
};

describe('@input: matches snapshot', () => {

  describe('* interaction', () => {

    it('* stateless', () => {
      const component: RenderAPI = renderComponent();
      const { output } = shallow(component.getByType(InputComponent));

      expect(output).toMatchSnapshot();
    });

  });

  describe('* appearance', () => {

    const icon: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

    it('* icon', () => {
      const iconElement = (style: StyleType): React.ReactElement<ImageProps> => {
        return (
          <Image style={style} source={icon}/>
        );
      };
      const component: RenderAPI = renderComponent({ icon: iconElement });
      const { output } = shallow(component.getByType(InputComponent));

      expect(output).toMatchSnapshot();
    });

  });

});

interface InputListenerState {
  text: string;
}

class InputListener extends React.Component<InputProps, InputListenerState> {

  public state: InputListenerState = {
    text: '',
  };

  private onChangeText = (text: string) => {
    this.setState({ text });
  };

  public render(): React.ReactNode {
    return (
      <Mock
        {...this.props}
        value={this.state.text}
        onChangeText={this.onChangeText}
      />
    );
  }
}

describe('@input: component checks', () => {

  it('* emits onChangeText', () => {
    const onChangeText = jest.fn();

    const component: RenderAPI = renderComponent({
      onChangeText: onChangeText,
    });

    fireEvent.changeText(component.getByType(TextInput), 'it works!');

    expect(onChangeText).toBeCalledWith('it works!');
  });

  it('* emits onFocus', () => {
    const onFocus = jest.fn();

    const component: RenderAPI = renderComponent({
      onFocus: onFocus,
    });

    fireEvent(component.getByType(TextInput), 'focus');

    expect(onFocus).toBeCalled();
  });

  it('* emits onEndEditing', () => {
    const onEndEditing = jest.fn();

    const component: RenderAPI = renderComponent({
      onEndEditing: onEndEditing,
    });

    fireEvent(component.getByType(TextInput), 'endEditing');

    expect(onEndEditing).toBeCalled();
  });

  it('* changes text', () => {
    const component: RenderAPI = render(<InputListener/>);
    const input: ReactTestInstance = component.getByType(TextInput);

    fireEvent.changeText(input, 'it works!');

    const updatedInput: ReactTestInstance = component.getByType(TextInput);

    expect(updatedInput.props.value).toEqual('it works!');
  });

});
