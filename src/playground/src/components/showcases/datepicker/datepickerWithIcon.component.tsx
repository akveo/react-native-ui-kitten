/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Icon,
  Layout,
} from '@ui-kitten/components';

const CalendarIcon = (style) => (
  <Icon {...style} name='calendar'/>
);

export const DatepickerWithIconShowcase = () => {

  const [date, setDate] = React.useState(null);

  return (
    <Layout style={styles.container}>
      <Datepicker
        placeholder='Pick Date'
        date={date}
        onSelect={setDate}
        icon={CalendarIcon}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
});
