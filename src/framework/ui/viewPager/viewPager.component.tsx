/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ScrollView,
  ScrollViewProps,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import { ScrollEvent } from '../common/type';

type ChildElement = React.ReactElement<any>;

interface ViewPagerProps {
  children: ChildElement | ChildElement[];
  selectedIndex?: number;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  onSelect?: (index: number) => void;
}

export type Props = ScrollViewProps & ViewPagerProps;

/**
 * The `ViewPager` is the component that allows flipping through the "pages". Extends ScrollView.
 *
 * @extends React.Component
 *
 * @property {React.ReactElement<any>} children - Determines children of the component.
 *
 * @property {number} selectedIndex - Determines the index of selected "page".
 *
 * @property {(index: number) => boolean} shouldLoadComponent - Determines loading particular page.
 *
 * @property {(offset: number) => void} onOffsetChange - Returns "offset" value on Scroll event.
 *
 * @property {string} onSelect - Calls on onScrollEnd event and returns an index of the current "page"
 *
 * @property ScrollViewProps
 *
 * @example ViewPager API example
 *
 * ```
 * import { ViewPager } from '@kitten/ui';
 *
 * public state: State = {
 *   selectedIndex: 0,
 * };
 *
 * private onIndexChange = (index: number) => {
 *   this.state.selectedIndex = index;
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <ViewPager
 *       selectedIndex={this.state.selectedIndex}
 *       contentContainerStyle={styles.container}
 *       onSelect={this.onIndexChange}>
 *       <View style={styles.tabContainer}>
 *         <Text>Tab 1</Text>
 *       </View>
 *       <View style={styles.tabContainer}>
 *         <Text>Tab 2</Text>
 *       </View>
 *       <View style={styles.tabContainer}>
 *         <Text>Tab 3</Text>
 *       </View>
 *     </ViewPager>
 *   );
 * }
 * ```
 * */

export class ViewPager extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
    shouldLoadComponent: (): boolean => true,
  };

  private scrollViewRef: React.RefObject<ScrollView> = React.createRef();
  private contentWidth: number = 0;

  public componentDidMount() {
    const { selectedIndex: index } = this.props;

    this.scrollToIndex({ index });
  }

  public shouldComponentUpdate(nextProps: Props): boolean {
    return this.props.selectedIndex !== nextProps.selectedIndex;
  }

  public componentDidUpdate() {
    const { selectedIndex: index } = this.props;

    this.scrollToIndex({ index, animated: true });
  }

  public scrollToIndex(params: { index: number; animated?: boolean }) {
    const { index, ...rest } = params;
    const offset: number = this.contentWidth * index;

    this.scrollToOffset({ offset, ...rest });
  }

  public scrollToOffset(params: { offset: number; animated?: boolean }) {
    const { offset, ...rest } = params;
    const { current: scrollView } = this.scrollViewRef;

    scrollView.scrollTo({ x: offset, ...rest });
  }

  private onScroll = (event: ScrollEvent) => {
    if (this.props.onOffsetChange) {
      const { x: offset } = event.nativeEvent.contentOffset;
      this.props.onOffsetChange(offset);
    }
  };

  private onScrollEnd = (event: ScrollEvent) => {
    const { x: offset } = event.nativeEvent.contentOffset;
    const { selectedIndex: derivedSelectedIndex } = this.props;

    const selectedIndex: number = offset / this.contentWidth;

    if (selectedIndex !== derivedSelectedIndex && this.props.onSelect) {
      this.props.onSelect(Math.round(selectedIndex));
    }
  };

  private onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    this.contentWidth = width;

    if (this.props.onLayout) {
      this.props.onLayout(event);
    }
  };

  private renderComponentChild = (element: ChildElement, index: number): ChildElement => {
    const { shouldLoadComponent, contentContainerStyle } = this.props;

    const contentView: ChildElement | null = shouldLoadComponent(index) ? element : null;

    return React.createElement(View, {
      key: index,
      style: [styles.contentViewContainer, contentContainerStyle],
    }, contentView);
  };

  private renderComponentChildren = (source: ChildElement | ChildElement[]): ChildElement[] => {
    return React.Children.map(source, this.renderComponentChild);
  };

  public render(): React.ReactNode {
    const { contentContainerStyle, children, ...derivedProps } = this.props;
    const componentChildren: ChildElement[] = this.renderComponentChildren(children);

    const widthPercent: number = 100 * componentChildren.length;

    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={{ width: `${widthPercent}%` }}
        showsHorizontalScrollIndicator={false}
        {...derivedProps}
        ref={this.scrollViewRef}
        scrollEventThrottle={16}
        horizontal={true}
        pagingEnabled={true}
        onScroll={this.onScroll}
        onMomentumScrollEnd={this.onScrollEnd}
        onLayout={this.onLayout}>
        {componentChildren}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentViewContainer: {
    flex: 1,
    width: '100%',
  },
});
