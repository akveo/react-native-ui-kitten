import React from 'react';
import {
  // @ts-ignore: createAppContainer is not exported
  createAppContainer,
  createStackNavigator,
  NavigationRouteConfigMap,
} from 'react-navigation';
import hoistNonReactStatics from 'hoist-non-react-statics';

export interface RouteType {
  name: string;
}

export interface Props {
  routes?: RouteType[];
}

const ROUTE_INITIAL = 'root';

export const withNavigation = <P extends object>(Root: React.ComponentType<P>, routes: NavigationRouteConfigMap) => {

  type WrapperProps = Props & P;

  class RootWrapper extends React.Component<WrapperProps> {

    private getComponentName = (Component: React.ComponentType): string => {
      return Component.displayName || Component.name;
    };

    private isComponentRoute = (name: string): boolean => {
      const rootRouteName: string = this.getComponentName(Root);
      const componentRouteName: string = this.getComponentName(routes[name]);

      return componentRouteName !== rootRouteName;
    };

    private createRoute = (name: string): RouteType => {
      return {
        name: name,
      };
    };

    private createRoutes = (): RouteType[] => {
      return Object.keys(routes).filter(this.isComponentRoute).map(this.createRoute);
    };

    public render(): React.ReactNode {
      return (
        <Root
          {...this.props}
          routes={this.createRoutes()}
        />
      );
    }
  }

  const routeConfig: NavigationRouteConfigMap = {
    [ROUTE_INITIAL]: RootWrapper,
    ...routes,
  };
  const stackConfig: NavigationRouteConfigMap = {
    initialRouteName: ROUTE_INITIAL,
  };

  hoistNonReactStatics(RootWrapper, Root);

  // FIXME:
  // @ts-ignore: createAppContainer is not exported
  return createAppContainer(createStackNavigator(routeConfig, stackConfig));
};
