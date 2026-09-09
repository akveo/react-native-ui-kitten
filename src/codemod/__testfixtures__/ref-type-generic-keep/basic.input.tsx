import React from 'react';
import { Calendar, Datepicker, RangeCalendar, RangeDatepicker } from '@ui-kitten/components';
import type { Moment } from 'moment';

// Bare: `CalendarRef` defaults `D = Date`, exactly as the v5 `Calendar` class did.
export const calendarRef = React.useRef<Calendar>(null);

// Explicit: the argument is carried across, because the v6 ref type is generic too.
export const momentCalendarRef = React.useRef<Calendar<Moment>>(null);
export const rangeRef: React.RefObject<RangeCalendar<Moment>> = React.createRef();
export const pickerRef = React.useRef<Datepicker<Moment>>(null);
export const rangePickerRef = React.useRef<RangeDatepicker>(null);
