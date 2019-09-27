import React from 'react';
import { StyleSheet } from 'react-native';
import {
  RangeDatepicker,
  DatepickerProps,
  CalendarRange,
} from '@kitten/ui';

interface State {
  range: CalendarRange<Date>;
}

export class RangeDatepickerShowcase extends React.Component<DatepickerProps<Date>, State> {

  public state: State = {
    range: {
      startDate: null,
      endDate: null,
    },
  };

  private setDate = (range: CalendarRange<Date>): void => {
    this.setState({ range });
  };

  public render(): React.ReactNode {
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
