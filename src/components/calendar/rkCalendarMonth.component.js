import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../styles/styleSheet';
import * as RkCalendarUtil from './services';

export class RkCalendarMonthComponent extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.element.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date),
    boundingMonth: PropTypes.bool,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    selected: RkCalendarUtil.today(),
    boundingMonth: true,
    onSelect: (() => null),
  };

  state = {
    daySize: 0,
  };

  onDaySelect = (date) => {
    this.props.onSelect(date);
  };

  onLayout = (event) => {
    this.setState({
      daySize: event.nativeEvent.layout.width / RkCalendarUtil.DAYS_IN_WEEK,
    });
  };

  getData = () => RkCalendarUtil.createDaysGrid(this.props.date, this.props.boundingMonth);

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
        selected={this.props.selected}
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

const styles = RkStyleSheet.create(theme => ({
  container: {
    margin: 4,
    backgroundColor: theme.colors.overlay,
  },
  week: {
    flexDirection: 'row',
  },
}));
