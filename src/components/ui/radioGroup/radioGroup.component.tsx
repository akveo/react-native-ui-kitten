/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useMemo } from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  buildAccessibilityProps,
  ChildrenWithProps,
  LiteralUnion,
} from '../../devsupport';
import {
  useStyled,
  StyleType,
} from '../../theme';
import {
  RadioElement,
  RadioProps,
} from '../radio/radio.component';

export interface RadioGroupProps extends ViewProps {
  children?: ChildrenWithProps<RadioProps>;
  selectedIndex?: number;
  onChange?: (index: number) => void;
  appearance?: LiteralUnion<'default'>;
}

export type RadioGroupElement = React.ReactElement<RadioGroupProps>;

const getComponentStyle = (source: StyleType): StyleType => {
  const { itemMarginVertical, ...containerParameters } = source;

  return {
    container: containerParameters,
    item: {
      marginVertical: itemMarginVertical,
    },
  };
};

/**
 * Provides to select a single state from multiple options.
 * RadioGroup should contain Radio components to provide a useful component.
 *
 * @extends React.FC
 *
 * @property {number} selectedIndex - Index of currently checked radio.
 *
 * @property {(number) => void} onChange - Called when one of the radios is pressed.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example RadioGroupSimpleUsage
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  style,
  children,
  selectedIndex = -1,
  onChange,
  appearance,
  ...viewProps
}) => {
  const { style: evaStyleRaw } = useStyled('RadioGroup', { appearance });
  const evaStyle = useMemo(() => getComponentStyle(evaStyleRaw), [evaStyleRaw]);

  const onRadioChange = useCallback((index: number): void => {
    onChange?.(index);
  }, [onChange]);

  const radioElements: RadioElement[] = React.Children.map(children, (element: RadioElement, index: number): RadioElement => {
    return React.cloneElement(element, {
      key: index,
      style: [evaStyle.item, element.props.style],
      checked: selectedIndex === index,
      onChange: () => onRadioChange(index),
    });
  });

  return (
    <View
      {...viewProps}
      {...buildAccessibilityProps({ role: 'radiogroup' }, viewProps)}
      style={[evaStyle.container, style]}
    >
      {radioElements}
    </View>
  );
};

RadioGroup.displayName = 'RadioGroup';
