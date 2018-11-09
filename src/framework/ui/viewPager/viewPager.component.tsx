import React from 'react';
import {
  View,
  ScrollView,
  ScrollViewProps,
} from 'react-native';
import {
  toArray,
  toReactElement,
} from '../service/common.service';
import { ScrollEvent } from '../service/type';

type ChildElement = React.ReactChild;
type LazyChildElement = React.ReactElement<LazyChildElementProps>;
type LazyChildElementProps = { loaded: boolean } & any;

interface ViewPagerProps {
  contentWidth: number;
  children: ChildElement | ChildElement[];
  selectedIndex?: number;
  shouldLoadComponent?: (index: number) => boolean;
  onOffsetChange?: (offset: number) => void;
  onSelect?: (index: number) => void;
}

export type Props = ScrollViewProps & ViewPagerProps;

interface State {
  children: LazyChildElement[];
}

export class ViewPager extends React.Component<Props, State> {

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
    shouldLoadComponent: (): boolean => true,
  };

  static getDerivedStateFromProps(props: Props, prevState: State): Partial<State> {
    return {
      children: lazify(prevState.children, (index: number): boolean => {
        const element = prevState.children[index];
        return !element.props.loaded || props.shouldLoadComponent(index);
      }),
    };
  }

  public state: State = {
    children: [],
  };

  private scrollView: React.RefObject<ScrollView> = React.createRef();

  constructor(props: Props) {
    super(props);

    const reactElements = toArray(props.children).map(toReactElement);
    this.state.children = lazify(reactElements, this.props.shouldLoadComponent);
  }

  public componentDidMount() {
    const { selectedIndex: index } = this.props;

    this.scrollToIndex({ index });
  }

  public shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    const selectionUpdated: boolean = this.props.selectedIndex !== nextProps.selectedIndex;

    return selectionUpdated || nextState.children.some(this.shouldLoadElement);
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

    this.scrollView.current.scrollTo({ x: offset, ...rest });
  }

  private shouldLoadElement = (element: LazyChildElement, index: number): boolean => {
    const currentElement: LazyChildElement = this.state.children[index];

    return currentElement.props.loaded !== element.props.loaded;
  };

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

  private renderChild = (element: LazyChildElement, index: number): LazyChildElement => {
    const { loaded: isLoaded, ...restProps } = element.props;

    return (
      <View {...restProps} key={index} width={this.props.contentWidth}>
        {isLoaded ? undefined : element}
      </View>
    );
  };

  private renderChildren = (elements: LazyChildElement[]): LazyChildElement[] => {
    return elements.map(this.renderChild);
  };

  render() {
    return (
      <ScrollView
        ref={this.scrollView}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        horizontal={true}
        pagingEnabled={true}
        onScroll={this.onScroll}
        onMomentumScrollEnd={this.onScrollEnd}>
        {this.renderChildren(this.state.children)}
      </ScrollView>
    );
  }
}

function lazify(source: React.ReactElement<any>[], predicate: (index: number) => boolean): LazyChildElement[] {
  const createLazyElement = (element: React.ReactElement<any>, index: number): LazyChildElement => {
    const additionalProps = { loaded: !predicate(index) };
    return React.cloneElement(element, { ...additionalProps, ...element.props });
  };
  return source.map(createLazyElement);
}
