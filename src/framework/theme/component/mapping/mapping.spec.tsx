import React from 'react';
import { View } from 'react-native';
import { render } from 'react-native-testing-library';
import {
  ThemeMappingType,
  ThemeStyleType,
} from 'eva/packages/types';
import {
  MappingContext,
  MappingContextValueType,
} from './mappingContext';
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
    <MappingContext.Consumer>{(receivedValue: MappingContextValueType) => (
      <Component
        testID='@mapping/consumer'
        mapping={receivedValue.mapping}
        styles={receivedValue.styles}/>
    )}</MappingContext.Consumer>
  );

  interface Props {
    mapping: ThemeMappingType;
    styles: any;
  }

  const Tree = (props: Props) => (
    <Provider mapping={props.mapping} styles={props.styles}>
      {withMapping(View)}
    </Provider>
  );

  describe('* consumer', () => {
    const mapping: ThemeMappingType = {};
    const styles: ThemeStyleType = {};

    it('receives mapping prop', () => {

      const component = render(<Tree mapping={mapping} styles={styles}/>);
      const consumerComponent = component.getByTestId('@mapping/consumer');

      expect(json(consumerComponent.props.mapping)).toEqual(json(mapping));
    });

    it('receives styles prop', () => {

      const component = render(<Tree mapping={mapping} styles={styles}/>);
      const consumerComponent = component.getByTestId('@mapping/consumer');

      expect(json(consumerComponent.props.styles)).toEqual(json(styles));
    });

  });

});
