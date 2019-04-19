import React from 'react';
import {
  View,
  ScrollView,
  ScrollViewProps,
  LayoutChangeEvent,
  StyleSheet,
  ViewProps,
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
    const { shouldLoadComponent } = this.props;

    const contentView: ChildElement | null = shouldLoadComponent(index) ? element : null;

    return React.createElement(View, {
      key: index,
      style: styles.contentViewContainer,
    }, contentView);
  };

  private renderComponentChildren = (source: ChildElement | ChildElement[]): ChildElement[] => {
    return React.Children.map(source, this.renderComponentChild);
  };

  public render(): React.ReactNode {
    const { contentContainerStyle, children, ...derivedProps } = this.props;
    const componentChildren: ChildElement[] = this.renderComponentChildren(children);

    return (
      <ScrollView
        bounces={false}
        contentContainerStyle={[styles.contentContainer, contentContainerStyle]}
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
  contentContainer: {
    flex: 1,
  },
  contentViewContainer: {
    width: '100%',
  },
});
