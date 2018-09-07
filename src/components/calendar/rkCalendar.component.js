import React from 'react';
import PropTypes from 'prop-types';
import { RkCalendarView } from './common/rkCalendarView.component';
import * as SelectionStrategy from './strategy';
import * as RkCalendarService from './services';

export class RkCalendar extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    boundingMonth: PropTypes.bool,
    filter: PropTypes.func,
    renderDay: PropTypes.func,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    type: 'base',
    boundingMonth: true,
    renderDay: undefined,
    filter: (() => true),
    onSelect: (() => null),
  };

  state = {
    selected: {
      start: RkCalendarService.Date.today(),
      end: undefined,
    },
    selectionStrategy: SelectionStrategy.Base,
  };

  constructor(props) {
    super(props);
    this.state.selectionStrategy = this.getSelectionStrategy(props.type);
  }

  onDaySelect = (date) => {
    const selectionState = this.state.selectionStrategy.getStateFromSelection(this.state, date);
    this.setState(selectionState);
    this.props.onSelect(date);
  };

  getSelectionStrategy = (type) => {
    switch (type) {
      case 'base': return SelectionStrategy.Base;
      case 'range': return SelectionStrategy.Range;
      default: return SelectionStrategy.Base;
    }
  };

  render = () => (
    <RkCalendarView
      selectionStrategy={this.getSelectionStrategy(this.props.type)}
      min={this.props.min}
      max={this.props.max}
      selected={this.state.selected}
      boundingMonth={this.props.boundingMonth}
      renderDay={this.props.renderDay}
      filter={this.props.filter}
      onSelect={this.onDaySelect}
    />
  );
}
