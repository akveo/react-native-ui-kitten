import * as DateTimeUtil from './calendarDate.service';
import { batch } from './calendarUtil.service';
import LocaleService from './calendarLocale.service';

export const defaultBoundingFallback = null;

/**
 * @param activeMonth - any date object of requested month
 * @param isBounding - defines to include previous or next month dates in grid, or not.
 * if @code{false} will include null.
 * @param fallback - fallback value for bounding date if not included
 *
 * @return 2-dim array of days of activeMonth
 */
export function createDaysGrid(activeMonth, isBounding = true, fallback = defaultBoundingFallback) {
  const weeks = createDates(activeMonth);
  return withBoundingMonths(weeks, activeMonth, isBounding, fallback);
}

export function getNumberOfWeekRowsInMonth(activeMonth) {
  const startOfWeekDayDiff = getStartOfWeekDayDiff(activeMonth);
  const numberOfDays = DateTimeUtil.getNumberOfDaysInMonth(activeMonth);
  return Math.ceil((startOfWeekDayDiff + numberOfDays) / DateTimeUtil.DAYS_IN_WEEK);
}

function createDates(activeMonth) {
  const days = DateTimeUtil.createDateRangeForMonth(activeMonth);
  const startOfWeekDayDiff = getStartOfWeekDayDiff(activeMonth);
  return batch(days, DateTimeUtil.DAYS_IN_WEEK, startOfWeekDayDiff);
}

function withBoundingMonths(weeks, activeMonth, isBounding, fallback) {
  let boundedWeeks = weeks;
  if (shouldAddPrevBoundingMonth(boundedWeeks)) {
    boundedWeeks = addPrevBoundingMonth(boundedWeeks, activeMonth, isBounding, fallback);
  }
  if (shouldAddNextBoundingMonth(boundedWeeks)) {
    boundedWeeks = addNextBoundingMonth(boundedWeeks, activeMonth, isBounding, fallback);
  }
  return boundedWeeks;
}

function addPrevBoundingMonth(weeks, activeMonth, isBounding, fallback) {
  const firstWeek = weeks.shift();
  const requiredItems = DateTimeUtil.DAYS_IN_WEEK - firstWeek.length;
  firstWeek.unshift(...createPrevBoundingDays(activeMonth, isBounding, requiredItems, fallback));
  return [firstWeek, ...weeks];
}

function addNextBoundingMonth(weeks, activeMonth, isBounding, fallback) {
  const lastWeek = weeks.pop();
  const requiredItems = DateTimeUtil.DAYS_IN_WEEK - lastWeek.length;
  lastWeek.push(...createNextBoundingDays(activeMonth, isBounding, requiredItems, fallback));
  return [...weeks, lastWeek];
}

function createPrevBoundingDays(activeMonth, isBounding, requiredItems, fallback) {
  const month = DateTimeUtil.addMonth(activeMonth, -1);
  const daysInMonth = DateTimeUtil.getNumberOfDaysInMonth(month);
  return DateTimeUtil.createDateRangeForMonth(month)
    .slice(daysInMonth - requiredItems)
    .map(date => (isBounding ? date : fallback));
}

function createNextBoundingDays(activeMonth, isBounding, requiredItems, fallback) {
  const month = DateTimeUtil.addMonth(activeMonth, 1);
  return DateTimeUtil.createDateRangeForMonth(month)
    .slice(0, requiredItems)
    .map(date => (isBounding ? date : fallback));
}

function getStartOfWeekDayDiff(date) {
  const startOfMonth = DateTimeUtil.getMonthStart(date);
  return getWeekStartDiff(startOfMonth);
}

function getWeekStartDiff(date) {
  return ((7 - LocaleService.getFirstDayOfWeek()) + date.getDay()) % 7;
}

function shouldAddPrevBoundingMonth(weeks) {
  return weeks[0].length < DateTimeUtil.DAYS_IN_WEEK;
}

function shouldAddNextBoundingMonth(weeks) {
  return weeks[weeks.length - 1].length < DateTimeUtil.DAYS_IN_WEEK;
}
