import { range } from './calendarUtil.service';

export const DAYS_IN_WEEK = 7;
export const MONTHS_IN_YEAR = 12;

export const today = () => {
  const now = new Date();
  return createDate(now.getFullYear(), now.getMonth(), now.getDate());
};

export const createDate = (year, month, date) => {
  const result = new Date(year, month, date);

  // We need to correct for the fact that JS native Date treats years in range [0, 99] as
  // abbreviations for 19xx.
  if (year >= 0 && year < 100) {
    result.setFullYear(result.getFullYear() - 1900);
  }
  return result;
};

export function isSameYear(date1, date2) {
  return date1.getFullYear() === date2.getFullYear();
}

export function isSameYearSafe(date1, date2) {
  return date1 && date2 && isSameYear(date1, date2);
}

export function isSameMonth(date1, date2) {
  return isSameYear(date1, date2) && date1.getMonth() === date2.getMonth();
}

export function isSameMonthSafe(date1, date2) {
  return date1 && date2 && isSameMonth(date1, date2);
}

export function isSameDay(date1, date2) {
  return isSameMonth(date1, date2) && date1.getDate() === date2.getDate();
}

export function isSameDaySafe(date1, date2) {
  return date1 && date2 && isSameDay(date1, date2);
}

export function compareDates(date1, date2) {
  return date1.getTime() - date2.getTime();
}

export function isBetween(date, start, end) {
  return compareDates(date, start) > 0 && compareDates(date, end) < 0;
}

export function isBetweenSafe(date, start, end) {
  return date && start && end && isBetween(date, start, end);
}

export function isBetweenIncluding(date, start, end) {
  return compareDates(date, start) >= 0 && compareDates(date, end) <= 0;
}

export function isBetweenIncludingSafe(date, start, end) {
  return date && start && end && isBetweenIncluding(date, start, end);
}

export function clone(date) {
  return new Date(date.getTime());
}

export function getMonthStart(date) {
  return createDate(date.getFullYear(), date.getMonth(), 1);
}

export function getMonthEnd(date) {
  return createDate(date.getFullYear(), date.getMonth() + 1, 0);
}

export function getYearStart(date) {
  return createDate(date.getFullYear(), 0, 1);
}

export function getYearEnd(date) {
  return createDate(date.getFullYear(), 11, 31);
}

export function getNumberOfDaysInMonth(date) {
  return getMonthEnd(date).getDate();
}

export function getNumberOfWeeksInMonth(date) {
  const numberOfDays = getMonthEnd(date).getDate();
  return Math.ceil(numberOfDays / DAYS_IN_WEEK);
}

export function getMonthDiff(start, end) {
  const yearCount = (end.getFullYear() - start.getFullYear());
  const monthCount = yearCount * MONTHS_IN_YEAR;
  return monthCount - (start.getMonth() - end.getMonth() - 1);
}

export function addDay(date, num) {
  return createDate(date.getFullYear(), date.getMonth(), date.getDate() + num);
}

export function addMonth(date, num) {
  return createDate(date.getFullYear(), date.getMonth() + num, date.getDate());
}

export function addYear(date, num) {
  return createDate(date.getFullYear() + num, date.getMonth(), date.getDate());
}

export const createDateRangeForMonth = (date) => {
  const daysInMonth = getNumberOfDaysInMonth(date);
  return range(daysInMonth, i => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return createDate(year, month, i + 1);
  });
};
