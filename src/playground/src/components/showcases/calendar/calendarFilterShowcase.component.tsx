import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Calendar,
  Layout,
} from 'react-native-ui-kitten';

export class CalendarFilterShowcase extends React.Component {

  state = {
    date: new Date(),
  };

  onSelect = (date) => {
    this.setState({ date });
  };

  filter = (date) => {
    return date.getDay() !== 0 && date.getDay() !== 6;
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Calendar
          date={this.state.date}
          onSelect={this.onSelect}
          filter={this.filter}
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
