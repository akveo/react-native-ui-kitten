import React from 'react';
import {
  View,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import { ScrollEvent } from '../service/type';

type ChildElement = React.ReactElement<any>;

interface ViewPagerProps {
  contentWidth: number;
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

  public componentDidMount() {
    const { selectedIndex: index } = this.props;

    this.scrollToIndex({ index });
  }

  public shouldComponentUpdate(nextProps: Props): boolean {
    return this.props.selectedIndex !== nextProps.selectedIndex;
  }

  public componentDidUpdate() {
    const { selectedIndex: index } = this.props;

    this.scrollToIndex({
      index,
      animated: true,
    });
  }

  public scrollToIndex(params: { index: number; animated?: boolean }) {
    const { index, ...rest } = params;
    const offset: number = this.props.contentWidth * index;

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
    const { selectedIndex: derivedSelectedIndex, contentWidth } = this.props;

    const selectedIndex: number = offset / contentWidth;

    if (selectedIndex !== derivedSelectedIndex && this.props.onSelect) {
      this.props.onSelect(selectedIndex);
    }
  };

  private renderComponentChild = (element: ChildElement, index: number): ChildElement => {
    const { shouldLoadComponent: shouldLoad, contentWidth } = this.props;

    return React.createElement(View, {
      ...element.props,
      key: index,
      width: contentWidth,
      children: shouldLoad(index) ? element : undefined,
    });
  };

  private renderComponentChildren = (source: ChildElement | ChildElement[]): ChildElement[] => {
    return React.Children.map(source, this.renderComponentChild);
  };

  public render(): React.ReactNode {
    const { children, ...derivedProps } = this.props;
    const componentChildren: ChildElement[] = this.renderComponentChildren(children);

    return (
      <ScrollView
        {...derivedProps}
        ref={this.scrollViewRef}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        horizontal={true}
        pagingEnabled={true}
        onScroll={this.onScroll}
        onMomentumScrollEnd={this.onScrollEnd}>
        {componentChildren}
      </ScrollView>
    );
  }
}
