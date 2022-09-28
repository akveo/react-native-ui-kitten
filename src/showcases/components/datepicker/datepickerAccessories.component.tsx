import React from 'react';
import { StyleSheet } from 'react-native';
import { Datepicker, Icon, IconElement, Layout } from '@ui-kitten/components';

const CalendarIcon = (props): IconElement => (
  <Icon
    {...props}
    name='calendar'
  />
);

export const DatepickerAccessoriesShowcase = (): React.ReactElement => {

  const [date, setDate] = React.useState(new Date());

  return (
    <Layout
      style={styles.container}
      level='1'
    >

      <Datepicker
        label='Label'
        caption='Caption'
        placeholder='Pick Date'
        date={date}
        onSelect={nextDate => setDate(nextDate)}
        accessoryRight={CalendarIcon}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 360,
  },
});
