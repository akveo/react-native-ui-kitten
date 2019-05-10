import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentClass,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  BottomNavigationTab,
  BottomNavigationTabElementStaticProps,
  BottomNavigationTabProps,
} from './bottomNavigationTab.component';
import {
  TabIndicator,
  TabIndicatorProps,
} from '../support/components';

type TabElement = React.ReactElement<BottomNavigationTabProps>;
type IndicatorElement = React.ReactElement<TabIndicatorProps>;
type ChildrenProp = TabElement | TabElement[];

interface ComponentProps {
  children: ChildrenProp;
  selectedIndex?: number;
  indicatorStyle?: StyleProp<ViewStyle>;
  onSelect?: (index: number) => void;
}

interface BottomNavigationElementStaticProps {
  Tab: StyledComponentClass<BottomNavigationTabProps, BottomNavigationTabElementStaticProps>;
}

export type BottomNavigationProps = StyledComponentProps & ViewProps & ComponentProps;

class BottomNavigationComponent extends React.Component<BottomNavigationProps> {

  static styledComponentName: string = 'BottomNavigation';

  static defaultProps: Partial<BottomNavigationProps> = {
    selectedIndex: 0,
  };

  static Tab = BottomNavigationTab;

  private onTabSelect = (index: number) => {
    if (this.props.onSelect && this.props.selectedIndex !== index) {
      this.props.onSelect(index);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style, indicatorStyle } = this.props;
    const { indicatorHeight, indicatorBackgroundColor, ...containerParameters } = source;

    return {
      container: {
        ...containerParameters,
        ...styles.container,
        ...StyleSheet.flatten(style),
      },
      indicator: {
        height: indicatorHeight,
        backgroundColor: indicatorBackgroundColor,
        ...styles.indicator,
        ...StyleSheet.flatten(indicatorStyle),
      },
    };
  };

  private renderIndicatorElement = (positions: number, style: StyleType): IndicatorElement => {
    return (
      <TabIndicator
        key={0}
        style={style}
        selectedPosition={this.props.selectedIndex}
        positions={positions}
      />
    );
  };

  private renderTabElement = (element: TabElement, index: number): TabElement => {
    return React.cloneElement(element, {
      key: index,
      style: [styles.item, element.props.style],
      selected: index === this.props.selectedIndex,
      onSelect: () => this.onTabSelect(index),
    });
  };

  private renderTabElements = (source: ChildrenProp): TabElement[] => {
    return React.Children.map(source, this.renderTabElement);
  };

  private renderComponentChildren = (source: ChildrenProp, style: StyleType): React.ReactNodeArray => {
    const tabElements: TabElement[] = this.renderTabElements(source);

    const hasIndicator: boolean = style.indicator.height > 0;

    return [
      hasIndicator ? this.renderIndicatorElement(tabElements.length, style.indicator) : null,
      ...tabElements,
    ];
  };

  public render(): React.ReactNode {
    const { style, themedStyle, children, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const [indicatorElement, ...tabElements] = this.renderComponentChildren(children, componentStyles);

    return (
      <View
        {...derivedProps}
        style={container}>
        {indicatorElement}
        {tabElements}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    flex: 1,
  },
  indicator: {
    position: 'absolute',
  },
});

export const BottomNavigation =
  styled<BottomNavigationProps, BottomNavigationElementStaticProps>(BottomNavigationComponent);
