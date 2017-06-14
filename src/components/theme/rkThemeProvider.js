import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import {RkTheme} from '../../styles/themeManager';

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
    constructor(props) {
      super(props);
      this.state = {theme: RkTheme.current};
      this.updateState = this._updateState.bind(this);
    }

    _updateState() {
      this.setState({theme: RkTheme.current});
    }

    componentDidMount() {
      RkTheme._subscribe(this.updateState)
    }

    componentWillUnmount() {
      RkTheme._unSubscribe(this.updateState)
    }

    setColor(name, value) {
      RkTheme.setColor(name, value)
    }

    render() {
      return <Wrapped {...this.props}/>
    }

    static childContextTypes = {
      theme: PropTypes.object,
    };

    getChildContext() {
      return {
        theme: this.state.theme
      };
    }
  }

  hoistNonReactStatic(ThemeProvider, Wrapped);
  return ThemeProvider
}