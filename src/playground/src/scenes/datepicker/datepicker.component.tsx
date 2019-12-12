import React from 'react';
import { DatepickerProps } from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { DatepickerShowcase } from './datepickerShowcase.component';
import { datepickerShowcase } from './type';

export const DatepickerScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: DatepickerProps): React.ReactElement<DatepickerProps> => (
    <DatepickerShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={datepickerShowcase}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};
