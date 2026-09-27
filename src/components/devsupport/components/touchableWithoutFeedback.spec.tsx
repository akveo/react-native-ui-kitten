import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TouchableWithoutFeedback } from './touchableWithoutFeedback.component';

describe('@touchable-without-feedback: component checks', () => {

  const host = (component: ReturnType<typeof render>) => component.getByTestId('touchable');

  it('should render without an opacity animation style', () => {
    const component = render(
      <TouchableWithoutFeedback testID='touchable' />,
    );

    expect(host(component).props.style).not.toEqual(expect.objectContaining({ opacity: expect.anything() }));
  });

  it('should forward press, press in and press out', () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();
    const component = render(
      <TouchableWithoutFeedback
        testID='touchable'
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      />,
    );

    fireEvent(host(component), 'pressIn');
    fireEvent.press(host(component));
    fireEvent(host(component), 'pressOut');

    expect(onPressIn).toHaveBeenCalledTimes(1);
    expect(onPress).toHaveBeenCalledTimes(1);
    expect(onPressOut).toHaveBeenCalledTimes(1);
  });

  it('should map onMouseEnter and onMouseLeave to hover events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    const component = render(
      <TouchableWithoutFeedback
        testID='touchable'
        // @ts-ignore: web-only props are typed on TouchableWeb
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />,
    );

    fireEvent(host(component), 'hoverIn');
    fireEvent(host(component), 'hoverOut');

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseLeave).toHaveBeenCalledTimes(1);
  });

  it('should keep a non-focusable touchable out of the keyboard tab order', () => {
    const component = render(
      <TouchableWithoutFeedback
        testID='touchable'
        focusable={false}
      />,
    );

    // react-native-web's Pressable emits tabIndex 0 unless told otherwise, and View
    // prefers tabIndex over focusable, so both must say "not a tab stop".
    expect(host(component).props.focusable).toEqual(false);
    expect(host(component).props.tabIndex).toEqual(-1);
  });

  it('should leave the tab order alone when focusable is not set', () => {
    const component = render(
      <TouchableWithoutFeedback testID='touchable' />,
    );

    expect(host(component).props.tabIndex).toBeUndefined();
  });

  it('should derive hit slop from height when useDefaultHitSlop is set', () => {
    const component = render(
      <TouchableWithoutFeedback
        testID='touchable'
        useDefaultHitSlop={true}
        style={{ height: 24 }}
      />,
    );

    expect(host(component).props.hitSlop).toEqual({ left: 16, top: 16, right: 16, bottom: 16 });
  });

  it('should prefer an explicit hitSlop', () => {
    const component = render(
      <TouchableWithoutFeedback
        testID='touchable'
        useDefaultHitSlop={true}
        hitSlop={4}
        style={{ height: 24 }}
      />,
    );

    expect(host(component).props.hitSlop).toEqual(4);
  });

  it('should forward accessibilityRole and keep role only when no native role is given', () => {
    const withBoth = render(
      <TouchableWithoutFeedback
        testID='touchable'
        role='option'
        accessibilityRole='menuitem'
      />,
    );
    expect(host(withBoth).props.accessibilityRole).toEqual('menuitem');
    expect(host(withBoth).props.role).toBeUndefined();

    const roleOnly = render(
      <TouchableWithoutFeedback
        testID='touchable'
        role='button'
      />,
    );
    expect(host(roleOnly).props.role).toEqual('button');
  });

  it('should not pass activeOpacity to the host', () => {
    const component = render(
      <TouchableWithoutFeedback
        testID='touchable'
        activeOpacity={0.2}
      />,
    );

    expect(host(component).props.activeOpacity).toBeUndefined();
  });
});
