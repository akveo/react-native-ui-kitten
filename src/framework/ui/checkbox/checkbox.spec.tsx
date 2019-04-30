import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  render,
  fireEvent,
  RenderAPI,
  shallow,
  waitForElement,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  styled,
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import {
  CheckBox as CheckBoxComponent,
  Props as CheckBoxProps,
} from './checkbox.component';
import { Text as TextComponent } from '../text/text.component';
import { default as mapping } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const CheckBox = styled<CheckBoxProps>(CheckBoxComponent);

const Mock = (props?: CheckBoxProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <CheckBox {...props} />
    </ApplicationProvider>
  );
};

const renderComponent = (props?: CheckBoxProps): RenderAPI => {
  return render(
    <Mock {...props}/>,
  );
};

describe('@checkbox matches snapshots', () => {

  it('* default', () => {
    const component: RenderAPI = renderComponent();
    const { output } = shallow(component.getByType(CheckBoxComponent));

    expect(output).toMatchSnapshot();
  });

  it('* checked.disabled', () => {
    const component: RenderAPI = renderComponent({
      checked: true,
      disabled: true,
    });
    const { output } = shallow(component.getByType(CheckBoxComponent));

    expect(output).toMatchSnapshot();
  });

  it('* active', async () => {
    const component: RenderAPI = renderComponent();

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');

    const active: ReactTestInstance = await waitForElement(() => {
      return component.getByType(CheckBoxComponent);
    });
    const { output: activeOutput } = shallow(active);

    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    const inactive: ReactTestInstance = await waitForElement(() => {
      return component.getByType(CheckBoxComponent);
    });
    const { output: inactiveOutput } = shallow(inactive);

    expect(activeOutput).toMatchSnapshot();
    expect(inactiveOutput).toMatchSnapshot('default');
  });

  it('* with text', () => {
    const text: string = 'Text';
    const component: RenderAPI = renderComponent({
      checked: true,
      text: text,
      textStyle: { fontSize: 18, color: 'red' },
    });
    const { output } = shallow(component.getByType(CheckBoxComponent));
    expect(component.getByType(TextComponent).props.children).toBe(text);
    expect(output).toMatchSnapshot();
  });

});

describe('@checkbox: component checks', () => {

  it('* emits onChange with correct args', () => {
    const onChange = jest.fn();

    const component: RenderAPI = renderComponent({
      checked: true,
      onChange: onChange,
    });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onChange).toBeCalledWith(false, false);
  });

  it('* touchable other props', () => {
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    const component: RenderAPI = renderComponent({
      onPressIn: onPressIn,
      onPressOut: onPressOut,
    });

    fireEvent(component.getByType(TouchableOpacity), 'pressIn');
    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    expect(onPressIn).toHaveBeenCalled();
    expect(onPressOut).toHaveBeenCalled();
  });

});
