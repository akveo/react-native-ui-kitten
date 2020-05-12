/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
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
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import {
  PopoverPlacement,
  PopoverPlacements,
} from './type';

type AnimatedViewStyle = ViewStyle | any;

export interface PopoverViewProps extends ViewProps, StyledComponentProps {
  contentContainerStyle?: StyleProp<AnimatedViewStyle>;
  placement?: PopoverPlacement | string;
  indicator?: (props: ViewProps) => React.ReactElement;
}

export type PopoverViewElement = React.ReactElement<PopoverViewProps>;

const INDICATOR_OFFSET: number = 8;
const INDICATOR_WIDTH: number = 6;

@styled('Popover')
export class PopoverView extends React.Component<PopoverViewProps> {

  private get placement(): PopoverPlacement {
    return PopoverPlacements.parse(this.props.placement);
  }

  private getComponentStyle = (source: StyleType) => {
    const { indicatorWidth, indicatorHeight, indicatorBackgroundColor, ...containerParameters } = source;

    return {
      content: containerParameters,
      indicator: {
        width: indicatorWidth,
        height: indicatorHeight,
        backgroundColor: indicatorBackgroundColor,
      },
    };
  };

  private getDirectionStyle = () => {
    const { direction, alignment } = this.placement.flex();

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

    // @ts-ignore: indicatorWidth type is always number
    let containerTranslate: number = (this.props.indicator && !isVertical) ? INDICATOR_WIDTH / 2 : 0;
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
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, contentContainerStyle, onLayout, indicator, ...viewProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);
    const directionStyle = this.getDirectionStyle();

    return (
      <View
        style={[directionStyle.container, contentContainerStyle]}
        onLayout={onLayout}>
        <FalsyFC
          style={[evaStyle.indicator, directionStyle.indicator]}
          component={indicator}
        />
        <View
          {...viewProps}
          style={[evaStyle.content, directionStyle.content, style]}
        />
      </View>
    );
  }
}
