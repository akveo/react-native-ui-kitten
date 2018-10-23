import * as RkCalendarService from '../services';

class RangedSelectionStrategy {
  getStateFromSelection(state, selection) {
    const { start, end } = state.selected;
    if (start && !end) {
      return this.getStateFromSelectionEnd(state, selection);
    }
    return this.getStateFromSelectionStart(state, selection);
  }

  getStateFromSelectionStart(state, start) {
    return this.getStateFromSelectionRange({ start, end: undefined });
  }

  getStateFromSelectionEnd(state, end) {
    const { start } = state.selected;
    if (RkCalendarService.Date.compareDates(end, start) > 0) {
      return this.getStateFromSelectionRange({ start, end });
    }
    return this.getStateFromSelectionRange({ start: end, end: start });
  }

  getStateFromSelectionRange(range) {
    return {
      selected: range,
    };
  }

  isDaySelected(props) {
    const { date, selected: range } = props;
    return isDateInRange(date, range);
  }

  isDayHighlighted(props) {
    const { date, selected } = props;
    return RkCalendarService.Date.isBetweenSafe(date, selected.start, selected.end) || false;
  }

  isDayDisabled(props) {
    const {
      monthDate,
      date,
      min,
      max,
    } = props;
    const isFitsFilter = props.filter(date);
    const isBetweenRange = (RkCalendarService.Date.isBetweenIncludingSafe(date, min, max) || false);
    const isBoundingDay = isBoundingDateSafe(date, monthDate) || false;
    return isBoundingDay || !isFitsFilter || !isBetweenRange;
  }

  isDayToday(props) {
    const { date } = props;
    return (RkCalendarService.Date.isSameDaySafe(date, RkCalendarService.Date.today()) || false);
  }

  isDayEmpty(props) {
    const { date } = props;
    return date === RkCalendarService.Month.defaultBoundingFallback;
  }

  shouldUpdateDay(props, nextProps) {
    const { date, selected: currentSelected } = props;
    const { selected: nextSelected } = nextProps;
    const wasSelected = isDateInRange(date, currentSelected);
    const willSelected = isDateInRange(date, nextSelected);
    return wasSelected || willSelected;
  }

  shouldUpdateWeek(props, nextProps) {
    const dates = props.dates.filter(d => d !== RkCalendarService.Month.defaultBoundingFallback);
    const weekRange = {
      start: dates[0],
      end: dates[dates.length - 1],
    };
    const wasInRange = isDateRangeInRange(weekRange, props.selected);
    const willInRange = isDateRangeInRange(weekRange, nextProps.selected);
    return wasInRange || willInRange;
  }

  shouldUpdateMonth(props, nextProps) {
    const monthRange = {
      start: RkCalendarService.Date.getMonthStart(props.date),
      end: RkCalendarService.Date.getMonthEnd(props.date),
    };
    const { date, selected: currentSelected, boundingMonth: isBoundingMonth } = props;
    const { selected: nextSelected } = nextProps;
    const wasInRange = isDateRangeInRange(monthRange, currentSelected);
    const willInRange = isDateRangeInRange(monthRange, nextSelected);
    if (isBoundingMonth) {
      const wasBoundingSelected = isBoundingRange(currentSelected, date) || false;
      const willBoundingSelected = isBoundingRange(nextSelected, date) || false;
      return (wasBoundingSelected || willBoundingSelected) || (wasInRange || willInRange);
    }
    return wasInRange || willInRange;
  }

  shouldUpdateYear(props, nextProps) {
    const yearRange = {
      start: RkCalendarService.Date.getYearStart(props.date),
      end: RkCalendarService.Date.getYearEnd(props.date),
    };
    const wasInRange = isDateRangeInRange(yearRange, props.selected);
    const willInRange = isDateRangeInRange(yearRange, nextProps.selected);
    return wasInRange || willInRange;
  }
}

function isDateInRange(date, range) {
  // false as default is case when month starts/ends with null date
  const { start, end } = range;
  if (start && !end) {
    return RkCalendarService.Date.isSameDaySafe(date, start) || false;
  } else if (start && end) {
    const isRangeStart = RkCalendarService.Date.isSameDaySafe(date, start) || false;
    const isRangeEnd = RkCalendarService.Date.isSameDaySafe(date, end) || false;
    const isBetweenRange = RkCalendarService.Date.isBetweenSafe(date, start, end) || false;
    return isRangeStart || isRangeEnd || isBetweenRange;
  }
  return false;
}

function isDateRangeInRange(range1, range2) {
  const isRange1StartInRange = isDateInRange(range1.start, range2);
  const isRange1EndInRange = isDateInRange(range1.end, range2);
  const isRange2StartInRange = isDateInRange(range2.start, range1);
  const isRange2EndInRange = isDateInRange(range2.end, range1);
  return isRange1StartInRange || isRange1EndInRange || isRange2StartInRange || isRange2EndInRange;
}

function isBoundingDate(date, monthDate) {
  return Math.abs(date.getMonth() - monthDate.getMonth()) === 1;
}

function isBoundingDateSafe(date, monthDate) {
  return date && monthDate && isBoundingDate(date, monthDate);
}

function isBoundingRange(range, monthDate) {
  const isRangeStartBounding = isBoundingDateSafe(range.start, monthDate);
  const isRangeEndBounding = isBoundingDateSafe(range.end, monthDate);
  return isRangeStartBounding || isRangeEndBounding;
}

export const strategy = new RangedSelectionStrategy();
export const description = 'range';
