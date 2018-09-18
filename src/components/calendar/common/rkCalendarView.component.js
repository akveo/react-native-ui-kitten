import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../../styles/styleSheet';
import * as RkCalendarService from '../services';
import { RkCalendarMonth } from '../cells/rkCalendarMonth.component';
import { RkCalendarMonthHeader } from '../common/rkCalendarMonthHeader.component';

export class RkCalendarView extends React.Component {
  static propTypes = {
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
  };
  static defaultProps = {
    boundingMonth: true,
    renderDay: undefined,
    filter: (() => true),
    onLayoutCompleted: (() => null),
  };

  state = {
    daySize: -1,
  };

  listRef = undefined;

  /**
   * @param params - object: { index: number, animated: boolean }
   */
  scrollToIndex(params) {
    const { index, ...restParams } = params;
    this.scrollToOffset({
      offset: this.calculateItemOffset({ index }),
      ...restParams,
    });
  }

  /**
   * @param params - object, required by FlatList for scrollToOffset(params) function.
   */
  scrollToOffset(params) {
    this.listRef.scrollToOffset(params);
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
    this.setState(state, this.props.onLayoutCompleted);
  };

  getItemLayout = (data, index) => {
    const itemPosition = index < 0 ? 0 : index;
    const itemHeight = this.getItemHeight(itemPosition);
    return {
      length: itemHeight,
      offset: itemHeight + this.calculateItemOffset({ index: itemPosition }),
      index: itemPosition,
    };
  };

  calculateItemOffset = ({ currentValue = 0, currentIndex = 0, index }) => {
    if (currentIndex === index) {
      return currentValue;
    }
    return this.calculateItemOffset({
      currentValue: currentValue + this.getItemHeight(currentIndex),
      currentIndex: currentIndex + 1,
      index,
    });
  };

  getItemHeight = (index) => {
    const item = new Date(this.props.min.getFullYear(), this.props.min.getMonth() + index, 0);
    const weekRowCount = RkCalendarService.Month.getNumberOfWeekRowsInMonth(item);
    return (weekRowCount * this.state.daySize) + 58; // + header height
  };

  getItemKey = (index) => index.toString();

  setListRef = (ref) => {
    this.listRef = ref;
  };

  createMonthDateByIndex = (index) => new Date(this.props.min.getFullYear(), index, 1);

  getData = () => {
    const itemCount = RkCalendarService.Date.getMonthDiff(this.props.min, this.props.max);
    return RkCalendarService.Util.range(itemCount, this.createMonthDateByIndex);
  };

  renderItem = ({ item, index }) => (
    <View key={index.toString()}>
      <RkCalendarMonthHeader date={item} daySize={this.state.daySize} />
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
        daySize={this.state.daySize}
      />
    </View>
  );

  renderPlaceholder = () => (
    <View onLayout={this.onLayout} />
  );

  renderView = () => (
    <FlatList
      ref={this.setListRef}
      style={styles.container}
      data={this.getData()}
      renderItem={this.renderItem}
      getItemLayout={this.getItemLayout}
      keyExtractor={this.getItemKey}
      initialNumToRender={RkCalendarService.Date.MONTHS_IN_YEAR}
    />
  );

  render() {
    return this.state.daySize < 0 ? this.renderPlaceholder() : this.renderView();
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
  },
}));
