import React from 'react';
import PropTypes from 'prop-types';
import { RkCalendarView } from './rkCalendarView.component';
import { RkCalendarMonthComponent } from './rkCalendarMonth.component';
import { RkCalendarYearComponent } from './rkCalendarYear.component';
import { RkCalendarDayComponent } from './rkCalendarDay.component';
import * as RkCalendarUtil from './services';

export class RkCalendar extends React.Component {
  static propTypes = {
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    boundingMonth: PropTypes.bool,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    boundingMonth: true,
    onSelect: (() => null),
  };

  onDaySelect = (date) => {
    this.props.onSelect(date);
  };

  render = () => (
    <RkCalendarView
      dayComponent={RkCalendarDayComponent}
      monthComponent={RkCalendarMonthComponent}
      yearComponent={RkCalendarYearComponent}
      min={this.props.min}
      max={this.props.max}
      boundingMonth={this.props.boundingMonth}
      onSelect={this.onDaySelect}
    />
  );
}
