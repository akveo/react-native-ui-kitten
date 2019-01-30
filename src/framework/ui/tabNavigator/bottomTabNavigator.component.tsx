import React from 'react';
import {
  Dimensions,
  View,
  Text,
  ViewProps,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { TabBarIndicator } from '../tab/tabBarIndicator.component';

export interface TabRoute {
  routeName: string;
  routeImage?: React.ReactElement<any>;
}

interface TabNavigatorProps {
  appearance?: string;
  routes?: TabRoute[];
  currentIndex?: number;
  onTabChoose?: (routeName: string) => void;
}

export type Props = TabNavigatorProps & StyledComponentProps & ViewProps;

export class BottomTabNavigator extends React.Component<Props> {

  static defaultProps: Partial<Props> = {
    currentIndex: 0,
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    return {
      showText: style.showText,
      showHighlight: style.showHighlight,
      container: {
        backgroundColor: style.backgroundColor,
        borderTopColor: style.borderTopColor,
        borderTopWidth: style.borderTopWidth,
        paddingVertical: style.paddingVertical,
      },
      highlight: {
        height: style.highlightHeight,
        backgroundColor: style.selectedColor,
      },
      tabContent: {
        color: style.color,
      },
      tabContentSelected: {
        color: style.selectedColor,
      },
      tabIcon: {
        backgroundColor: style.color,
      },
      tabIconSelected: {
        backgroundColor: style.selectedColor,
      },
    };
  };

  public onTabChoose = (index: number): void => {
    if (index !== this.props.currentIndex) {
      const routeName: string = this.props.routes
        .find((route: TabRoute, i: number) => i === index).routeName;
      this.props.onTabChoose && this.props.onTabChoose(routeName);
    }
  };

  private renderTabIcon(index: number, themeStyles: StyleType): React.ReactElement<any> {
    const icon: React.ReactElement<any> = this.props.routes[index].routeImage;
    const iconStyle: StyleType = this.props.currentIndex === index ?
      themeStyles.tabIconSelected : themeStyles.tabIcon;
    return React.cloneElement(icon, {
      style: {...iconStyle, ...styles.icon, ...icon.props.style},
    });
  }

  private renderTab(route: TabRoute,
                    index: number,
                    themeStyles: StyleType): React.ReactElement<TouchableWithoutFeedbackProps> {

    const contentStyle: StyleType = this.props.currentIndex === index ?
      themeStyles.tabContentSelected : themeStyles.tabContent;
    return (
      <TouchableWithoutFeedback key={index} onPress={() => this.onTabChoose(index)}>
        <View style={styles.tabItemContainer}>
          {this.renderTabIcon(index, themeStyles)}
          {themeStyles.showText && <Text style={contentStyle}>{route.routeName}</Text>}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  private renderTabs(themeStyles: StyleType): React.ReactElement<TouchableWithoutFeedbackProps>[] {
    return this.props.routes
      .map((route: TabRoute, i: number) => this.renderTab(route, i, themeStyles));
  }

  public render(): React.ReactNode {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);

    return (
      <View
        {...this.props}
        style={[styles.container, componentStyle.container, this.props.style]}
      >
        {componentStyle.showHighlight &&
        <TabBarIndicator
          style={[styles.highlight, componentStyle.highlight]}
          selectedPosition={this.props.currentIndex}
          positions={this.props.routes.length}
        />}
        {this.renderTabs(componentStyle)}
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
  tabItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    position: 'absolute',
  },
  icon: {
    marginBottom: 5,
  },
});
