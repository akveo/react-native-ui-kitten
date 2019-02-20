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
} from '@kitten/theme';
import {
  Radio as RadioComponent,
  Props as RadioProps,
} from './radio.component';
import * as config from './radio.spec.config';
import { ReactTestInstance } from 'react-test-renderer';

const Radio = styled<RadioComponent, RadioProps>(RadioComponent);

const Mock = (props?: RadioProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <Radio {...props} />
  </StyleProvider>
);

const renderComponent = (props?: RadioProps): RenderAPI => {
  return render(
    <Mock {...props}/>,
  );
};

describe('@radio: matches snapshot', () => {

  it('default', () => {
    const component: RenderAPI = renderComponent();
    const { output } = shallow(component.getByType(RadioComponent));

    expect(output).toMatchSnapshot();
  });

  it('checked', () => {
    const component: RenderAPI = renderComponent({ checked: true });
    const { output } = shallow(component.getByType(RadioComponent));

    expect(output).toMatchSnapshot();
  });

  it('disabled', () => {
    const component: RenderAPI = renderComponent({ disabled: true });
    const { output } = shallow(component.getByType(RadioComponent));

    expect(output).toMatchSnapshot();
  });

  it('checked disabled', () => {
    const component: RenderAPI = renderComponent({
      checked: true,
      disabled: true,
    });
    const { output } = shallow(component.getByType(RadioComponent));

    expect(output).toMatchSnapshot();
  });

  it('active', async () => {
    const component: RenderAPI = renderComponent();

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');

    const active: ReactTestInstance = await waitForElement(() => {
      return component.getByType(RadioComponent);
    });
    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    const inactive: ReactTestInstance = await waitForElement(() => {
      return component.getByType(RadioComponent);
    });
    const { output: inactiveOutput } = shallow(inactive);

    expect(activeOutput).toMatchSnapshot();
    expect(inactiveOutput).toMatchSnapshot('default');
  });

  it('active checked', async () => {
    const component: RenderAPI = renderComponent({ checked: true });

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');

    const active: ReactTestInstance = await waitForElement(() => {
      return component.getByType(RadioComponent);
    });
    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    const inactive: ReactTestInstance = await waitForElement(() => {
      return component.getByType(RadioComponent);
    });
    const { output: inactiveOutput } = shallow(inactive);

    expect(activeOutput).toMatchSnapshot();
    expect(inactiveOutput).toMatchSnapshot('checked');
  });

});

describe('@radio: component checks', () => {

  it('* emits onChange with correct args', () => {
    const onChange = jest.fn();

    const component: RenderAPI = renderComponent({
      checked: false,
      onChange: onChange,
    });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onChange).toBeCalledWith(true);
  });

});
