import React from 'react';
import {
  CheckBoxElement,
  CheckBoxProps,
} from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { CheckBoxShowcase } from './checkboxShowcase.component';
import {
  checkboxSettings,
  checkboxShowcase,
} from './type';

export const CheckBoxScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: CheckBoxProps): CheckBoxElement => (
    <CheckBoxShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={checkboxShowcase}
      settings={checkboxSettings}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};
