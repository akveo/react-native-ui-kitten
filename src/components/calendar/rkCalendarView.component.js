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
    onDaySelect: PropTypes.func.isRequired,
  };
  static defaultProps = {
    boundingMonth: true,
  };

  onDaySelect = () => {
    // TODO: perform selection
    this.props.onDaySelect();
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
        boundingMonth={this.props.boundingMonth}
        onDaySelect={this.onDaySelect}
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
