import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Datepicker,
  Layout,
  Text,
} from '@ui-kitten/components';

const DayCell = ({ date }, style) => (
  <View
    style={[styles.dayContainer, style.container]}>
    <Text style={style.text}>{`${date.getDate()}`}</Text>
    <Text style={[style.text, styles.value]}>
      {`${100 * date.getDate() + Math.pow(date.getDate(), 2)}$`}
    </Text>
  </View>
);

export const DatepickerCustomDayShowcase = () => {

  const [selectedDate, setSelectedDate] = React.useState(null);

  return (
    <Layout style={styles.container}>
      <Datepicker
        placeholder='Pick Date'
        date={selectedDate}
        onSelect={setSelectedDate}
        renderDay={DayCell}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
  },
});
