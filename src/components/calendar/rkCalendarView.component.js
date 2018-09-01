import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarUtil from './services';

export class RkCalendarView extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.element.isRequired,
    monthComponent: PropTypes.element.isRequired,
    yearComponent: PropTypes.element.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    boundingMonth: PropTypes.bool,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    boundingMonth: true,
    onSelect: (() => null),
  };

  state = {
    date: undefined,
  };

  onDaySelect = (date) => {
    this.setState({ date });
    this.props.onSelect(date);
  };

  getItemKey = (index) => `${index}`;

  createYearDateByIndex = (index) => new Date(
    this.props.min.getFullYear() + index,
    this.props.min.getMonth(),
    this.props.min.getDate(),
  );

  getData = () => {
    const itemCount = (this.props.max.getFullYear() - this.props.min.getFullYear()) + 1;
    return RkCalendarUtil.range(itemCount).map(this.createYearDateByIndex);
  };

  renderItem = ({ item }) => {
    const YearComponent = this.props.yearComponent;
    return (
      <YearComponent
        monthComponent={this.props.monthComponent}
        dayComponent={this.props.dayComponent}
        min={this.props.min}
        max={this.props.max}
        date={item}
        selected={this.state.date}
        boundingMonth={this.props.boundingMonth}
        onSelect={this.onDaySelect}
      />
    );
  };

  render = () => (
    <FlatList
      data={this.getData()}
      renderItem={this.renderItem}
      keyExtractor={this.getItemKey}
    />
  );
}
