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
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { I18nLayoutService } from '../support/services';

type ChildElement = React.ReactElement;
type ChildrenProp = ChildElement | ChildElement[];

export interface ViewPagerProps extends ViewProps {
  children: ChildrenProp;
  selectedIndex?: number;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  onSelect?: (index: number) => void;
}

export type ViewPagerElement = React.ReactElement<ViewPagerProps>;

/**
 * `ViewPager` allows flipping through the "pages".
 *
 * @extends React.Component
 *
 * @property {ReactElement | ReactElement[]} children - Determines children of the component.
 *
 * @property {number} selectedIndex - Determines the index of selected "page".
 *
 * @property {(index: number) => boolean} shouldLoadComponent - Determines loading behavior particular page and can be
 * used for lazy loading.
 *
 * @property {(offset: number) => void} onOffsetChange - Fires on scroll event with current scroll offset.
 *
 * @property {(index: number) => void} onSelect - Fires on "page" select with corresponding index.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ViewPagerSimpleUsage
 *
 * @overview-example ViewPagerLazyLoading
 *
 * @example ViewPagerInlineStyling
 */
export class ViewPager extends React.Component<ViewPagerProps> implements PanResponderCallbacks {

  static defaultProps: Partial<ViewPagerProps> = {
    selectedIndex: 0,
    shouldLoadComponent: (): boolean => true,
  };

  private containerRef: React.RefObject<View> = React.createRef();
  private contentWidth: number = 0;
  private contentOffsetValue: number = 0;
  private contentOffset: Animated.Value = new Animated.Value(this.contentOffsetValue);
  private panResponder: PanResponderInstance = PanResponder.create(this);

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

  public onMoveShouldSetPanResponder = (event: GestureResponderEvent, state: PanResponderGestureState): boolean => {
    const isHorizontalMove: boolean = Math.abs(state.dx) > 0 && Math.abs(state.dx) > Math.abs(state.dy);

    if (isHorizontalMove) {
      const i18nOffset: number = I18nLayoutService.select(state.dx, -state.dx);
      const nextSelectedIndex: number = this.props.selectedIndex - Math.sign(i18nOffset);

      return nextSelectedIndex >= 0 && nextSelectedIndex < this.getChildCount();
    }

    return false;
  };

  public onPanResponderMove = (event: GestureResponderEvent, state: PanResponderGestureState): void => {
    const i18nOffset: number = I18nLayoutService.select(this.contentWidth, -this.contentWidth);
    const selectedPageOffset: number = this.props.selectedIndex * i18nOffset;

    this.contentOffset.setValue(state.dx - selectedPageOffset);
  };

  public onPanResponderRelease = (event: GestureResponderEvent, state: PanResponderGestureState) => {
    if (Math.abs(state.vx) >= 0.5 || Math.abs(state.dx) >= 0.5 * this.contentWidth) {
      const i18nOffset: number = I18nLayoutService.select(state.dx, -state.dx);
      const index: number = i18nOffset > 0 ? this.props.selectedIndex - 1 : this.props.selectedIndex + 1;
      this.scrollToIndex({ index, animated: true });
    } else {
      const index: number = this.props.selectedIndex;
      this.scrollToIndex({ index, animated: true });
    }
  };

  public scrollToIndex(params: { index: number, animated?: boolean }): void {
    const { index, ...rest } = params;
    const childCount = this.getChildCount() - 1;
    const offset: number = this.contentWidth * (index < 0 ? 0 : index > childCount ? childCount : index);

    this.scrollToOffset({ offset, ...rest });
  }

  public scrollToOffset = (params: { offset: number, animated?: boolean }): void => {
    this.createOffsetAnimation(params).start(this.onContentOffsetAnimationStateEnd);
  };

  private onLayout = (event: LayoutChangeEvent): void => {
    this.contentWidth = event.nativeEvent.layout.width / this.getChildCount();

    this.scrollToIndex({
      index: this.props.selectedIndex,
    });
  };

  private onContentOffsetAnimationStateChanged = (state: { value: number }): void => {
    this.contentOffsetValue = I18nLayoutService.select(-state.value, state.value);

    if (this.props.onOffsetChange) {
      this.props.onOffsetChange(this.contentOffsetValue);
    }
  };

  private onContentOffsetAnimationStateEnd = (result: { finished: boolean }): void => {
    const selectedIndex: number = this.contentOffsetValue / this.contentWidth;

    if (selectedIndex !== this.props.selectedIndex && this.props.onSelect) {
      this.props.onSelect(Math.round(selectedIndex));
    }
  };

  private createOffsetAnimation = (params: { offset: number, animated?: boolean }): Animated.CompositeAnimation => {
    const animationDuration: number = params.animated ? 300 : 0;

    return Animated.timing(this.contentOffset, {
      toValue: I18nLayoutService.select(-params.offset, params.offset),
      easing: Easing.linear,
      duration: animationDuration,
      useNativeDriver: true,
    });
  };

  private renderComponentChild = (source: ChildElement, index: number): ChildElement => {
    const contentView: ChildElement | null = this.props.shouldLoadComponent(index) ? source : null;

    return (
      <View style={styles.contentContainer}>
        {contentView}
      </View>
    );
  };

  private renderComponentChildren = (source: ChildrenProp): ChildElement[] => {
    return React.Children.map(source, this.renderComponentChild);
  };

  private getChildCount = (): number => {
    return React.Children.count(this.props.children);
  };

  private getContainerStyle = (): ViewStyle => {
    return {
      width: `${100 * this.getChildCount()}%`,

      // @ts-ignore: RN has no types for `Animated` styles
      transform: [{ translateX: this.contentOffset }],
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, children, ...restProps } = this.props;

    return (
      <Animated.View
        {...restProps}
        style={[styles.container, style, this.getContainerStyle()]}
        onLayout={this.onLayout}
        {...this.panResponder.panHandlers}
        // @ts-ignore
        ref={this.containerRef}>
        {this.renderComponentChildren(children)}
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
