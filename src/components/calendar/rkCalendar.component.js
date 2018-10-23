import React from 'react';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';
import { RkCalendarView } from './common/rkCalendarView.component';
import * as SelectionStrategy from './strategy';
import * as Layout from './layout';
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
 * @property {string} type - Type of date selection.
 * Available types: 'base' and 'range'. Default is 'base'.
 * @property {string} layout - Layout type of calendar.
 * Available types: 'vertical' and 'horizontal'. Default is 'vertical'.
 * @property {Date} min - Minimum date in calendar available for selection. Required
 * @property {Date} max - Maximum date in calendar available for selection. Required
 * @property {bool} boundingMonth - defines if we should render previous and next months
 * in the current month view. Default is true.
 * @property {function} filter - Predicate that decides which cells will be disabled
 * @property {function} renderDay - Custom render day cell function
 * @property {function} onSelect - Fired when date or date range is selected
 * @property {function} onVisibleMonthChanged - Fired when on-screen month is changed
 * */
export class RkCalendar extends RkComponent {
  static propTypes = {
    type: PropTypes.oneOf([
      SelectionStrategy.Base.description,
      SelectionStrategy.Range.description,
    ]),
    layout: PropTypes.oneOf([
      Layout.Vertical.description,
      Layout.Horizontal.description,
    ]),
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    boundingMonth: PropTypes.bool,
    filter: PropTypes.func,
    renderDay: PropTypes.func,
    onSelect: PropTypes.func,
    onVisibleMonthChanged: PropTypes.func,
  };

  static defaultProps = {
    type: SelectionStrategy.Base.description,
    layout: Layout.Vertical.description,
    boundingMonth: true,
    renderDay: undefined,
    filter: (() => true),
    onSelect: (() => null),
    onVisibleMonthChanged: (() => null),
  };

  componentName = 'RkCalendar';
  typeMapping = {
    container: {},
    header: {},
    month: {},
  };

  state = {
    selected: {
      start: RkCalendarService.Date.today(),
      end: undefined,
    },
    visibleMonth: RkCalendarService.Date.today(),
    selectionStrategy: SelectionStrategy.Base.strategy,
  };

  containerRef = undefined;

  constructor(props) {
    super(props);
    this.state.selectionStrategy = this.getSelectionStrategy(props.type);
  }

  /**
   * Override point.
   * Makes typeMapping keys be returned as objects instead of arrays
   */
  getElementStyle(styles, element, key, value) {
    const style = styles[element] || {};
    const styleKey = super.getElementStyleKey(element, style, key);
    style[styleKey.name] = super.getStyleValue(value);
    return style;
  }

  setContainerRef = (ref) => {
    this.containerRef = ref;
  };

  onContainerLayoutCompleted = () => {
    const today = RkCalendarService.Date.today();
    const scrollToToday = () => {
      this.scrollToDate(today, { animated: false });
    };
    setTimeout(scrollToToday, 100);
  };

  onVisibleMonthChanged = (date) => {
    this.state.visibleMonth = date;
    this.props.onVisibleMonthChanged(date);
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
    this.scrollToDate(RkCalendarService.Date.today(), params);
  }

  /**
   * Scrolls to month going before visible
   *
   * @param {object} params - additional scroll parameters (optional)
   */
  scrollToPreviousMonth(params = defaultScrollParams) {
    const currentMonth = this.state.visibleMonth;
    this.scrollToDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1), params);
  }

  /**
   * Scrolls to month going after visible
   *
   * @param {object} params - additional scroll parameters (optional)
   */
  scrollToNextMonth(params = defaultScrollParams) {
    const currentMonth = this.state.visibleMonth;
    this.scrollToDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1), params);
  }

  onDaySelect = (date) => {
    const selectionState = this.state.selectionStrategy.getStateFromSelection(this.state, date);
    this.setState(selectionState);
    this.props.onSelect(date);
  };

  getSelectionStrategy = (type) => {
    switch (type) {
      case SelectionStrategy.Base.description: return SelectionStrategy.Base.strategy;
      case SelectionStrategy.Range.description: return SelectionStrategy.Range.strategy;
      default: return SelectionStrategy.Base.strategy;
    }
  };

  getLayout = (type) => {
    switch (type) {
      case Layout.Vertical.description: return Layout.Vertical.layout;
      case Layout.Horizontal.description: return Layout.Horizontal.layout;
      default: return Layout.Vertical.layout;
    }
  };

  render() {
    return (
      <RkCalendarView
        style={this.defineStyles()}
        ref={this.setContainerRef}
        selectionStrategy={this.state.selectionStrategy}
        layout={this.getLayout(this.props.layout)}
        min={this.props.min}
        max={this.props.max}
        selected={this.state.selected}
        boundingMonth={this.props.boundingMonth}
        renderDay={this.props.renderDay}
        filter={this.props.filter}
        onSelect={this.onDaySelect}
        onLayoutCompleted={this.onContainerLayoutCompleted}
        onVisibleMonthChanged={this.onVisibleMonthChanged}
      />
    );
  }
}
