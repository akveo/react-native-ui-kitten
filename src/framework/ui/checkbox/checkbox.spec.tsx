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
  CheckBox as CheckBoxComponent,
  Props as CheckBoxProps,
} from './checkbox.component';
import * as config from './checkbox.spec.config';

const CheckBox = styled<CheckBoxComponent, CheckBoxProps>(CheckBoxComponent);

const Mock = (props?: CheckBoxProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <CheckBox {...props} />
  </StyleProvider>
);

const renderComponent = (props?: CheckBoxProps): RenderAPI => render(<Mock {...props}/>);

describe('@checkbox: component checks', () => {

  it('* emits onChange with correct args', () => {
    const onChange = jest.fn();

    const component: RenderAPI = renderComponent({
      checked: true,
      onChange: onChange,
    });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onChange).toBeCalledWith(false);
  });

});
