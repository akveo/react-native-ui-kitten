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
import { BottomNavigationTabElement } from './bottomNavigationTab.component';
import {
  TabIndicator,
  TabIndicatorElement,
} from '../support/components/tabIndicator.component';

type ChildrenProp = BottomNavigationTabElement | BottomNavigationTabElement[];

export interface BottomNavigationProps extends StyledComponentProps, ViewProps {
  children: ChildrenProp;
  selectedIndex?: number;
  indicatorStyle?: StyleProp<ViewStyle>;
  onSelect?: (index: number) => void;
}

export type BottomNavigationElement = React.ReactElement<BottomNavigationProps>;

/**
 * `BottomNavigation` component is designed to be a Bottom Tab Bar.
 * Can be used for navigation.
 *
 * @extends React.Component
 *
 * @property {number} selectedIndex - Determines index of the selected tab.
 *
 * @property {string} appearance - Determines the appearance of the component.
 * Can be `default` or `noIndicator`.
 *
 * @property {ReactElement<TabProps> | ReactElement<TabProps>[]} children - Determines tabs of the Bottom Navigation.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines styles of the indicator.
 *
 * @property {(index: number) => void} onSelect - Triggered on select value.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example BottomNavigationSimpleUsage
 *
 * @overview-example Using with React Navigation
 *
 * ```
 * import React from 'react';
 * import { SafeAreaView } from 'react-native';
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 * import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
 *
 * const BottomTab = createBottomTabNavigator();
 *
 * const UsersScreen = () => (
 *   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *     <Text category='h1'>USERS</Text>
 *   </Layout>
 * );
 *
 * const OrdersScreen = () => (
 *   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *     <Text category='h1'>ORDERS</Text>
 *   </Layout>
 * );
 *
 * const BottomTabBar = ({ navigation, state }) => {
 *
 *   const onSelect = (index) => {
 *     navigation.navigate(state.routeNames[index]);
 *   };
 *
 *   return (
 *     <SafeAreaView>
 *       <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
 *         <BottomNavigationTab title='USERS'/>
 *         <BottomNavigationTab title='ORDERS'/>
 *       </BottomNavigation>
 *     </SafeAreaView>
 *   );
 * };
 *
 * const TabNavigator = () => (
 *   <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
 *     <BottomTab.Screen name='Users' component={UsersScreen}/>
 *     <BottomTab.Screen name='Orders' component={OrdersScreen}/>
 *   </BottomTab.Navigator>
 * );
 *
 * export const AppNavigator = () => (
 *   <NavigationContainer>
 *     <TabNavigator/>
 *   </NavigationContainer>
 * );
 * ```
 *
 * @example BottomNavigationWithoutIndicator
 *
 * @overview-example BottomNavigationWithIcons
 *
 * @example BottomNavigationInlineStyling
 */
export class BottomNavigationComponent extends React.Component<BottomNavigationProps> {

  static styledComponentName: string = 'BottomNavigation';

  static defaultProps: Partial<BottomNavigationProps> = {
    selectedIndex: 0,
  };

  private onTabSelect = (index: number): void => {
    if (this.props.onSelect && this.props.selectedIndex !== index) {
      this.props.onSelect(index);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { indicatorHeight, indicatorBackgroundColor, ...containerParameters } = source;

    return {
      container: containerParameters,
      item: {},
      indicator: {
        height: indicatorHeight,
        backgroundColor: indicatorBackgroundColor,
      },
    };
  };

  private renderIndicatorElement = (positions: number, style: ViewStyle): TabIndicatorElement => {
    const { indicatorStyle, selectedIndex } = this.props;

    return (
      <TabIndicator
        key={0}
        style={[style, styles.indicator, indicatorStyle]}
        selectedPosition={selectedIndex}
        positions={positions}
      />
    );
  };

  private renderTabElement = (element: BottomNavigationTabElement, index: number): BottomNavigationTabElement => {
    return React.cloneElement(element, {
      key: index,
      style: [styles.item, element.props.style],
      selected: index === this.props.selectedIndex,
      onSelect: () => this.onTabSelect(index),
    });
  };

  private renderTabElements = (source: ChildrenProp): BottomNavigationTabElement[] => {
    return React.Children.map(source, this.renderTabElement);
  };

  private renderComponentChildren = (style: StyleType): React.ReactNodeArray => {
    const tabElements: BottomNavigationTabElement[] = this.renderTabElements(this.props.children);

    const hasIndicator: boolean = style.indicator.height > 0;

    return [
      hasIndicator && this.renderIndicatorElement(tabElements.length, style.indicator),
      ...tabElements,
    ];
  };

  public render(): React.ReactElement<ViewProps> {
    const { themedStyle, style, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);

    const [indicatorElement, ...tabElements] = this.renderComponentChildren(componentStyles);

    return (
      <View
        {...derivedProps}
        style={[container, styles.container, style]}>
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
