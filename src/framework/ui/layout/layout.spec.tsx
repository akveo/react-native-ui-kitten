import React from 'react';
import {
  render,
  shallow,
  RenderAPI,
} from 'react-native-testing-library';
import {
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import {
  Layout,
  LayoutProps,
} from './layout.component';
import {
  mapping,
  theme,
} from '../support/tests';

const Mock = (props?: LayoutProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <Layout {...props} />
    </ApplicationProvider>
  );
};

const renderComponent = (props?: LayoutProps): RenderAPI => {
  return render(
    <Mock {...props}/>,
  );
};

describe('@layout: matches snapshot', () => {

  it('default', () => {
    const component: RenderAPI = renderComponent();

    const { output } = shallow(component.getByType(Layout));

    expect(output).toMatchSnapshot();
  });

  it('with styles', () => {
    const component: RenderAPI = renderComponent({ style: { height: 300 } });

    const { output } = shallow(component.getByType(Layout));

    expect(output).toMatchSnapshot();
  });

});
