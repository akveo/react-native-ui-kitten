import React from 'react';
import {
  CheckBoxElement,
  CheckBoxProps,
} from 'react-native-ui-kitten';
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
