import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  render,
  fireEvent,
  waitForElement,
  shallow,
  RenderAPI,
} from 'react-native-testing-library';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@rk-kit/theme';
import {
  Radio,
  Props,
} from './radio.component';
import * as config from './radio.spec.config';

const StyledComponent = styled<Radio, Props>(Radio);

const Mock = (props?: Props): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme}>
    <StyledComponent {...props} />
  </StyleProvider>
);

const renderComponent = (props?: Props): RenderAPI => render(<Mock {...props}/>);

describe('@radio: matches snapshot', () => {

  it('default', () => {
    const component = renderComponent();
    const { output } = shallow(component.getByType(Radio));

    expect(output).toMatchSnapshot();
  });

  it('checked', () => {
    const component = renderComponent({checked: true});
    const { output } = shallow(component.getByType(Radio));

    expect(output).toMatchSnapshot();
  });

  it('disabled', () => {
    const component = renderComponent({disabled: true});
    const { output } = shallow(component.getByType(Radio));

    expect(output).toMatchSnapshot();
  });

  it('checked disabled', () => {
    const component = renderComponent({checked: true, disabled: true});
    const { output } = shallow(component.getByType(Radio));

    expect(output).toMatchSnapshot();
  });

  it('active', async () => {
    const component = renderComponent();

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');

    const active = await waitForElement(() => component.getByType(Radio));
    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    const inactive = await waitForElement(() => component.getByType(Radio));
    const { output: inactiveOutput } = shallow(inactive);

    expect(activeOutput).toMatchSnapshot();
    expect(inactiveOutput).toMatchSnapshot('default');
  });

  it('active checked', async () => {
    const component = renderComponent({checked: true});

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');
    const active = await waitForElement(() => component.getByType(Radio));
    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    const inactive = await waitForElement(() => component.getByType(Radio));
    const { output: inactiveOutput } = shallow(inactive);

    expect(activeOutput).toMatchSnapshot();
    expect(inactiveOutput).toMatchSnapshot('checked');
  });

});

describe('@radio: component checks', () => {

  it('emits onChange', () => {
    const onChange = jest.fn();
    const component = renderComponent({ onChange: onChange });
    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onChange).toBeCalled();
  });

});
