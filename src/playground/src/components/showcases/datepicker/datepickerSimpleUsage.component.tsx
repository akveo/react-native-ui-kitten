import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Layout,
  Text,
} from '@ui-kitten/components';

export const DatepickerSimpleUsageShowcase = () => {

  const [date, setDate] = React.useState(new Date());

  return (
    <Layout style={styles.container}>

      <Text
        style={styles.text}
        category='h6'>
        {`Selected date: ${date.toLocaleDateString()}`}
      </Text>

      <Datepicker
        date={date}
        onSelect={setDate}
      />

    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
  text: {
    marginVertical: 8,
  },
});
