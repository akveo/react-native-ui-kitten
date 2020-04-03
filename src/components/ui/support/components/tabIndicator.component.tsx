import React from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { I18nLayoutService } from '../services';

interface ComponentProps {
  positions: number;
  selectedPosition?: number;
  animationDuration?: number;
}

export type TabIndicatorProps = ViewProps & ComponentProps;
export type TabIndicatorElement = React.ReactElement<TabIndicatorProps>;

export class TabIndicator extends React.Component<TabIndicatorProps> {

  static defaultProps: Partial<TabIndicatorProps> = {
    selectedPosition: 0,
    animationDuration: 200,
  };

  private indicatorWidth: number;
  private contentOffset: Animated.Value = new Animated.Value(0);

  public componentDidMount() {
    this.contentOffset.addListener(this.onContentOffsetAnimationStateChanged);
  }

  public shouldComponentUpdate(nextProps: TabIndicatorProps): boolean {
    return this.props.selectedPosition !== nextProps.selectedPosition;
  }

  public componentDidUpdate() {
    const { selectedPosition: index } = this.props;

    this.scrollToIndex({ index, animated: true });
  }

  public componentWillUnmount() {
    this.contentOffset.removeAllListeners();
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
      toValue: I18nLayoutService.select(params.offset, -params.offset),
      duration: animationDuration,
      easing: Easing.linear,
      useNativeDriver: true,
    });
  };

  private onLayout = (event: LayoutChangeEvent) => {
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

  public render(): React.ReactElement<ViewProps> {
    const { style, ...restProps } = this.props;
    const componentStyle: ViewStyle = this.getComponentStyle();

    return (
      <Animated.View
        {...restProps}
        onLayout={this.onLayout}
        style={[style, componentStyle]}
      />
    );
  }
}
