import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Layout,
} from 'react-native-ui-kitten';

export class DatepickerFilterShowcase extends React.Component {

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
        <Datepicker
          date={this.state.date}
          filter={this.filter}
          onSelect={this.onSelect}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 400,
    padding: 16,
  },
});
