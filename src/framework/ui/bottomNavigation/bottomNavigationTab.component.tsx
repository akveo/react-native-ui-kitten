/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageProps,
  TextProps,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface BottomNavigatorTabProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  icon?: (style: StyleType) => React.ReactElement<ImageProps>;
  selected?: boolean;
  onSelect?: (selected: boolean) => void;
}

export type Props = BottomNavigatorTabProps & StyledComponentProps & TouchableOpacityProps;

/**
 * The `BottomNavigatorTab` component is a part of the BottomTabNavigator component.
 * Bottom Navigator Tabs should be wrapped in BottomTabNavigator to provide usable component.
 *
 * @extends React.Component
 *
 * @property {boolean} selected - Determines whether component is selected.
 *
 * @property {string} title - Determines the title of the tab.
 *
 * @property {StyleProp<TextStyle>} titleStyle - Customizes title style.
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines the icon of the tab.
 *
 * @property {(selected: boolean) => void} onSelect - Triggered on select value.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 *
 * @example Simple usage example
 *
 * ```tsx
 * import { BottomNavigatorTab } from '@kitten/ui';
 * <BottomNavigatorTab selected={true}/>
 * ```
 *
 * @example with React Navigation usage example
 *
 * ```tsx
 * import { Image } from 'react-native';
 * import {
 *   BottomNavigatorTab,
 *   BottomTabNavigator,
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
 *function renderBottomNavigation(props: CommonNavigationProps): React.ReactElement<ViewProps> {
 *  const routes: NavigationRoute[] = props.navigation.state.routes;
 *  const index: number = props.navigation.state.index;
 *
 *  return (
 *   <BottomTabNavigatorComponent
 *     selectedIndex={index}
 *     onSelect={(selectedIndex: number) => navigateToTab(selectedIndex)}>
 *     <BottomNavigatorTab
 *       title='Screen 1'
 *       icon={(style: StyleType) => <Image source={getIconSource(style, index)}/>}/>
 *     <BottomNavigatorTab
 *       title='Screen 2'
 *       icon={(style: StyleType) => <Image source={getIconSource(style, index)}/>}/>
 *       <BottomNavigatorTab
 *       title='Screen 3'
 *       icon={(style: StyleType) => <Image source={getIconSource(style, index)}/>}/>
 *    </BottomTabNavigatorComponent>
 *  );
 * }
 * ```
 * */

export class BottomNavigationTab extends React.Component<Props> {

  static styledComponentName: string = 'BottomNavigationTab';

  private onPress = () => {
    if (this.props.onSelect) {
      this.props.onSelect(!this.props.selected);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style, titleStyle } = this.props;
    const {
      iconWidth,
      iconHeight,
      iconMarginVertical,
      iconTintColor,
      textMarginVertical,
      textFontSize,
      textLineHeight,
      textFontWeight,
      textColor,
      ...containerStyle
    } = source;

    return {
      container: {
        ...containerStyle,
        ...StyleSheet.flatten(style),
        ...styles.container,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginVertical: iconMarginVertical,
        tintColor: iconTintColor,
        ...styles.icon,
      },
      text: {
        marginVertical: textMarginVertical,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        fontWeight: textFontWeight,
        color: textColor,
        ...StyleSheet.flatten(titleStyle),
        ...styles.text,
      },
    };
  };

  private renderImageElement(style: StyleType): React.ReactElement<ImageProps> {
    const icon: React.ReactElement<ImageProps> = this.props.icon(style);

    return React.cloneElement(icon, { key: 1 });
  }

  private renderTextElement(style: StyleType): React.ReactElement<TextProps> {
    const { title } = this.props;

    return (
      <Text
        key={2}
        style={style}>
        {title}
      </Text>
    );
  }

  private renderComponentChildren = (style: StyleType): React.ReactNode => {
    const { icon, title } = this.props;

    return [
      icon ? this.renderImageElement(style.icon) : null,
      title ? this.renderTextElement(style.text) : null,
    ];
  };

  public render(): React.ReactNode {
    const { style, themedStyle, ...derivedProps } = this.props;
    const { container, ...componentStyles } = this.getComponentStyle(themedStyle);
    const componentChildren: React.ReactNode = this.renderComponentChildren(componentStyles);

    return (
      <TouchableOpacity
        {...derivedProps}
        style={container}
        activeOpacity={1.0}
        onPress={this.onPress}>
        {componentChildren}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  text: {},
});
