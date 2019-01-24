import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  render,
  fireEvent,
  RenderAPI,
} from 'react-native-testing-library';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import {
  CheckBox,
  Props,
} from './checkbox.component';
import * as config from './checkbox.spec.config';

const StyledComponent = styled<CheckBox, Props>(CheckBox);

const Mock = (props?: Props): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <StyledComponent {...props} />
  </StyleProvider>
);

const renderComponent = (props?: Props): RenderAPI => render(<Mock {...props}/>);

describe('@checkbox: component checks', () => {

  it('* emits onChange with correct args', () => {
    const onChange = jest.fn();
    const component = renderComponent({
      checked: true,
      onChange: onChange,
    });
    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onChange).toBeCalledWith(false);
  });

});
