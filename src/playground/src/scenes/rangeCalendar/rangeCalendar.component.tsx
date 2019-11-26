import React from 'react';
import { StyleSheet } from 'react-native';
import { RangeCalendarProps } from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { RangeCalendarShowcase } from './rangeCalendarShowcase.component';
import { calendarShowcase } from './type';

export const RangeCalendarScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: RangeCalendarProps<Date>): React.ReactElement<RangeCalendarProps<Date>> => (
    <RangeCalendarShowcase
      style={styles.rangeCalendar}
      {...props}
    />
  );

  return (
    <ShowcaseContainer
      showcase={calendarShowcase}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}
    />
  );
};

const styles = StyleSheet.create({
  rangeCalendar: {
    flex: 1,
  },
});
