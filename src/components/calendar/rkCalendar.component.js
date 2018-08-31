import React from 'react';
import PropTypes from 'prop-types';
import { RkCalendarView } from './rkCalendarView.component';
import { RkCalendarMonthComponent } from './rkCalendarMonth.component';
import { RkCalendarYearComponent } from './rkCalendarYear.component';
import { RkCalendarDayComponent } from './rkCalendarDay.component';

export class RkCalendar extends React.Component {
  static propTypes = {
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    onDaySelect: PropTypes.func,
  };
  static defaultProps = {
    onDaySelect: (() => null),
  };

  onDaySelect = () => {
    this.props.onDaySelect();
  };

  render = () => (
    <RkCalendarView
      dayComponent={RkCalendarDayComponent}
      monthComponent={RkCalendarMonthComponent}
      yearComponent={RkCalendarYearComponent}
      min={this.props.min}
      max={this.props.max}
      onDaySelect={this.onDaySelect}
    />
  );
}
