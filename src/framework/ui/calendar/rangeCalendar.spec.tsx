import React from 'react';
import {
  render,
  fireEvent,
  RenderAPI,
} from 'react-native-testing-library';
import { ApplicationProvider } from '@kitten/theme';
import {
  RangeCalendar,
  RangeCalendarProps,
} from './rangeCalendar.component';
import {
  mapping,
  theme,
} from '../support/tests';
import { CalendarRange } from '@kitten/ui/calendar/type';

jest.useFakeTimers();

interface State {
  range: CalendarRange<Date>;
}

type TestAppProps = Omit<RangeCalendarProps<Date>, 'range' | 'onSelect'>;

class TestApplication extends React.Component<TestAppProps, State> {

  public state: State = {
    range: {
      startDate: null,
      endDate: null,
    },
  };

  private onSelect = (range: CalendarRange<Date>): void => {
    this.setState({ range });
  };

  public render(): React.ReactNode {
    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <RangeCalendar
          {...this.props}
          range={this.state.range}
          onSelect={this.onSelect}
        />
      </ApplicationProvider>
    );
  }
}

describe('@calendar: component checks', () => {

  it('* start range date selected properly', () => {
    const month: number = 9 - 1;
    const expectedStartDate: Date = new Date(Date.UTC(2019, month, 11));
    const application: RenderAPI = render(<TestApplication/>);

    fireEvent.press(application.getAllByText('11')[1]);
    const { range } = application.getByType(RangeCalendar).props;

    expect(range.startDate.toString()).toBe(expectedStartDate.toString());
  });

  it('* range selected works properly', () => {
    const month: number = 9 - 1;
    const expectedStartDate: Date = new Date(Date.UTC(2019, month, 11));
    const expectedEndDate: Date = new Date(Date.UTC(2019, month, 26));
    const application: RenderAPI = render(<TestApplication/>);

    fireEvent.press(application.getAllByText('11')[1]);
    fireEvent.press(application.getAllByText('26')[1]);
    const { range } = application.getByType(RangeCalendar).props;

    expect(range.startDate.toString()).toBe(expectedStartDate.toString());
    expect(range.endDate.toString()).toBe(expectedEndDate.toString());
  });

  it('* range re-selected properly 1', () => {
    const month: number = 9 - 1;
    const expectedStartDate: Date = new Date(Date.UTC(2019, month, 19));
    const application: RenderAPI = render(<TestApplication/>);

    fireEvent.press(application.getAllByText('11')[1]);
    fireEvent.press(application.getAllByText('26')[1]);
    fireEvent.press(application.getAllByText('19')[1]);
    const { range } = application.getByType(RangeCalendar).props;

    expect(range.startDate.toString()).toBe(expectedStartDate.toString());
    expect(range.endDate).toBeNull();
  });

  it('* range re-selected properly 2', () => {
    const month: number = 9 - 1;
    const expectedStartDate: Date = new Date(Date.UTC(2019, month, 8));
    const application: RenderAPI = render(<TestApplication/>);

    fireEvent.press(application.getAllByText('11')[1]);
    fireEvent.press(application.getAllByText('26')[1]);
    fireEvent.press(application.getAllByText('8')[1]);
    const { range } = application.getByType(RangeCalendar).props;

    expect(range.startDate.toString()).toBe(expectedStartDate.toString());
    expect(range.endDate).toBeNull();
  });

});
