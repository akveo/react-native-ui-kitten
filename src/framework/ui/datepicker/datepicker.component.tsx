import React from 'react';
import {
  ImageStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ImageProps,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { Popover } from '../popover/popover.component';
import {
  CalendarElement,
  Calendar,
  CalendarProps,
} from '../calendar/calendar.component';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Dimensions } from 'react-native';
import { CalendarRange } from '../calendar/type';

interface State {
  visible: boolean;
}

interface ComponentProps {
  icon?: (style: ImageStyle) => React.ReactElement<ImageProps>;
}

type DatepickerProps<D> = ComponentProps & CalendarProps<D> & TouchableOpacityProps & StyledComponentProps;

export class DatepickerComponent<D> extends React.Component<DatepickerProps<D>, State> {

  static styledComponentName: string = 'Datepicker';

  public state: State = {
    visible: false,
  };

  constructor(props: DatepickerProps<D>) {
    super(props);
    this.range = {
      startDate: props.startDate,
      endDate: props.endDate,
    };
  }

  private range: CalendarRange<D>;

  private getComponentStyles = (style: StyleType): StyleType => {
    const {
      popoverMarginHorizontal,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      iconWidth,
      iconHeight,
      iconTintColor,
      ...containerStyles
    } = style;

    return {
      container: containerStyles,
      icon: {
        width: iconWidth,
        height: iconHeight,
        tintColor: iconTintColor,
      },
      text: {
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
      },
      popover: {
        indent: popoverMarginHorizontal,
      },
    };
  };

  private onSelect = (date: D, range: CalendarRange<D>): void => {
    const { onSelect } = this.props;
    this.range = range;

    if (onSelect) {
      onSelect(date, range);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private toggleVisible = (): void => {
    const visible: boolean = !this.state.visible;

    this.setState({ visible }, this.dispatchActive);
  };

  private dispatchActive = (): void => {
    const { visible } = this.state;
    if (visible) {
      this.props.dispatch([Interaction.ACTIVE]);
    } else {
      this.props.dispatch([]);
    }
  };

  private formatDateToString = (date: D): string => {
    const selectedDate: Date = new Date(Date.parse(date.toString()));
    const day: number = selectedDate.getDate();
    const month: number = selectedDate.getMonth() + 1;
    const year: number = selectedDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  private getComponentTitle = (): string => {
    const { range, date } = this.props;
    const { startDate, endDate } = this.range;

    if (!date && !startDate && !endDate) {
      return 'dd/mm/yyyy';
    }


    if (range) {
      const start: string = startDate ? this.formatDateToString(startDate) : '';
      const end: string = endDate ? this.formatDateToString(endDate) : '';

      return `${start} - ${end}`;
    } else {
      return this.formatDateToString(date);
    }
  };

  private renderCalendar = (): CalendarElement<D> => {
    return (
      <Calendar
        {...this.props}
        startDate={this.range.startDate}
        endDate={this.range.endDate}
        onSelect={this.onSelect}
      />
    );
  };

  private renderIcon = (style: StyleType): React.ReactElement<ImageProps> => {
    const { icon } = this.props;

    return icon && icon(style);
  };

  private renderText = (style: StyleType): TextElement => {
    return (
      <Text style={style}>
        {this.getComponentTitle()}
      </Text>
    );
  };

  private renderControl = (): React.ReactElement<TouchableOpacityProps> => {
    const { themedStyle, disabled } = this.props;
    const { container, icon, text } = this.getComponentStyles(themedStyle);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        disabled={disabled}
        style={[container, styles.container]}
        onPress={this.toggleVisible}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {this.renderText(text)}
        {this.renderIcon(icon)}
      </TouchableOpacity>
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, date } = this.props;
    const { popover } = this.getComponentStyles(themedStyle);

    const popoverStyle: StyleType = {
      width: Dimensions.get('window').width - popover.indent,
    };

    return (
      <Popover
        style={popoverStyle}
        visible={this.state.visible}
        content={this.renderCalendar()}
        onBackdropPress={this.toggleVisible}>
        {this.renderControl()}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export const Datepicker = styled(DatepickerComponent);
