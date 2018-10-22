import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarService from '../services';
import { RkCalendarWeek } from './rkCalendarWeek.component';
import { RkCalendarDay } from './rkCalendarDay.component';

/**
 * @extends React.Component
 */
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

    style: PropTypes.shape({
      container: View.propTypes.style,
      day: RkCalendarDay.propTypes.style,
    }),
  };

  static defaultProps = {
    selected: undefined,
    boundingMonth: true,
    renderDay: undefined,
    filter: (() => true),

    style: {
      container: {},
      day: RkCalendarDay.defaultProps.style,
    },
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

  // eslint-disable-next-line arrow-body-style
  getChildComponents = (styles) => {
    return this.state.dates.map((item, index) => this.renderWeek(item, index, styles));
  };

  renderWeek = (item, index, styles) => (
    <RkCalendarWeek
      style={{ container: {}, ...styles }}
      key={`${index}`}
      min={this.props.min}
      max={this.props.max}
      monthDate={this.props.date}
      dates={item}
      selected={this.props.selected}
      renderDay={this.props.renderDay}
      filter={this.props.filter}
      onSelect={this.props.onSelect}
      selectionStrategy={this.props.selectionStrategy}
      daySize={this.props.daySize}
    />
  );

  render() {
    const { container, ...restStyles } = this.props.style;
    return (
      <View style={container}>
        {this.getChildComponents(restStyles)}
      </View>
    );
  }
}
