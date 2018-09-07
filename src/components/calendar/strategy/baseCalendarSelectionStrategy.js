import * as RkCalendarService from '../services';

class BaseSelectionStrategy {
  getStateFromSelection(state, selection) {
    return {
      selected: {
        start: selection,
        end: undefined,
      },
    };
  }

  isDaySelected(props) {
    return RkCalendarService.Date.isSameDaySafe(props.date, props.selected.start) || false;
  }

  isDayHighlighted(props) {
    return false;
  }

  isDayDisabled(props) {
    const isFitsFilter = props.filter(props.date);
    const isBetweenBounds = !isFitsFilter || (!RkCalendarService.Date.isBetweenSafe(props.date, props.min, props.max) || false);
    return !isFitsFilter || isBetweenBounds;
  }

  isDayToday(props) {
    return (RkCalendarService.Date.isSameDaySafe(props.date, RkCalendarService.Date.today()) || false);
  }

  isDayEmpty(props) {
    return props.date === RkCalendarService.Month.defaultBoundingFallback;
  }

  shouldUpdateDay(props, nextProps) {
    const isWasSelected = RkCalendarService.Date.isSameDaySafe(props.date, props.selected.start);
    const isWillSelected = RkCalendarService.Date.isSameDaySafe(props.date, nextProps.selected.start);
    return isWasSelected || isWillSelected;
  }

  shouldUpdateWeek(props, nextProps) {
    const dates = nextProps.dates.filter(date => date !== RkCalendarService.Month.defaultBoundingFallback);
    const isInWeek = (date) => {
      const weekStart = dates[0];
      const weekEnd = dates[dates.length - 1];
      return date && RkCalendarService.Date.isBetweenIncluding(date, weekStart, weekEnd);
    };
    const isWasSelected = isInWeek(props.selected.start);
    const isWillSelected = isInWeek(nextProps.selected.start);
    return isWasSelected || isWillSelected;
  }

  shouldUpdateMonth(props, nextProps) {
    const isWasSelected = RkCalendarService.Date.isSameMonthSafe(props.selected.start, props.date);
    const isWillSelected = RkCalendarService.Date.isSameMonthSafe(nextProps.selected.start, props.date);
    return isWasSelected || isWillSelected;
  }

  shouldUpdateYear(props, nextProps) {
    const isWasSelected = RkCalendarService.Date.isSameYearSafe(props.selected.start, props.date);
    const isWillSelected = RkCalendarService.Date.isSameYearSafe(nextProps.selected.start, props.date);
    return isWasSelected || isWillSelected;
  }
}

export default new BaseSelectionStrategy();
