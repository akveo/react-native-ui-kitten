import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarUtil from './services';

export class RkCalendarYearComponent extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.element.isRequired,
    monthComponent: PropTypes.element.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date).isRequired,
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
    const isWasSelected = this.isInYear(this.props.selected);
    const isWillSelected = this.isInYear(nextProps.selected);
    return isSizeChanged || isWasSelected || isWillSelected;
  }

  onDaySelect = (date) => {
    this.props.onSelect(date);
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
    );
  };

  render = () => (
    <View style={styles.container}>{this.getChildComponents()}</View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
