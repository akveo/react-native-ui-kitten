import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../../styles/styleSheet';
import * as RkCalendarService from '../services';
import { RkRangedCalendarWeek } from './rkRangedCalendarWeek.component';

export class RkRangedCalendarMonth extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.func.isRequired,
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
    const month = {
      start: RkCalendarService.Date.getMonthStart(this.props.date),
      end: RkCalendarService.Date.getMonthEnd(this.props.date),
    };
    const isMonthStartInRange = this.isDateInRange(month.start, range);
    const isMonthEndInRange = this.isDateInRange(month.end, range);
    const isRangeStartInMonth = this.isDateInRange(range.start, month);
    const isRangeEndInMonth = this.isDateInRange(range.end, month);
    return isMonthStartInRange || isMonthEndInRange || isRangeStartInMonth || isRangeEndInMonth;
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

  getData = () => RkCalendarService.Month.createDaysGrid(this.props.date, this.props.boundingMonth);

  getChildComponents = () => this.state.dates.map(this.renderWeek);

  renderWeek = (item) => (
    <RkRangedCalendarWeek
      dayComponent={this.props.dayComponent}
      min={this.props.min}
      max={this.props.max}
      dates={item}
      selected={this.props.selected}
      renderDay={this.props.renderDay}
      filter={this.props.filter}
      onSelect={this.onDaySelect}
      daySize={this.props.daySize}
    />
  );

  render = () => (
    <View
      style={styles.container}>
      {this.getChildComponents()}
    </View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
  },
}));
