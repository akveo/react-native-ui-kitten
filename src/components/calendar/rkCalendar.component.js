import React from 'react';
import PropTypes from 'prop-types';
import { RkCalendarView } from './common/rkCalendarView.component';
import * as SelectionStrategy from './strategy';
import * as RkCalendarService from './services';

const defaultScrollParams = {
  animated: true,
};

/**
 * `RkCalendar` is a component which allows user to select date or date range.
 *
 * @extends React.Component
 *
 * @example Simple usage example:
 *
 * Simple usage allows user to select one day. This way of using means using component
 * with `type='base'` prop provided.
 *
 * ```
 * <RkCalendar
 *   min={new Date(2018, 0, 1)}
 *   max={new Date(2019, 0, 1)}
 * />
 * ```
 *
 * @example Ranged selection example:
 *
 * Ranged calendar allows user to select date range.
 *
 * ```
 * <RkCalendar
 *   type='range'
 *   min={new Date(2018, 0, 1)}
 *   max={new Date(2019, 0, 1)}
 * />
 * ```
 *
 * @example Handling component events:
 *
 * ```
 * <RkCalendar
 *   min={new Date(2018, 0, 1)}
 *   max={new Date(2019, 0, 1)}
 *   onSelect={this.onDateSelect}
 * />
 *
 * // Date select:
 * //
 * // @param date - object, defining selection:
 * // {
 * //   selected: {
 * //     start: Date,
 * //     end: Date,
 * //   },
 * // }
 * //
 * // For ranged selection calendar, end prop is always undefined.
 * //
 * onDateSelect = (date) => {
 *   // whatever
 * };
 *
 * @property {string} type - Type of date selection. Available types: 'base' and 'range'.
 * Default is 'base'
 * @property {Date} min - Minimum date in calendar available for selection. Required
 * @property {Date} max - Maximum date in calendar available for selection. Required
 * @property {bool} boundingMonth - defines if we should render previous and next months
 * in the current month view. Default is true.
 * @property {function} filter - Predicate that decides which cells will be disabled
 * @property {function} renderDay - Custom render day cell function
 * @property {function} onSelect - Fired when date or date range is selected
 * */
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

  containerRef = undefined;

  constructor(props) {
    super(props);
    this.state.selectionStrategy = this.getSelectionStrategy(props.type);
  }

  setContainerRef = (ref) => {
    this.containerRef = ref;
  };

  onContainerLayoutCompleted = () => {
    const today = RkCalendarService.Date.today();
    const monthNumberTillToday = RkCalendarService.Date.getMonthDiff(this.props.min, today);
    const scrollToToday = () => { this.scrollToDate(today, { animated: false }); };

    if (monthNumberTillToday > RkCalendarService.Date.MONTHS_IN_YEAR) {
      setTimeout(scrollToToday, 100);
    } else {
      scrollToToday();
    }
  };

  /**
   * Scrolls to passed month index
   *
   * @param {object} params - should contain index property
   * and additional scroll parameters (optional)
   */
  scrollToIndex(params) {
    this.containerRef.scrollToIndex(params);
  }

  /**
   * Scrolls to passed offset
   *
   * @param {object} params - additional scroll parameters (optional)
   */
  scrollToOffset(params) {
    this.containerRef.scrollToOffset(params);
  }

  /**
   * Scrolls to month containing passed date
   *
   * @param {Date} date - date to scroll to
   * @param {object} params - additional scroll parameters (optional)
   */
  scrollToDate(date, params = defaultScrollParams) {
    this.containerRef.scrollToDate(date, params);
  }

  /**
   * Scrolls to month containing current date
   *
   * @param {object} params - additional scroll parameters (optional)
   */
  scrollToToday(params = defaultScrollParams) {
    this.containerRef.scrollToDate(RkCalendarService.Date.today(), params);
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
      ref={this.setContainerRef}
      selectionStrategy={this.getSelectionStrategy(this.props.type)}
      min={this.props.min}
      max={this.props.max}
      selected={this.state.selected}
      boundingMonth={this.props.boundingMonth}
      renderDay={this.props.renderDay}
      filter={this.props.filter}
      onSelect={this.onDaySelect}
      onLayoutCompleted={this.onContainerLayoutCompleted}
    />
  );
}
