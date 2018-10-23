import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RkCalendarMonth } from './rkCalendarMonth.component';
import { RkCalendarMonthHeader } from '../common/rkCalendarMonthHeader.component';
import * as RkCalendarService from '../services';

export class RkCalendarYear extends React.Component {
  static propTypes = {
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
    onSelect: PropTypes.func.isRequired,
    selectionStrategy: PropTypes.shape({
      getStateFromSelection: PropTypes.func.isRequired,
      isDaySelected: PropTypes.func.isRequired,
      isDayHighlighted: PropTypes.func.isRequired,
      isDayDisabled: PropTypes.func.isRequired,
      isDayToday: PropTypes.func.isRequired,
      isDayEmpty: PropTypes.func.isRequired,
      shouldUpdateDay: PropTypes.func.isRequired,
      shouldUpdateWeek: PropTypes.func.isRequired,
      shouldUpdateMonth: PropTypes.func.isRequired,
      shouldUpdateYear: PropTypes.func.isRequired,
    }).isRequired,

    daySize: PropTypes.number.isRequired,
  };

  static defaultProps = {
    selected: undefined,
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
    return isSizeChanged || nextProps.selectionStrategy.shouldUpdateYear(this.props, nextProps);
  }

  createMonthDateByIndex = (index) => new Date(this.props.date.getFullYear(), index, 1);

  getData = () => {
    const isFirstYear = RkCalendarService.Date.isSameYear(this.props.date, this.props.min);
    const isLastYear = RkCalendarService.Date.isSameYear(this.props.date, this.props.max);
    if (isFirstYear && isLastYear) {
      const itemCount = this.props.max.getMonth() - this.props.min.getMonth();
      const produceItem = index => this.createMonthDateByIndex(index + this.props.min.getMonth());
      return RkCalendarService.Util.range(itemCount + 1, produceItem);
    }
    if (isFirstYear && !isLastYear) {
      const itemCount = RkCalendarService.Date.MONTHS_IN_YEAR - this.props.min.getMonth();
      const produceItem = index => this.createMonthDateByIndex(index + this.props.min.getMonth());
      return RkCalendarService.Util.range(itemCount, produceItem);
    }
    if (!isFirstYear && isLastYear) {
      const itemCount = this.props.max.getMonth();
      return RkCalendarService.Util.range(itemCount + 1, this.createMonthDateByIndex);
    }
    const itemCount = RkCalendarService.Date.MONTHS_IN_YEAR;
    return RkCalendarService.Util.range(itemCount, this.createMonthDateByIndex);
  };

  getChildComponents = () => this.state.dates.map(this.renderMonth);

  renderMonth = (item) => (
    <View key={`${item.getMonth()}`}>
      <RkCalendarMonthHeader date={item} daySize={this.props.daySize} />
      <RkCalendarMonth
        min={this.props.min}
        max={this.props.max}
        date={item}
        selected={this.props.selected}
        boundingMonth={this.props.boundingMonth}
        renderDay={this.props.renderDay}
        filter={this.props.filter}
        onSelect={this.props.onSelect}
        selectionStrategy={this.props.selectionStrategy}
        daySize={this.props.daySize}
      />
    </View>
  );

  render() {
    return (
      <View>{this.getChildComponents()}</View>
    );
  }
}
