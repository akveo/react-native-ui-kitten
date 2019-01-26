import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  render,
  fireEvent,
} from 'react-native-testing-library';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import {
  RadioGroup as RadioGroupComponent,
  Props as RadioGroupProps,
} from './radioGroup.component';
import {
  Radio as RadioComponent,
  Props as RadioProps,
} from '../radio/radio.component';
import * as config from './radioGroup.spec.config';

const RadioGroup = styled<RadioGroupComponent, RadioGroupProps>(RadioGroupComponent);
const Radio = styled<RadioComponent, RadioProps>(RadioComponent);

const Mock = (props?: RadioGroupProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <RadioGroup {...props}/>
  </StyleProvider>
);

const ChildMock = Radio;

describe('@radioGroup: component checks', () => {

  const childTestId0: string = '@radio/child-0';
  const childTestId1: string = '@radio/child-1';

  it('* ignores child `checked` prop', () => {
    const component = render(
      <Mock>
        <ChildMock testID={childTestId0} checked={true}/>
      </Mock>,
    );

    const child = component.getByTestId(childTestId0);

    expect(child.props.checked).toEqual(false);
  });

  it('* ignores child `onChange` prop', () => {
    const onChangeChild = jest.fn();

    const component = render(
      <Mock>
        <ChildMock testID={childTestId0} onChange={onChangeChild}/>
      </Mock>,
    );

    const childTouchable = component.getByTestId(childTestId0).findByType(TouchableOpacity);
    fireEvent.press(childTouchable);

    expect(onChangeChild).not.toBeCalled();
  });

  it('* initial selection performed properly', () => {
    const component = render(
      <Mock selectedIndex={0}>
        <ChildMock testID={childTestId0} checked={false}/>
        <ChildMock testID={childTestId1} checked={true}/>
      </Mock>,
    );

    const child0 = component.getByTestId(childTestId0);
    const child1 = component.getByTestId(childTestId1);

    expect(child0.props.checked).toEqual(true);
    expect(child1.props.checked).toEqual(false);
  });

  it('* emits `onChange` with correct args', () => {
    const onChange = jest.fn();

    const component = render(
      <Mock onChange={onChange}>
        <ChildMock testID={childTestId0}/>
        <ChildMock testID={childTestId1}/>
      </Mock>,
    );

    const childTouchable = component.getByTestId(childTestId1).findByType(TouchableOpacity);
    fireEvent.press(childTouchable);

    expect(onChange).toBeCalledWith(1);
  });

});
