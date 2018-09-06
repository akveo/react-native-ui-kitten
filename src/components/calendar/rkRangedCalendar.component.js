import React from 'react';
import PropTypes from 'prop-types';
import { RkCalendarView } from './rkCalendarView.component';
import { RkRangedCalendarDay } from './range/rkRangedCalendarDay.component';
import { RkRangedCalendarMonth } from './range/rkRangedCalendarMonth.component';
import { RkRangedCalendarYear } from './range/rkRangedCalendarYear.component';
import * as RkCalendarUtil from './services';

export class RkRangedCalendar extends React.Component {
  static propTypes = {
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    boundingMonth: PropTypes.bool,
    renderDay: PropTypes.func,
    filter: PropTypes.func,
    /**
     * callback function describing selection date range changes,
     * which could not be handled by this component
     */
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    boundingMonth: true,
    renderDay: undefined,
    filter: (() => true),
    onSelect: (() => null),
  };

  state = {
    selected: {
      start: undefined,
      end: undefined,
    },
  };

  onDaySelect = (date) => {
    if (this.isSelectionStarted()) {
      this.selectEnd(date);
    } else {
      this.selectStart(date);
    }
  };

  isSelectionStarted() {
    const { start, end } = this.state.selected;
    return start && !end;
  }

  selectStart(start) {
    this.selectRange({ start });
  }

  selectEnd(date) {
    const { start } = this.state.selected;
    if (RkCalendarUtil.compareDates(date, start) > 0) {
      this.selectRange({ start, end: date });
    } else {
      this.selectRange({ start: date, end: start });
    }
  }

  selectRange(range) {
    this.setState({ selected: range });
    this.props.onSelect(range);
  }

  render = () => (
    <RkCalendarView
      dayComponent={RkRangedCalendarDay}
      monthComponent={RkRangedCalendarMonth}
      yearComponent={RkRangedCalendarYear}
      min={this.props.min}
      max={this.props.max}
      selected={this.state.selected}
      boundingMonth={this.props.boundingMonth}
      renderDay={this.props.renderDay}
      filter={this.props.filter}
      onSelect={this.onDaySelect}
    />
  );
}
