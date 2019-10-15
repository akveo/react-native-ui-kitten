import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Calendar,
  Layout,
} from 'react-native-ui-kitten';

export class CalendarBoundingMonthShowcase extends React.Component {

  state = {
    date: new Date(),
  };

  onSelect = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Calendar
          date={this.state.date}
          boundingMonth={false}
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
