/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  Platform,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import { RTLService } from '../../devsupport';

export interface TabIndicatorProps extends ViewProps {
  positions: number;
  selectedPosition?: number;
  indicatorStyle: StyleProp<ViewStyle>;
}

export type TabIndicatorElement = React.ReactElement<TabIndicatorProps>;

export class TabIndicator extends React.Component<TabIndicatorProps> {

  static defaultProps: Partial<TabIndicatorProps> = {
    selectedPosition: 0,
  };
  private indicatorWidth = 0;
  private contentOffset: Animated.Value = new Animated.Value(0);

  public componentDidUpdate(): void {
    const { selectedPosition: index } = this.props;

    this.scrollToIndex({
      index,
      animated: true,
    });
  }

  /**
   * scrolls indicator to passed index
   *
   * @param params (object) - {
   *  index: number,
   *  animated: boolean | undefined
   * }
   */
  public scrollToIndex(params: { index: number; animated?: boolean }): void {
    const { index, ...rest } = params;
    const offset: number = this.indicatorWidth * index;

    this.scrollToOffset({ offset, ...rest });
  }

  /**
   * scrolls indicator to passed offset
   *
   * @param params (object) - {
   *  offset: number,
   *  animated: boolean | undefined
   * }
   */
  public scrollToOffset(params: { offset: number; animated?: boolean }): void {
    this.createOffsetAnimation(params).start();
  }

  private createOffsetAnimation = (params: { offset: number; animated?: boolean }): Animated.CompositeAnimation => {
    return Animated.timing(this.contentOffset, {
      toValue: RTLService.select(params.offset, -params.offset),
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: Platform.OS !== 'web',
    });
  };

  private onLayout = (event: LayoutChangeEvent): void => {
    this.indicatorWidth = event.nativeEvent.layout.width;

    this.scrollToOffset({
      offset: this.indicatorWidth * this.props.selectedPosition,
      animated: false,
    });
  };

  private getComponentStyle = (): ViewStyle => {
    const widthPercent: number = 100 / this.props.positions;

    return {
      width: `${widthPercent}%`,

      // @ts-ignore: RN has no types for `Animated` styles
      transform: [{ translateX: this.contentOffset }],
    };
  };

  private renderIndicatorLine = (style: StyleProp<ViewStyle>): React.ReactElement => {
    const styles = [{ width: '100%', alignSelf: 'center' }, StyleSheet.flatten(style)] as StyleProp<ViewStyle>;
    return (
      <View
        testID="indicator body"
        style={styles}
      />
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, ...viewProps } = this.props;
    const evaStyle: ViewStyle = this.getComponentStyle();
    const indicatorLine = this.renderIndicatorLine(style);

    return (
      <Animated.View
        {...viewProps}
        style={evaStyle}
        onLayout={this.onLayout}
      >
        {indicatorLine}
      </Animated.View>
    );
  }
}
