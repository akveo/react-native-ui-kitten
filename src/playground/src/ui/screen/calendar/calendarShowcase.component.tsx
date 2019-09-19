import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Calendar,
  CalendarElement,
  CalendarProps,
  Button,
  Divider,
} from '@kitten/ui';
import { CalendarComponent } from '@kitten/ui/calendar/calendar.component';

interface State {
  date: Date;
}

interface ComponentProps {
  withFooter?: boolean;
}

type Props = ComponentProps & CalendarProps<Date>;

export class CalendarShowcase extends React.Component<Props, State> {

  static defaultProps: Partial<Props> = {
    withFooter: false,
  };

  private calendarRef: React.RefObject<CalendarComponent<Date>> = React.createRef();

  public state: State = {
    date: this.props.date,
  };

  private onSelect = (date: Date) => {
    this.setState({ date });
  };

  private onTodayPress = (): void => {
    this.calendarRef.current.scrollToToday();
  };

  private renderFooterElement = (): React.ReactElement<any> => {
    return (
      <React.Fragment>
        <Divider style={styles.footerDivider}/>
        <View style={styles.footerContainer}>
          <Button onPress={this.onTodayPress}>
            Today
          </Button>
        </View>
      </React.Fragment>
    );
  };

  private renderFooter = (): React.ReactElement<any> => {
    const { withFooter } = this.props;

    return withFooter && this.renderFooterElement();
  };

  public render(): CalendarElement<Date> {
    return (
      <Calendar
        {...this.props}
        ref={this.calendarRef}
        date={this.state.date}
        renderFooter={this.renderFooter}
        onSelect={this.onSelect}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerDivider: {
    marginVertical: 12,
  },
});
