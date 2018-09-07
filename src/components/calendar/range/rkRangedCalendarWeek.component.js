import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarService from '../services';
import { RkStyleSheet } from '../../../styles/styleSheet';

export class RkRangedCalendarWeek extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.func.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    selected: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    }),
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
    const week = {
      start: this.state.dates[0],
      end: this.state.dates[this.state.dates.length - 1],
    };
    const isWeekStartInRange = this.isDateInRange(week.start, range);
    const isWeekEndInRange = this.isDateInRange(week.end, range);
    const isRangeStartInWeek = this.isDateInRange(range.start, week);
    const isRangeEndInWeek = this.isDateInRange(range.end, week);
    return isWeekStartInRange || isWeekEndInRange || isRangeStartInWeek || isRangeEndInWeek;
  };

  isDateInRange = (date, range) => {
    // false as default is case when week starts/ends with null date

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

  getData = () => this.props.dates.filter(date => date !== RkCalendarService.Month.defaultBoundingFallback);

  getChildComponents = () => this.props.dates.map(this.renderDay);

  renderDay = (item) => {
    const DayComponent = this.props.dayComponent;
    return (
      <DayComponent
        min={this.props.min}
        max={this.props.max}
        date={item}
        selected={this.props.selected}
        filter={this.props.filter}
        renderContent={this.props.renderDay}
        onSelect={this.onDaySelect}
        size={this.props.daySize}
      />
    );
  };

  render = () => (
    <View style={styles.container}>{this.getChildComponents()}</View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
  },
}));

