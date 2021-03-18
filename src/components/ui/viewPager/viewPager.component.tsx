/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  PanResponderCallbacks,
  PanResponderGestureState,
  PanResponderInstance,
  Platform,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ChildrenWithProps,
  RTLService,
} from '../../devsupport';

export interface ViewPagerProps<ChildrenProps = {}> extends ViewProps {
  children?: ChildrenWithProps<ChildrenProps>;
  selectedIndex?: number;
  swipeEnabled?: boolean;
  onSelect?: (index: number) => void;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
}

export type ViewPagerElement = React.ReactElement<ViewPagerProps>;

/**
 * A view with a set of swipeable pages.
 *
 * @extends React.Component
 **
 * @property {ReactNode} children - Page components to render within the view.
 *
 * @property {number} selectedIndex - Index of currently selected view.
 *
 * @property {boolean} swipeEnabled - Disable swipe gesture, but keeping animations.
 *
 * @property {(number) => void} onSelect - Called when view becomes visible.
 *
 * @property {(number) => boolean} shouldLoadComponent - A function to determine
 * whether particular view should be rendered.
 * Useful when providing "lazy" loading behavior.
 *
 * @property {(number) => void} onOffsetChange - Called when scroll offset changes.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ViewPagerSimpleUsage
 * Simple usage.
 *
 * @overview-example ViewPagerLazyLoading
 * Each view can be loaded lazily by using `shouldLoadComponent` property.
 */
export class ViewPager<ChildrenProps = {}> extends React.Component<ViewPagerProps<ChildrenProps>>
  implements PanResponderCallbacks {

  static defaultProps: Partial<ViewPagerProps> = {
    selectedIndex: 0,
    swipeEnabled: true,
    shouldLoadComponent: (): boolean => true,
  };

  private containerRef = React.createRef<View>();
  private contentWidth: number = 0;
  private contentOffsetValue: number = 0;
  private contentOffset: Animated.Value = new Animated.Value(this.contentOffsetValue);
  private panResponder: PanResponderInstance = PanResponder.create(this);

  private get children(): React.ReactElement<ChildrenProps>[] {
    return React.Children.toArray(this.props.children).filter(Boolean) as React.ReactElement<ChildrenProps>[];
  }

  public componentDidMount(): void {
    this.contentOffset.addListener(this.onContentOffsetAnimationStateChanged);
  }

  public componentDidUpdate(prevProps: ViewPagerProps): void {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      const index: number = this.props.selectedIndex;
      this.scrollToIndex({ index, animated: true });
    }
  }

  public componentWillUnmount(): void {
    this.contentOffset.removeAllListeners();
  }

  public onMoveShouldSetPanResponder = (_event: GestureResponderEvent, state: PanResponderGestureState): boolean => {
    const isHorizontalMove: boolean = Math.abs(state.dx) > 0 && Math.abs(state.dx) > Math.abs(state.dy);

    if (isHorizontalMove) {
      const i18nOffset: number = RTLService.select(state.dx, -state.dx);
      const nextSelectedIndex: number = this.props.selectedIndex - Math.sign(i18nOffset);
      return nextSelectedIndex >= 0 && nextSelectedIndex < this.children.length;
    }

    return false;
  };

  public onPanResponderMove = (_event: GestureResponderEvent, state: PanResponderGestureState): void => {
    const i18nOffset: number = RTLService.select(this.contentWidth, -this.contentWidth);
    const selectedPageOffset: number = this.props.selectedIndex * i18nOffset;

    this.contentOffset.setValue(state.dx - selectedPageOffset);
  };

  public onPanResponderRelease = (event: GestureResponderEvent, state: PanResponderGestureState) => {
    if (Math.abs(state.vx) >= 0.5 || Math.abs(state.dx) >= 0.5 * this.contentWidth) {
      const i18nOffset: number = RTLService.select(state.dx, -state.dx);
      const index: number = i18nOffset > 0 ? this.props.selectedIndex - 1 : this.props.selectedIndex + 1;
      this.scrollToIndex({ index, animated: true });
    } else {
      const index: number = this.props.selectedIndex;
      this.scrollToIndex({ index, animated: true });
    }
  };

  public scrollToIndex(params: { index: number, animated?: boolean }): void {
    const { index, ...rest } = params;
    const childCount = this.children.length - 1;
    const offset: number = this.contentWidth * (index < 0 ? 0 : index > childCount ? childCount : index);

    this.scrollToOffset({ offset, ...rest });
  }

  public scrollToOffset = (params: { offset: number, animated?: boolean }): void => {
    this.createOffsetAnimation(params).start(this.onContentOffsetAnimationStateEnd);
  };

  private onLayout = (event: LayoutChangeEvent): void => {
    this.contentWidth = event.nativeEvent.layout.width / this.children.length;
    this.scrollToIndex({ index: this.props.selectedIndex });
  };

  private onContentOffsetAnimationStateChanged = (state: { value: number }): void => {
    this.contentOffsetValue = RTLService.select(-state.value, state.value);

    if (this.props.onOffsetChange) {
      this.props.onOffsetChange(this.contentOffsetValue);
    }
  };

  private onContentOffsetAnimationStateEnd = (_result: { finished: boolean }): void => {
    const selectedIndex: number = this.contentOffsetValue / this.contentWidth;

    if (selectedIndex !== this.props.selectedIndex && this.props.onSelect) {
      this.props.onSelect(Math.round(selectedIndex));
    }
  };

  private createOffsetAnimation = (params: { offset: number, animated?: boolean }): Animated.CompositeAnimation => {
    const animationDuration: number = params.animated ? 300 : 0;

    return Animated.timing(this.contentOffset, {
      toValue: RTLService.select(-params.offset, params.offset),
      easing: Easing.linear,
      duration: animationDuration,
      useNativeDriver: Platform.OS !== 'web',
    });
  };

  private getContainerStyle = (): ViewStyle => {
    return {
      width: `${100 * this.children.length}%`,

      // @ts-ignore: RN has no types for `Animated` styles
      transform: [{ translateX: this.contentOffset }],
    };
  };

  private renderComponentChild = (source: React.ReactElement<ChildrenProps>, index: number): React.ReactElement => {
    const contentView = this.props.shouldLoadComponent(index) ? source : null;

    return (
      <View style={styles.contentContainer}>
        {contentView}
      </View>
    );
  };

  private renderComponentChildren = (): React.ReactElement[] => {
    return React.Children.map(this.children, this.renderComponentChild);
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, children, swipeEnabled, ...viewProps } = this.props;

    const panResponderConfig = swipeEnabled ? this.panResponder.panHandlers : null;
    const animatedViewProps = { ...viewProps, ...panResponderConfig  };

    return (
      <Animated.View
        {...animatedViewProps}
        style={[styles.container, style, this.getContainerStyle()]}
        onLayout={this.onLayout}
        // @ts-ignore
        ref={this.containerRef}>
        {this.renderComponentChildren()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
});
