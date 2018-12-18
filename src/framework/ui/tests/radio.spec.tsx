import React from 'react';
import {
  render,
  fireEvent,
} from 'react-native-testing-library';
import {
  StyleProvider,
  VARIANT_DEFAULT,
} from '@rk-kit/theme';
import {
  Mappings as mappings,
  Theme as theme,
} from './config';
import { Radio, RadioProps } from '@rk-kit/ui';

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
        <Radio
          testID={componentTestId}
          {...this.props}
        />
      </StyleProvider>
    );
  }
}

describe('@radio: component checks', () => {

  it('default variant renders properly', async () => {
    const component = render(
      <Mock />,
    );
    const radioComponent = component.getByTestId(componentTestId);
    expect(radioComponent).not.toBeNull();
    expect(radioComponent).not.toBeUndefined();
  });

  it('emits onChange', async () => {
    const onChange = jest.fn();
    const component = render(
      <Mock onChange={onChange}/>,
    );
    const radioTouchable = component.getByTestId('@radio/touchable');
    fireEvent.press(radioTouchable);

    expect(onChange).toBeCalled();
  });

});
