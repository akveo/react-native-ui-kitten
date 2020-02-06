import React from 'react';
import {
  fireEvent,
  render,
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

const now: Date = new Date();

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

describe('@range-calendar: component checks', () => {

  it('* start range date selected properly', () => {
    const expectedStartDate: Date = new Date(now.getFullYear(), now.getMonth(), 11);
    const application: RenderAPI = render(<TestApplication/>);

    fireEvent.press(application.getAllByText('11')[0]);
    const { range } = application.getByType(RangeCalendar).props;

    expect(range.startDate.toString()).toBe(expectedStartDate.toString());
  });

  it('* range selected works properly', () => {
    const expectedStartDate: Date = new Date(now.getFullYear(), now.getMonth(), 11);
    const expectedEndDate: Date = new Date(now.getFullYear(), now.getMonth(), 15);
    const application: RenderAPI = render(<TestApplication/>);

    fireEvent.press(application.getAllByText('11')[0]);
    fireEvent.press(application.getAllByText('15')[0]);
    const { range } = application.getByType(RangeCalendar).props;

    expect(range.startDate.toString()).toBe(expectedStartDate.toString());
    expect(range.endDate.toString()).toBe(expectedEndDate.toString());
  });

  it('* range re-selected properly 1', () => {
    const expectedStartDate: Date = new Date(now.getFullYear(), now.getMonth(), 19);
    const application: RenderAPI = render(<TestApplication/>);

    fireEvent.press(application.getAllByText('11')[0]);
    fireEvent.press(application.getAllByText('15')[0]);
    fireEvent.press(application.getAllByText('19')[0]);
    const { range } = application.getByType(RangeCalendar).props;

    expect(range.startDate.toString()).toBe(expectedStartDate.toString());
    expect(range.endDate).toBeNull();
  });

  it('* range re-selected properly 2', () => {
    const expectedStartDate: Date = new Date(now.getFullYear(), now.getMonth(), 8);
    const application: RenderAPI = render(<TestApplication/>);

    fireEvent.press(application.getAllByText('11')[0]);
    fireEvent.press(application.getAllByText('15')[0]);
    fireEvent.press(application.getAllByText('8')[0]);
    const { range } = application.getByType(RangeCalendar).props;

    expect(range.startDate.toString()).toBe(expectedStartDate.toString());
    expect(range.endDate).toBeNull();
  });

});
