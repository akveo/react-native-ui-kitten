import React from 'react';
import { StyleSheet } from 'react-native';
import { CalendarProps } from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { CalendarShowcase } from './calendarShowcase.component';
import { calendarShowcase } from './type';

export const CalendarScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: CalendarProps<Date>): React.ReactElement<CalendarProps<Date>> => (
    <CalendarShowcase
      style={styles.calendar}
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
  calendar: {
    flex: 1,
  },
});
