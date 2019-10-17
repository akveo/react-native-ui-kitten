import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Calendar,
  Layout,
  NativeDateService,
} from 'react-native-ui-kitten';

export class CalendarStartDayOfWeekShowcase extends React.Component {

  state = {
    date: new Date(),
  };

  dateService = new NativeDateService('en', { startDayOfWeek: 1 });

  onSelect = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Calendar
          date={this.state.date}
          dateService={this.dateService}
          onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    minHeight: 376,
  },
});
