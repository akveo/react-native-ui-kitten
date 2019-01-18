import React from 'react';
import {
  render,
  shallow,
  RenderAPI,
} from 'react-native-testing-library';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import {
  Toggle,
  ToggleProps,
} from './toggle.component';
import * as config from './toggle.spec.config';

const StyledComponent = styled<Toggle, ToggleProps>(Toggle);

const Mock = (props?: ToggleProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <StyledComponent {...props} />
  </StyleProvider>
);

const renderComponent = (props?: ToggleProps): RenderAPI => render(<Mock {...props}/>);

describe('@toggle: matches snapshot', () => {

  it('default', () => {
    const component = renderComponent();
    const { output } = shallow(component.getByType(Toggle));

    expect(output).toMatchSnapshot();
  });

  it('checked', () => {
    const component = renderComponent({ value: true });
    const { output } = shallow(component.getByType(Toggle));

    expect(output).toMatchSnapshot();
  });

  it('disabled', () => {
    const component = renderComponent({ disabled: true });
    const { output } = shallow(component.getByType(Toggle));

    expect(output).toMatchSnapshot();
  });

  it('checked disabled', () => {
    const component = renderComponent({ value: true, disabled: true });
    const { output } = shallow(component.getByType(Toggle));

    expect(output).toMatchSnapshot();
  });

});
