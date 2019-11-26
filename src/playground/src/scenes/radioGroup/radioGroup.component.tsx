import React from 'react';
import {
  RadioGroupElement,
  RadioGroupProps,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { RadioGroupShowcase } from './radioGroupShowcase.component';
import { radioGroupShowcase } from './type';

export const RadioGroupScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: RadioGroupProps): RadioGroupElement => (
    <RadioGroupShowcase {...props}/>
  );

  return (
    <ShowcaseContainer
      showcase={radioGroupShowcase}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};
