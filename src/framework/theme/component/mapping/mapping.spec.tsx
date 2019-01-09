import React from 'react';
import { View } from 'react-native';
import { ThemeMappingType } from 'eva';
import { render } from 'react-native-testing-library';
import { MappingContext } from './mappingContext';
import {
  MappingProvider,
  Props as MappingProviderProps,
} from './mappingProvider.component';

describe('@mapping: ui component checks', () => {

  const json = (object: any) => JSON.stringify(object);

  const Provider = (props: MappingProviderProps): React.ReactElement<MappingProviderProps> => (
    <MappingProvider {...props}/>
  );

  const withMapping = (Component: React.ComponentClass<any>): React.ReactElement<any> => (
    <MappingContext.Consumer>{(receivedValue: ThemeMappingType) => (
      <Component testID='@mapping/consumer' mapping={receivedValue}/>
    )}</MappingContext.Consumer>
  );

  interface Props {
    mapping: ThemeMappingType;
  }

  const Tree = (props: Props) => (
    <Provider mapping={props.mapping}>
      {withMapping(View)}
    </Provider>
  );

  describe('* consumer', () => {
    const mapping = {};

    it('receives mapping value', () => {

      const component = render(<Tree mapping={mapping}/>);
      const consumerComponent = component.getByTestId('@mapping/consumer');

      expect(json(consumerComponent.props.mapping)).toEqual(json(mapping));
    });

  });

});
