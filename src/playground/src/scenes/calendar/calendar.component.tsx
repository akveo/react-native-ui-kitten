import React from 'react';
import { CalendarProps } from '@ui-kitten/components';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { CalendarShowcase } from './calendarShowcase.component';
import { calendarShowcase } from './type';

export const CalendarScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: CalendarProps): React.ReactElement<CalendarProps> => (
    <CalendarShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      showcase={calendarShowcase}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};
