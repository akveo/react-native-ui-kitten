import React from 'react';
import {
  render,
  fireEvent,
  waitForElement, debug,
} from 'react-native-testing-library';
import {
  StyleProvider,
  VARIANT_DEFAULT,
} from '@rk-kit/theme';
import {
  Radio,
  RadioProps,
} from '@rk-kit/ui';
import {
  Mappings as mappings,
  Theme as theme,
} from './config';
import { TouchableOpacity } from 'react-native';

const componentTestId = '@radio/component';

class Mock extends React.Component<RadioProps> {

  static defaultProps: RadioProps = {
    checked: false,
    disabled: false,
    variant: VARIANT_DEFAULT,
  };

  render() {
    return (
      <StyleProvider mapping={mappings} theme={theme}>
        <Radio {...this.props} />
      </StyleProvider>
    );
  }
}

describe('@radio: component checks', () => {

  it('default variant renders properly', async () => {
    const componentUnchecked = render(<Mock/>);
    const componentChecked = render(<Mock checked={true}/>);

    expect(componentUnchecked).toMatchSnapshot();
    expect(componentChecked).toMatchSnapshot();
  });

  it('is in active-* states when pressed in or pressed out', async () => {
    const componentUnchecked = render(<Mock/>);
    const componentChecked = render(<Mock checked={true}/>);

    const touchableUnchecked = componentChecked.getByName(TouchableOpacity.name);
    const touchableChecked = componentUnchecked.getByName(TouchableOpacity.name);

    debug.deep(componentUnchecked.toJSON(), 'default');

    fireEvent(touchableUnchecked, 'pressIn');
    await waitForElement(() => {
      debug.deep(componentUnchecked.toJSON(), 'pressin');
    });
    // TODO: expect element to match `active-unchecked` snapshot

    fireEvent(touchableUnchecked, 'pressOut');
    const radioDefault = await waitForElement(() => {
      return componentUnchecked.getByName(TouchableOpacity.name);
    });
    // TODO: expect element to match `default` snapshot

    fireEvent(touchableChecked, 'pressIn');
    const radioActiveChecked = await waitForElement(() => {
      return componentChecked.getByName(TouchableOpacity.name);
    });
    // TODO: expect element to match `active-checked` snapshot

    fireEvent(touchableChecked, 'pressOut');
    const radioChecked = await waitForElement(() => {
      return componentChecked.getByName(TouchableOpacity.name);
    });
    // TODO: expect element to match `checked` snapshot
  });

  it('is in disabled state', async () => {
    const componentUnchecked = render(<Mock disabled={true}/>);
    const componentChecked = render(<Mock checked={true} disabled={true}/>);

    const radioDisabledUnchecked = componentUnchecked.getByName(TouchableOpacity.name);
    // TODO: expect element to match `disabled-unchecked` snapshot

    const radioDisabledChecked = componentChecked.getByName(TouchableOpacity.name);
    // TODO: expect element to match `disabled-checked` snapshot
  });

  it('emits onChange', async () => {
    const onChangeMock = jest.fn();
    const component = render(<Mock onChange={onChangeMock}/>);

    const radioComponent = component.getByName(TouchableOpacity.name);

    fireEvent.press(radioComponent);

    expect(onChangeMock).toBeCalled();
  });

});

