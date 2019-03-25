import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  render,
  fireEvent,
  RenderAPI,
} from 'react-native-testing-library';
import {
  styled,
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import {
  CheckBox as CheckBoxComponent,
  Props as CheckBoxProps,
} from './checkbox.component';
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
