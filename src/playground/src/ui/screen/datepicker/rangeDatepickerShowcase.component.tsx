import React from 'react';
import { StyleSheet } from 'react-native';
import {
  RangeDatepicker,
  CalendarRange,
  RangeDatepickerElement,
} from 'react-native-ui-kitten';

interface State {
  range: CalendarRange<Date>;
}

export class RangeDatepickerShowcase extends React.Component<{}, State> {

  public state: State = {
    range: {
      startDate: null,
      endDate: null,
    },
  };

  private setDate = (range: CalendarRange<Date>): void => {
    this.setState({ range });
  };

  public render(): RangeDatepickerElement {
    return (
      <RangeDatepicker
        {...this.props}
        style={styles.datepicker}
        range={this.state.range}
        onSelect={this.setDate}
      />
    );
  }
}

const styles = StyleSheet.create({
  datepicker: {
    marginBottom: 20,
  },
});
