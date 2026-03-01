/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useEffect, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import {
  Animated,
  Easing,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  PanResponderGestureState,
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

// eslint-disable-next-line @typescript-eslint/ban-types
export interface ViewPagerProps<ChildrenProps = {}> extends ViewProps {
  children?: ChildrenWithProps<ChildrenProps>;
  selectedIndex?: number;
  swipeEnabled?: boolean;
  onSelect?: (index: number) => void;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  animationDuration?: number;
}

const DEFAULT_DURATION = 300;

export type ViewPagerElement = React.ReactElement<ViewPagerProps>;

export interface ViewPagerRef {
  scrollToIndex: (params: { index: number; animated?: boolean }) => void;
  scrollToOffset: (params: { offset: number; animated?: boolean }) => void;
}

/**
 * A view with a set of swipeable pages.
 *
 * @extends React.FC
 *
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
 * @property {number} animationDuration - Duration of animated transition.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ViewPagerSimpleUsage
 * Simple usage.
 *
 * @overview-example ViewPagerLazyLoading
 * Each view can be loaded lazily by using `shouldLoadComponent` property.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function ViewPagerComponent<ChildrenProps = {}>(
  {
    style,
    children,
    selectedIndex = 0,
    swipeEnabled = true,
    onSelect,
    shouldLoadComponent = () => true,
    onOffsetChange,
    animationDuration = DEFAULT_DURATION,
    ...viewProps
  }: ViewPagerProps<ChildrenProps>,
  ref: React.Ref<ViewPagerRef>
): React.ReactElement<ViewProps> {
  const containerRef = useRef<View>(null);
  const contentWidthRef = useRef(0);
  const contentOffsetValueRef = useRef(0);
  const contentOffsetAnimatedValue = useRef(new Animated.Value(0)).current;
  const selectedIndexRef = useRef(selectedIndex);

  const childrenArray = useMemo(() => {
    return React.Children.toArray(children).filter(Boolean) as React.ReactElement<ChildrenProps>[];
  }, [children]);

  const scrollToOffset = useCallback((params: { offset: number; animated?: boolean }) => {
    const animDuration = params.animated ? animationDuration : 0;
    const animation = Animated.timing(contentOffsetAnimatedValue, {
      toValue: RTLService.select(-params.offset, params.offset),
      easing: Easing.linear,
      duration: animDuration,
      useNativeDriver: Platform.OS !== 'web',
    });
    animation.start((result) => {
      const currentSelectedIndex = contentOffsetValueRef.current / contentWidthRef.current;
      if (currentSelectedIndex !== selectedIndexRef.current && onSelect && result.finished) {
        onSelect(Math.round(currentSelectedIndex));
      }
    });
  }, [animationDuration, contentOffsetAnimatedValue, onSelect]);

  const scrollToIndex = useCallback((params: { index: number; animated?: boolean }) => {
    const { index, ...rest } = params;
    const childCount = childrenArray.length - 1;
    const offset = contentWidthRef.current * (index < 0 ? 0 : index > childCount ? childCount : index);
    scrollToOffset({ offset, ...rest });
  }, [childrenArray.length, scrollToOffset]);

  useImperativeHandle(ref, () => ({
    scrollToIndex,
    scrollToOffset,
  }), [scrollToIndex, scrollToOffset]);

  useEffect(() => {
    const listener = contentOffsetAnimatedValue.addListener((state) => {
      contentOffsetValueRef.current = RTLService.select(-state.value, state.value);
      onOffsetChange?.(contentOffsetValueRef.current);
    });
    return () => {
      contentOffsetAnimatedValue.removeListener(listener);
    };
  }, [contentOffsetAnimatedValue, onOffsetChange]);

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
    scrollToIndex({ index: selectedIndex, animated: true });
  }, [selectedIndex, scrollToIndex]);

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onMoveShouldSetPanResponder: (_event: GestureResponderEvent, state: PanResponderGestureState): boolean => {
        const isHorizontalMove = Math.abs(state.dx) > 0 && Math.abs(state.dx) > Math.abs(state.dy);

        if (isHorizontalMove) {
          const i18nOffset = RTLService.select(state.dx, -state.dx);
          const nextSelectedIndex = selectedIndexRef.current - Math.sign(i18nOffset);
          return nextSelectedIndex >= 0 && nextSelectedIndex < childrenArray.length;
        }

        return false;
      },
      onPanResponderMove: (_event: GestureResponderEvent, state: PanResponderGestureState): void => {
        const i18nOffset = RTLService.select(contentWidthRef.current, -contentWidthRef.current);
        const selectedPageOffset = selectedIndexRef.current * i18nOffset;
        contentOffsetAnimatedValue.setValue(state.dx - selectedPageOffset);
      },
      onPanResponderRelease: (_event: GestureResponderEvent, state: PanResponderGestureState): void => {
        if (Math.abs(state.vx) >= 0.5 || Math.abs(state.dx) >= 0.5 * contentWidthRef.current) {
          const i18nOffset = RTLService.select(state.dx, -state.dx);
          const index = i18nOffset > 0 ? selectedIndexRef.current - 1 : selectedIndexRef.current + 1;
          scrollToIndex({ index, animated: true });
        } else {
          const index = selectedIndexRef.current;
          scrollToIndex({ index, animated: true });
        }
      },
    });
  }, [childrenArray.length, contentOffsetAnimatedValue, scrollToIndex]);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    contentWidthRef.current = event.nativeEvent.layout.width / childrenArray.length;
    scrollToIndex({ index: selectedIndexRef.current, animated: true });
  }, [childrenArray.length, scrollToIndex]);

  const getContainerStyle = useCallback((): ViewStyle => {
    return {
      width: `${100 * childrenArray.length}%`,
      // @ts-ignore: RN has no types for `Animated` styles
      transform: [{ translateX: contentOffsetAnimatedValue }],
    };
  }, [childrenArray.length, contentOffsetAnimatedValue]);

  const renderComponentChild = (source: React.ReactElement<ChildrenProps>, index: number): React.ReactElement => {
    const contentView = shouldLoadComponent(index) ? source : null;
    return (
      <View key={index} style={styles.contentContainer}>
        {contentView}
      </View>
    );
  };

  const panResponderConfig = swipeEnabled ? panResponder.panHandlers : null;
  const animatedViewProps = { ...viewProps, ...panResponderConfig };

  return (
    <Animated.View
      {...animatedViewProps}
      style={[styles.container, style, getContainerStyle()]}
      onLayout={onLayout}
      ref={containerRef}
    >
      {childrenArray.map(renderComponentChild)}
    </Animated.View>
  );
}

export const ViewPager = forwardRef(ViewPagerComponent) as <ChildrenProps = {}>(
  props: ViewPagerProps<ChildrenProps> & { ref?: React.Ref<ViewPagerRef> }
) => React.ReactElement<ViewProps>;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
  },
});
