import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Calendar,
  Layout,
} from 'react-native-ui-kitten';

export class CalendarSimpleUsageShowcase extends React.Component {

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
