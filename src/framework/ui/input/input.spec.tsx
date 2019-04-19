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
import { ReactTestInstance } from 'react-test-renderer';
import {
  styled,
  ApplicationProvider,
  ApplicationProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  Input as InputComponent,
  Props as InputProps,
} from './input.component';
import { default as mapping } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const Input = styled<InputProps>(InputComponent);

const Mock = (props?: InputProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <Input {...props}/>
    </ApplicationProvider>
  );
};

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

    const iconSource: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

    it('* icon', () => {
      const icon = (style: StyleType): React.ReactElement<ImageProps> => {
        return (
          <Image
            style={style}
            source={iconSource}
          />
        );
      };

      const component: RenderAPI = renderComponent({ icon });

      const { output } = shallow(component.getByType(InputComponent));

      expect(output).toMatchSnapshot();
    });

    it('* label + caption', () => {
      const captionIcon = (style: StyleType): React.ReactElement<ImageProps> => {
        return (
          <Image
            style={style}
            source={iconSource}
          />
        );
      };
      const label: string = 'Label';
      const caption: string = 'Caption Text';

      const component: RenderAPI = renderComponent({
        label,
        caption,
        captionIcon,
      });

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

    const component: RenderAPI = renderComponent({ onChangeText });

    fireEvent.changeText(component.getByType(TextInput), 'it works!');

    expect(onChangeText).toBeCalledWith('it works!');
  });

  it('* emits onFocus', () => {
    const onFocus = jest.fn();

    const component: RenderAPI = renderComponent({ onFocus });

    fireEvent(component.getByType(TextInput), 'focus');

    expect(onFocus).toBeCalled();
  });

  it('* emits onEndEditing', () => {
    const onEndEditing = jest.fn();

    const component: RenderAPI = renderComponent({ onEndEditing });

    fireEvent(component.getByType(TextInput), 'endEditing');

    expect(onEndEditing).toBeCalled();
  });

  it('* changes text', () => {
    const component: RenderAPI = render(
      <InputListener/>,
    );

    const input: ReactTestInstance = component.getByType(TextInput);

    fireEvent.changeText(input, 'it works!');

    const updatedInput: ReactTestInstance = component.getByType(TextInput);

    expect(updatedInput.props.value).toEqual('it works!');
  });

});
