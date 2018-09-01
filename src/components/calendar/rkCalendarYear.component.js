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
    selected: PropTypes.instanceOf(Date),
    boundingMonth: PropTypes.bool,
    onSelect: PropTypes.func.isRequired,
  };
  static defaultProps = {
    selected: RkCalendarUtil.today(),
    boundingMonth: true,
    onSelect: (() => null),
  };

  onDaySelect = (date) => {
    this.props.onSelect(date);
  };

  createMonthDateByIndex = (index) => new Date(
    this.props.date.getFullYear(),
    index,
    this.props.date.getDate(),
  );

  getData = () => {
    const isMaxYear = RkCalendarUtil.isSameYearSafe(this.props.date, this.props.max);
    if (isMaxYear) {
      const firstMonthIndex = this.props.min.getMonth();
      const lastMonthIndex = this.props.max.getMonth();
      const isOneInRangeYear = RkCalendarUtil.isSameYearSafe(this.props.min, this.props.max);
      const itemCount = isOneInRangeYear ? (lastMonthIndex - firstMonthIndex) : lastMonthIndex;
      const produceBounds = (index) => (isOneInRangeYear ? index + firstMonthIndex : index);
      return RkCalendarUtil.range(itemCount + 1, produceBounds).map(this.createMonthDateByIndex);
    }
    return RkCalendarUtil.range(RkCalendarUtil.MONTHS_IN_YEAR).map(this.createMonthDateByIndex);
  };

  getChildComponents = () => this.getData().map(this.renderMonth);

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
