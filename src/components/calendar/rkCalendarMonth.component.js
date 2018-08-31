import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import * as CalendarUtil from './services';

export class RkCalendarMonthComponent extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.element.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    onDaySelect: PropTypes.func.isRequired,
  };

  state = {
    daySize: 0,
  };

  onDaySelect = () => {
    this.props.onDaySelect();
  };

  onLayout = (event) => {
    this.setState({
      daySize: event.nativeEvent.layout.width / CalendarUtil.DAYS_IN_WEEK,
    });
  };

  getData = () => CalendarUtil.createDaysGrid(this.props.date, false);

  getWeekChildComponents = (week) => week.map(this.renderDay);

  getChildComponents = () => this.getData().map(this.renderWeek);

  renderDay = (item) => {
    const DayComponent = this.props.dayComponent;
    return (
      <DayComponent
        style={{ width: this.state.daySize, height: this.state.daySize }}
        min={this.props.min}
        max={this.props.max}
        date={item}
        onSelect={this.onDaySelect}
      />
    );
  };

  renderWeek = (item) => (
    <View style={styles.week}>{this.getWeekChildComponents(item)}</View>
  );

  render = () => (
    <View
      style={styles.container}
      onLayout={this.onLayout}>
      {this.getChildComponents()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    backgroundColor: 'yellow',
  },
  week: {
    flexDirection: 'row',
  },
});
