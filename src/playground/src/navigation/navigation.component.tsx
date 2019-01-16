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

export const withNavigation = <P extends object>(Root: React.ComponentType<P>,
                                                 routes: NavigationRouteConfigMap) => {

  type WrapperProps = Props & P;

  class RootWrapper extends React.Component<WrapperProps> {

    getComponentName = (Component: React.ComponentType) => Component.displayName || Component.name;

    createCustomProps = (): Props => {
      const toRoute = (key: string): RouteType => ({ name: key });
      return {
        routes: Object.keys(routes).filter(key => {
          const rootComponentName = this.getComponentName(Root);
          const componentName = this.getComponentName(routes[key]);
          return rootComponentName !== componentName;
        }).map(toRoute),
      };
    };

    render() {
      return (
        <Root
          {...this.createCustomProps()}
          {...this.props}
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
