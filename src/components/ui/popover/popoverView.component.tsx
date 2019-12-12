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
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  PopoverPlacement,
  PopoverPlacements,
} from './type';
import { I18nLayoutService } from '../support/services';

type AnimatedViewStyle = ViewStyle | any;

export interface PopoverViewProps extends ViewProps, StyledComponentProps {
  contentContainerStyle?: StyleProp<AnimatedViewStyle>;
  placement?: PopoverPlacement | string;
  indicator?: (style: StyleType) => React.ReactElement;
  children: React.ReactElement;
}

export type PopoverViewElement = React.ReactElement<PopoverViewProps>;

const INDICATOR_OFFSET: number = 8;
const INDICATOR_WIDTH: number = 6;

class PopoverViewComponent extends React.Component<PopoverViewProps> {

  static styledComponentName: string = 'Popover';

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
    const i18nVerticalIndicatorTranslate = I18nLayoutService.select(indicatorTranslate, -indicatorTranslate);
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

  private renderIndicatorElement = (style: StyleType, directionStyle: StyleType): React.ReactElement => {
    const indicatorElement: React.ReactElement = this.props.indicator(style);

    return React.cloneElement(indicatorElement, {
      style: [style, directionStyle, indicatorElement.props.style],
    });
  };

  private renderComponentChildren = (style: StyleType, directionStyle: StyleType): React.ReactNodeArray => {
    return [
      this.props.indicator && this.renderIndicatorElement(style.indicator, directionStyle.indicator),
    ];
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, contentContainerStyle, themedStyle, onLayout, ...props } = this.props;
    const { content, ...componentStyle } = this.getComponentStyle(themedStyle);

    const directionStyle = this.getDirectionStyle();
    const [indicatorElement]: React.ReactNodeArray = this.renderComponentChildren(componentStyle, directionStyle);

    return (
      <View
        style={[directionStyle.container, contentContainerStyle]}
        onLayout={onLayout}>
        {indicatorElement}
        <View
          {...props}
          style={[content, directionStyle.content, style]}
        />
      </View>
    );
  }
}

export const PopoverView = styled<PopoverViewProps>(PopoverViewComponent);
