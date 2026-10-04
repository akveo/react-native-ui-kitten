/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo } from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ChildrenWithProps,
  EvaSize,
  EvaStatus,
  LiteralUnion,
  areEqualProps,
} from '../../devsupport';
import {
  useStyled,
  StyleType,
} from '../../theme';
import {
  ButtonElement,
  ButtonProps,
} from '../button/button.component';

export interface ButtonGroupProps extends ViewProps {
  children: ChildrenWithProps<ButtonProps>;
  status?: EvaStatus;
  size?: EvaSize;
  appearance?: LiteralUnion<'filled' | 'outline' | 'ghost'>;
  /**
   * Index of the selected button. The selected button renders `filled`
   * (unless it sets its own `appearance`), the others keep the group appearance, so use it
   * with `appearance='outline'` or `'ghost'`: in a `filled` group every button looks the same.
   * Each button also reports whether it is selected to assistive technologies.
   */
  selectedIndex?: number;
  /**
   * Called with the index of the pressed button, after the button's own `onPress`.
   */
  onSelect?: (index: number) => void;
}

export type ButtonGroupElement = React.ReactElement<ButtonGroupProps>;

/**
 * A group of buttons with additional styles provided by Eva.
 * ButtonGroup should contain Button components to provide a usable component.
 *
 * @extends React.FC
 *
 * @property {ReactElement<ButtonProps> | ReactElement<ButtonProps>[]} children -
 * Buttons to be rendered within the group.
 *
 * @property {string} appearance - Appearance of the component.
 * Can be `filled`, `outline` or `ghost`.
 * Defaults to *filled*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @property {number} selectedIndex - Index of the selected button.
 * The selected button renders `filled`, the others keep the group appearance,
 * which turns the group into a toggle when combined with `onSelect`.
 * Use it with `appearance` `outline` or `ghost`: in a `filled` group (the default) the selected
 * button looks like the others. Screen readers announce each button as selected or not.
 *
 * @property {(number) => void} onSelect - Called with the index of the pressed button.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 * `appearance`, `status` and `size` set on a child Button win over the group's.
 *
 * @overview-example ButtonGroupSimpleUsage
 * Button Group accepts buttons as child elements.
 *
 * @overview-example ButtonGroupAppearance
 * Appearance passed to group is also applied for grouped buttons.
 *
 * @overview-example ButtonGroupStatus
 * Same for status.
 *
 * @overview-example ButtonGroupSize
 * And size.
 *
 * @overview-example ButtonGroupOutline
 *
 * @overview-example ButtonGroupWithIcons
 *
 * @overview-example ButtonGroupToggle
 * A toggle: `selectedIndex` fills the selected button and `onSelect` reports presses.
 */

const getComponentStyle = (source: StyleType): StyleType => {
  const { dividerBackgroundColor, dividerWidth, ...containerParameters } = source;

  return {
    container: {
      ...containerParameters,
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      borderWidth: containerParameters.borderWidth + 0.25,
    },
    button: {
      borderWidth: dividerWidth,
      borderColor: dividerBackgroundColor,
    },
  };
};

const ButtonGroupComponent: React.FC<ButtonGroupProps> = ({
  style,
  children,
  appearance,
  size,
  status,
  selectedIndex,
  onSelect,
  ...viewProps
}) => {
  const { style: evaStyleRaw } = useStyled('ButtonGroup', { appearance });
  const evaStyle = useMemo(() => getComponentStyle(evaStyleRaw), [evaStyleRaw]);

  const childCount = React.Children.count(children);

  const isFirstElement = useCallback((index: number): boolean => {
    return index === 0;
  }, []);

  const isLastElement = useCallback((index: number): boolean => {
    return index === childCount - 1;
  }, [childCount]);

  const renderButtonElement = useCallback((element: ButtonElement, index: number): ButtonElement => {
    const { borderRadius }: ViewStyle = evaStyle.container;
    const { borderWidth, borderColor }: ViewStyle = evaStyle.button;

    const shapeStyle: ViewStyle = !isLastElement(index) && {
      borderEndWidth: borderWidth,
      borderEndColor: borderColor,
    };

    const startShapeStyle: ViewStyle = isFirstElement(index) && {
      borderTopStartRadius: borderRadius,
      borderBottomStartRadius: borderRadius,
    };

    const endShapeStyle: ViewStyle = isLastElement(index) && {
      borderTopEndRadius: borderRadius,
      borderBottomEndRadius: borderRadius,
    };

    const isSelected = selectedIndex !== undefined && selectedIndex === index;
    // With a selection, every button tells assistive technologies whether it is the selected one,
    // unless the child already set that state itself.
    const childSelected = element.props['aria-selected'] ?? element.props.accessibilityState?.selected;
    const selectedState = selectedIndex !== undefined && childSelected === undefined
      ? { 'aria-selected': isSelected }
      : {};
    const childOnPress = element.props.onPress;
    const onPress = onSelect ? (event: GestureResponderEvent): void => {
      childOnPress?.(event);
      onSelect(index);
    } : childOnPress;

    // Child props win over the group's, so a Button can opt out of the shared
    // appearance / status / size. The selected button fills unless it did.
    return React.cloneElement(element, {
      key: index,
      appearance: element.props.appearance ?? (isSelected ? 'filled' : appearance),
      size: element.props.size ?? size,
      status: element.props.status ?? status,
      onPress,
      ...selectedState,
      style: [element.props.style, styles.button, shapeStyle, startShapeStyle, endShapeStyle],
    });
  }, [evaStyle, appearance, size, status, selectedIndex, onSelect, isFirstElement, isLastElement]);

  const buttonElements = React.Children.map(children, (element: ButtonElement, index: number): ButtonElement => {
    return renderButtonElement(element, index);
  });

  return (
    <View
      {...viewProps}
      style={[evaStyle.container, styles.container, style]}
    >
      {buttonElements}
    </View>
  );
};

ButtonGroupComponent.displayName = 'ButtonGroup';

export const ButtonGroup = React.memo(ButtonGroupComponent, areEqualProps);
ButtonGroup.displayName = 'ButtonGroup';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  button: {
    borderRadius: 0,
    borderWidth: 0,
  },
});
