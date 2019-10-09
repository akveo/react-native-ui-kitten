// IMPORTANT: To use Moment make sure to install Moment Date Service
// npm i @ui-kitten/moment

import React from 'react';
import moment from 'moment';
import { Calendar } from 'react-native-ui-kitten';
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
      <Calendar
        date={this.state.date}
        dateService={this.dateService}
        onSelect={this.onSelect}
      />
    );
  }
}
