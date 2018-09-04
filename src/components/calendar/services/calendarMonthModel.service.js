import * as DateTimeUtil from './dateTimeUtil';
import { batch } from './helpers';
import LocaleService from './locale.service';

/**
 * @param activeMonth - any date object of requested month
 * @param boundingMonth - defines to include previous or next month dates in grid, or not.
 * if @code{false} will include null.
 * @param boundingFallback - fallback value for bounding date if not included
 *
 * @return 2-dim array of days of activeMonth
 */

export const defaultBoundingFallback = null;

export function createDaysGrid(activeMonth, boundingMonth = true, boundingFallback = defaultBoundingFallback) {
  const weeks = createDates(activeMonth);
  return withBoundingMonths(weeks, activeMonth, boundingMonth, boundingFallback);
}

function createDates(activeMonth) {
  const days = DateTimeUtil.createDateRangeForMonth(activeMonth);
  const startOfWeekDayDiff = getStartOfWeekDayDiff(activeMonth);
  return batch(days, DateTimeUtil.DAYS_IN_WEEK, startOfWeekDayDiff);
}

function withBoundingMonths(weeks, activeMonth, boundingMonth, boundingFallback) {
  let withBoundingMonths = weeks;

  if (isShouldAddPrevBoundingMonth(withBoundingMonths)) {
    withBoundingMonths = addPrevBoundingMonth(
      withBoundingMonths,
      activeMonth,
      boundingMonth,
      boundingFallback,
    );
  }

  if (isShouldAddNextBoundingMonth(withBoundingMonths)) {
    withBoundingMonths = addNextBoundingMonth(
      withBoundingMonths,
      activeMonth,
      boundingMonth,
      boundingFallback,
    );
  }

  return withBoundingMonths;
}

function addPrevBoundingMonth(weeks, activeMonth, boundingMonth, boundingFallback) {
  const firstWeek = weeks.shift();
  const requiredItems = DateTimeUtil.DAYS_IN_WEEK - firstWeek.length;
  firstWeek.unshift(...createPrevBoundingDays(
    activeMonth,
    boundingMonth,
    requiredItems,
    boundingFallback,
  ));
  return [firstWeek, ...weeks];
}

function addNextBoundingMonth(weeks, activeMonth, boundingMonth, boundingFallback) {
  const lastWeek = weeks.pop();
  const requiredItems = DateTimeUtil.DAYS_IN_WEEK - lastWeek.length;
  lastWeek.push(...createNextBoundingDays(
    activeMonth,
    boundingMonth,
    requiredItems,
    boundingFallback,
  ));
  return [...weeks, lastWeek];
}

function createPrevBoundingDays(activeMonth, boundingMonth, requiredItems, boundingFallback) {
  const month = DateTimeUtil.addMonth(activeMonth, -1);
  const daysInMonth = DateTimeUtil.getNumberOfDaysInMonth(month);
  return DateTimeUtil.createDateRangeForMonth(month)
    .slice(daysInMonth - requiredItems)
    .map(date => (boundingMonth ? date : boundingFallback));
}

function createNextBoundingDays(activeMonth, boundingMonth, requiredItems, boundingFallback) {
  const month = DateTimeUtil.addMonth(activeMonth, 1);
  return DateTimeUtil.createDateRangeForMonth(month)
    .slice(0, requiredItems)
    .map(date => (boundingMonth ? date : boundingFallback));
}

function getStartOfWeekDayDiff(date) {
  const startOfMonth = DateTimeUtil.getMonthStart(date);
  return getWeekStartDiff(startOfMonth);
}

function getWeekStartDiff(date) {
  return ((7 - LocaleService.getFirstDayOfWeek()) + date.getDay()) % 7;
}

function isShouldAddPrevBoundingMonth(weeks) {
  return weeks[0].length < DateTimeUtil.DAYS_IN_WEEK;
}

function isShouldAddNextBoundingMonth(weeks) {
  return weeks[weeks.length - 1].length < DateTimeUtil.DAYS_IN_WEEK;
}
