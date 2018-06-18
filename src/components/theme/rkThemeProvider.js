import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import { RkTheme } from '../../styles/themeManager';

/**
 * Higher-Order Component (HOC) which wraps component in order to respond to dynamic theme changes.
 * Wrapping root page component allows change themes on the fly without reloading.
 * @param {React.Component} Wrapped - React component which need to be wrapped
 * @returns {React.Component} - wrapped component.
 *
 * @example Usage example
 *
 * ```
 * import {ProfileView} from './profile';
 *
 * let ThemedView = withRkTheme(ProfileView);
 *
 *
 * render(){
 *   return <ThemedView/>
 * }
 *
 * ```
 */
export function withRkTheme(Wrapped) {
  class ThemeProvider extends React.Component {
    componentDidMount() {
      RkTheme.subscribeComponent(this);
    }

    componentWillUnmount() {
      RkTheme.unsubscribeComponent(this);
    }

    render() {
      return <Wrapped {...this.props} />;
    }
  }

  hoistNonReactStatic(ThemeProvider, Wrapped);
  return ThemeProvider;
}
