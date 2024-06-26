/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  StyleProp,
  StyleSheet,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import {
  EvaInputSize,
  EvaStatus,
  FalsyFC,
  FalsyText,
  RenderProp,
  TouchableWithoutFeedback,
} from '../../devsupport';
import {
  Interaction,
  StyledComponentProps,
} from '../../theme';
import { BaseCalendarProps, BaseCalendarRef } from '../calendar/baseCalendar.component';
import { CalendarElement } from '../calendar/calendar.component';
import { RangeCalendarElement } from '../calendar/rangeCalendar.component';
import { Popover } from '../popover/popover.component';
import {
  PopoverPlacement,
  PopoverPlacements,
} from '../popover/type';
import { TextProps } from '../text/text.component';
import { getComponentStyle } from './baseDatepicker.utils';

export interface BaseDatepickerProps<D = Date> extends StyledComponentProps,
  TouchableOpacityProps,
  BaseCalendarProps<D> {

  controlStyle?: StyleProp<ViewStyle>;
  label?: RenderProp<TextProps> | string | number;
  caption?: RenderProp<TextProps> | string | number;
  accessoryLeft?: RenderProp<Partial<ImageProps>>;
  accessoryRight?: RenderProp<Partial<ImageProps>>;
  status?: EvaStatus;
  size?: EvaInputSize;
  placeholder?: RenderProp<TextProps> | string | number;
  placement?: PopoverPlacement | string;
  backdropStyle?: StyleProp<ViewStyle>;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface DerivedDatepickerProps<D = Date> extends BaseDatepickerProps<D> {
  renderCalendar: () => CalendarElement<D> | RangeCalendarElement<D>;
  getComponentTitle: () => RenderProp<TextProps> | string | number;
  clear: () => void;
}

export interface BaseDatepickerRef<D = Date> extends BaseCalendarRef<D> {
  focus: () => void;
  blur: () => void;
  isFocused: () => boolean;
}

function BaseDatepickerComponent<D = Date>(
  props: DerivedDatepickerProps<D>,
  ref: React.RefObject<BaseDatepickerRef<D>>,
): React.ReactElement<DerivedDatepickerProps<D>> {
  const {
    eva,
    style,
    testID,
    backdropStyle,
    label,
    caption,
    placement = PopoverPlacements.BOTTOM_START,
    onFocus,
    onBlur,
    renderCalendar,
    getComponentTitle,
  } = props;
  const evaStyle = getComponentStyle(eva.style);

  const calendarRef = React.useRef<BaseCalendarRef<D>>(null);
  const [visible, setVisible] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    ...calendarRef.current,
    focus,
    blur,
    isFocused,
  }));

  const focus = (): void => {
    setVisible(true);
    onPickerVisible();
  };

  const blur = (): void => {
    setVisible(false);
    onPickerInvisible();
  };

  const isFocused = (): boolean => {
    return visible;
  };

  const onPress = (event: GestureResponderEvent): void => {
    setPickerVisible();
    props.onPress?.(event);
  };

  const onPressIn = (event: GestureResponderEvent): void => {
    eva.dispatch([Interaction.ACTIVE]);
    props.onPressIn?.(event);
  };

  const onPressOut = (event: GestureResponderEvent): void => {
    eva.dispatch([]);
    props.onPressOut?.(event);
  };

  const onPickerVisible = (): void => {
    eva.dispatch([Interaction.ACTIVE]);
    onFocus?.();
  };

  const onPickerInvisible = (): void => {
    eva.dispatch([]);
    onBlur?.();
  };

  const setPickerVisible = (): void => {
    setVisible(true);
    onPickerVisible();
  };

  const setPickerInvisible = (): void => {
    setVisible(false);
    onPickerInvisible();
  };

  const renderInputElement = (): React.ReactElement => {
    return (
      <TouchableWithoutFeedback
        {...props}
        style={[evaStyle.control, styles.control, props.controlStyle]}
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <FalsyFC
          style={evaStyle.icon}
          component={props.accessoryLeft}
        />
        <FalsyText
          style={evaStyle.text}
          numberOfLines={1}
          ellipsizeMode='tail'
          component={getComponentTitle()}
        />
        <FalsyFC
          style={evaStyle.icon}
          component={props.accessoryRight}
        />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View
      style={style}
      testID={testID}
    >
      <FalsyText
        style={[evaStyle.label, styles.label]}
        component={label}
      />
      <Popover
        style={[evaStyle.popover, styles.popover]}
        backdropStyle={backdropStyle}
        placement={placement}
        visible={visible}
        anchor={renderInputElement}
        onBackdropPress={setPickerInvisible}
      >
        {renderCalendar()}
      </Popover>
      <FalsyText
        style={[evaStyle.captionLabel, styles.captionLabel]}
        component={caption}
      />
    </View>
  );
}

const Component = React.forwardRef(BaseDatepickerComponent);

export {
  Component as BaseDatepickerComponent,
};

const styles = StyleSheet.create({
  popover: {
    borderWidth: 0,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    textAlign: 'left',
  },
  captionLabel: {
    textAlign: 'left',
  },
});
