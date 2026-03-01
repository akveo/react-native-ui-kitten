/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useMemo, forwardRef } from 'react';
import {
  StyleProp,
  TransformsStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  FalsyFC,
  RTLService,
} from '../../devsupport';
import {
  StyleType,
  useStyled,
} from '../../theme';
import {
  FlexPlacement,
} from './type';

type AnimatedViewStyle = ViewStyle;

export interface PopoverViewProps extends ViewProps {
  contentContainerStyle?: StyleProp<AnimatedViewStyle>;
  layoutDirection?: FlexPlacement;
  indicator?: (props: ViewProps) => React.ReactElement;
}

export type PopoverViewElement = React.ReactElement<PopoverViewProps>;

const INDICATOR_OFFSET = 8;
const INDICATOR_WIDTH = 6;

/**
 * Internal view component for Popover that renders the content and indicator.
 * Uses Eva Design System styling.
 */
export const PopoverView = forwardRef<View, PopoverViewProps>(({
  style,
  contentContainerStyle,
  onLayout,
  indicator,
  layoutDirection,
  ...viewProps
}, ref) => {
  const { style: evaStyle } = useStyled('Popover', {});

  const componentStyle = useMemo(() => {
    const {
      indicatorWidth,
      indicatorHeight,
      indicatorBackgroundColor,
      ...containerParameters
    } = evaStyle as StyleType;

    return {
      content: containerParameters,
      indicator: {
        width: indicatorWidth,
        height: indicatorHeight,
        backgroundColor: indicatorBackgroundColor,
      },
    };
  }, [evaStyle]);

  const directionStyle = useMemo((): StyleType => {
    if (!layoutDirection) {
      return {
        container: {},
        content: {},
        indicator: {},
      };
    }

    const { direction, alignment } = layoutDirection;

    const isVertical: boolean = direction.startsWith('column');
    const isStart: boolean = alignment.endsWith('start');
    const isEnd: boolean = alignment.endsWith('end');
    const isReverse: boolean = direction.endsWith('reverse');

    // Rotate indicator by 90 deg if we have `row` direction (left/right placement)
    // Rotate it again by 180 if we have `row-reverse` (bottom/right placement)
    const indicatorRotate: number = isVertical ? 180 : 90;
    const indicatorReverseRotate: number = isReverse ? 0 : 180;

    // Translate container by half of `indicatorWidth`. Exactly half (because it has a square shape)
    // Reverse if needed
    let containerTranslate: number = (indicator && !isVertical) ? INDICATOR_WIDTH / 2 : 0;
    containerTranslate = isReverse ? containerTranslate : -containerTranslate;

    // Translate indicator by passed `indicatorOffset`
    // Reverse if needed
    let indicatorTranslate: number = isVertical ? -INDICATOR_OFFSET : INDICATOR_OFFSET;
    indicatorTranslate = isReverse ? -indicatorTranslate : indicatorTranslate;
    const i18nVerticalIndicatorTranslate = RTLService.select(indicatorTranslate, -indicatorTranslate);
    indicatorTranslate = isVertical ? i18nVerticalIndicatorTranslate : indicatorTranslate;

    const contentTransforms: TransformsStyle = {
      transform: [
        { translateX: containerTranslate },
      ],
    };

    const indicatorTransforms: TransformsStyle = {
      transform: [
        { rotate: `${indicatorRotate}deg` },
        { rotate: `${indicatorReverseRotate}deg` },
        // Translate indicator "to start" if we have `-start` alignment
        // Or translate it "to end" if we have `-end` alignment
        { translateX: isStart ? -indicatorTranslate : 0 },
        { translateX: isEnd ? indicatorTranslate : 0 },
      ],
    };

    return {
      container: {
        flexDirection: direction,
        alignItems: alignment,
      },
      content: contentTransforms,
      indicator: indicatorTransforms,
    };
  }, [layoutDirection, indicator]);

  return (
    <View
      ref={ref}
      style={[directionStyle.container, contentContainerStyle]}
      onLayout={onLayout}
    >
      <FalsyFC
        style={[componentStyle.indicator, directionStyle.indicator]}
        component={indicator}
      />
      <View
        {...viewProps}
        style={[componentStyle.content, directionStyle.content, style]}
      />
    </View>
  );
});

// Display name for debugging
PopoverView.displayName = 'PopoverView';
