import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { TabBarIndicator } from './tabBarIndicator.component';
import { Props as ChildProps } from './tab.component';

type ChildElement = React.ReactElement<ChildProps>;

interface TabBarProps {
  children: ChildElement | ChildElement[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

export type Props = TabBarProps & StyledComponentProps & ViewProps;

export class TabBar extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
  };

  private tabIndicatorRef: React.RefObject<TabBarIndicator> = React.createRef();

  public scrollToIndex(params: { index: number, animated?: boolean }) {
    const { current: tabIndicator } = this.tabIndicatorRef;

    tabIndicator.scrollToIndex(params);
  }

  public scrollToOffset(params: { offset: number, animated?: boolean }) {
    const { current: tabIndicator } = this.tabIndicatorRef;

    tabIndicator.scrollToOffset(params);
  }

  private onChildPress = (index: number) => {
    if (this.props.onSelect) {
      this.props.onSelect(index);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      bar: {
        flexDirection: 'row',
        height: source.barSize,
      },
      indicator: {
        height: source.indicatorSize,
        borderRadius: source.indicatorBorderRadius,
        backgroundColor: source.indicatorColor,
      },
    };
  };

  private createComponentChild = (element: ChildElement, index: number): ChildElement => {
    return React.cloneElement(element, {
      key: index,
      style: { flex: 1 },
      selected: index === this.props.selectedIndex,
      onSelect: () => this.onChildPress(index),
    });
  };

  private createComponentChildren = (source: ChildElement | ChildElement[]): ChildElement[] => {
    return React.Children.toArray(source).map(this.createComponentChild);
  };

  public render(): React.ReactNode {
    const { style, themedStyle, selectedIndex, children, ...derivedProps } = this.props;

    const componentStyle: StyleType = this.getComponentStyle(themedStyle);
    const componentChildren: ChildElement[] = this.createComponentChildren(children);

    return (
      <View>
        <View
          {...derivedProps}
          style={[style, componentStyle.bar]}>
          {componentChildren}
        </View>
        <TabBarIndicator
          ref={this.tabIndicatorRef}
          style={componentStyle.indicator}
          selectedPosition={selectedIndex}
          positions={componentChildren.length}
        />
      </View>
    );
  }
}
