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
  Layout,
  Props,
} from './layout.component';
import * as config from './layout.spec.config';

const StyledComponent = styled<Layout, Props>(Layout);

const Mock = (props?: Props): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <StyledComponent {...props} />
  </StyleProvider>
);

const renderComponent = (props?: Props): RenderAPI => render(<Mock {...props}/>);

describe('@layout: matches snapshot', () => {

  it('default', () => {
    const component = renderComponent();
    const { output } = shallow(component.getByType(Layout));

    expect(output).toMatchSnapshot();
  });

  it('with styles', () => {
    const component = renderComponent({ style: { height: 300 }});
    const { output } = shallow(component.getByType(Layout));

    expect(output).toMatchSnapshot();
  });

});
