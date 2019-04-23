import React from 'react';
import {
  Dimensions,
  View,
  ViewProps,
  StyleSheet,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  TabBarIndicator,
  Props as TabBarIndicatorProps,
} from '../tab/tabBarIndicator.component';
import { Props as TabProps } from './bottomNavigationTab.component';

type ChildElement = React.ReactElement<TabProps>;

interface TabNavigatorProps {
  children: ChildElement | ChildElement[];
  selectedIndex?: number;
  onSelect?: (index: number) => void;
}

export type Props = TabNavigatorProps & StyledComponentProps & ViewProps;

export class BottomNavigation extends React.Component<Props> {

  static styledComponentName: string = 'BottomNavigation';

  static defaultProps: Partial<Props> = {
    selectedIndex: 0,
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    const { indicatorHeight, indicatorBackgroundColor, ...containerStyle } = style;

    return {
      container: {
        ...containerStyle,
        ...styles.container,
      },
      indicator: {
        height: indicatorHeight,
        backgroundColor: indicatorBackgroundColor,
        ...styles.indicator,
      },
    };
  };

  private onChildPress = (index: number): void => {
    if (this.props.onSelect && this.props.selectedIndex !== index) {
      this.props.onSelect(index);
    }
  };

  private renderIndicatorElement = (positions: number, style: StyleType): React.ReactElement<TabBarIndicatorProps> => {
    return (
      <TabBarIndicator
        key={0}
        style={[style, styles.indicator]}
        selectedPosition={this.props.selectedIndex}
        positions={positions}
      />
    );
  };

  private renderTabElement = (element: ChildElement, index: number): React.ReactElement<TabProps> => {
    return React.cloneElement(element, {
      key: index,
      style: { flex: 1 },
      selected: index === this.props.selectedIndex,
      onSelect: () => this.onChildPress(index),
    });
  };

  private renderComponentChildren = (items: ChildElement | ChildElement[],
                                     style: StyleType): React.ReactElement<any>[] => {

    const { indicator } = style;

    const tabElements: React.ReactElement<TabProps>[] = React.Children.map(items, this.renderTabElement);

    // FIXME:
    const shouldShowIndicator: boolean = indicator.backgroundColor !== 'transparent';

    return [
      shouldShowIndicator ? this.renderIndicatorElement(tabElements.length, indicator) : undefined,
      ...tabElements,
    ];
  };

  public render(): React.ReactNode {
    const { style, themedStyle, children, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const componentChildren: ChildElement[] = this.renderComponentChildren(children, componentStyles);

    return (
      <View
        {...derivedProps}
        style={[container, style, styles.container]}>
        {componentChildren}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
  },
  indicator: {
    position: 'absolute',
  },
});
