import React from 'react';
import { RangeDatepicker } from 'react-native-ui-kitten';

export class RangeDatepickerSimpleUsageShowcase extends React.Component {

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
      <RangeDatepicker
        range={this.state.range}
        onSelect={this.onSelect}
      />
    );
  }
}
