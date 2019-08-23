/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
  ViewStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import {
  PopoverPlacement,
  PopoverPlacements,
} from './type';
import { Arrow } from '../support/components';
import { I18nLayoutService } from '../support/services';

interface ComponentProps {
  placement?: string | PopoverPlacement;
  indicatorOffset?: number;
  indicatorStyle?: StyleProp<ViewStyle>;
}

const PLACEMENT_DEFAULT: PopoverPlacement = PopoverPlacements.TOP;

export type PopoverViewProps = ViewProps & ComponentProps;
export type PopoverViewElement = React.ReactElement<PopoverViewProps>;

export class PopoverView extends React.Component<PopoverViewProps> {

  static defaultProps: Partial<PopoverViewProps> = {
    placement: PLACEMENT_DEFAULT.rawValue,
    indicatorOffset: 8,
  };

  private getComponentStyle = (source: StyleProp<ViewStyle>, placement: PopoverPlacement): StyleType => {
    const derivedIndicatorStyle = StyleSheet.flatten(this.props.indicatorStyle);

    const { direction, alignment } = placement.flex();

    const isVertical: boolean = direction.startsWith('column');
    const isStart: boolean = alignment.endsWith('start');
    const isEnd: boolean = alignment.endsWith('end');
    const isReverse: boolean = direction.endsWith('reverse');

    // Rotate indicator by 90 deg if we have `row` direction (left/right placement)
    // Rotate it again by 180 if we have `row-reverse` (bottom/right placement)
    const indicatorPrimaryRotate: number = isVertical ? 180 : 90;
    const indicatorSecondaryRotate: number = isReverse ? 0 : 180;

    // Translate container by half of `indicatorWidth`. Exactly half (because it has a square shape)
    // Reverse if needed

    // @ts-ignore: indicatorWidth type is always number
    let containerTranslate: number = isVertical ? 0 : derivedIndicatorStyle.width / 2;
    containerTranslate = isReverse ? containerTranslate : -containerTranslate;

    // Translate indicator by passed `indicatorOffset`
    // Reverse if needed

    let indicatorTranslate: number = isVertical ? -this.props.indicatorOffset : this.props.indicatorOffset;
    indicatorTranslate = isReverse ? -indicatorTranslate : indicatorTranslate;
    const i18nVerticalIndicatorTranslate = I18nLayoutService.select(indicatorTranslate, -indicatorTranslate);
    indicatorTranslate = isVertical ? i18nVerticalIndicatorTranslate : indicatorTranslate;

    const containerStyle: ViewStyle = I18nLayoutService.toI18nStyle({
      flexDirection: direction,
      transform: [
        { translateX: containerTranslate },
      ],
    });

    const contentStyle: ViewStyle = {
      backgroundColor: 'black',
      transform: [
        { translateX: containerTranslate },
      ],
    };

    const indicatorStyle: ViewStyle = {
      transform: [
        { rotate: `${indicatorPrimaryRotate}deg` },
        { rotate: `${indicatorSecondaryRotate}deg` },

        // Translate indicator "to start" if we have `-start` alignment
        // Or translate it "to end" if we have `-end` alignment
        { translateX: isStart ? -indicatorTranslate : 0 },
        { translateX: isEnd ? indicatorTranslate : 0 },
      ],
      ...derivedIndicatorStyle,
      ...styles.indicator,
    };

    return {
      container: {
        ...containerStyle,
        alignItems: alignment,
      },
      content: contentStyle,
      indicator: indicatorStyle,
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, indicatorStyle, placement: rawPlacement, children, ...derivedProps } = this.props;
    const placement: PopoverPlacement = PopoverPlacements.parse(rawPlacement, PLACEMENT_DEFAULT);

    const { container, indicator, content } = this.getComponentStyle(style, placement);

    return (
      <View
        {...derivedProps}
        style={[container, styles.container]}>
        <Arrow style={[indicator, styles.indicator, indicatorStyle]}/>
        <View
          style={[content, styles.content, style]}>
          {children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  content: {
    justifyContent: 'center',
  },
  indicator: {},
});
