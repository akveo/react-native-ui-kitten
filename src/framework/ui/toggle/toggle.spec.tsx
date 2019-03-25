import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  render,
  shallow,
  RenderAPI,
  fireEvent,
  waitForElement,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  styled,
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import {
  Toggle as ToggleComponent,
  Props,
} from './toggle.component';
import { default as mapping } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const Toggle = styled<Props>(ToggleComponent);

const Mock = (props?: Props): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <Toggle {...props} />
    </ApplicationProvider>
  );
};

const renderComponent = (props?: Props): RenderAPI => {
  return render(
    <Mock {...props}/>,
  );
};

describe('@toggle: matches snapshot', () => {

  it('default', () => {
    const component: RenderAPI = renderComponent();
    const { output } = shallow(component.getByType(ToggleComponent));

    expect(output).toMatchSnapshot();
  });

  it('checked', () => {
    const component: RenderAPI = renderComponent({ value: true });
    const { output } = shallow(component.getByType(ToggleComponent));

    expect(output).toMatchSnapshot();
  });

  it('disabled', () => {
    const component: RenderAPI = renderComponent({ disabled: true });
    const { output } = shallow(component.getByType(ToggleComponent));

    expect(output).toMatchSnapshot();
  });

  it('checked disabled', () => {
    const component: RenderAPI = renderComponent({
      value: true,
      disabled: true,
    });
    const { output } = shallow(component.getByType(ToggleComponent));

    expect(output).toMatchSnapshot();
  });

  it('active', async () => {
    const component: RenderAPI = renderComponent();

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');

    const active: ReactTestInstance = await waitForElement(() => {
      return component.getByType(ToggleComponent);
    });
    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    const inactive: ReactTestInstance = await waitForElement(() => {
      return component.getByType(ToggleComponent);
    });
    const { output: inactiveOutput } = shallow(inactive);

    expect(activeOutput).toMatchSnapshot();
    expect(inactiveOutput).toMatchSnapshot('default');
  });

  it('active checked', async () => {
    const component: RenderAPI = renderComponent({ value: true });

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');
    const active: ReactTestInstance = await waitForElement(() => {
      return component.getByType(ToggleComponent);
    });
    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    const inactive: ReactTestInstance = await waitForElement(() => {
      return component.getByType(ToggleComponent);
    });
    const { output: inactiveOutput } = shallow(inactive);

    expect(activeOutput).toMatchSnapshot();
    expect(inactiveOutput).toMatchSnapshot('checked');
  });

});

describe('@toggle: component checks', () => {

  it('emits onValueChange', () => {
    const onChange = jest.fn();

    const component: RenderAPI = renderComponent({ onValueChange: onChange });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onChange).toBeCalled();
  });

  it('checking of value direct', () => {
    let value: boolean = false;
    const onChangeValue = (changed: boolean) => {
      value = changed;
    };

    const component: RenderAPI = renderComponent({
      value: value,
      onValueChange: onChangeValue,
    });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(value).toBe(true);
  });

  it('checking of value reverse', () => {
    let value: boolean = true;
    const onChangeValue = (changed: boolean) => {
      value = changed;
    };

    const component: RenderAPI = renderComponent({
      value: value,
      onValueChange: onChangeValue,
    });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(value).toBe(false);
  });

});
