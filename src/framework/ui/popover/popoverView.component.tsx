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
  placement?: string;
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
    const { width: indicatorWidth } = strictStyles.indicator;

    const isVertical: boolean = direction.startsWith('column');
    const isPrimaryReverse: boolean = direction.endsWith('reverse');
    const isSecondaryStart: boolean = alignment.endsWith('start');
    const isSecondaryEnd: boolean = alignment.endsWith('end');

    const indicatorPrimaryRotate: number = isVertical ? 180 : 90;
    const indicatorSecondaryRotate: number = isPrimaryReverse ? 0 : 180;

    const containerTranslate: number = isVertical ? 0 : indicatorWidth / 2;
    const indicatorTranslate: number = isPrimaryReverse ? containerTranslate : -containerTranslate;

    const containerStyle: ViewStyle = {
      flexDirection: direction,
      alignItems: alignment,
      transform: [
        { translateX: isPrimaryReverse ? containerTranslate : -containerTranslate },
      ],
      ...strictStyles.container,
    };

    const contentStyle: ViewStyle = {
      backgroundColor: 'black',
      transform: [
        { translateX: isPrimaryReverse ? containerTranslate : -containerTranslate },
      ],
      ...StyleSheet.flatten(source),
      ...strictStyles.content,
    };

    const indicatorStyle: ViewStyle = {
      backgroundColor: contentStyle.backgroundColor,
      transform: [
        { rotate: `${indicatorPrimaryRotate}deg` },
        { rotate: `${indicatorSecondaryRotate}deg` },
        { translateX: isSecondaryStart ? (indicatorTranslate + this.props.indicatorOffset) : 0 },
        { translateX: isSecondaryEnd ? -(indicatorTranslate + this.props.indicatorOffset) : 0 },
      ],
      ...strictStyles.indicator,
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

const strictStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
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
