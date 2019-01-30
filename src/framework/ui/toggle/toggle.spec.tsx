import React from 'react';
import {
  render,
  shallow,
  RenderAPI,
  fireEvent,
  waitForElement,
} from 'react-native-testing-library';
import { TouchableOpacity } from 'react-native';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import {
  Toggle,
  Props,
} from './toggle.component';
import * as config from './toggle.spec.config';

const StyledComponent = styled<Toggle, Props>(Toggle);

const Mock = (props?: Props): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <StyledComponent {...props} />
  </StyleProvider>
);

const renderComponent = (props?: Props): RenderAPI => render(<Mock {...props}/>);

describe('@toggle: matches snapshot', () => {

  it('default', () => {
    const component = renderComponent();
    const { output } = shallow(component.getByType(Toggle));

    expect(output).toMatchSnapshot();
  });

  it('checked', () => {
    const component = renderComponent({ value: true });
    const { output } = shallow(component.getByType(Toggle));

    expect(output).toMatchSnapshot();
  });

  it('disabled', () => {
    const component = renderComponent({ disabled: true });
    const { output } = shallow(component.getByType(Toggle));

    expect(output).toMatchSnapshot();
  });

  it('checked disabled', () => {
    const component = renderComponent({ value: true, disabled: true });
    const { output } = shallow(component.getByType(Toggle));

    expect(output).toMatchSnapshot();
  });

  it('active', async () => {
    const component = renderComponent();

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');

    const active = await waitForElement(() => component.getByType(Toggle));
    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    const inactive = await waitForElement(() => component.getByType(Toggle));
    const { output: inactiveOutput } = shallow(inactive);

    expect(activeOutput).toMatchSnapshot();
    expect(inactiveOutput).toMatchSnapshot('default');
  });

  it('active checked', async () => {
    const component = renderComponent({ value: true });

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');
    const active = await waitForElement(() => component.getByType(Toggle));
    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    const inactive = await waitForElement(() => component.getByType(Toggle));
    const { output: inactiveOutput } = shallow(inactive);

    expect(activeOutput).toMatchSnapshot();
    expect(inactiveOutput).toMatchSnapshot('checked');
  });

});

describe('@toggle: component checks', () => {

  it('emits onValueChange', () => {
    const onChange = jest.fn();
    const component = renderComponent({ onValueChange: onChange });
    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onChange).toBeCalled();
  });

  it('checking of value direct', () => {
    let value: boolean = false;
    const onChangeValue = (changed: boolean) => value = changed;
    const component = renderComponent({ value: value, onValueChange: onChangeValue });
    fireEvent.press(component.getByType(TouchableOpacity));
    expect(value).toBe(true);
  });

  it('checking of value reverse', () => {
    let value: boolean = true;
    const onChangeValue = (changed: boolean) => value = changed;
    const component = renderComponent({ value: value, onValueChange: onChangeValue });
    fireEvent.press(component.getByType(TouchableOpacity));
    expect(value).toBe(false);
  });

});
