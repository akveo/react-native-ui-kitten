/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  fireEvent,
  render,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { ApplicationProvider } from '../../theme';
import {
  Calendar,
  CalendarComponent,
  CalendarProps,
} from './calendar.component';
import { CalendarViewModes } from './type';

describe('@calendar: component checks', () => {

  /*
   * Get rid of useNativeDriver warnings
   */
  beforeAll(() => {
    jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  const now: Date = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

  const TestCalendar = React.forwardRef((props: Partial<CalendarProps>, ref: React.Ref<CalendarComponent>) => {
    const [date, setDate] = React.useState<Date>(props.date);

    const onSelect = (nextDate: Date): void => {
      if (props.onSelect) {
        props.onSelect(nextDate);
      }
      setDate(date);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <Calendar
          ref={ref}
          {...props}
          date={date}
          onSelect={onSelect}
        />
      </ApplicationProvider>
    );
  });

  it('should call onSelect when date cell is pressed with it\'s date', () => {
    const onSelect = jest.fn((date: Date) => {
      expect(date).toEqual(new Date(now.getFullYear(), now.getMonth(), 5));
    });

    const component = render(
      <TestCalendar onSelect={onSelect}/>,
    );

    fireEvent.press(component.getAllByText('5')[0]);
  });

  it('should be rendered with view passed to startView prop', () => {
    const componentRef = React.createRef<CalendarComponent>();
    render(
      <TestCalendar ref={componentRef} startView={CalendarViewModes.YEAR}/>,
    );

    expect(componentRef.current.state.viewMode).toEqual(CalendarViewModes.YEAR);
  });

  it('should change month to next when navigation button pressed', () => {
    const componentRef = React.createRef<CalendarComponent>();
    const component = render(
      <TestCalendar ref={componentRef}/>,
    );

    const initialDate = componentRef.current.state.visibleDate;
    const navigationNextButton = component.getAllByType(TouchableOpacity)[2];

    fireEvent.press(navigationNextButton);

    const nextMonth = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, initialDate.getDate());

    expect(componentRef.current.state.visibleDate).toEqual(nextMonth);
  });

  it('should change month to previous when navigation button pressed', () => {
    const componentRef = React.createRef<CalendarComponent>();
    const component = render(
      <TestCalendar ref={componentRef}/>,
    );

    const initialDate = componentRef.current.state.visibleDate;
    const navigationPrevButton = component.getAllByType(TouchableOpacity)[1];

    fireEvent.press(navigationPrevButton);

    const previousMonth = new Date(initialDate.getFullYear(), initialDate.getMonth() - 1, initialDate.getDate());

    expect(componentRef.current.state.visibleDate).toEqual(previousMonth);
  });

  it('should change year to next when navigation button pressed', () => {
    const componentRef = React.createRef<CalendarComponent>();
    const component = render(
      <TestCalendar ref={componentRef} startView={CalendarViewModes.YEAR}/>,
    );

    const initialDate = componentRef.current.state.visibleDate;
    const navigationPrevButton = component.getAllByType(TouchableOpacity)[2];

    fireEvent.press(navigationPrevButton);

    const nextYear = new Date(initialDate.getFullYear() + 12, initialDate.getMonth(), initialDate.getDate());

    expect(componentRef.current.state.visibleDate).toEqual(nextYear);
  });

  it('should change year to previous when navigation button pressed', () => {
    const componentRef = React.createRef<CalendarComponent>();
    const component = render(
      <TestCalendar ref={componentRef} startView={CalendarViewModes.YEAR}/>,
    );

    const initialDate = componentRef.current.state.visibleDate;
    const navigationPrevButton = component.getAllByType(TouchableOpacity)[1];

    fireEvent.press(navigationPrevButton);

    const nextYear = new Date(initialDate.getFullYear() - 12, initialDate.getMonth(), initialDate.getDate());

    expect(componentRef.current.state.visibleDate).toEqual(nextYear);
  });

  it('should scroll to current month when scrollToToday called', () => {
    const componentRef = React.createRef<CalendarComponent>();
    render(
      <TestCalendar
        ref={componentRef}
        date={new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())}
      />,
    );

    componentRef.current.scrollToToday();

    expect(componentRef.current.state.visibleDate.getMonth()).toEqual(today.getMonth());
  });

});
