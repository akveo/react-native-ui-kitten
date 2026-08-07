/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo } from 'react';
import {
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
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
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

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  style,
  children,
  appearance,
  size,
  status,
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

    return React.cloneElement(element, {
      key: index,
      appearance: appearance,
      size: size,
      status: status,
      style: [element.props.style, styles.button, shapeStyle, startShapeStyle, endShapeStyle],
    });
  }, [evaStyle, appearance, size, status, isFirstElement, isLastElement]);

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
