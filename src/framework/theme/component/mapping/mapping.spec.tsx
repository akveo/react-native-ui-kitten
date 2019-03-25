import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  render,
  RenderAPI,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import { ThemeStyleType } from 'eva/packages/types';
import { MappingContext } from './mappingContext';
import {
  MappingProvider,
  Props as MappingProviderProps,
} from './mappingProvider.component';
import { default as styles } from '../../common/styles.json';

describe('@mapping: ui component checks', () => {

  const json = (object: any): string => JSON.stringify(object);

  const Provider = (props: MappingProviderProps): React.ReactElement<MappingProviderProps> => {
    return (
      <MappingProvider {...props}/>
    );
  };

  const Consumer = (): React.ReactElement<ViewProps> => {
    return withMapping(View);
  };

  const withMapping = (Component: React.ComponentClass<any>): React.ReactElement<any> => {
    return (
      <MappingContext.Consumer>{(style: ThemeStyleType) => (
        <Component
          testID='@mapping/consumer'
          styles={style}
        />
      )}</MappingContext.Consumer>
    );
  };

  const Tree = (props: MappingProviderProps): React.ReactElement<MappingProviderProps> => {
    return (
      <Provider {...props}>
        <Consumer/>
      </Provider>
    );
  };

  describe('* consumer', () => {
    it('receives styles prop', () => {
      const component: RenderAPI = render(
        <Tree styles={styles}/>,
      );

      const consumerComponent: ReactTestInstance = component.getByTestId('@mapping/consumer');

      expect(json(consumerComponent.props.styles)).toEqual(json(styles));
    });

  });

});
