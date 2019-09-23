import React from 'react';
import {
  CalendarElement,
  Calendar,
  CalendarProps,
} from '../calendar/calendar.component';
import { styled } from '@kitten/theme';
import { BaseDatepickerComponent } from './baseDatepicker.component';
import { NativeDateService } from '../calendar/service/nativeDate.service';

const FULL_DATE_FORMAT_STRING: string = 'DD/MM/YYYY';

/**
 * Styled `Datepicker` component.
 * Renders `Calendar` component in the `Popover`.
 * Supports locales and different date objects like Moment.js or date-fns.
 * Composes date picker components in a horizontal pageable list.
 *
 * @extends React.Component
 *
 * @property {(style: ImageStyle) => React.ReactElement<ImageProps>} icon - Determines the icon of the component.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @property CalendarProps<D>
 *
 * @overview-example Basic Usage
 *
 * ```
 * import React from 'react';
 * import { Datepicker } from 'react-native-ui-kitten';
 *
 * export class BasicDatepicker extends React.Component {
 *
 *   state = {
 *     date: new Date(),
 *   };
 *
 *   onSelect = (date) => {
 *     this.setState({ date });
 *   };
 *
 *   render() {
 *     return (
 *       <Datepicker
 *         date={this.state.date}
 *         onSelect={this.onSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 */

export class DatepickerComponent<D> extends BaseDatepickerComponent<D, CalendarProps<D>> {

  static styledComponentName: string = 'Datepicker';

  static defaultProps = {
    dateService: new NativeDateService(),
  };

  protected formatDateToString(date: D): string {
    return this.props.dateService.format(date, FULL_DATE_FORMAT_STRING);
  }

  protected getComponentTitle(): string {
    const { date } = this.props;

    if (date) {
      return this.formatDateToString(date);
    } else {
      return 'dd/mm/yyyy';
    }
  }

  protected renderCalendar(): CalendarElement<D> {
    return (
      <Calendar {...this.props}/>
    );
  }
}

export const Datepicker = styled(DatepickerComponent);
