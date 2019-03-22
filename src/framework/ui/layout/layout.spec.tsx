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
  Layout as LayoutComponent,
  Props as LayoutProps,
} from './layout.component';
import { default as styles } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const Layout = styled<LayoutProps>(LayoutComponent);

const Mock = (props?: LayoutProps): React.ReactElement<StyleProviderProps> => {
  return (
    <StyleProvider
      styles={styles}
      theme={theme}>
      <Layout {...props} />
    </StyleProvider>
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
