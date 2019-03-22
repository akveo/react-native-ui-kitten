import React from 'react';
import {
  render,
  RenderAPI,
  shallow,
} from 'react-native-testing-library';
import { Text } from 'react-native';
import {
  ApplicationProvider,
  Props as ApplicationProps,
} from './applicationProvider.component';
import { default as styles } from '../../common/mapping.json';
import { default as theme } from '../../common/theme.json';

describe('@app: application wrapper check', () => {

  const Mock = (props?: ApplicationProps): React.ReactElement<ApplicationProps> => {
    return (
      <ApplicationProvider {...props} />
    );
  };

  it('* renders properly', () => {
    const component: RenderAPI = render(
      <Mock
        styles={styles}
        theme={theme}>
        <Text>
          Test
        </Text>
      </Mock>,
    );

    const { output } = shallow(component.getByType(ApplicationProvider));

    expect(output).toMatchSnapshot();
  });

});
