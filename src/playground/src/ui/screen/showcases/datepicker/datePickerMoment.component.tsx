/**
 * IMPORTANT: To use Moment make sure to install Moment Date Service
 * npm i @ui-kitten/moment
 */

import React from 'react';
import moment from 'moment';
import { Datepicker } from 'react-native-ui-kitten';
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
      <Datepicker
        date={this.state.date}
        dateService={this.dateService}
        onSelect={this.onSelect}
      />
    );
  }
}
