/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  LayoutChangeEvent,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import { ScrollEvent } from '../support/typings';

type ChildElement = React.ReactElement<any>;
type ChildrenProp = ChildElement | ChildElement[];

interface ComponentProps {
  children: ChildrenProp;
  selectedIndex?: number;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  onSelect?: (index: number) => void;
}

export type ViewPagerProps = ScrollViewProps & ComponentProps;

/**
 * Allows flipping through the "pages".
 *
 * @extends React.Component
 *
 * @property {React.ReactElement<any> | React.ReactElement<any>[]} children - Determines children of the component.
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
 * @property ScrollViewProps
 *
 * @example Simple usage example
 *
 * ```
 * import React from 'react';
 * import { ViewPager } from 'react-native-ui-kitten';
 *
 * export class ViewPagerShowcase extends React.Component {
 *   public state: State = {
 *      selectedIndex: 0,
 *    };
 *
 *   private onIndexChange = (selectedIndex: number) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <ViewPager
 *         selectedIndex={this.state.selectedIndex}
 *         onSelect={this.onIndexChange}>
 *         <View>
 *           <Text>Tab 1</Text>
 *         </View>
 *         <View>
 *           <Text>Tab 2</Text>
 *         </View>
 *         <View>
 *           <Text>Tab 3</Text>
 *         </View>
 *       </ViewPager>
 *     );
 *   }
 * }
 * ```
 *
 * @example Lazy loading usage example
 *
 * ```
 * import React from 'react';
 * import { ViewPager } from 'react-native-ui-kitten';
 *
 * export class ViewPagerShowcase extends React.Component {
 *   public state: State = {
 *      selectedIndex: 0,
 *    };
 *
 *   private onIndexChange = (selectedIndex: number) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   private shouldLoadPageContent = (index: number): boolean => {
 *     return index === this.state.selectedIndex;
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <ViewPager
 *         selectedIndex={this.state.selectedIndex}
 *         shouldLoadComponent={this.shouldLoadPageContent}
 *         onSelect={this.onIndexChange}>
 *         <View>
 *           <Text>Tab 1</Text>
 *         </View>
 *         <View>
 *           <Text>Tab 2</Text>
 *         </View>
 *         <View>
 *           <Text>Tab 3</Text>
 *         </View>
 *       </ViewPager>
 *     );
 *   }
 * }
 * ```
 */

export class ViewPager extends React.Component<ViewPagerProps> {

  static defaultProps: Partial<ViewPagerProps> = {
    selectedIndex: 0,
    shouldLoadComponent: (): boolean => true,
  };

  private scrollViewRef: React.RefObject<ScrollView> = React.createRef();
  private contentWidth: number = 0;

  public shouldComponentUpdate(nextProps: ViewPagerProps): boolean {
    return this.props.selectedIndex !== nextProps.selectedIndex;
  }

  public scrollToIndex(params: { index: number; animated?: boolean }) {
    const { index, ...rest } = params;
    const offset: number = this.contentWidth * index;

    this.scrollToOffset({ offset, ...rest });
  }

  public scrollToOffset(params: { offset: number; animated?: boolean }) {
    // Regularly we trigger onSelect when `onMomentumScrollEnd` is triggered, but
    // there is an issue: https://github.com/facebook/react-native/issues/21718

    const selector = Platform.select({
      ios: this.scrollToOffsetIOS,
      android: this.scrollToOffsetAndroid,
    });

    selector(params);
  }

  private scrollToOffsetIOS = (params: { offset: number; animated?: boolean }) => {
    const { offset, ...rest } = params;
    const { current: scrollView } = this.scrollViewRef;

    scrollView.scrollTo({ x: offset, ...rest });
  };

  private scrollToOffsetAndroid = (params: { offset: number; animated?: boolean }) => {
    this.scrollToOffsetIOS(params);
    this.dispatchOnSelect(params.offset);
  };

  private dispatchOnSelect = (offset: number) => {
    const selectedIndex: number = offset / this.contentWidth;

    if (selectedIndex !== this.props.selectedIndex && this.props.onSelect) {
      this.props.onSelect(Math.round(selectedIndex));
    }
  };

  private onScroll = (event: ScrollEvent) => {
    if (this.props.onOffsetChange) {
      const { x: offset } = event.nativeEvent.contentOffset;

      this.props.onOffsetChange(offset);
    }
  };

  private onScrollEnd = (event: ScrollEvent) => {
    const { x: offset } = event.nativeEvent.contentOffset;

    this.dispatchOnSelect(offset);
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
