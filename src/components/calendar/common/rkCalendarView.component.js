import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkCalendarMonth } from '../cells/rkCalendarMonth.component';
import { RkCalendarMonthHeader } from '../common/rkCalendarMonthHeader.component';
import * as RkCalendarService from '../services';

export class RkCalendarView extends React.Component {
  static propTypes = {
    layout: PropTypes.shape({
      getLayoutConfig: PropTypes.func.isRequired,
      getItemSize: PropTypes.func.isRequired,
      getPrimaryAxisOffset: PropTypes.func.isRequired,
    }).isRequired,
    selectionStrategy: PropTypes.shape({
      isDaySelected: PropTypes.func.isRequired,
      isDayDisabled: PropTypes.func.isRequired,
      isDayToday: PropTypes.func.isRequired,
      isDayEmpty: PropTypes.func.isRequired,
      shouldUpdateDay: PropTypes.func.isRequired,
      shouldUpdateWeek: PropTypes.func.isRequired,
      shouldUpdateMonth: PropTypes.func.isRequired,
      shouldUpdateYear: PropTypes.func.isRequired,
    }).isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    /**
     * selected value prop describing one of:
     * - date,
     * - date range
     */
    selected: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.shape({
        start: PropTypes.instanceOf(Date),
        end: PropTypes.instanceOf(Date),
      }),
    ]).isRequired,
    boundingMonth: PropTypes.bool,
    renderDay: PropTypes.func,
    filter: PropTypes.func,
    /**
     * callback function describing selection date changes,
     * which could not be handled by this component
     */
    onSelect: PropTypes.func.isRequired,
    onLayoutCompleted: PropTypes.func,
    /**
     * callback function describing visible month item changes,
     *
     * DEV NOTES:
     *
     * 1) Scroll event called programmatically:
     *    Fires inside scrollToIndex method to prevent redundant visible index calculations.
     *
     * 2) Scroll event called with { animated: false, ... } params:
     *    onMomentumScrollEnd not fires in this case, so it will work as in first case.
     *
     * 3) Scroll event called by 'fling' gesture:
     *    Fires inside onScrollEndFling. Calculates visible index by offset.
     *
     * 4) Scroll event called by 'drag' gesture:
     *    Fires inside onScrollEndDrag. Calculates visible index by offset.
     */
    onVisibleMonthChanged: PropTypes.func,

    style: PropTypes.shape({
      container: View.propTypes.style,
      header: RkCalendarMonthHeader.propTypes.style,
      month: RkCalendarMonth.propTypes.style,
    }),
  };

  static defaultProps = {
    boundingMonth: true,
    renderDay: undefined,
    filter: (() => true),
    onLayoutCompleted: (() => null),
    onVisibleMonthChanged: (() => null),

    style: {
      container: {},
      header: RkCalendarMonthHeader.defaultProps.style,
      month: RkCalendarMonth.defaultProps.style,
    },
  };

  state = {
    items: [],
    daySize: -1,
    visibleMonth: RkCalendarService.Date.today(),
  };

  listRef = undefined;

  itemSizes = new Map();

  static getDerivedStateFromProps(props) {
    const itemCount = RkCalendarService.Date.getMonthDiff(props.min, props.max);
    const createMonthDateByIndex = (index) => new Date(props.min.getFullYear(), index, 1);
    return {
      items: RkCalendarService.Util.range(itemCount, createMonthDateByIndex),
    };
  }

  /**
   * @param params - object: { index: number, animated: boolean }
   */
  scrollToIndex(params) {
    const { index, ...restParams } = params;
    this.listRef.scrollToOffset({
      offset: this.calculateItemOffset({ index }),
      ...restParams,
    });
    this.setVisibleMonthIfNeeded(this.createMonthDateByIndex(index));
  }

  /**
   * @param date - Date,
   * @param params - object:
   * {
   *  ...scrollToIndex params,
   * }
   */
  scrollToDate(date, params) {
    const itemPosition = RkCalendarService.Date.getMonthDiff(this.props.min, date) - 1;
    this.scrollToIndex({ index: itemPosition, ...params });
  }

  onLayout = (event) => {
    const state = { daySize: event.nativeEvent.layout.width / RkCalendarService.Date.DAYS_IN_WEEK };
    this.setState(state, this.onLayoutCompleted);
  };

  onLayoutCompleted = () => {
    this.state.items.forEach((item, index) => {
      const itemSize = this.getItemSize(index);
      this.itemSizes.set(index, itemSize);
    });
    this.props.onLayoutCompleted();
  };

  onScrollEndDrag = (event) => {
    const axisOffset = this.props.layout.getPrimaryAxisOffset(event.nativeEvent.contentOffset);
    const visibleMonthIndex = this.calculateItemIndex(axisOffset);
    this.setVisibleMonthIfNeeded(this.createMonthDateByIndex(visibleMonthIndex));
  };

  onScrollEndFling = (event) => {
    const axisOffset = this.props.layout.getPrimaryAxisOffset(event.nativeEvent.contentOffset);
    const visibleMonthIndex = this.calculateItemIndex(axisOffset);
    this.setVisibleMonthIfNeeded(this.createMonthDateByIndex(visibleMonthIndex));
  };

  getItemLayout = (data, index) => {
    const itemPosition = index < 0 ? 0 : index;
    const itemSize = this.getItemSize(itemPosition);
    return {
      length: itemSize,
      offset: itemSize + this.calculateItemOffset({ index: itemPosition }),
      index: itemPosition,
    };
  };

  calculateItemOffset = ({ currentValue = 0, currentIndex = 0, index }) => {
    if (currentIndex === index) {
      return currentValue;
    }
    return this.calculateItemOffset({
      currentValue: currentValue + this.getItemSize(currentIndex),
      currentIndex: currentIndex + 1,
      index,
    });
  };

  calculateItemIndex = (offset) => {
    let calculatedOffset = 0;
    for (let i = 0; i < this.itemSizes.size; i += 1) {
      const itemSize = this.itemSizes.get(i);
      calculatedOffset += this.itemSizes.get(i);
      if (calculatedOffset >= offset) {
        return calculatedOffset - offset <= itemSize / 2 ? i + 1 : i;
      }
    }
    return 0;
  };

  /**
   * returns item size if was calculated earlier or calculates it.
   */
  getItemSize = (index) => {
    const cachedItemSize = this.itemSizes.get(index);
    const calculateItemSize = () => {
      const item = new Date(this.props.min.getFullYear(), this.props.min.getMonth() + index, 0);
      return this.props.layout.getItemSize(item, index, this.state.daySize);
    };
    return cachedItemSize || calculateItemSize();
  };

  getItemKey = (index) => index.toString();

  setListRef = (ref) => {
    this.listRef = ref;
  };

  setVisibleMonthIfNeeded(date) {
    if (!RkCalendarService.Date.isSameMonth(this.state.visibleMonth, date)) {
      this.state.visibleMonth = date;
      this.props.onVisibleMonthChanged(date);
    }
  }

  createMonthDateByIndex = (index) => new Date(this.props.min.getFullYear(), index, 1);

  renderItem = ({ item, index }) => (
    <View key={index.toString()}>
      <RkCalendarMonthHeader
        style={this.props.style.header}
        date={item}
        daySize={this.state.daySize}
      />
      <RkCalendarMonth
        style={this.props.style.month}
        min={this.props.min}
        max={this.props.max}
        date={item}
        selected={this.props.selected}
        boundingMonth={this.props.boundingMonth}
        renderDay={this.props.renderDay}
        filter={this.props.filter}
        onSelect={this.props.onSelect}
        selectionStrategy={this.props.selectionStrategy}
        daySize={this.state.daySize}
      />
    </View>
  );

  renderPlaceholder = () => (
    <View onLayout={this.onLayout} />
  );

  renderView = () => (
    <FlatList
      style={this.props.style.container}
      ref={this.setListRef}
      data={this.state.items}
      renderItem={this.renderItem}
      getItemLayout={this.getItemLayout}
      keyExtractor={this.getItemKey}
      onScrollEndDrag={this.onScrollEndDrag}
      onMomentumScrollEnd={this.onScrollEndFling}
      initialNumToRender={RkCalendarService.Date.MONTHS_IN_YEAR}
      {...this.props.layout.getLayoutConfig()}
    />
  );

  render() {
    return this.state.daySize < 0 ? this.renderPlaceholder() : this.renderView();
  }
}
