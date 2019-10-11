import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  DatepickerProps,
} from 'react-native-ui-kitten';

interface State {
  date: Date;
}

export class DatepickerShowcase extends React.Component<DatepickerProps<Date>, State> {

  public state: State = {
    date: null,
  };

  private setDate = (date: Date): void => {
    this.setState({ date });
  };

  public render(): React.ReactNode {
    return (
      <Datepicker
        {...this.props}
        style={styles.datepicker}
        date={this.state.date}
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
