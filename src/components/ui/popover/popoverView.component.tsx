/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useMemo, forwardRef, memo } from 'react';
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
  /**
   * Distance, along the axis the content runs across (x for top/bottom placements, y for
   * left/right), from the centre of the content to where the indicator should point. Set by
   * `Popover` from the anchor position, so the indicator keeps pointing at the anchor when the
   * content had to move to stay on screen. Without it the indicator follows the placement
   * alignment.
   */
  indicatorOffset?: number;
  indicator?: (props: ViewProps) => React.ReactElement;
}

export type PopoverViewElement = React.ReactElement<PopoverViewProps>;

const INDICATOR_OFFSET = 8;
const INDICATOR_WIDTH = 6;
/**
 * How far the indicator may travel from the centre of the content, measured from its edges: the
 * indicator stays whole inside the content's rounded corners.
 */
export const INDICATOR_EDGE_MARGIN = INDICATOR_OFFSET + INDICATOR_WIDTH;

/**
 * Internal view component for Popover that renders the content and indicator.
 * Uses Eva Design System styling.
 */
const PopoverViewComponent = forwardRef<View, PopoverViewProps>(({
  style,
  contentContainerStyle,
  onLayout,
  indicator,
  layoutDirection,
  indicatorOffset,
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

    const { direction } = layoutDirection;
    const hasIndicatorOffset = indicatorOffset !== undefined;
    // With an anchor-based offset the indicator starts from the centre and is moved from there.
    // Only the indicator is centred (`alignSelf`); the container keeps the placement alignment so
    // the content itself stays where the placement put it.
    const alignment = hasIndicatorOffset ? 'center' : layoutDirection.alignment;

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

    // The offset is applied first, i.e. in the container's coordinates, before the rotations that
    // orient the indicator itself.
    // `indicatorOffset` is a physical distance (window coordinates, left to right) and React Native
    // applies `translateX` physically in right-to-left layouts too, so it is not mirrored there
    // (checked on iOS and Android with `I18nManager.forceRTL`).
    const offsetTransform = !hasIndicatorOffset
      ? []
      : isVertical
        ? [{ translateX: indicatorOffset }]
        : [{ translateY: indicatorOffset }];

    const indicatorTransforms: TransformsStyle = {
      transform: [
        ...offsetTransform,
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
        alignItems: layoutDirection.alignment,
      },
      content: contentTransforms,
      indicator: hasIndicatorOffset ? [{ alignSelf: 'center' }, indicatorTransforms] : indicatorTransforms,
    };
  }, [layoutDirection, indicator, indicatorOffset]);

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

PopoverViewComponent.displayName = 'PopoverView';

export const PopoverView = memo(PopoverViewComponent);
PopoverView.displayName = 'PopoverView';

// Display name for debugging
