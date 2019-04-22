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
    const component: RenderAPI = renderComponent({ checked: true });
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
      checked: true,
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
    const component: RenderAPI = renderComponent({ checked: true });

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

  it('emits onChange', () => {
    const onChange = jest.fn();

    const component: RenderAPI = renderComponent({ onChange: onChange });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onChange).toBeCalled();
  });

  it('checking of value direct', () => {
    let checked: boolean = false;
    const onChangeValue = (changed: boolean) => {
      checked = changed;
    };

    const component: RenderAPI = renderComponent({
      checked: checked,
      onChange: onChangeValue,
    });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(checked).toBe(true);
  });

  it('checking of value reverse', () => {
    let checked: boolean = true;
    const onChangeValue = (changed: boolean) => {
      checked = changed;
    };

    const component: RenderAPI = renderComponent({
      checked: checked,
      onChange: onChangeValue,
    });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(checked).toBe(false);
  });

});
