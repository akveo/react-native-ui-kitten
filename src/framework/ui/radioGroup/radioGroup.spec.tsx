import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  render,
  fireEvent,
  RenderAPI,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  styled,
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import {
  RadioGroup as RadioGroupComponent,
  Props as RadioGroupProps,
} from './radioGroup.component';
import {
  Radio as RadioComponent,
  Props as RadioProps,
} from '../radio/radio.component';
import { default as mapping } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const RadioGroup = styled<RadioGroupProps>(RadioGroupComponent);
const Radio = styled<RadioProps>(RadioComponent);

const Mock = (props?: RadioGroupProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <RadioGroup {...props}/>
    </ApplicationProvider>
  );
};

const ChildMock = Radio;

describe('@radioGroup: component checks', () => {

  const childTestId0: string = '@radio/child-0';
  const childTestId1: string = '@radio/child-1';

  it('* ignores child `checked` prop', () => {
    const component: RenderAPI = render(
      <Mock>
        <ChildMock
          testID={childTestId0}
          checked={true}
        />
      </Mock>,
    );

    const child: ReactTestInstance = component.getByTestId(childTestId0);

    expect(child.props.checked).toEqual(false);
  });

  it('* ignores child `onChange` prop', () => {
    const onChangeChild = jest.fn();

    const component: RenderAPI = render(
      <Mock>
        <ChildMock
          testID={childTestId0}
          onChange={onChangeChild}
        />
      </Mock>,
    );

    const radio: ReactTestInstance = component.getByTestId(childTestId0);
    const touchable: ReactTestInstance = radio.findByType(TouchableOpacity);

    fireEvent.press(touchable);

    expect(onChangeChild).not.toBeCalled();
  });

  it('* initial selection performed properly', () => {
    const component: RenderAPI = render(
      <Mock selectedIndex={0}>
        <ChildMock
          testID={childTestId0}
          checked={false}
        />
        <ChildMock
          testID={childTestId1}
          checked={true}
        />
      </Mock>,
    );

    const child0: ReactTestInstance = component.getByTestId(childTestId0);
    const child1: ReactTestInstance = component.getByTestId(childTestId1);

    expect(child0.props.checked).toEqual(true);
    expect(child1.props.checked).toEqual(false);
  });

  it('* emits `onChange` with correct args', () => {
    const onChange = jest.fn();

    const component: RenderAPI = render(
      <Mock onChange={onChange}>
        <ChildMock testID={childTestId0}/>
        <ChildMock testID={childTestId1}/>
      </Mock>,
    );

    const radio: ReactTestInstance = component.getByTestId(childTestId1);
    const touchable: ReactTestInstance = radio.findByType(TouchableOpacity);

    fireEvent.press(touchable);

    expect(onChange).toBeCalledWith(1);
  });

});
