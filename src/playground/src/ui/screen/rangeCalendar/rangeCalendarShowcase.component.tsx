import React from 'react';
import {
  RangeCalendar,
  RangeCalendarProps,
  CalendarElement,
  CalendarRange,
} from '@kitten/ui';

interface State {
  range: CalendarRange<Date>;
}

type Props = RangeCalendarProps<Date>;

export class RangeCalendarShowcase extends React.Component<Props, State> {

  public state: State = {
    range: {
      startDate: null,
      endDate: null,
    },
  };

  private onSelect = (range: CalendarRange<Date>) => {
    this.setState({ range });
  };

  public render(): CalendarElement<Date> {
    return (
      <RangeCalendar
        {...this.props}
        range={this.state.range}
        onSelect={this.onSelect}
      />
    );
  }
}
