import React from 'react';
import {
  SelectElement,
  SelectProps,
} from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { SelectShowcase } from './selectShowcase.component';
import {
  selectSettings,
  selectShowcase,
} from './type';

export const SelectScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: SelectProps): SelectElement => (
    <SelectShowcase {...props}/>
  );

  return (
    <ShowcaseContainer
      showcase={selectShowcase}
      settings={selectSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};
