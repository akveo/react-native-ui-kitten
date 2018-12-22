import React from 'react';
import {
  render,
  fireEvent,
} from 'react-native-testing-library';
import {
  StyleProvider,
  APPEARANCE_DEFAULT,
} from '@rk-kit/theme';
import {
  mapping,
  theme,
} from './config';
import {
  Radio,
  RadioProps,
} from '../radio';

const componentTestId = '@radio/component';

class Mock extends React.Component<RadioProps> {

  static defaultProps: RadioProps = {
    checked: false,
    disabled: false,
    appearance: APPEARANCE_DEFAULT,
  };

  render() {
    return (
      <StyleProvider mapping={mapping} theme={theme}>
        <Radio
          testID={componentTestId}
          {...this.props}
        />
      </StyleProvider>
    );
  }
}

describe('@radio: component checks', () => {

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
