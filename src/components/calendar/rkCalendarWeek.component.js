import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import * as RkCalendarUtil from './services';
import { RkStyleSheet } from '../../styles/styleSheet';

export class RkCalendarWeek extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.element.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    dates: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date).isRequired,
    /**
     * callback function describing selection date changes,
     * which could not be handled by this component
     */
    onSelect: PropTypes.func.isRequired,
    /**
     * day component style prop describing width and height of cell
     */
    daySize: PropTypes.number.isRequired,
  };

  state = {
    dates: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      dates: this.getData(),
    };
  }

  shouldComponentUpdate(nextProps) {
    const isSizeChanged = nextProps.daySize !== this.props.daySize;
    const isWasSelected = this.isInWeek(this.props.selected);
    const isWillSelected = this.isInWeek(nextProps.selected);
    return isSizeChanged || isWasSelected || isWillSelected;
  }

  onDaySelect = (date) => {
    this.props.onSelect(date);
  };

  isInWeek = (date) => {
    const weekStart = this.state.dates[0];
    const weekEnd = this.state.dates[this.state.dates.length - 1];
    return RkCalendarUtil.isBetweenIncluding(date, weekStart, weekEnd);
  };

  getData = () => this.props.dates.filter(date => date !== RkCalendarUtil.defaultBoundingFallback);

  getChildComponents = () => this.props.dates.map(this.renderDay);

  renderDay = (item) => {
    const DayComponent = this.props.dayComponent;
    return (
      <DayComponent
        min={this.props.min}
        max={this.props.max}
        date={item}
        selected={this.props.selected}
        onSelect={this.onDaySelect}
        size={this.props.daySize}
      />
    );
  };

  render = () => (
    <View style={styles.container}>{this.getChildComponents()}</View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
  },
}));

