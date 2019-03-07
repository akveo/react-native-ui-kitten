import React from 'react';
import {
  View,
  ViewProps,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import { Arrow } from '../drawable/arrow/arrow.component';
import {
  Placement,
  Placements,
} from './type';

interface PopoverViewProps {
  placement?: string | Placement;
  indicatorOffset?: number;
}

const PLACEMENT_DEFAULT: Placement = Placements.TOP;

export type Props = PopoverViewProps & ViewProps;

export class PopoverView extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    placement: PLACEMENT_DEFAULT.rawValue,
    indicatorOffset: 0,
  };

  private getComponentStyle = (source: StyleType, placement: Placement): StyleType => {
    const { direction, alignment } = placement.flex();
    const { width: indicatorWidth } = styles.indicator;

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
    let containerTranslate: number = isVertical ? 0 : indicatorWidth / 2;
    containerTranslate = isReverse ? containerTranslate : -containerTranslate;

    // Translate indicator by passed `indicatorOffset`
    // Reverse if needed
    let indicatorTranslate: number = isVertical ? -this.props.indicatorOffset : this.props.indicatorOffset;
    indicatorTranslate = isReverse ? -indicatorTranslate : indicatorTranslate;

    const containerStyle: ViewStyle = {
      flexDirection: direction,
      alignItems: alignment,
      transform: [
        { translateX: containerTranslate },
      ],
      ...styles.container,
    };

    const contentStyle: ViewStyle = {
      backgroundColor: 'black',
      transform: [
        { translateX: containerTranslate },
      ],
      ...StyleSheet.flatten(source),
      ...styles.content,
    };

    const indicatorStyle: ViewStyle = {
      backgroundColor: contentStyle.backgroundColor,
      transform: [
        { rotate: `${indicatorPrimaryRotate}deg` },
        { rotate: `${indicatorSecondaryRotate}deg` },

        // Translate indicator "to start" if we have `-start` alignment
        // Or translate it "to end" if we have `-end` alignment
        { translateX: isStart ? -indicatorTranslate : 0 },
        { translateX: isEnd ? indicatorTranslate : 0 },
      ],
      ...styles.indicator,
    };

    return {
      container: containerStyle,
      content: contentStyle,
      indicator: indicatorStyle,
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, placement: rawPlacement, children, ...derivedProps } = this.props;
    const placement: Placement = Placements.parse(rawPlacement, PLACEMENT_DEFAULT);

    const { container, indicator, content } = this.getComponentStyle(style, placement);

    return (
      <View
        {...derivedProps}
        style={container}>
        <Arrow style={indicator}/>
        <View
          style={content}>
          {children}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignSelf: 'flex-start',
  },
  content: {
    justifyContent: 'center',
    minWidth: 64,
    minHeight: 28,
    maxWidth: 300,
  },
  indicator: {
    width: 6,
    height: 6,
  },
});
