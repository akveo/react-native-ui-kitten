/**
 * IMPORTANT: To use Moment make sure to install Moment Date Service
 * npm i @ui-kitten/moment
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import {
  Datepicker,
  Layout,
} from 'react-native-ui-kitten';
import { MomentDateService } from '@ui-kitten/moment';

export class DatepickerMomentShowcase extends React.Component {

  dateService = new MomentDateService();

  state = {
    date: moment(),
  };

  onSelect = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Datepicker
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
    minHeight: 400,
    padding: 16,
  },
});
