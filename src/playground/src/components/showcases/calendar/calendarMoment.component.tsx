/**
 * IMPORTANT: To use Moment make sure to install Moment Date Service
 * npm i @ui-kitten/moment
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import {
  Calendar,
  Layout,
} from 'react-native-ui-kitten';
import { MomentDateService } from '@ui-kitten/moment';

export class CalendarMomentShowcase extends React.Component {

  state = {
    date: moment(),
  };

  dateService = new MomentDateService();

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
