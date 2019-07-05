import React from 'react';
import {
  Calendar,
  CalendarElement,
  CalendarProps,
} from '@kitten/ui';

interface State {
  date: Date;
}

export class CalendarShowcase extends React.Component<CalendarProps<Date>, State> {

  public state: State = {
    date: this.props.date,
  };

  private onSelect = (date: Date) => {
    this.setState({ date });
  };

  public render(): CalendarElement<Date> {
    return (
      <Calendar
        {...this.props}
        date={this.state.date}
        onSelect={this.onSelect}
      />
    );
  }
}
