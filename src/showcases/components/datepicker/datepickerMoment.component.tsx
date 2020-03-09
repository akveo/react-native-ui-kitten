/**
 * IMPORTANT: To use Moment make sure to install Moment Date Service
 * npm i @ui-kitten/moment
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar, Datepicker, Layout } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';

const dateService = new MomentDateService();

export const DatepickerMomentShowcase = () => {

  const [date, setDate] = React.useState(new Date());

  return (
    <Layout style={styles.container}>

      <Datepicker
        placeholder='Pick Date'
        date={date}
        dateService={dateService}
        onSelect={nextDate => setDate(nextDate)}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
});
