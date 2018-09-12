import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../../styles/styleSheet';
import { RkCalendarYear } from '../cells/rkCalendarYear.component';
import * as RkCalendarService from '../services';

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
    daySize: 0,
  };

  onLayout = (event) => this.setState({
    daySize: event.nativeEvent.layout.width / RkCalendarService.Date.DAYS_IN_WEEK,
  });

  getItemKey = (index) => `${index}`;

  createYearDateByIndex = (index) => new Date(this.props.min.getFullYear() + index, 0, 1);

  getData = () => {
    const itemCount = (this.props.max.getFullYear() - this.props.min.getFullYear()) + 1;
    return RkCalendarService.Util.range(itemCount, this.createYearDateByIndex);
  };

  renderItem = ({ item }) => (
    <RkCalendarYear
      selectionStrategy={this.props.selectionStrategy}
      min={this.props.min}
      max={this.props.max}
      selected={this.props.selected}
      date={item}
      boundingMonth={this.props.boundingMonth}
      renderDay={this.props.renderDay}
      filter={this.props.filter}
      onSelect={this.props.onSelect}
      daySize={this.state.daySize}
    />
  );

  render = () => (
    <FlatList
      style={styles.container}
      data={this.getData()}
      renderItem={this.renderItem}
      keyExtractor={this.getItemKey}
      onLayout={this.onLayout}
    />
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
  },
}));
