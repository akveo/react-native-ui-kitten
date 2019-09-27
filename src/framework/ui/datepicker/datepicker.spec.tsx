import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageProps,
  TouchableOpacity,
} from 'react-native';
import {
  render,
  waitForElement,
  fireEvent,
  RenderAPI,
} from 'react-native-testing-library';
import { ApplicationProvider, StyleType } from '@kitten/theme';
import {
  Datepicker,
  DatepickerComponent,
} from './datepicker.component';
import {
  mapping,
  theme,
} from '../support/tests';
import { Text } from '../text/text.component';
import { CalendarProps } from '../calendar/calendar.component';
import { DatepickerProps } from './baseDatepicker.component';

interface State {
  date: Date;
}

interface AdditionalProps {
  datepickerRef?: React.LegacyRef<DatepickerComponent<Date>>;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
}

type TestAppProps = Omit<CalendarProps<Date>, 'onSelect'> & AdditionalProps & DatepickerProps<Date>;

class TestApplication extends React.Component<TestAppProps, State> {

  public state: State = {
    date: null,
  };

  private onSelect = (date: Date): void => {
    this.setState({ date });
  };

  public render(): React.ReactNode {
    const {
      datepickerRef,
      onPress,
      onPressIn,
      onPressOut,
      onLongPress,
      ...restProps
    } = this.props;

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={theme}>
        <Datepicker
          {...restProps}
          ref={datepickerRef}
          date={this.state.date}
          onPress={onPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onLongPress={onLongPress}
          onSelect={this.onSelect}
        />
      </ApplicationProvider>
    );
  }
}

describe('@ datepicker component checks', () => {

  it('* emits onPress', () => {
    const onPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication onPress={onPress}/>,
    );

    fireEvent.press(application.getAllByType(Datepicker)[0]);

    expect(onPress).toHaveBeenCalled();
  });

  it('* emits onPressIn', () => {
    const onPressIn = jest.fn();
    const application: RenderAPI = render(
      <TestApplication onPressIn={onPressIn}/>,
    );

    fireEvent(application.getAllByType(Datepicker)[0], 'pressIn');

    expect(onPressIn).toHaveBeenCalled();
  });

  it('* emits onPressOut', () => {
    const onPressOut = jest.fn();
    const application: RenderAPI = render(
      <TestApplication onPressOut={onPressOut}/>,
    );

    fireEvent(application.getAllByType(Datepicker)[0], 'pressOut');

    expect(onPressOut).toHaveBeenCalled();
  });

  it('* emits onLongPress', () => {
    const onLongPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication onLongPress={onLongPress}/>,
    );

    fireEvent(application.getAllByType(Datepicker)[0], 'longPress');

    expect(onLongPress).toHaveBeenCalled();
  });

  it('* visibility checks', () => {
    const datepickerRef: React.LegacyRef<DatepickerComponent<Date>> = React.createRef();
    const application: RenderAPI = render(
      <TestApplication datepickerRef={datepickerRef}/>,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[0]);
    const { visible } = datepickerRef.current.state;

    expect(visible).toBe(true);
  });

  it('* onSelect works properly', async () => {
    const application: RenderAPI = render(
      <TestApplication/>,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[0]);
    const dateControl = await waitForElement(() => {
      return application.getAllByText('11')[0];
    });
    fireEvent.press(dateControl);
    const title: string = application.getAllByType(Text)[0].props.children;

    expect(title).toMatch('11');
  });

  it('* icon renders properly', async () => {
    const iconUriString: string = 'https://akveo.github.io/eva-icons/fill/png/128/star.png';
    const renderIcon = (style: StyleType): React.ReactElement<ImageProps> => {
      return (
        <Image
          style={style}
          source={{ uri: iconUriString}}
        />
      );
    };
    const application: RenderAPI = render(
      <TestApplication icon={renderIcon}/>,
    );

    const source: string = application.getAllByType(Image)[0].props.source.uri;


    expect(source).toBe(iconUriString);
  });

});
