import React from 'react';
import { RangeCalendar } from 'react-native-ui-kitten';

export class RangeCalendarSimpleUsageShowcase extends React.Component {

  state = {
    range: {
      startDate: null,
      endDate: null,
    },
  };

  onSelect = (range) => {
    this.setState({ range });
  };

  render() {
    return (
      <RangeCalendar
        range={this.state.range}
        onSelect={this.onSelect}
      />
    );
  }
}
