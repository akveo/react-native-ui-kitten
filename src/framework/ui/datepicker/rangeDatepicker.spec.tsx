import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  render,
  waitForElement,
  fireEvent,
  RenderAPI,
} from 'react-native-testing-library';
import { ApplicationProvider } from '@kitten/theme';
import {
  mapping,
  theme,
} from '../support/tests';
import { Text } from '../text/text.component';
import {
  RangeDatepicker,
  RangeDatepickerProps,
} from './rangeDatepicker.component';
import { CalendarRange } from '../calendar/type';

interface State {
  range: CalendarRange<Date>;
}

type TestAppProps = Omit<RangeDatepickerProps, 'onSelect'>;

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
        <RangeDatepicker
          {...this.props}
          range={this.state.range}
          onSelect={this.onSelect}
        />
      </ApplicationProvider>
    );
  }
}

describe('@ range datepicker component checks', () => {

  it('* onSelect works properly', async () => {
    const application: RenderAPI = render(
      <TestApplication range={{}}/>,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[0]);

    const dateControl1 = await waitForElement(() => {
      return application.getAllByText('11')[0];
    });
    const dateControl2 = await waitForElement(() => {
      return application.getAllByText('22')[0];
    });

    fireEvent.press(dateControl1);
    fireEvent.press(dateControl2);

    const title: string = application.getAllByType(Text)[0].props.children;

    expect(title).toMatch('11');
    expect(title).toMatch('2');
  });

});
