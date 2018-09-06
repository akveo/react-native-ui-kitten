import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../../styles/styleSheet';
import * as RkCalendarUtil from '../services';
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
    const month = { start: RkCalendarUtil.getMonthStart(this.props.date), end: RkCalendarUtil.getMonthEnd(this.props.date) };
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
      return RkCalendarUtil.isSameDaySafe(date, range.start) || false;
    } else if (isSelectionStart && isSelectionEnd) {
      const isRangeStart = RkCalendarUtil.isSameDaySafe(date, range.start) || false;
      const isRangeEnd = RkCalendarUtil.isSameDaySafe(date, range.end) || false;
      const isBetweenRange = RkCalendarUtil.isBetweenSafe(date, range.start, range.end) || false;
      return isRangeStart || isRangeEnd || isBetweenRange;
    }
    return false;
  };

  getData = () => RkCalendarUtil.createDaysGrid(this.props.date, this.props.boundingMonth);

  getChildComponents = () => this.state.dates.map(this.renderWeek);

  renderWeek = (item) => (
    <RkRangedCalendarWeek
      dayComponent={this.props.dayComponent}
      min={this.props.min}
      max={this.props.max}
      dates={item}
      selected={this.props.selected}
      daySize={this.props.daySize}
      onSelect={this.onDaySelect}
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
