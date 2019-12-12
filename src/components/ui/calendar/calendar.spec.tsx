import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  render,
  fireEvent,
  RenderAPI,
} from 'react-native-testing-library';
import { ApplicationProvider } from '@kitten/theme';
import {
  Calendar,
  CalendarProps,
  CalendarComponent,
} from './calendar.component';
import {
  mapping,
  theme,
} from '../support/tests';
import { CalendarViewModes } from './type';

jest.useFakeTimers();

const now: Date = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);

const CURRENT_MONTH: number = now.getMonth();

interface State {
  date: Date;
}

interface AdditionalProps {
  calendarRef?: React.LegacyRef<CalendarComponent>;
}

type TestAppProps = Omit<CalendarProps, 'onSelect'> & AdditionalProps;

class TestApplication extends React.Component<TestAppProps, State> {

  public state: State = {
    date: null,
  };

  private onSelect = (date: Date): void => {
    this.setState({ date });
  };

  public render(): React.ReactNode {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <Calendar
          {...this.props}
          ref={this.props.calendarRef}
          date={this.state.date}
          onSelect={this.onSelect}
        />
      </ApplicationProvider>
    );
  }
}

describe('@calendar: component checks', () => {

  it('* date changes', () => {
    const expectedDate: Date = new Date(2019, CURRENT_MONTH, 5);
    const application: RenderAPI = render(<TestApplication/>);

    fireEvent.press(application.getAllByText('5')[0]);
    const { date } = application.getByType(Calendar).props;

    expect(date.toString()).toBe(expectedDate.toString());
  });

  it('* year view appear', () => {
    const calendarRef: React.LegacyRef<CalendarComponent> = React.createRef();
    render(
      <TestApplication
        calendarRef={calendarRef}
        startView={CalendarViewModes.YEAR}
      />,
    );
    const { id } = calendarRef.current.state.viewMode;

    expect(id).toBe(CalendarViewModes.YEAR.id);
  });

  it('* month view appear', () => {
    const calendarRef: React.LegacyRef<CalendarComponent> = React.createRef();
    render(
      <TestApplication
        calendarRef={calendarRef}
        startView={CalendarViewModes.MONTH}
      />,
    );
    const { id } = calendarRef.current.state.viewMode;

    expect(id).toBe(CalendarViewModes.MONTH.id);
  });

  it('* day view appear', () => {
    const calendarRef: React.LegacyRef<CalendarComponent> = React.createRef();
    render(
      <TestApplication
        calendarRef={calendarRef}
        startView={CalendarViewModes.DATE}
      />,
    );
    const { id } = calendarRef.current.state.viewMode;

    expect(id).toBe(CalendarViewModes.DATE.id);
  });

  it('* should change month to next', () => {
    const calendarRef: React.LegacyRef<CalendarComponent> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication calendarRef={calendarRef} />,
    );

    const initialDate = calendarRef.current.state.visibleDate;
    fireEvent.press(application.getAllByType(TouchableOpacity)[2]);
    const visibleDate = calendarRef.current.state.visibleDate;

    const expectedDate = new Date(initialDate.getFullYear(), initialDate.getMonth() + 1, initialDate.getDate());
    expect(visibleDate).toEqual(expectedDate);
  });

  it('* should change month to previous', () => {
    const calendarRef: React.LegacyRef<CalendarComponent> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication calendarRef={calendarRef} />,
    );

    const initialDate = calendarRef.current.state.visibleDate;
    fireEvent.press(application.getAllByType(TouchableOpacity)[1]);
    const visibleDate = calendarRef.current.state.visibleDate;

    const expectedDate = new Date(initialDate.getFullYear(), initialDate.getMonth() - 1, initialDate.getDate());
    expect(visibleDate).toEqual(expectedDate);
  });

  it('* should change year to next', () => {
    const calendarRef: React.LegacyRef<CalendarComponent> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication calendarRef={calendarRef} startView={CalendarViewModes.YEAR} />,
    );

    const initialDate = calendarRef.current.state.visibleDate;
    fireEvent.press(application.getAllByType(TouchableOpacity)[2]);
    const visibleDate = calendarRef.current.state.visibleDate;

    const expectedDate = new Date(initialDate.getFullYear() + 12, initialDate.getMonth(), initialDate.getDate());
    expect(visibleDate).toEqual(expectedDate);
  });

  it('* should change year to previous', () => {
    const calendarRef: React.LegacyRef<CalendarComponent> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication calendarRef={calendarRef} startView={CalendarViewModes.YEAR} />,
    );

    const initialDate = calendarRef.current.state.visibleDate;
    fireEvent.press(application.getAllByType(TouchableOpacity)[1]);
    const visibleDate = calendarRef.current.state.visibleDate;

    const expectedDate = new Date(initialDate.getFullYear() - 12, initialDate.getMonth(), initialDate.getDate());
    expect(visibleDate).toEqual(expectedDate);
  });

  it('* should change month to current', () => {
    const calendarRef: React.LegacyRef<CalendarComponent> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication
        calendarRef={calendarRef}
        date={new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())}
      />,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[2]);
    fireEvent.press(application.getAllByType(TouchableOpacity)[2]);

    calendarRef.current.scrollToToday();

    const visibleDate = calendarRef.current.state.visibleDate;

    expect(visibleDate.getMonth()).toEqual(today.getMonth());
  });

});
