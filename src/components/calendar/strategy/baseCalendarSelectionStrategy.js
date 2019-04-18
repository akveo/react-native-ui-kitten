import {
  today,
  isSameDaySafe,
  isBetweenIncludingSafe,
  isSameMonthSafe,
  isSameYearSafe,
} from '../services/calendarDate.service';
import { defaultBoundingFallback } from '../services/calendarMonthModel.service';

class BaseSelectionStrategy {
  description = 'base';

  getStateFromSelection(state, selection) {
    return {
      selected: {
        start: selection,
        end: undefined,
      },
    };
  }

  isDaySelected(props) {
    const { date, selected } = props;
    return isSameDaySafe(date, selected.start) || false;
  }

  // eslint-disable-next-line no-unused-vars
  isDayHighlighted(props) {
    return false;
  }

  isDayDisabled(props) {
    const {
      monthDate,
      date,
      min,
      max,
    } = props;
    const isFitsFilter = props.filter(date);
    const isBetweenRange = (isBetweenIncludingSafe(date, min, max) || false);
    const isBoundingDay = isBoundingDateSafe(date, monthDate) || false;
    return isBoundingDay || !isFitsFilter || !isBetweenRange;
  }

  isDayToday(props) {
    const { date } = props;
    return isSameDaySafe(date, today()) || false;
  }

  isDayEmpty(props) {
    const { date } = props;
    return date === defaultBoundingFallback;
  }

  shouldUpdateDay(props, nextProps) {
    const { date, selected: currentSelected } = props;
    const { selected: nextSelected } = nextProps;
    const wasSelected = isSameDaySafe(date, currentSelected.start);
    const willSelected = isSameDaySafe(date, nextSelected.start);
    return wasSelected || willSelected;
  }

  shouldUpdateWeek(props, nextProps) {
    const dates = props.dates.filter(d => d !== defaultBoundingFallback);
    const weekRange = {
      start: dates[0],
      end: dates[dates.length - 1],
    };
    const isInWeek = (d) => {
      const { start, end } = weekRange;
      return isBetweenIncludingSafe(d, start, end);
    };
    const wasSelected = isInWeek(props.selected.start);
    const willSelected = isInWeek(nextProps.selected.start);
    return wasSelected || willSelected;
  }

  shouldUpdateMonth(props, nextProps) {
    const { date, selected: currentSelected, boundingMonth: isBoundingMonth } = props;
    const { selected: nextSelected } = nextProps;
    const wasSelected = isSameMonthSafe(date, currentSelected.start);
    const willSelected = isSameMonthSafe(date, nextSelected.start);
    if (isBoundingMonth) {
      const wasBoundingSelected = isBoundingDateSafe(currentSelected.start, date) || false;
      const willBoundingSelected = isBoundingDateSafe(nextSelected.start, date) || false;
      return (wasBoundingSelected || willBoundingSelected) || (wasSelected || willSelected);
    }
    return wasSelected || willSelected;
  }

  shouldUpdateYear(props, nextProps) {
    const { date, selected: currentSelected } = props;
    const { selected: nextSelected } = nextProps;
    const wasSelected = isSameYearSafe(date, currentSelected.start);
    const willSelected = isSameYearSafe(date, nextSelected.start);
    return wasSelected || willSelected;
  }
}

function isBoundingDate(date, monthDate) {
  return Math.abs(date.getMonth() - monthDate.getMonth()) === 1;
}

function isBoundingDateSafe(date, monthDate) {
  return date && monthDate && isBoundingDate(date, monthDate);
}

export default new BaseSelectionStrategy();
