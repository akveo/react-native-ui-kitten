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
 * BottomNavigation component is designed to be a Bottom Tab Bar.
 * Can be used for navigation.
 *
 * @extends React.Component
 *
 * @property {number} selectedIndex - Determines index of the selected tab.
 *
 * @property {React.ReactElement<TabProps> | React.ReactElement<TabProps>[]} children -
 * Determines tabs of the Bottom Navigation.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines styles of the indicator.
 *
 * @property {(index: number) => void} onSelect - Triggered on select value.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```
 * import React from 'react';
 * import { BottomNavigation, BottomNavigationTab } from 'react-native-ui-kitten';
 *
 * export class BottomNavigationShowcase extends React.Component {
 *
 *   public state = {
 *     selectedIndex: 0,
 *   };
 *
 *   private onTabSelect = (selectedIndex: number) => {
 *     this.setState({ selectedIndex });
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <BottomNavigation
 *          selectedIndex={this.state.selectedIndex}
 *          onSelect={this.onTabSelect}
 *          <BottomNavigationTab title='Tab 1/>
 *          <BottomNavigationTab title='Tab 2/>
 *          <BottomNavigationTab title='Tab 3/>
 *       </BottomNavigation>
 *     );
 *   }
 * }
 * ```
 *
 * @example Inline styling example
 *
 * ```
 * import React, { ReactElement } from 'react';
 * import { BottomNavigation, BottomNavigationProps, BottomNavigationTab } from 'react-native-ui-kitten';
 *
 * export const BottomNavigationShowcase = (props?: BottomNavigationProps): ReactElement<BottomNavigationProps> => {
 *   return (
 *     <BottomNavigation
 *        style={styles.bottomBar}
 *        indicatorStyle={styles.indicator}>
 *        <BottomNavigationTab title='Tab 1/>
 *        <BottomNavigationTab title='Tab 2/>
 *        <BottomNavigationTab title='Tab 3/>
 *     </BottomNavigation>
 *   );
 * };
 * ```
 *
 * @example With React Navigation API and usage example
 *
 * ```
 * import React, { ReactElement } from 'react';
 * import {
 *   BottomNavigation,
 *   BottomNavigationTab,
 *   BottomNavigationProps,
 * } from 'react-native-ui-kitten';
 * import {
 *   createBottomTabNavigator,
 *   NavigationContainer,
 *   NavigationContainerProps,
 *   NavigationRoute,
 * } from 'react-navigation';
 *
 * type CommonNavigationProps = NavigationProps & NavigationContainerProps;
 *
 * export const TabNavigatorScreen: NavigationContainer = createBottomTabNavigator({
 *   ...screens,
 * }, {
 *   initialRouteName: 'Screen1',
 *   tabBarComponent: BottomNavigationShowcase,
 * });
 *
 * export const BottomNavigationShowcase = (props?: BottomNavigationProps): ReactElement<BottomNavigationProps> {
 *
 *  const onTabSelect = (selectedIndex: number) => {
 *    const { [index]: selectedRoute } = props.navigation.state.routes;
 *
 *    navigation.navigate(selectedRoute.routeName);
 *  };
 *
 *  return (
 *    <BottomNavigation
 *      selectedIndex={props.navigation.state.index}
 *      onSelect={onTabSelect}>
 *      <BottomNavigationTab title='Tab 1'/>
 *      <BottomNavigationTab title='Tab 2'/>
 *      <BottomNavigationTab title='Tab 3'/>
 *    </BottomNavigation>
 *   );
 * }
 * ```
 */

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
