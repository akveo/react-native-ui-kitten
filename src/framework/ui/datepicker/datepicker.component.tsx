import React from 'react';
import {
  Button,
  ButtonElement,
} from '../button/button.component';
import {
  Popover,
  PopoverProps,
  PopoverElement,
} from '../popover/popover.component';
import {
  CalendarElement,
  Calendar,
  CalendarProps,
} from '../calendar/calendar.component';
import { styled, StyleType } from '@kitten/theme';
import { Dimensions } from 'react-native';

interface State {
  visible: boolean;
}

export class DatepickerComponent<D> extends React.Component<CalendarProps<D>, State> {

  static styledComponentName: string = 'Datepicker';

  public state: State = {
    visible: false,
  };

  private getComponentStyles = (style: StyleType): StyleType => {
    return {
      popover: {
        indent: style.popoverMarginHorizontal,
      },
    };
  };

  private toggleVisible = (): void => {
    const visible: boolean = !this.state.visible;

    this.setState({ visible });
  };

  private renderCalendar = (): CalendarElement<D> => {
    return (
      <Calendar {...this.props}/>
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, date } = this.props;
    const { popover } = this.getComponentStyles(themedStyle);

    const popoverStyle: StyleType = {
      width: Dimensions.get('window').width - popover.indent,
    };

    const title: string = date ? date.toString() : 'Show Calendar';

    return (
      <Popover
        style={popoverStyle}
        visible={this.state.visible}
        content={this.renderCalendar()}
        onBackdropPress={this.toggleVisible}>
        <Button onPress={this.toggleVisible}>
          {title}
        </Button>
      </Popover>
    );
  }
}

export const Datepicker = styled(DatepickerComponent);
