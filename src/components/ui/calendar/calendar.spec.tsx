/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
} from 'react-native';
import { Moment } from 'moment';
import {
  fireEvent,
  render,
  waitFor,
} from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Calendar,
  CalendarProps,
  CalendarRef,
} from './calendar.component';
import { CalendarViewModes } from './type';
import { MomentDateService } from '@ui-kitten/moment';
import { DateService } from './service/date.service';
import { Text } from '../text/text.component';

describe('@calendar: component checks', () => {

  const now: Date = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

  const TestCalendar = React.forwardRef((
    props: Partial<CalendarProps<Date | Moment>>,
    ref: React.Ref<CalendarRef>,
  ) => {

    const [date, setDate] = React.useState<Date | Moment>(props.date);

    const onSelect = (nextDate: Date | Moment): void => {
      setDate(date);
      props.onSelect?.(nextDate);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <Calendar
          ref={ref}
          {...props}
          date={date}
          onSelect={onSelect}
        />
      </ApplicationProvider>
    );
  });

  TestCalendar.displayName = 'TestCalendar';

  it('should request date change on day select', () => {
    const onSelect = jest.fn((date: Date) => {
      expect(date).toEqual(new Date(now.getFullYear(), now.getMonth(), 7));
    });

    const component = render(
      <TestCalendar onSelect={onSelect} />,
    );

    fireEvent.press(component.queryByText('7'));
  });

  it('should request date change on month select', async () => {
    const onSelect = jest.fn((date: Date) => {
      expect(date).toEqual(new Date(now.getFullYear(), 6, 7));
    });

    const component = render(
      <TestCalendar
        startView={CalendarViewModes.MONTH}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(component.queryByText('Jul'));
    const dayCell = await waitFor(() => component.queryByText('7'));

    fireEvent.press(dayCell);
  });

  it('should request date change on year select', async () => {
    const targetYear = now.getFullYear();
    const onSelect = jest.fn((date: Date) => {
      expect(date).toEqual(new Date(targetYear, 6, 7));
    });

    const component = render(
      <TestCalendar
        startView={CalendarViewModes.YEAR}
        onSelect={onSelect}
      />,
    );

    const yearCell = await waitFor(() => component.getByText(`${targetYear}`));
    fireEvent.press(yearCell);
    const monthCell = await waitFor(() => component.getByText('Jul'));

    fireEvent.press(monthCell);
    const dayCell = await waitFor(() => component.getByText('7'));

    fireEvent.press(dayCell);
  });

  it('should be rendered with view passed to startView prop', () => {
    const componentRef = React.createRef<CalendarRef>();
    render(
      <TestCalendar
        ref={componentRef}
        startView={CalendarViewModes.YEAR}
      />,
    );

    expect(componentRef.current.getViewMode()).toEqual(CalendarViewModes.YEAR);
  });

  it('should change month to next when navigation button pressed', () => {
    const componentRef = React.createRef<CalendarRef>();
    const component = render(
      <TestCalendar ref={componentRef} />,
    );

    const initialDate = componentRef.current.getVisibleDate();
    const navigationNextButton = component.UNSAFE_queryAllByType(TouchableOpacity)[2];

    fireEvent.press(navigationNextButton);

    const nextMonth = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, initialDate.getDate());

    expect(componentRef.current.getVisibleDate()).toEqual(nextMonth);
  });

  it('should change month to previous when navigation button pressed', () => {
    const componentRef = React.createRef<CalendarRef>();
    const component = render(
      <TestCalendar ref={componentRef} />,
    );

    const initialDate = componentRef.current.getVisibleDate();
    const navigationPrevButton = component.UNSAFE_queryAllByType(TouchableOpacity)[1];

    fireEvent.press(navigationPrevButton);

    const previousMonth = new Date(initialDate.getFullYear(), initialDate.getMonth() - 1, initialDate.getDate());

    expect(componentRef.current.getVisibleDate()).toEqual(previousMonth);
  });

  it('should change year to next when navigation button pressed', () => {
    const componentRef = React.createRef<CalendarRef>();
    const component = render(
      <TestCalendar
        ref={componentRef}
        startView={CalendarViewModes.YEAR}
      />,
    );

    const initialDate = componentRef.current.getVisibleDate();
    const navigationPrevButton = component.UNSAFE_queryAllByType(TouchableOpacity)[2];

    fireEvent.press(navigationPrevButton);

    const nextYear = new Date(initialDate.getFullYear() + 12, initialDate.getMonth(), initialDate.getDate());

    expect(componentRef.current.getVisibleDate()).toEqual(initialDate);
    expect(componentRef.current.getPickerDate()).toEqual(nextYear);
  });

  it('should change year to previous when navigation button pressed', () => {
    const componentRef = React.createRef<CalendarRef>();
    const component = render(
      <TestCalendar
        ref={componentRef}
        startView={CalendarViewModes.YEAR}
      />,
    );

    const initialDate = componentRef.current.getVisibleDate();
    const navigationPrevButton = component.UNSAFE_queryAllByType(TouchableOpacity)[1];

    fireEvent.press(navigationPrevButton);

    const nextYear = new Date(initialDate.getFullYear() - 12, initialDate.getMonth(), initialDate.getDate());

    expect(componentRef.current.getVisibleDate()).toEqual(initialDate);
    expect(componentRef.current.getPickerDate()).toEqual(nextYear);
  });

  it('should show the selected date on load provided by date prop', () => {
    const date = new Date(2021, 2, 1);
    const componentRef = React.createRef<CalendarRef>();
    render(
      <TestCalendar
        ref={componentRef}
        date={date}
      />,
    );

    const visibleDate = componentRef.current.getVisibleDate();
    expect(visibleDate.getFullYear()).toEqual(date.getFullYear());
    expect(visibleDate.getMonth()).toEqual(date.getMonth());
  });

  it('should show the specific date on load provided by initialVisibleDate prop', () => {
    const initialDate = new Date(2021, 2, 1);
    const componentRef = React.createRef<CalendarRef>();
    render(
      <TestCalendar
        ref={componentRef}
        date={new Date()}
        initialVisibleDate={initialDate}
      />,
    );

    const visibleDate = componentRef.current.getVisibleDate();
    expect(visibleDate.getFullYear()).toEqual(initialDate.getFullYear());
    expect(visibleDate.getMonth()).toEqual(initialDate.getMonth());
  });

  it('should scroll to current month when scrollToToday called', async () => {
    const componentRef = React.createRef<CalendarRef>();
    render(
      <TestCalendar
        ref={componentRef}
        date={new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())}
      />,
    );

    componentRef.current.scrollToToday();
    await waitFor(() => null);

    expect(componentRef.current.getVisibleDate().getMonth()).toEqual(today.getMonth());
  });

  it('should scroll to the specific date when scrollToDate called', async () => {
    const dateToScroll = new Date(2021, 2, 1);
    const componentRef = React.createRef<CalendarRef>();
    render(
      <TestCalendar
        ref={componentRef}
        date={new Date()}
      />,
    );

    componentRef.current.scrollToDate(dateToScroll);
    await waitFor(() => null);

    const visibleDate = componentRef.current.getVisibleDate();
    expect(visibleDate.getFullYear()).toEqual(dateToScroll.getFullYear());
    expect(visibleDate.getMonth()).toEqual(dateToScroll.getMonth());
  });

  it('should render element provided with renderDay prop', async () => {
    const component = render(
      <TestCalendar renderDay={() => <View testID='@calendar/cell' />} />,
    );

    const cells = component.queryAllByTestId('@calendar/cell');
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderMonth prop', async () => {
    const component = render(
      <TestCalendar
        startView={CalendarViewModes.MONTH}
        renderMonth={() => <View testID='@calendar/cell' />}
      />,
    );

    const cells = component.queryAllByTestId('@calendar/cell');
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderYear prop', async () => {
    const component = render(
      <TestCalendar
        startView={CalendarViewModes.YEAR}
        renderYear={() => <View testID='@calendar/cell' />}
      />,
    );

    const cells = component.queryAllByTestId('@calendar/cell');
    expect(cells.length).not.toEqual(0);
  });

  it('should render element provided with renderFooter prop', async () => {
    const component = render(
      <TestCalendar
        startView={CalendarViewModes.YEAR}
        renderFooter={() => <View testID='@calendar/footer' />}
      />,
    );

    expect(component.queryByTestId('@calendar/footer')).toBeTruthy();
  });

  it('should work with Moment', async () => {
    // DateService<D> is invariant in D, so a Moment-only service cannot satisfy
    // the harness's Date | Moment union. The test deliberately exercises Moment.
    const dateService = new MomentDateService() as unknown as DateService<Date | Moment>;
    const onSelect = jest.fn((moment: Moment) => {
      expect(moment.toDate).toBeTruthy();
    });

    const component = render(
      <TestCalendar
        dateService={dateService}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(component.getByText('7'));
  });

  it('should call onMonthChange function', async () => {

    const onVisibleDateChange = jest.fn();

    const component = render(
      <TestCalendar onVisibleDateChange={onVisibleDateChange} />,
    );

    const navigationPrevButton = component.UNSAFE_queryAllByType(TouchableOpacity)[1];
    const navigationNextButton = component.UNSAFE_queryAllByType(TouchableOpacity)[2];

    fireEvent.press(navigationPrevButton);
    expect(onVisibleDateChange).toBeCalledTimes(1);

    fireEvent.press(navigationNextButton);
    expect(onVisibleDateChange).toBeCalledTimes(2);

  });

  it('should render custom left arrow', () => {
    const onVisibleDateChange = jest.fn();

    const renderArrow = (props: { onPress: () => void }): React.ReactElement => {
      return (
        <TouchableOpacity
          testID='@arrow/left'
          onPress={props.onPress}
        >
          <Text>
            LEFT
          </Text>
        </TouchableOpacity>
      );
    };

    const component = render(
      <TestCalendar
        renderArrowLeft={renderArrow}
        onVisibleDateChange={onVisibleDateChange}
      />
    );

    const leftArrow = component.queryByTestId('@arrow/left');
    fireEvent.press(leftArrow);

    expect(onVisibleDateChange).toBeCalled();
  });

  it('should render custom right arrow', () => {
    const onVisibleDateChange = jest.fn();

    const renderArrow = (props: { onPress: () => void }): React.ReactElement => {
      return (
        <TouchableOpacity
          testID='@arrow/right'
          onPress={props.onPress}
        >
          <Text>
            RIGHT
          </Text>
        </TouchableOpacity>
      );
    };

    const component = render(
      <TestCalendar
        renderArrowRight={renderArrow}
        onVisibleDateChange={onVisibleDateChange}
      />
    );

    const leftArrow = component.queryByTestId('@arrow/right');
    fireEvent.press(leftArrow);

    expect(onVisibleDateChange).toBeCalled();
  });

});
