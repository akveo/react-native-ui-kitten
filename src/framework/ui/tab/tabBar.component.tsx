import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { TabBarIndicator } from './tabBarIndicator.component';
import { Props as TabProps } from './tab.component';

type TabElement = React.ReactElement<TabProps>;

interface TabBarProps {
  children: TabElement | TabElement[];
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

  private createComponentChild = (element: TabElement, index: number): TabElement => {
    return React.cloneElement(element, {
      key: index,
      style: { flex: 1 },
      selected: index === this.props.selectedIndex,
      onSelect: () => this.onChildPress(index),
    });
  };

  private createComponentChildren = (source: TabElement | TabElement[]): TabElement[] => {
    return React.Children.map(source, this.createComponentChild);
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, selectedIndex, children, ...derivedProps } = this.props;
    const { bar, indicator } = this.getComponentStyle(themedStyle);

    const componentChildren: TabElement[] = this.createComponentChildren(children);

    return (
      <View>
        <View
          {...derivedProps}
          style={[style, bar]}>
          {componentChildren}
        </View>
        <TabBarIndicator
          ref={this.tabIndicatorRef}
          style={indicator}
          selectedPosition={selectedIndex}
          positions={componentChildren.length}
        />
      </View>
    );
  }
}
