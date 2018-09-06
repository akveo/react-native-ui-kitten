import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarUtil from './services';
import { RkStyleSheet } from '../../styles/styleSheet';

export class RkCalendarView extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.element.isRequired,
    monthComponent: PropTypes.element.isRequired,
    yearComponent: PropTypes.element.isRequired,
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
    /**
     * callback function describing selection date changes,
     * which could not be handled by this component
     */
    onSelect: PropTypes.func.isRequired,
  };
  static defaultProps = {
    boundingMonth: true,
  };

  state = {
    daySize: 0,
  };

  onDaySelect = (date) => {
    this.props.onSelect(date);
  };

  onLayout = (event) => this.setState({
    daySize: event.nativeEvent.layout.width / RkCalendarUtil.DAYS_IN_WEEK,
  });

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
        selected={this.props.selected}
        date={item}
        boundingMonth={this.props.boundingMonth}
        daySize={this.state.daySize}
        onSelect={this.onDaySelect}
      />
    );
  };

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
