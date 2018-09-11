import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarService from '../services';
import { RkCalendarWeek } from './rkCalendarWeek.component';

export class RkCalendarMonth extends React.Component {
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
      dates: RkCalendarService.Month.createDaysGrid(this.props.date, this.props.boundingMonth),
    };
  }

  shouldComponentUpdate(nextProps) {
    const isSizeChanged = nextProps.daySize !== this.props.daySize;
    return isSizeChanged || nextProps.selectionStrategy.shouldUpdateMonth(this.props, nextProps);
  }

  getChildComponents = () => this.state.dates.map(this.renderWeek);

  renderWeek = (item, index) => (
    <RkCalendarWeek
      key={`${index}`}
      min={this.props.min}
      max={this.props.max}
      dates={item}
      selected={this.props.selected}
      renderDay={this.props.renderDay}
      filter={this.props.filter}
      onSelect={this.props.onSelect}
      selectionStrategy={this.props.selectionStrategy}
      daySize={this.props.daySize}
    />
  );

  render = () => (
    <View>{this.getChildComponents()}</View>
  );
}
