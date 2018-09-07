import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarService from '../services';
import { RkCalendarMonthHeader } from '../common/rkCalendarMonthHeader.component';

export class RkRangedCalendarYear extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.func.isRequired,
    monthComponent: PropTypes.func.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    }),
    boundingMonth: PropTypes.bool,
    renderDay: PropTypes.func,
    filter: PropTypes.func,
    /**
     * callback function describing selection date changes,
     * which could not be handled by this component
     */
    onSelect: PropTypes.func.isRequired,
    /**
     * day component style prop describing width and height of cell
     */
    daySize: PropTypes.number.isRequired,
  };
  static defaultProps = {
    boundingMonth: true,
    renderDay: undefined,
    filter: (() => true),
  };

  state = {
    dates: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      dates: this.getData(),
    };
  }

  shouldComponentUpdate(nextProps) {
    const isSizeChanged = nextProps.daySize !== this.props.daySize;
    const isWasInRange = this.isInRange(this.props.selected);
    const isWillInRange = this.isInRange(nextProps.selected);
    return isSizeChanged || isWasInRange || isWillInRange;
  }

  onDaySelect = (date) => {
    this.props.onSelect(date);
  };

  isInRange = (range) => {
    const year = {
      start: RkCalendarService.Date.getYearStart(this.props.date),
      end: RkCalendarService.Date.getYearEnd(this.props.date),
    };
    const isYearStartInRange = this.isDateInRange(year.start, range);
    const isYearEndInRange = this.isDateInRange(year.end, range);
    const isYearStartInMonth = this.isDateInRange(range.start, year);
    const isYearEndInMonth = this.isDateInRange(range.end, year);
    return isYearStartInRange || isYearEndInRange || isYearStartInMonth || isYearEndInMonth;
  };

  isDateInRange = (date, range) => {
    // false as default is case when month starts/ends with null date

    const isSelectionStart = range.start !== undefined;
    const isSelectionEnd = range.end !== undefined;
    if (isSelectionStart && !isSelectionEnd) {
      return RkCalendarService.Date.isSameDaySafe(date, range.start) || false;
    } else if (isSelectionStart && isSelectionEnd) {
      const isRangeStart = RkCalendarService.Date.isSameDaySafe(date, range.start) || false;
      const isRangeEnd = RkCalendarService.Date.isSameDaySafe(date, range.end) || false;
      const isBetweenRange = RkCalendarService.Date.isBetweenSafe(date, range.start, range.end) || false;
      return isRangeStart || isRangeEnd || isBetweenRange;
    }
    return false;
  };

  createMonthDateByIndex = (index) => new Date(
    this.props.date.getFullYear(),
    index,
    this.props.date.getDate(),
  );

  isInYear = (date) => RkCalendarService.Date.isSameYearSafe(date, this.props.date);

  getData = () => {
    if (this.isInYear(this.props.max)) {
      const firstMonthIndex = this.props.min.getMonth();
      const lastMonthIndex = this.props.max.getMonth();
      const isOneInRangeYear = this.isInYear(this.props.min, this.props.max);
      const itemCount = isOneInRangeYear ? (lastMonthIndex - firstMonthIndex) : lastMonthIndex;
      const produceBounds = (index) => (isOneInRangeYear ? index + firstMonthIndex : index);
      return RkCalendarService.Util.range(itemCount + 1, produceBounds).map(this.createMonthDateByIndex);
    }
    return RkCalendarService.Util.range(RkCalendarService.Date.MONTHS_IN_YEAR).map(this.createMonthDateByIndex);
  };

  getChildComponents = () => this.state.dates.map(this.renderMonth);

  renderMonth = (item) => {
    const MonthComponent = this.props.monthComponent;
    return (
      <View>
        <RkCalendarMonthHeader
          date={this.props.date}
          daySize={this.props.daySize}
        />
        <MonthComponent
          dayComponent={this.props.dayComponent}
          min={this.props.min}
          max={this.props.max}
          date={item}
          selected={this.props.selected}
          boundingMonth={this.props.boundingMonth}
          daySize={this.props.daySize}
          renderDay={this.props.renderDay}
          filter={this.props.filter}
          onSelect={this.onDaySelect}
        />
      </View>
    );
  };

  render = () => (
    <View style={styles.container}>{this.getChildComponents()}</View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
