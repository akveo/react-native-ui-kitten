import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarUtil from '../services';
import { RkCalendarDaysNames } from '../rkCalendarDaysNames.component';
import { RkCalendarMonthHeader } from '../rkCalendarMonthHeader.component';

export class RkRangedCalendarYear extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.element.isRequired,
    monthComponent: PropTypes.element.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    }),
    boundingMonth: PropTypes.bool,
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
    const year = { start: RkCalendarUtil.getYearStart(this.props.date), end: RkCalendarUtil.getYearEnd(this.props.date) };
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
      return RkCalendarUtil.isSameDaySafe(date, range.start) || false;
    } else if (isSelectionStart && isSelectionEnd) {
      const isRangeStart = RkCalendarUtil.isSameDaySafe(date, range.start) || false;
      const isRangeEnd = RkCalendarUtil.isSameDaySafe(date, range.end) || false;
      const isBetweenRange = RkCalendarUtil.isBetweenSafe(date, range.start, range.end) || false;
      return isRangeStart || isRangeEnd || isBetweenRange;
    }
    return false;
  };

  createMonthDateByIndex = (index) => new Date(
    this.props.date.getFullYear(),
    index,
    this.props.date.getDate(),
  );

  isInYear = (date) => RkCalendarUtil.isSameYearSafe(date, this.props.date);

  getData = () => {
    if (this.isInYear(this.props.max)) {
      const firstMonthIndex = this.props.min.getMonth();
      const lastMonthIndex = this.props.max.getMonth();
      const isOneInRangeYear = this.isInYear(this.props.min, this.props.max);
      const itemCount = isOneInRangeYear ? (lastMonthIndex - firstMonthIndex) : lastMonthIndex;
      const produceBounds = (index) => (isOneInRangeYear ? index + firstMonthIndex : index);
      return RkCalendarUtil.range(itemCount + 1, produceBounds).map(this.createMonthDateByIndex);
    }
    return RkCalendarUtil.range(RkCalendarUtil.MONTHS_IN_YEAR).map(this.createMonthDateByIndex);
  };

  getChildComponents = () => this.state.dates.map(this.renderMonth);

  renderMonth = (item) => {
    const MonthComponent = this.props.monthComponent;
    return (
      <View>
        <RkCalendarDaysNames
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
