import React from 'react';
import { RangeCalendarProps } from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { RangeCalendarShowcase } from './rangeCalendarShowcase.component';
import { calendarShowcase } from './type';

export const RangeCalendarScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: RangeCalendarProps): React.ReactElement<RangeCalendarProps> => (
    <RangeCalendarShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={calendarShowcase}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};
