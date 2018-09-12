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
    const { date, selected } = props;
    return RkCalendarService.Date.isSameDaySafe(date, selected.start) || false;
  }

  // eslint-disable-next-line no-unused-vars
  isDayHighlighted(props) {
    return false;
  }

  isDayDisabled(props) {
    const { date, min, max } = props;
    const isFitsFilter = props.filter(date);
    const isBetweenRange = (RkCalendarService.Date.isBetweenIncludingSafe(date, min, max) || false);
    return !isFitsFilter || !isBetweenRange;
  }

  isDayToday(props) {
    const { date } = props;
    return RkCalendarService.Date.isSameDaySafe(date, RkCalendarService.Date.today()) || false;
  }

  isDayEmpty(props) {
    const { date } = props;
    return date === RkCalendarService.Month.defaultBoundingFallback;
  }

  shouldUpdateDay(props, nextProps) {
    const { date, selected: currentSelected } = props;
    const { selected: nextSelected } = nextProps;
    const isWasSelected = RkCalendarService.Date.isSameDaySafe(date, currentSelected.start);
    const isWillSelected = RkCalendarService.Date.isSameDaySafe(date, nextSelected.start);
    return isWasSelected || isWillSelected;
  }

  shouldUpdateWeek(props, nextProps) {
    const dates = props.dates.filter(d => d !== RkCalendarService.Month.defaultBoundingFallback);
    const weekRange = {
      start: dates[0],
      end: dates[dates.length - 1],
    };
    const isInWeek = (d) => {
      const { start, end } = weekRange;
      return RkCalendarService.Date.isBetweenIncludingSafe(d, start, end);
    };
    const isWasSelected = isInWeek(props.selected.start);
    const isWillSelected = isInWeek(nextProps.selected.start);
    return isWasSelected || isWillSelected;
  }

  shouldUpdateMonth(props, nextProps) {
    const { date, selected: currentSelected } = props;
    const { selected: nextSelected } = nextProps;
    const isWasSelected = RkCalendarService.Date.isSameMonthSafe(date, currentSelected.start);
    const isWillSelected = RkCalendarService.Date.isSameMonthSafe(date, nextSelected.start);
    return isWasSelected || isWillSelected;
  }

  shouldUpdateYear(props, nextProps) {
    const { date, selected: currentSelected } = props;
    const { selected: nextSelected } = nextProps;
    const isWasSelected = RkCalendarService.Date.isSameYearSafe(date, currentSelected.start);
    const isWillSelected = RkCalendarService.Date.isSameYearSafe(date, nextSelected.start);
    return isWasSelected || isWillSelected;
  }
}

export default new BaseSelectionStrategy();
