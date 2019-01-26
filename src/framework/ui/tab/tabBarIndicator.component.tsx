import React from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  ViewProps,
} from 'react-native';
import { StyleType } from '@kitten/theme';

interface TabBarIndicatorProps {
  positions: number;
  selectedPosition?: number;
  animationDuration?: number;
}

export type Props = TabBarIndicatorProps & ViewProps;

export class TabBarIndicator extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selectedPosition: 0,
    animationDuration: 200,
  };

  private contentOffset: Animated.Value = new Animated.Value(0);
  private indicatorWidth: number;

  constructor(props: Props) {
    super(props);
    this.contentOffset.addListener(this.onContentOffsetAnimationStateChanged);
  }

  public shouldComponentUpdate(nextProps: Props): boolean {
    return this.props.selectedPosition !== nextProps.selectedPosition;
  }

  public componentDidUpdate() {
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
  public scrollToIndex(params: { index: number, animated?: boolean }) {
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
  public scrollToOffset(params: { offset: number, animated?: boolean }) {
    this.createOffsetAnimation(params).start(this.onContentOffsetAnimationStateEnd);
  }

  private onContentOffsetAnimationStateChanged = (state: { value: number }) => {
    // no-op
  };

  private onContentOffsetAnimationStateEnd = (result: { finished: boolean }) => {
    // no-op
  };

  private createOffsetAnimation = (params: { offset: number, animated?: boolean }): Animated.CompositeAnimation => {
    const animationDuration: number = params.animated ? this.props.animationDuration : 0;

    return Animated.timing(this.contentOffset, {
      toValue: params.offset,
      duration: animationDuration,
      easing: Easing.linear,
    });
  };

  private onLayout = (event: LayoutChangeEvent) => {
    this.indicatorWidth = event.nativeEvent.layout.width;

    this.scrollToOffset({
      offset: this.indicatorWidth * this.props.selectedPosition,
    });
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const widthPercent: number = 100 / this.props.positions;

    return {
      component: {
        ...source,
        width: `${widthPercent}%`,
        transform: [{ translateX: this.contentOffset }],
      },
    };
  };

  public render(): React.ReactNode {
    const componentStyle: StyleType = this.getComponentStyle(this.props.style);

    return (
      <Animated.View
        {...this.props}
        onLayout={this.onLayout}
        style={[this.props.style, componentStyle.component]}
      />
    );
  }
}
