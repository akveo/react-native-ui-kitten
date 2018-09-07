import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkCalendarDay } from './rkCalendarDay.component';

export class RkCalendarWeek extends React.Component {
  static propTypes = {
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    selected: PropTypes.shape({
      start: PropTypes.instanceOf(Date),
      end: PropTypes.instanceOf(Date),
    }),
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
    renderDay: undefined,
    filter: (() => true),
  };

  shouldComponentUpdate(nextProps) {
    const isSizeChanged = nextProps.daySize !== this.props.daySize;
    return isSizeChanged || nextProps.selectionStrategy.shouldUpdateWeek(this.props, nextProps);
  }

  getChildComponents = () => this.props.dates.map(this.renderDay);

  renderDay = (item) => (
    <RkCalendarDay
      min={this.props.min}
      max={this.props.max}
      date={item}
      selected={this.props.selected}
      renderContent={this.props.renderDay}
      filter={this.props.filter}
      onSelect={this.props.onSelect}
      selectionStrategy={this.props.selectionStrategy}
      size={this.props.daySize}
    />
  );

  render = () => (
    <View style={styles.container}>{this.getChildComponents()}</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

