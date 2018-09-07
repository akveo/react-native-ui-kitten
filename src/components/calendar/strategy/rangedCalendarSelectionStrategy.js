import * as RkCalendarService from '../services';

export const description = 'range';

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
    return { selected: range };
  }

  isDaySelected(props) {
    return isDateInRange(props.date, props.selected);
  }

  isDayHighlighted(props) {
    const isBetweenRange = RkCalendarService.Date.isBetweenSafe(props.date, props.selected.start, props.selected.end);
    return isBetweenRange || false;
  }

  isDayDisabled(props) {
    const isFitsFilter = props.filter(props.date);
    const isBetweenRange = !RkCalendarService.Date.isBetweenSafe(props.date, props.min, props.max) || false;
    return !isFitsFilter || isBetweenRange;
  }

  isDayToday(props) {
    return (RkCalendarService.Date.isSameDaySafe(props.date, RkCalendarService.Date.today()) || false);
  }

  isDayEmpty(props) {
    return props.date === RkCalendarService.Month.defaultBoundingFallback;
  }

  shouldUpdateDay(props, nextProps) {
    const isWasInRange = isDateInRange(props.date, props.selected);
    const isWillInRange = isDateInRange(props.date, nextProps.selected);
    return isWasInRange || isWillInRange;
  }

  shouldUpdateWeek(props, nextProps) {
    const dates = nextProps.dates.filter(date => date !== RkCalendarService.Month.defaultBoundingFallback);
    const weekRange = {
      start: dates[0],
      end: dates[dates.length - 1],
    };
    const isWasInRange = isDateRangeInRange(weekRange, props.selected);
    const isWillInRange = isDateRangeInRange(weekRange, nextProps.selected);
    return isWasInRange || isWillInRange;
  }

  shouldUpdateMonth(props, nextProps) {
    const monthRange = {
      start: RkCalendarService.Date.getMonthStart(props.date),
      end: RkCalendarService.Date.getMonthEnd(props.date),
    };
    const isWasInRange = isDateRangeInRange(monthRange, props.selected);
    const isWillInRange = isDateRangeInRange(monthRange, nextProps.selected);
    return isWasInRange || isWillInRange;
  }

  shouldUpdateYear(props, nextProps) {
    const yearRange = {
      start: RkCalendarService.Date.getYearStart(props.date),
      end: RkCalendarService.Date.getYearEnd(props.date),
    };
    const isWasInRange = isDateRangeInRange(yearRange, props.selected);
    const isWillInRange = isDateRangeInRange(yearRange, nextProps.selected);
    return isWasInRange || isWillInRange;
  }
}

function isDateInRange(date, range) {
  // false as default is case when month starts/ends with null date

  if (range.start && !range.end) {
    return RkCalendarService.Date.isSameDaySafe(date, range.start) || false;
  } else if (range.start && range.end) {
    const isRangeStart = RkCalendarService.Date.isSameDaySafe(date, range.start) || false;
    const isRangeEnd = RkCalendarService.Date.isSameDaySafe(date, range.end) || false;
    const isBetweenRange = RkCalendarService.Date.isBetweenSafe(date, range.start, range.end) || false;
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

export default new RangedSelectionStrategy();
