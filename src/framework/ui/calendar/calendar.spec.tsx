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
import { CalendarHeader } from './components/calendarHeader.component';

jest.useFakeTimers();

const now: Date = new Date();

interface State {
  date: Date;
}

interface AdditionalProps {
  calendarRef?: React.LegacyRef<CalendarComponent<Date>>;
}

type TestAppProps = Omit<CalendarProps<Date>, 'onSelect'> & AdditionalProps;

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
    const month: number = 9 - 1;
    const expectedDate: Date = new Date(Date.UTC(2019, month, 5));
    const application: RenderAPI = render(<TestApplication/>);

    fireEvent.press(application.getAllByText('5')[1]);
    const { date } = application.getByType(Calendar).props;

    expect(date.toString()).toBe(expectedDate.toString());
  });

  it('* year view appear', () => {
    const expectedViewModeId: string = 'YEAR';
    const calendarRef: React.LegacyRef<CalendarComponent<Date>> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication
        calendarRef={calendarRef}
        min={new Date(now.getFullYear() - 1, 0, 1)}
        max={new Date(now.getFullYear() + 1, 0, 1)}
      />,
    );

    fireEvent.press(application.getAllByText('Sep 2019')[0]);
    const { id } = calendarRef.current.state.viewMode;

    expect(id).toBe(expectedViewModeId);
  });

  it('* month view appear/year select', () => {
    const expectedViewModeId: string = 'MONTH';
    const calendarRef: React.LegacyRef<CalendarComponent<Date>> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication
        calendarRef={calendarRef}
        min={new Date(now.getFullYear() - 1, 0, 1)}
        max={new Date(now.getFullYear() + 1, 0, 1)}
      />,
    );

    fireEvent.press(application.getAllByText('Sep 2019')[0]);
    fireEvent.press(application.getAllByText('2018')[0]);
    const { id } = calendarRef.current.state.viewMode;

    expect(id).toBe(expectedViewModeId);
  });

  it('* day view appear/month select', () => {
    const month: number = 1 - 1;
    const expectedViewModeId: string = 'DATE';
    const expectedVisibleDate: Date = new Date(Date.UTC(2018, month, 1));
    const calendarRef: React.LegacyRef<CalendarComponent<Date>> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication
        calendarRef={calendarRef}
        min={new Date(now.getFullYear() - 1, 0, 1)}
        max={new Date(now.getFullYear() + 1, 0, 1)}
      />,
    );

    fireEvent.press(application.getAllByText('Sep 2019')[0]);
    fireEvent.press(application.getAllByText('2018')[0]);
    fireEvent.press(application.getAllByText('Jan')[0]);

    const { viewMode, visibleDate } = calendarRef.current.state;

    expect(viewMode.id).toBe(expectedViewModeId);
    expect(visibleDate.toString()).toBe(expectedVisibleDate.toString());
  });

  it('* calendar day pager works', () => {
    const expectedCalendarHeaderTitle: string = 'Oct 2019';
    const calendarRef: React.LegacyRef<CalendarComponent<Date>> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication
        calendarRef={calendarRef}
        min={new Date(now.getFullYear() - 1, 0, 1)}
        max={new Date(now.getFullYear() + 1, 0, 1)}
      />,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[2]);
    const { title } = application.getAllByType(CalendarHeader)[0].props;

    // approx animation time
    setTimeout(() => expect(title).toBe(expectedCalendarHeaderTitle), 2000);
  });

  it('* calendar year pager works', () => {
    const expectedCalendarHeaderTitle: string = '2026';
    const calendarRef: React.LegacyRef<CalendarComponent<Date>> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication
        calendarRef={calendarRef}
        min={new Date(now.getFullYear() - 20, 0, 1)}
        max={new Date(now.getFullYear() + 10, 0, 1)}
      />,
    );

    fireEvent.press(application.getAllByText('Sep 2019')[0]);
    fireEvent.press(application.getAllByType(TouchableOpacity)[2]);
    fireEvent.press(application.getAllByText('2026')[0]);

    const { title } = application.getAllByType(CalendarHeader)[0].props;

    expect(title).toBe(expectedCalendarHeaderTitle);
  });

  it('* onToday method works properly', () => {
    const expectedVisibleDateString: string = now.toISOString().split('T')[0];
    const calendarRef: React.LegacyRef<CalendarComponent<Date>> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication
        calendarRef={calendarRef}
        min={new Date(now.getFullYear() - 1, 0, 1)}
        max={new Date(now.getFullYear() + 1, 0, 1)}
      />,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[2]);
    fireEvent.press(application.getAllByType(TouchableOpacity)[2]);

    calendarRef.current.scrollToToday();
    const visibleDateString: string = calendarRef.current.state.visibleDate
      .toISOString().split('T')[0];

    expect(visibleDateString).toBe(expectedVisibleDateString);
  });

});
