import React from 'react';
import { Calendar } from 'react-native-ui-kitten';

export class CalendarSimpleUsageShowcase extends React.Component {

  state = {
    date: new Date(),
  };

  onSelect = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <Calendar
        date={this.state.date}
        onSelect={this.onSelect}
      />
    );
  }
}
