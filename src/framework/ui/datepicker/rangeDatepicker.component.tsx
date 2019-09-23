import React from 'react';
import {
  RangeCalendar,
  RangeCalendarProps,
  RangeCalendarElement,
} from '../calendar/rangeCalendar.component';
import { styled } from '@kitten/theme';
import { BaseDatepickerComponent } from './baseDatepicker.component';
import { NativeDateService } from '../calendar/service/nativeDate.service';

const FULL_DATE_FORMAT_STRING: string = 'DD/MM/YYYY';

/**
 * Styled `RangeDatepicker` component.
 * Renders `RangeCalendar` component in the `Popover`.
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
 * import { RangeDatepicker } from 'react-native-ui-kitten';
 *
 * export class BasicDatepicker extends React.Component {
 *
 *   state = {
 *     range: {
 *       startDate: null,
 *       endDate: null,
 *     },
 *   };
 *
 *   onSelect = (range) => {
 *     this.setState({ range });
 *   };
 *
 *   render() {
 *     return (
 *       <RangeDatepicker
 *         range={this.state.range}
 *         onSelect={this.onSelect}
 *       />
 *     );
 *   }
 * }
 * ```
 */

export class RangeDatepickerComponent<D> extends BaseDatepickerComponent<D, RangeCalendarProps<D>> {

  static styledComponentName: string = 'Datepicker';

  static defaultProps = {
    dateService: new NativeDateService(),
  };

  protected formatDateToString(date: D): string {
    return this.props.dateService.format(date, FULL_DATE_FORMAT_STRING);
  }

  protected getComponentTitle(): string {
    const { range } = this.props;
    const { startDate, endDate } = range;

    if (startDate || endDate) {
      const start: string = startDate ? this.formatDateToString(startDate) : '';
      const end: string = endDate ? this.formatDateToString(endDate) : '';

      return `${start} - ${end}`;
    } else {
      return 'dd/mm/yyyy';
    }
  }

  protected renderCalendar(): RangeCalendarElement<D> {
    return (
      <RangeCalendar {...this.props}/>
    );
  }
}

export const RangeDatepicker = styled(RangeDatepickerComponent);
