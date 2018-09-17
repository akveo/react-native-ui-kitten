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
  };
  static defaultProps = {
    boundingMonth: true,
    renderDay: undefined,
    filter: (() => true),
  };

  state = {
    daySize: -1,
  };

  onLayout = (event) => this.setState({
    daySize: event.nativeEvent.layout.width / RkCalendarService.Date.DAYS_IN_WEEK,
  });

  getItemKey = (index) => `${index}`;

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
      style={styles.container}
      data={this.getData()}
      renderItem={this.renderItem}
      keyExtractor={this.getItemKey}
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
