import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { RkStyleSheet } from '../../styles/styleSheet';
import * as RkCalendarUtil from './services';
import { RkCalendarWeek } from './rkCalendarWeek.component';

export class RkCalendarMonthComponent extends React.Component {
  static propTypes = {
    dayComponent: PropTypes.func.isRequired,
    min: PropTypes.instanceOf(Date).isRequired,
    max: PropTypes.instanceOf(Date).isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    selected: PropTypes.instanceOf(Date),
    boundingMonth: PropTypes.bool,
    filter: PropTypes.func,
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
  static defaultProps = {
    boundingMonth: true,
    filter: (() => true),
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
    const isWasSelected = this.isInMonth(this.props.selected);
    const isWillSelected = this.isInMonth(nextProps.selected);
    return isSizeChanged || isWasSelected || isWillSelected;
  }

  onDaySelect = (date) => {
    this.props.onSelect(date);
  };

  isInMonth = (date) => RkCalendarUtil.isSameMonthSafe(date, this.props.date);

  getData = () => RkCalendarUtil.createDaysGrid(this.props.date, this.props.boundingMonth);

  getChildComponents = () => this.state.dates.map(this.renderWeek);

  renderWeek = (item) => (
    <RkCalendarWeek
      dayComponent={this.props.dayComponent}
      min={this.props.min}
      max={this.props.max}
      dates={item}
      selected={this.props.selected}
      filter={this.props.filter}
      onSelect={this.onDaySelect}
      daySize={this.props.daySize}
    />
  );

  render = () => (
    <View
      style={styles.container}>
      {this.getChildComponents()}
    </View>
  );
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    marginVertical: 8,
  },
}));
