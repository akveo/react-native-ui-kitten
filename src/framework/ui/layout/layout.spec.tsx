import React from 'react';
import {
  render,
  shallow,
  RenderAPI,
} from 'react-native-testing-library';
import {
  styled,
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import {
  Layout as LayoutComponent,
  Props as LayoutProps,
} from './layout.component';
import { default as mapping } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const Layout = styled<LayoutProps>(LayoutComponent);

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

    const { output } = shallow(component.getByType(LayoutComponent));

    expect(output).toMatchSnapshot();
  });

  it('with styles', () => {
    const component: RenderAPI = renderComponent({ style: { height: 300 } });

    const { output } = shallow(component.getByType(LayoutComponent));

    expect(output).toMatchSnapshot();
  });

});
