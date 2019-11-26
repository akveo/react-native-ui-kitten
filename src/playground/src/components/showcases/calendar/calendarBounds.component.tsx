import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Calendar,
  Layout,
} from 'react-native-ui-kitten';

const now = new Date();

export class CalendarBoundsShowcase extends React.Component {

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
          min={new Date(now.getFullYear(), now.getMonth(), 15)}
          max={new Date(now.getFullYear(), now.getMonth() + 1, 15)}
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
