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
    onDaySelect: PropTypes.func.isRequired,
  };

  onDaySelect = () => {
    this.props.onDaySelect();
  };

  createMonthDateByIndex = (index) => new Date(
    this.props.date.getFullYear(),
    index,
    this.props.date.getDate(),
  );

  getData = () => {
    const isMaxYear = RkCalendarUtil.isSameYearSafe(this.props.date, this.props.max);
    const itemCount = isMaxYear ? this.props.max.getMonth() : 12;
    return RkCalendarUtil.range(itemCount).map(this.createMonthDateByIndex);
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
        onDaySelect={this.onDaySelect}
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
