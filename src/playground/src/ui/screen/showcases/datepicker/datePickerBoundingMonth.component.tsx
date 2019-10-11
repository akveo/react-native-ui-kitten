import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Layout,
} from 'react-native-ui-kitten';

export class DatepickerBoundingMonthShowcase extends React.Component {

  state = {
    date: new Date(),
  };

  onSelect = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Datepicker
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
    minHeight: 400,
    padding: 16,
  },
});
