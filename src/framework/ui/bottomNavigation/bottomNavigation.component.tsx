/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { BottomNavigationTabProps } from './bottomNavigationTab.component';
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

export type BottomNavigationProps = StyledComponentProps & ViewProps & ComponentProps;

/**
 * The `BottomNavigator` component is a component for tab navigation.
 *
 * @extends React.Component
 *
 * @property {number} selectedIndex - Determines index of the selected tab.
 *
 * @property {React.ReactElement<TabProps> | React.ReactElement<TabProps>[]} children -
 * Determines tabs of the navigator. Can be passed through JSX.
 *
 * @property {(index: number) => void} onSelect - Triggered on select value.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example with React Navigation usage example
 *
 * ```
 * import { Image } from 'react-native';
 * import {
 *   BottomNavigation,
 *   BottomNavigationTab,
 * } from '@kitten/ui';
 * import {
 *   createBottomTabNavigator,
 *   NavigationContainer,
 *   NavigationContainerProps,
 *   NavigationScreenProp,
 *   NavigationState,
 *   NavigationRoute,
 * } from 'react-navigation';
 *
 * type CommonNavigationProps = NavigationProps & NavigationContainerProps;
 *
 * export const TabNavigatorScreen: NavigationContainer = createBottomTabNavigator({
 *   ...screens,
 * }, {
 *   initialRouteName: 'Screen1',
 *   tabBarComponent: (props: CommonNavigationProps) => renderBottomNavigation(props),
 * });
 *
 * function renderBottomNavigation(props: CommonNavigationProps): React.ReactElement<ViewProps> {
 *  const routes: NavigationRoute[] = props.navigation.state.routes;
 *  const index: number = props.navigation.state.index;
 *
 *  return (
 *   <BottomNavigation
 *     selectedIndex={index}
 *     onSelect={(selectedIndex: number) => navigateToTab(selectedIndex)}>
 *     <BottomNavigationTab
 *       title='Screen 1'
 *       icon={(style: StyleType) => <Image source={getIconSource(style, index)}/>}/>
 *     <BottomNavigationTab
 *       title='Screen 2'
 *       icon={(style: StyleType) => <Image source={getIconSource(style, index)}/>}/>
 *     <BottomNavigationTab
 *       title='Screen 3'
 *       icon={(style: StyleType) => <Image source={getIconSource(style, index)}/>}/>
 *    </BottomNavigation>
 *  );
 * }
 * ```
 * */

export class BottomNavigationComponent extends React.Component<BottomNavigationProps> {

  static styledComponentName: string = 'BottomNavigation';

  static defaultProps: Partial<BottomNavigationProps> = {
    selectedIndex: 0,
  };

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

export const BottomNavigation = styled<BottomNavigationProps>(BottomNavigationComponent);
