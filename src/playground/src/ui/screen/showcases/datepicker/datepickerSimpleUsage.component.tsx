import React from 'react';
import { Datepicker } from 'react-native-ui-kitten';

export class DatepickerSimpleUsageShowcase extends React.Component {

  state = {
    date: new Date(),
  };

  onSelect = (date) => {
    this.setState({ date });
  };

  render() {
    return (
      <Datepicker
        date={this.state.date}
        onSelect={this.onSelect}
      />
    );
  }
}
